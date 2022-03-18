import React, { useEffect } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from "react-native";
import { Container, Text } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { connect } from "react-redux";
import { checkoutItems } from "../../../Redux/actions/orderAction";

import { useQuery } from "@apollo/client";
import PropTypes from "prop-types";
import { objectSize } from "../../util/extensions";
import { FETCH_USER_CART_QUERY } from "../../util/graphql";
import ItemSummaryCart from "./ItemSummaryCart";
import CardGroup from "./CardGroup";

var { height, width } = Dimensions.get("window");

const Cart = (props) => {
  const { loading, error, data, refetch } = useQuery(FETCH_USER_CART_QUERY);
  let { getUserCartItems: cartItems } = data ? data : [];
  var size = objectSize(cartItems);

  useEffect(() => {
    if (size > 0) {
      // console.log("size", size)
      let group = cartItems.reduce((r, a) => {
        r[a.item.user.id] = [...(r[a.item.user.id] || []), a];
        return r;
      }, {});
      let carts = props.carts;
      Object.keys(group).forEach(function (key) {
        if (group[key][0].isChecked && objectSize(carts) <= 1) {
          const cart = {
            user: group[key][0].item.user,
            cartItems: group[key],
          };
          carts = [cart, ...carts];
        }
      });
      props.checkoutItems(carts, !props.isChange);
      // console.log("object", carts)
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
          marginTop: "-50%",
        }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Bag kamu masih kosong
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: "#8c8c8c",
          marginTop: 15,
        }}
      >
        Belanja barang dulu, lalu tambah disini
      </Text>
    </Container>
  );

  if (!loading) {
    if (size > 0) {
      let group = cartItems.reduce((r, a) => {
        r[a.item.user.id] = [...(r[a.item.user.id] || []), a];
        return r;
      }, {});

      cartScreen = (
        <>
          <StatusBar barStyle="dark-content" backgroundColor="white" />
          <SafeAreaView style={{ backgroundColor: "#fff" }}>
            <View style={styles.header}>
              <FontAwesome
                onPress={() => props.navigation.goBack()}
                name="close"
                size={18}
                style={{ top: 4 }}
              />
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 0.3,
                  marginStart: 130,
                }}
              >
                Bag
              </Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: height }}
            >
              <View style={styles.listContainer}>
                {group &&
                  Object.keys(group).map((key, index) => (
                    <CardGroup
                      key={index}
                      cartItem={group[key]}
                      refetchCartQuery={refetch}
                    />
                  ))}
              </View>
            </ScrollView>
            <View
              style={{
                position: "absolute",
                marginStart: 20,
                width: 320,
                justifyContent: "space-between",
                bottom: 105,
                backgroundColor: "#fff",
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
              }}
            >
              <ItemSummaryCart navigation={props.navigation} />
            </View>
          </SafeAreaView>
        </>
      );
    }
  }
  return cartScreen;
};

Cart.propTypes = {
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
    backgroundColor: "#fff",
    marginTop: 10,
    marginStart: 17,
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

export default connect(mapStateToProps, { checkoutItems })(Cart);
