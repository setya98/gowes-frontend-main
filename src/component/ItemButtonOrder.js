import React, { useState, useContext } from "react";
import { StyleSheet, View, Pressable, Button } from "react-native";
import { Text } from "native-base";
import { currencyIdrConverter } from "../util/extensions";
import Toast from "react-native-toast-message";
import { AuthContext } from "../context/auth";
import { useNavigation } from "@react-navigation/native";

import {
  ADD_TO_CART_MUTATION,
  FETCH_CART_QUERY,
  FETCH_USER_CART_QUERY,
} from "../util/graphql";
import { useMutation, useQuery } from "@apollo/client";

const ItemButtonOrder = (props) => {
  const context = useContext(AuthContext);
  const navigation = useNavigation();
  const { item, isChatExists } = props;
  const [amountItem, setAmountItem] = useState(1);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState("");
  const [isSaved, setSave] = useState(false);
  const [values, setValues] = useState({
    note: "",
  });

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
    refetchQueries: [{
      query: FETCH_USER_CART_QUERY
    }],
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
      // console.log("user cart item", data);

      const cartItem = proxy.readQuery({
        query: FETCH_CART_QUERY,
      });
      proxy.writeQuery({
        query: FETCH_CART_QUERY,
        data: {
          getUserCartItem: cartItem.getUserCartItem,
        },
      });
      console.log("cartItem", cartItem);
      
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log("erorr add item")
      setSave(true);
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
      <View
        style={{
          flexDirection: "column",
          marginTop: 2,
          marginStart: 20,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#8c8c8c" }}>
          Harga
        </Text>
        <Text style={{ fontWeight: "bold", fontSize: 22, marginTop: 1 }}>
          Rp {currencyIdrConverter(props.item.price, 0, ".", ",")}
        </Text>
      </View>
      <Pressable
        style={styles.btnCart}
        onPress={addItemCart}
        disabled={item.stock < 1}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#fff",
            alignSelf: "center",
          }}
        >
          Tambah Ke Bag
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  btnCart: {
    width: 155,
    height: 48,
    backgroundColor: "#000",
    justifyContent: "center",
    borderRadius: 15,
    flexDirection: "row",
    marginTop: 2,
    marginStart: "17%",
  },
  bottomHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default ItemButtonOrder;
