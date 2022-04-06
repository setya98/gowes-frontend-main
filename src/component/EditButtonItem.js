import React, { useState, useContext } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Text, Button } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { AuthContext } from "../context/auth";
import { useMutation, useQuery } from "@apollo/client";
import { FETCH_SINGLE_ITEM_QUERY } from "../util/graphql";

const EditButtonItem = (props) => {
  const itemId = props.item.id;
  const { item } = props;
  // console.log("haloo", itemId)
  const context = useContext(AuthContext);

  const { loading, data: data } = useQuery(FETCH_SINGLE_ITEM_QUERY, {
    variables: {
      itemId: itemId,
    },
  });
  if (data) {
    console.log("data id", data.getItem.id);
  }

  return (
    <View style={styles.bottomHeader}>
      {/* <Button
        style={styles.btnCart}
        onPress={() =>
          props.navigation.navigate("Edit Product", {
            item: data.getItem,
            product: data,
          })
        }
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
          Edit Produk
        </Text>
      </Button> */}
      <Pressable
        style={styles.btnCart}
        onPress={() =>
          props.navigation.navigate("Edit Product", {
            item: data.getItem,
            product: data
          })
        }
      >
        <Text
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 16,
            alignSelf: "center",
          }}
        >
          Edit Produk
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnCart: {
    width: "80%",
    height: 48,
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "row",
    marginTop: 2,
    marginStart: "13%"
  },
  bottomHeader: {
    height: 70,
    marginTop: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EditButtonItem;
