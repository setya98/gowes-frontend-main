import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-paper";
import { Button } from "native-base";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { checkoutItems } from "../../../Redux/actions/orderAction";
import { currencyIdrConverter } from "../../util/extensions";

const ItemSummaryCart = (props) => {
  const [subTotal, setSubTotal] = useState(0);
  const [amount, setAmount] = useState(0);

  let total = 0;
  let amountCounter = 0;

  useEffect(() => {
    props.carts.forEach((cart) => {
      cart.cartItems.forEach((cartItem) => {
        amountCounter += cartItem.amountItem;
        const price = parseInt(cartItem.item.price);
        total += price * cartItem.amountItem;
      });
    });
    setAmount(amountCounter);
    setSubTotal(total);
  }, [props.carts, props.isChange]);

  function checkout() {
    props.navigation.navigate("Checkout");
  }

  return (
    <Card.Content >
      <View style={{ flexDirection: "column", marginTop: 20, marginStart: 5 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#595959" }}>
          Total
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#000",
            marginTop: 5,
          }}
        >
          Rp {currencyIdrConverter(subTotal, 0, ".", ",")}
        </Text>
      </View>
      <Button
        onPress={checkout}
        disabled={amount === 0}
        style={{
          backgroundColor: "#000",
          width: 110,
          borderRadius: 15,
          justifyContent: "center",
          alignSelf: "flex-end",
          marginTop: -45,
          marginBottom: 20,
          marginEnd: 5,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          Bayar ({amount})
        </Text>
      </Button>
    </Card.Content>
  );
};

ItemSummaryCart.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

export default connect(mapStateToProps, { checkoutItems })(ItemSummaryCart);
