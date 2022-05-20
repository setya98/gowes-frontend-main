import React from "react";
import { StyleSheet, Image, View } from "react-native";
import { Card, Text, Divider } from "react-native-paper";
import { Left, Right } from "native-base";
import OrderCardDetail from "./OrderCardDetail";
import moment from "moment";

function OrderCardSellerComponent(props) {
  // console.log("detail pesanan", order)
  const order = props.order;

  let itemPrice;
  let amountItem;

  {
    order.items.map((item) => {
      itemPrice = item.price;
      amountItem = item.amountItem;
    });
  }
  const shippingCost = order.shipping.shippingCost;

  const grossAmount = itemPrice * amountItem;
  const totalPrice = grossAmount + shippingCost;

  return (
    <Card
      style={{ borderRadius: 20, marginTop: 20, paddingBottom: 20 }}
      onPress={() =>
        props.navigation.navigate("Order Seller Detail", {
          order: order,
        })
      }
    >
      <Card.Content
        style={{ flexDirection: "row", marginBottom: 20, marginTop: -25 }}
      >
        <Left>
          <Image
            source={{ uri: order.user.buyer.avatar }}
            style={{
              top: 30,
              backgroundColor: "#8c8c8c",
              height: 30,
              width: 30,
              borderRadius: 10,
            }}
          />
          <Text
            style={{
              marginTop: 5,
              marginStart: 40,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            {order.user.buyer.name}
          </Text>
          <Text style={{ color: "#8c8c8c", marginTop: 10 }}>
            {moment(order.state.createdAt).format("lll")}
          </Text>
        </Left>
        <Right>
          <View
            style={{
              width: 100,
              height: 30,
              backgroundColor: "#F18c06",
              borderRadius: 10,
              justifyContent: "center",
              marginTop: 15,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontWeight: "bold",
                fontSize: 13,
                color: "#fff",
              }}
            >
              {order.state.stateType}
            </Text>
          </View>
        </Right>
      </Card.Content>
      <Divider style={{ height: 1, marginBottom: 15 }} />
      {order.items &&
        order.items.map((item) => <OrderCardDetail item={item} />)}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
  },
});

export default OrderCardSellerComponent;
