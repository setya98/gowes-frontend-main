import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Card, Divider } from "react-native-paper";
import { Button } from "native-base";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import { checkoutItems, setAddOrder } from "../../../Redux/actions/orderAction";
import { currencyIdrConverter } from "../../util/extensions";

import { CREATE_PAYMENT_QUERY } from "../../util/graphql";
import { useLazyQuery } from "@apollo/client";

const CheckoutSummaryCard = (props) => {
  const [subTotal, setSubTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [shippingCost, setShippingCost] = useState(0);
  const [isCourierExists, setCourierExists] = useState(false);
  const [midtransItemList, setMidtransItemList] = useState([]);
  const [paymentInput, setPaymentInput] = useState({});

  let total = 0;
  let amountCounter = 0;
  let shippingCostCounter = 0;
  let isExistsCourierList = [];
  let productItems = [];
  let courierItems = [];
  let dataTemp;

  function actionAddOrder() {
    console.log("actionAddOrder run");
    props.setAddOrder(true);
  }

  useEffect(() => {
    props.carts.forEach((cart) => {
      if (cart.cartItems[0].courier) {
        shippingCostCounter += cart.cartItems[0].courier.amount;
        // compare between previous value and next value
        isExistsCourierList = [
          ...isExistsCourierList,
          cart.cartItems[0].courier.code !== "",
        ];
        courierItems = [
          ...courierItems,
          {
            id: "",
            price: cart.cartItems[0].courier.amount,
            quantity: 1,
            name: `${cart.cartItems[0].courier.code} (${cart.cartItems[0].courier.service})`,
          },
        ];
      } else {
        isExistsCourierList = [...isExistsCourierList, false];
      }
      cart.cartItems.forEach((cartItem) => {
        productItems = [
          ...productItems,
          {
            id: cartItem.item.id,
            price: cartItem.item.price,
            quantity: cartItem.amountItem,
            name: cartItem.item.name,
          },
        ];
        amountCounter += cartItem.amountItem;
        const price = parseInt(cartItem.item.price);
        total += price * cartItem.amountItem;
      });
    });
    let courierExists = false;
    isExistsCourierList.every((value) => {
      courierExists = value;
      return courierExists;
    });
    setShippingCost(shippingCostCounter);
    setAmount(amountCounter);
    setSubTotal(total);
    setCourierExists(courierExists);
    setMidtransItemList(productItems.concat(courierItems));
  }, [props.isChange]);

  const pay = () => {
    let summaryScreen;
    if (isCourierExists) {
      const url = "https://app.sandbox.midtrans.com/snap/v1/transactions";
      let uData = {
        grossAmount: subTotal + shippingCost,
        productDetails: midtransItemList,
        customerDetails: {
          firstName: props.carts[0].cartItems[0].user.buyer.name,
          email: props.carts[0].cartItems[0].user.email,
          phone: props.carts[0].cartItems[0].user.phone,
          billingAddress: {
            firstName: props.carts[0].cartItems[0].user.buyer.name,
            email: props.carts[0].cartItems[0].user.email,
            phone: props.carts[0].cartItems[0].user.phone,
            address: props.carts[0].cartItems[0].user.address.detail,
            city: props.carts[0].cartItems[0].user.address.cityName,
            postalCode: props.carts[0].cartItems[0].user.address.postalCode,
            countryCode: "IDN",
          },
        },
      };
      dataTemp = uData;

      summaryScreen = (
        <Button
          labelStyle={{ color: "white" }}
          disabled={false}
          onPress={() => {
            actionAddOrder(), setPaymentInput(dataTemp), initiatePayment();
          }}
          style={{
            width: 150,
            borderRadius: 15,
            justifyContent: "center",
            height: 40,
            alignSelf: "flex-end",
            backgroundColor: "#000",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}>
            Bayar
          </Text>
        </Button>
      );
    } else {
      summaryScreen = (
        <Button
          disabled={true}
          onClick={actionAddOrder}
          style={{
            width: 150,
            borderRadius: 15,
            justifyContent: "center",
            height: 40,
            alignSelf: "flex-end",
            marginBottom: 20,
          }}
        >
          <Text style={{ color: "#595959", fontSize: 16, fontWeight: "bold" }}>
            Bayar
          </Text>
        </Button>
      );
    }
    return summaryScreen;
  };

  const initiatePayment = () => {
    createPayment();
  };

  console.log("payment", paymentInput);

  const [createPayment, { loading, data }] = useLazyQuery(
    CREATE_PAYMENT_QUERY,
    {
      variables: {
        createPaymentInput: paymentInput,
      },
      onCompleted() {
        console.log(data, "tesss");

        props.navigation.navigate("Midtrans", {
          midtransProps: data,
        });
      },
    }
  );

  console.log("the data", data);

  if (loading) return <Text>Loading ...</Text>;

  return (
    <View>
      {/* <ActivityIndicator color="#000" size="large" /> */}
      <Card.Content style={{marginTop: 15, marginBottom: 10}}>
      <View style={{ flexDirection: "row", justifyContent: "space-between"}}>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#595959", marginTop: 5}}>
          Jumlah
        </Text>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#000",
            marginEnd: 5,
            marginTop: 5,
          }}
        >
          Rp {currencyIdrConverter(subTotal + shippingCost, 0, ".", ",")}
        </Text>
      </View>
      </Card.Content>
     <Card.Content>{pay()}</Card.Content>
    </View>
  );
};

const styles = StyleSheet.create({
  textHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 15,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  divider: {
    height: 1,
    marginTop: 15,
    marginBottom: 15,
    marginStart: -15,
    marginEnd: -15,
  },
});

CheckoutSummaryCard.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  setAddOrder: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

export default connect(mapStateToProps, { checkoutItems, setAddOrder })(CheckoutSummaryCard);
