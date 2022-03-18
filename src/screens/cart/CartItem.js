import React, { useState, useEffect } from "react";
import { View, Text, TouchableWithoutFeedback, TextInput, } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
import { Avatar, Card, Divider, IconButton } from "react-native-paper";
import NumericInput from "react-native-numeric-input";
import { currencyIdrConverter } from "../../util/extensions";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/Entypo"
import Entypo from "react-native-vector-icons/Entypo"

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useMutation } from "@apollo/client";
import { checkoutItems } from "../../../Redux/actions/orderAction";

import {
  EDIT_CART_MUTATION,
  FETCH_USER_CART_QUERY,
  DELETE_CART_ITEM_MUTATION,
} from "../../util/graphql";
import { Input } from "native-base";

const CartItem = (props) => {
  const [amountItem, setAmountItem] = useState(props.item.item.amountItem);
  const [errors, setErrors] = useState({});
  const [note, setNote] = useState(props.item.note);
  const [isOpen, setOpen] = useState(false)
  const [editAmount, setEditAmount] = useState(false);

  useEffect(() => {
    let carts = props.carts;
    // console.log("cart items", carts[0].cartItems)
    let cartObj;
    let cartItemObj;
    let indexCartObj;
    let indexCartItemObj;
    carts.forEach((cart, indexCart) => {
      if (cart.user.seller.username === props.item.item.user.seller.username) {
        indexCartObj = indexCart;
        cart.cartItems.forEach((cartItem, indexCartItem) => {
          if (cartItem.item.id === props.item.item.id) {
            indexCartItemObj = indexCartItem;
            cartItemObj = cartItem;
            console.log("cartItem", cartItem)
            cartItemObj = { ...cartItemObj, amountItem: parseInt(amountItem) };
            cartItemObj = { ...cartItemObj, note: note };
            return;
          }
        });
        cartObj = cart;
        cartObj.cartItems[indexCartItemObj] = cartItemObj;
        return;
      }
    });
    carts[indexCartObj] = cartObj;
  }, [amountItem]);

  const [deleteItemCart] = useMutation(DELETE_CART_ITEM_MUTATION, {
    update() {
      props.refetchCartQuery();
    },
    variables: { cartId: props.item.id },
  });

  const [addToCart] = useMutation(EDIT_CART_MUTATION, {
    variables: {
      itemId: props.item.item.id,
      amountItem: amountItem,
      note: note,
      isChecked: props.item.isChecked,
    },
    update() {
      props.refetchCartQuery();
      setEditAmount(false);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(errors);
    },
  });

  function deleteItemFromCart() {
    deleteItemCart();
    Toast.show({
      topOffset: 30,
      type: "success",
      text1: "Produk dihapus dari bag",
    });
  }

  function editCart() {
    addToCart()
    setOpen(false)
  }
  function plusButton() {
    setAmountItem(amountItem + 1);
    setEditAmount(true)
  }
  function minusButton() {
    setAmountItem(amountItem - 1);
    setEditAmount(true)
  }

  if (editAmount) {
    addToCart();
  }

  // console.log(NumericInput.value)
  console.log("jumlah item", amountItem)

  return (
    <Card.Content
      style={{
        marginLeft: -15,
        marginRight: -15,
        marginTop: 30,
        backgroundColor: "#f2f2f2",
      }}
    >
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
        <Avatar.Image
          source={{
            uri:
              props.item.item.images.length > 0
                ? props.item.item.images[0].downloadUrl
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
          }}
          size={55}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#595959",
            marginStart: 20,
            marginTop: 1,
          }}
        >
          {props.item.item.name}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 18,
          fontWeight: "700",
          color: "#000",
          marginStart: 77,
          marginTop: -20,
        }}
      >
        Rp {currencyIdrConverter(props.item.item.price, 0, ".", ",")}
      </Text>

      <NumericInput
        value={amountItem}
        onChange={(val) => {
          setAmountItem(val);
          setEditAmount(true);
        }}
        containerStyle={{ alignSelf: "flex-end", top: 20 }}
        totalWidth={80}
        totalHeight={30}
        iconSize={20}
        step={1}
        valueType="real"
        rounded
        minValue={1}
        maxValue={props.item.item.stock}
        textColor="#000"
        inputStyle={{ fontSize: 16 }}
        iconStyle={{ color: "white" }}
        rightButtonBackgroundColor="#000"
        leftButtonBackgroundColor="#8c8c8c"
      />
      {/* <IconButton 
      icon="minus"
      color="white"
      onPress={minusButton}
      size={14}
      disabled={amountItem <= 1 || props.checked === false}
      style={{width: 25, height: 25, backgroundColor: "#000"}}
      />
      <TextInput 
      placeholder="1"
      keyboardType="number-pad"
      value={amountItem}
      />
      <IconButton 
      icon="plus"
      color="white"
      onPress={plusButton}
      size={14}
      disabled={amountItem >= props.item.item.stock || props.checked === false}
      style={{width: 25, height: 25, backgroundColor: "#000"}}
      /> */}
      <TouchableWithoutFeedback onPress={deleteItemFromCart}>
        <FontAwesome
          name="trash"
          size={18}
          style={{
            marginTop: -5,
            alignSelf: "flex-end",
            marginEnd: 100,
            color: "#595959",
          }}
        />
      </TouchableWithoutFeedback>
      {isOpen ? (
        <View style={{flexDirection:"row", borderColor: "#595959", width: 155, height: 25, marginTop: -20, borderRadius: 10, borderStyle: "dashed", borderWidth: 1, marginStart: -5}}>
         <TextInput 
         name="note"
         placeholder="Tulis catatan"
         value={note}
         onChangeText={(val) => setNote(val)}
         style={{ marginTop: -1, fontSize: 15, width: 80, marginStart: 10
        }}
         />
         <Entypo onPress={editCart} name="check" size={16} style={{marginTop: 2, marginStart: 40}}/>
         </View>
      ) : note !== "" ? (
        <>
        <View style={{flexDirection: "row", width: 140, marginStart: -3}}>
          <Icon onPress={() => setOpen(true)} name="edit" size={16} style={{marginTop: -15, color: "#595959"}} />
          <Text style={{fontSize: 15, marginStart: 7, marginTop: -17, color: "#595959", }}>{note}</Text>
          </View>
        </>
      ) : (
      <Icon onPress={() => setOpen(true)} name="edit" size={14} style={{marginTop: -15, color: "#8c8c8c", marginStart: -3, width: 140}} >
      <Text style={{fontSize: 11, color: "#8c8c8c"}}>Tulis Catatan</Text>
      </Icon>
      )}
    </Card.Content>
  );
};

CartItem.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
});

export default connect(mapStateToProps, { checkoutItems })(CartItem);
