import React, { useState } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { WebView } from "react-native-webview"
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Base64 from "base-64"
import { connect } from "react-redux";
import { setOrderIdsWillBePayed } from "../../../Redux/actions/orderAction";

const ReactMidtransModal = (props) => {
    console.log("wkwk", props);
  const midtrans = props.route.params.midtransProps.createPayment;
  const thisOrderId = props.route.params.midtransProps.createPayment.orderId;
  const [loading, setLoading] = useState(false);

  const serverKey = "SB-Mid-server-Iqz0bFrQwfQ58ZdghJcUAhee";
  const base64Key = Base64.encode(serverKey);

  async function getStatus() {
    // url for get the status of the transactions
    // this url is for sandbox
    const url = `https://api.sandbox.midtrans.com/v2/${thisOrderId}/status`;

    // fetch data
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Basic " + base64Key,
      },
    });
    return response.json();
  }

  const checkPayment = () => {
    setLoading(true);
    getStatus().then((data) => {
      if ((data.status_code = 200)) {
        console.log(data);
        setLoading(false);
        props.navigation.navigate("Payment Checker", {
          getOrderIds: props.orderIds,
        });
      } else {
        console.log(data);
        setLoading(false);
        alert("your order has not been paid");
      }
    });
  };

  return (
    <View style={{ height: "100%" }}>
      <WebView
        source={{
          uri: midtrans.redirect_url,
        }}
      />
      <TouchableOpacity
        onPress={checkPayment}
        style={{
          backgroundColor: "#3366FF",
          padding: 20,
          paddingVertical: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        disabled={loading}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Cek Pembayaran
        </Text>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <FontAwesome name="check-square" size={20} color="white" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => ({
  orderIds: state.orders.orderIds,
});

export default connect(mapStateToProps, { setOrderIdsWillBePayed })(
  ReactMidtransModal
);
