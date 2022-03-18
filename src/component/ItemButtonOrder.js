import React, { useState, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text, Button } from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/AntDesign";
import Toast from "react-native-toast-message";
import { AuthContext } from "../context/auth";
import { useNavigation } from "@react-navigation/native";

import {
  ADD_TO_CART_MUTATION,
  FETCH_CART_QUERY,
  FETCH_USER_CART_QUERY,
  FETCH_CHATS_QUERY,
} from "../util/graphql";
import { useMutation, useQuery } from "@apollo/client";

function ItemButtonOrder({item, isChatExists}) {
  const context = useContext(AuthContext);
  const navigation = useNavigation();
  const [amountItem, setAmountItem] = useState(1);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState("");
  const [values, setValues] = useState({
    note: "",
  });

  // console.log("ini chat", isChatExists);

  const chat = {
    id: isChatExists.length > 0 ? isChatExists[0]._id : "new",
    users: [
      {
        id: context.user.id,
        seller: {
          username: "",
        },
      },
      {
        id: item.user.id,
        seller: {
          username: item.user.seller.username,
        },
      },
    ],
  };
  const message = {
    user: context.user.id,
    item: {
      id: item.id,
      name: item.name,
      price: item.price,
      image: "",
    },
    chatId: isChatExists.length > 0 ? isChatExists[0]._id : "new",
  };

  const [addToCart] = useMutation(ADD_TO_CART_MUTATION, {
    variables: {
      itemId: item.id,
      isChecked: false,
      amountItem: amountItem,
      note: values.note,
    },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USER_CART_QUERY,
      });

      proxy.writeQuery({
        query: FETCH_USER_CART_QUERY,
        data: {
          getUserCartItems: [result.data.addCartItem, ...data.getUserCartItems],
        },
      });

      console.log("product added");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
  });

  const { loading, data: userCartData } = useQuery(FETCH_CART_QUERY, {
    variables: {
      itemId: item.id,
    },
  });

  const { getUserCartItem: cartItem } = userCartData ? userCartData : [];
  let itemAmountCart = 0;

  if (!loading && cartItem) {
    itemAmountCart = cartItem.amountItem;
  }

  function addItemCart() {
    addToCart();
    setNote(values.note);
    Toast.show({
      topOffset: 30,
      type: "success",
      text1: "Produk ditambahkan ke bag",
    });
  }

  return (
    <View style={styles.bottomHeader}>
      <Button
        onPress={() => navigation.navigate("Chat", { chat, message })}
        style={{
          backgroundColor: "#fff",
          borderRadius: 20,
          borderColor: "#000",
          width: 90,
          justifyContent: "center",
          alignSelf: "center",
          marginStart: 15,
        }}
      >
        <Ionicons name="chatbox-ellipses" size={25} />
      </Button>
      <Button
        style={styles.btnCart}
        onPress={addItemCart}
        disabled={item.stock < 1}
      >
        <Icon name="plus" size={16} style={{ color: "#fff" }} />
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
          Add To Cart
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
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ItemButtonOrder;
