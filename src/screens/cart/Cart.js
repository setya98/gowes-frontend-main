import React, { useEffect, useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Pressable,
} from "react-native";
import { Container, Text, Button } from "native-base";
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
  const { loading, data, refetch } = useQuery(FETCH_USER_CART_QUERY);
  let { getUserCartItems: cartItems } = data ? data : [];

  var size = objectSize(cartItems);
  console.log("size", size);

  useEffect(() => {
    if (size > 0) {
      // console.log("size", size);
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
    <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Image
        source={require("../../assets/illus-cart.webp")}
        resizeMode="contain"
        style={{
          width: 250,
          height: 250,
          alignSelf: "center",
          marginTop: "-35%",
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
      <Pressable style={{borderRadius: 15, backgroundColor: "#000", marginTop: 25, alignSelf: "center", width: 155,
    height: 48, justifyContent: "center"}} 
      onPress={() => props.navigation.goBack()}
      >
        <Text style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#fff",
            alignSelf: "center",
          }}>Belanja Dulu</Text>
      </Pressable>
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
              <View
                style={{
                  height: 35,
                  width: 35,
                  backgroundColor: "#000",
                  alignItems: "center",
                  borderRadius: 10,
                  justifyContent: "center",
                  elevation: 3,
                }}
              >
                <FontAwesome
                  onPress={() => props.navigation.goBack()}
                  name="close"
                  size={15}
                  style={{ color: "#fff" }}
                />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  letterSpacing: 0.3,
                  marginEnd: 155,
                  marginTop: 5,
                }}
              >
                Bag
              </Text>
            </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: 190,
                marginBottom: height,
              }}
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
                bottom: 60,
                left: 0,
                right: 0,
                backgroundColor: "#fff",
                elevation: 0.6,
              }}
            >
              {/* <Button onPress={dosomething}><Text>Oke</Text></Button> */}
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
    paddingStart: 15,
    paddingBottom: 20,
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
    justifyContent: "space-between",
  },
});

export default connect(mapStateToProps, { checkoutItems })(Cart);
