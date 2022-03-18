import React from "react";
import { Text, View } from "react-native";
import { Card, Avatar, Divider } from "react-native-paper";
import { currencyIdrConverter } from "../../util/extensions";

const ItemCheckoutCard = ({ item }) => {
  console.log(item.amountItem);
  return (
    <>
      <Card.Content style={{ marginTop: 20 }}>
      <Divider
        style={{
          marginStart: -17,
          height: 1,
          marginEnd: -17,
          marginBottom: 25,
          marginTop: -10,
        }}
      />
        <View style={{ flexDirection: "row" }}>
          <Avatar.Image source={{ uri: item.item.images[0].downloadUrl }} />
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              marginStart: 20,
              color: "#595959",
            }}
          >
            {item.item.name}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            marginStart: 80,
            marginTop: -40,
            color: "#000"
          }}
        >
          {" "}
          Rp {currencyIdrConverter(item.item.price, 0, ".", ",")}
        </Text>
        <Text
          style={{
            marginStart: 85,
            color: "#8c8c8c",
            fontWeight: "700",
            marginTop: 10,
          }}
        >
          Jumlah: {item.amountItem} ({item.item.weight * item.amountItem} gr)
        </Text>
        <Text
          style={{
            marginStart: 85,
            marginTop: 5,
            marginBottom: 10,
            fontWeight: "500",
            color: "#000",
            opacity: 0.6
          }}
        >
          {item.note === "" ? "-" : item.note}
        </Text>
      </Card.Content>
    </>
  );
};

export default ItemCheckoutCard;
