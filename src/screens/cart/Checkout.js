import React, { useContext, useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Container, Text } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from "react-native-vector-icons/FontAwesome5";

import { connect } from "react-redux";
import { checkoutItems } from "../../../Redux/actions/orderAction";
import { objectSize } from "../../util/extensions";
import { AuthContext } from "../../context/auth"

import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { FETCH_USER_CART_CHECKOUT_QUERY } from "../../util/graphql";
import ItemSummaryCheckout from "./ItemSummaryCheckout";
import CheckoutCard from "./CheckoutCard";
import { Card } from "react-native-paper";
import CheckoutSummaryCard from "./CheckoutSummaryCard";

var { height, width } = Dimensions.get("window");

const Checkout = (props) => {
  const context = useContext(AuthContext)
  
  const { loading, data: cartCheckoutData, error, data: userData } = useQuery(
    FETCH_USER_CART_CHECKOUT_QUERY,
    {
      variables: {
        userId: context.user.id,
      },
    }
  );
  
  let { getUserCartItemsCheckout: cartItemsCheckout } = cartCheckoutData
    ? cartCheckoutData
    : [];
  let { getUser: user } = userData ? userData : [];
  var size = objectSize(cartItemsCheckout);

  if(cartItemsCheckout){
    console.log("cart", cartItemsCheckout)
  } else {
    console.log(error)
  }

  useEffect(() => {
    if (size > 0) {
      let group = cartItemsCheckout.reduce((r, a) => {
        r[a.item.user.id] = [...(r[a.item.user.id] || []), a];
        return r;
      }, {});
      let carts = props.carts;
      Object.keys(group).forEach(function (key) {
        if (group[key][0].isChecked && objectSize(carts) <= 1) {
          const cart = {
            user: group[key][0].item.user, // data yang dibutuhkan : username, cityId
            cartItems: group[key],
          };
          carts = [cart, ...carts];
        }
      });
      props.checkoutItems(carts, !props.isChange);
    }
  }, [size]); // <-- empty dependency array

  let cartScreen = (
    <Container style={styles.emptyContainer}>
      <Image
        source={require("../../assets/illus-cart.webp")}
        resizeMode="contain"
        style={{
          width: 250,
          height: 250,
          alignSelf: "center",
          marginTop: "-50%"
        }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Bag kamu masih kosong
      </Text>
      <Text style={{ fontSize: 15, fontWeight: "700", color: "#8c8c8c", marginTop: 15 }}>
        Belanja barang dulu, lalu tambah disini
      </Text>
    </Container>
  );
  if (!loading && cartItemsCheckout) {
    if (size > 0) {
      let group = cartItemsCheckout.reduce((r, a) => {
        r[a.item.user.id] = [...(r[a.item.user.id] || []), a];
        return r;
      }, {});

      cartScreen = (
        <>
          <SafeAreaView style={{ backgroundColor: "#fff" }}>
            <View style={styles.header}>
              <FontAwesome
                onPress={() => props.navigation.goBack()}
                name="chevron-left"
                size={18}
                style={{ top: 4 }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 0.3,
                  marginStart: 110,
                }}
              >
                Checkout
              </Text>
            </View>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 800, backgroundColor: "#f2f2f2" }}>
              <View style={styles.listContainer}>
                  <View style={{flexDirection: "row", marginStart: 20, marginTop: 25, marginBottom: 10}}>
                  <FontAwesome name="address-book" size={14} style={{color: "#8c8c8c"}}/>
                  <Text style={{fontSize: 15, fontWeight: "bold", color: "#8c8c8c", marginStart: 10}}>Alamat Pengiriman</Text>
                  </View>
                  <Card.Content style={{backgroundColor: "#fff", marginStart: 15, marginEnd: 15, marginBottom: 20, borderRadius: 20, width: "90%", elevation: 1}}>
                    <View style={{flexDirection: "row", marginTop: 15}}>
                    <FontAwesome name="map-marker" size={20} style={{color: "#595959"}} />
                    <Text style={{fontSize: 18, fontWeight: "bold", marginStart: 10}}>{user.buyer.name}</Text>
                    </View>
                    <Text style={{fontSize: 14, fontWeight: "bold", color: "#595959", marginTop: 10}}>{user.phone}</Text>
                    <Text style={{fontWeight: "600", opacity: 0.8, marginTop: 5, marginBottom: 15}}>{`${user.address.detail}, ${user.address.district}, ${user.address.cityName}, ${user.address.postalCode}`}</Text>
                  </Card.Content>
                  <View style={{flexDirection: "row", marginStart: 20, marginBottom: -10}}>
                  <Icon name="shopping-bag" size={14} style={{color: "#8c8c8c"}}/>
                  <Text style={{fontSize: 15, fontWeight: "bold", color: "#8c8c8c", marginStart: 10}}>Pesanan</Text>
                  </View>
                  {group &&
                  Object.keys(group).map((key, index) => (
                    <CheckoutCard
                      key={index}
                      cartItem={group[key]}
                      user={user}
                    />
                  ))}
                  <View style={{flexDirection: "row", marginStart: 20, marginTop: 20, marginBottom: 10,}}>
                  <Icon name="shopping-bag" size={14} style={{color: "#8c8c8c"}}/>
                  <Text style={{fontSize: 15, fontWeight: "bold", color: "#8c8c8c", marginStart: 10}}>Rincian Pembayaran</Text>
                  </View>
            <ItemSummaryCheckout navigation={props.navigation} user={user} />
            </View>
            </ScrollView>
            <View style={{position: "absolute", width: width, bottom: 45, backgroundColor: "#fff", borderRadius: 20}}>
            <CheckoutSummaryCard navigation={props.navigation} user={user} />
            </View>
          </SafeAreaView>
        </>
      );
    }
  }
  return cartScreen;
};

Checkout.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
  isChange: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

const styles = StyleSheet.create({
  listContainer: {
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  emptyContainer: {
    height: height,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
});

export default connect(mapStateToProps, { checkoutItems })(Checkout);
