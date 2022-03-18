import React from "react";
import { View, Text } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { Left } from "native-base";
import { currencyIdrConverter } from "../util/extensions";

function OrderCardDetail(props) {
  // console.log("the product", props.item);

  var OrderItemList = <></>;
  if (props.item) {
    OrderItemList = (
      <View>
        <Card.Content style={{ flexDirection: "row", marginHorizontal: -10, marginVertical: 10 }}>
          <Left>
            <Avatar.Image
              source={{ uri: props.item.images[0].downloadUrl }}
              size={50}
              style={{ margin: 10 }}
            />
          </Left>
          <Left style={{marginStart: -140, marginTop: -15}}>
            <Text style={{ fontSize: 18, fontWeight:"bold", color: "#595959" }}>{props.item.name}</Text>
            <Text style={{ fontSize: 14, fontWeight:"bold", color: "#8c8c8c", marginTop: 5 }}>
             Jumlah : {props.item.amountItem}
            </Text>
            <Text style={{ fontSize: 14, fontWeight:"bold", color: "#8c8c8c", marginTop: 5 }}>
             Note : {props.item.note}
            </Text>
          </Left>
        </Card.Content>
        <Left style={{ marginStart: -15, marginTop: -10, marginBottom: 5, flexDirection: "row" }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
              Rp {currencyIdrConverter(props.item.price, 0, ".", ",")}
            </Text>
            <Text style={{ fontSize: 14, fontWeight: "500", color: "#8c8c8c", marginStart: 2, marginTop: 3 }}>
              /produk
            </Text>
          </Left>
      </View>
    );
  }
  return OrderItemList;
}

export default OrderCardDetail;
