import React, { useState, useContext } from "react";
import { StyleSheet, View, Alert } from "react-native";
import { Text, Button } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { AuthContext } from "../context/auth";
import { useMutation, useQuery } from "@apollo/client";
import {
  DELETE_ITEM_MUTATION,
  FETCH_ITEM_SELLER_QUERY,
  FETCH_SINGLE_ITEM_QUERY,
} from "../util/graphql";

const EditButtonItem = (props) => {
  const itemId = props.item.id;
  const { item } = props;
  // console.log("haloo", itemId)
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const deleteAlert = () =>
    Alert.alert("Hapus Produk", "Kamu yakin ingin hapus produk?", [
      {
        text: "Batal",
        onPress: () => null,
      },
      {
        text: "Hapus",
        onPress: () => itemDelete(),
      },
    ]);

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_ITEM_SELLER_QUERY,
        variables: { userId: context.user.id },
      });

      proxy.writeQuery({
        query: FETCH_ITEM_SELLER_QUERY,
        data: {
          getSellerItems: data.getSellerItems.filter((p) => p.id !== itemId),
        },
      });

      console.log("product deleted");
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Produk Berhasil Dihapus",
      });
      props.navigation.navigate("Product Container");
    },
    variables: { itemId: itemId },
  });

  function itemDelete() {
    deleteItem();
  }

  const { loading, data: data } = useQuery(FETCH_SINGLE_ITEM_QUERY, {
    variables: {
      itemId: itemId,
    },
  });
  if(data){
    console.log("data id", data.getItem.id);
  }

  return (
    <View style={styles.bottomHeader}>
      <Button
        onPress={deleteAlert}
        style={{
          backgroundColor: "red",
          borderRadius: 20,
          width: 90,
          justifyContent: "center",
          alignSelf: "center",
          marginStart: 15,
        }}
      >
        <FontAwesome name="trash" size={22} color={"#fff"} />
      </Button>
      <Button
        style={styles.btnCart}
        onPress={() =>
          props.navigation.navigate("Edit Product", {
            item: data.getItem,
            product: data
          })
        }
      >
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
          Edit Produk
        </Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  btnCart: {
    width: 220,
    backgroundColor: "#000",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginEnd: 15,
    marginStart: 15,
  },
  bottomHeader: {
    height: 70,
    marginTop: 3,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EditButtonItem;
