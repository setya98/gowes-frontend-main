import React, {useState, useEffect} from "react";
import { StyleSheet, Image } from "react-native";
import { Card,Text } from "react-native-paper";
import { Left, Right } from "native-base";
import OrderCardDetail from "./OrderCardDetail";
import { useNavigation } from "@react-navigation/native";
import moment from "moment"

function OrderCardComponent(props) {
    // console.log("test", props.order)
    const navigation = useNavigation();
    const order = props.order

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
      <Card style ={{borderRadius: 20, marginTop: 20, paddingBottom: 20}}
      onPress={() =>
        navigation.navigate("Order Detail", {
          order: order,
        })
      }
    >
      <Card.Content style={{ flexDirection: "row", marginBottom: 20, marginTop: -25 }}>
      <Left>
        <Image source={require("../assets/store.png")} resizeMode="contain" style={{width: 18, height: 18, top: 30, tintColor: "#000"}} />
          <Text style={{marginTop: 12, marginStart: 30, fontWeight:"bold", fontSize: 16}}>{order.seller.username}</Text>
          <Text style={{color: "#8c8c8c", marginTop: 10}}>{moment(order.state.createdAt).format('lll')}</Text>
      </Left>
      <Right>
        <Text style={{marginTop: 5, marginEnd: 5, fontWeight:"bold", fontSize: 13, color:"#F18c06"}}>{order.state.stateType}</Text>
      </Right>
      </Card.Content>
      {order.items &&
        order.items.map((item) => <OrderCardDetail item={item} />)}
    </Card>
  );
}

  const styles = StyleSheet.create({
      card: {
          borderRadius: 20,
      },
      
  })

  export default OrderCardComponent