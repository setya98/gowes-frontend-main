import React, { useState } from "react";
import { View, Image, Text, Dimensions } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Card } from "react-native-paper";

import { useMutation } from "@apollo/client";
import { EDIT_CHECKED_MUTATION } from "../../util/graphql";
import CartItem from "./CartItem";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { checkoutItems } from "../../../Redux/actions/orderAction";

var { width } = Dimensions.get("window");

const CardGroup = (props) => {
  const [checked, setChecked] = useState(props.cartItem[0].isChecked);
  const [error, setErrors] = useState({});
  console.log("disini", props);

  let itemIds = [];
  props.cartItem.forEach((cartItem) => {
    itemIds = [...itemIds, cartItem.item.id];
  });

  const [editCartItem] = useMutation(EDIT_CHECKED_MUTATION, {
    variables: { itemIds: itemIds, isChecked: checked ? false : true },
    update() {
      props.refetchCartQuery();
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(error);
    },
  });

  const onChecked = (sellerName) => {
    let carts = props.carts;
    if (carts.length > 0) {
      console.log("welkom" + carts[0].cartItem);
      if (
        carts.find(
          (cart) => cart.cartItems[0].item.user.seller.username === sellerName
        )
      ) {
        carts = carts.filter(
          (cart) => cart.user.seller.username !== sellerName
        );
      } else {
        const cart = {
          user: props.cartItem[0].item.user,
          cartItems: props.cartItem,
        };
        carts = [cart, ...carts];
      }
    } else {
      const cart = {
        user: props.cartItem[0].item.user,
        cartItems: props.cartItem,
      };
      carts = [cart, ...carts];
    }
    props.checkoutItems(carts, checked);
    setChecked(checked ? false : true);
    editCartItem();
  };

  return (
      <Card
        style={{
          marginTop: 20,
          borderRadius: 20,
          elevation: 4,
          backgroundColor: "#f2f2f2",
          width: "95%",
        }}
      >
        <Card.Content>
          <BouncyCheckbox
            size={22}
            fillColor="#000"
            style={{
              fontWeight: "bold",
              marginStart: 3,
              marginTop: -2,
              width: 30,
              height: 30,
            }}
            onPress={() =>
              onChecked(props.cartItem[0].item.user.seller.username)
            }
            isChecked={checked}
          />
          <Image
            source={require("../../assets/store.png")}
            style={{
              width: 20,
              height: 20,
              marginTop: -26,
              marginStart: 40,
              flexDirection: "row",
            }}
          />
          <Text
            style={{
              marginTop: -19,
              marginStart: 68,
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {props.cartItem[0].item.user.seller.username}
          </Text>
          {props.cartItem &&
            props.cartItem.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  checked={checked}
                  refetchCartQuery={props.refetchCartQuery}
                />
              );
            })}
        </Card.Content>
      </Card>
  );
};

CardGroup.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  carts: PropTypes.array,
};

const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
});

export default connect(mapStateToProps, { checkoutItems })(CardGroup);
