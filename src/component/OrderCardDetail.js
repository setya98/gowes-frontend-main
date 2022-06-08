import React from "react";
import { View, Text, Pressable } from "react-native";
import { Card, Avatar } from "react-native-paper";
import { Left } from "native-base";
import { currencyIdrConverter } from "../util/extensions";
import { useNavigation } from "@react-navigation/native";

function OrderCardDetail(props) {
  const navigation = useNavigation();
  console.log('order.cardDetail', props.order)
0
  var OrderItemList = <></>;
  
  if (props.item) {
  
    OrderItemList = (
      <View>
        <Card.Content style={{ flexDirection: "row", marginVertical: 10 }}>
          <Left>
            <Avatar.Image
              size={55}
              source={{ uri: props.item.images[0].downloadUrl }}
              style={{ marginTop: 5, marginStart: 5 }}
            />
          </Left>
          <Left style={{ marginStart: -120, marginTop: -10 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", color: "#595959", marginTop: 15 }}
            >
              {props.item.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#8c8c8c",
                marginTop: 5,
              }}
            >
              Jumlah : {props.item.amountItem}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
                color: "#8c8c8c",
                marginTop: 5,
              }}
            >
              Note : {props.item.note}
            </Text>
          </Left>
        </Card.Content>
        <Left
          style={{
            marginStart: -10,
            marginTop: 5,
            marginBottom: 5,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#000" }}>
            Rp {currencyIdrConverter(props.item.price, 0, ".", ",")}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "#8c8c8c",
              marginStart: 2,
              marginTop: 3,
            }}
          >
            produk
          </Text>
        </Left>
        {props.review && props.order.state.stateType === "COMPLETED" ?  (
          <Pressable
            style={{
              width: "70%",
              height: 40,
              backgroundColor: "#000",
              borderRadius: 10,
              justifyContent: "center",
              marginTop: 10,
              alignSelf: "center",
              marginBottom: 15
            }}
            onPress={() =>
              navigation.navigate("Add Product Review", { item: props.item })
            }
          >
            <Text style={{ color: "#fff", alignSelf: "center", fontWeight: "bold" }}>Tambah Ulasan</Text>
          </Pressable>
        ) : (
          <></>
        )}
      </View>
    );
  }
  return OrderItemList;
}

export default OrderCardDetail;
