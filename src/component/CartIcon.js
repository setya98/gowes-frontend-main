import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";
import { CartItems } from "../../Redux/actions/cartItemAction";
import { connect } from "react-redux";

const CartIcon = (props) => {

  return (
    <>
      {props.cartItems.length > 0 ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </Badge>
      ) : <>
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.cartItems.length}</Text>
        </Badge>
      </> } 
    </>
  );
};

const mapStateToProps = (state) => ({
  cartItems: state.cartItems.cartItems
});

const styles = StyleSheet.create({
  badge: {
    width: 18,
    height: 19, 
    position: "absolute",
    justifyContent: "center",
    alignContent: "center",
    top: -5,    
    right: -10
  },
  text: {
    fontSize: 12,
    width: 20,
    alignSelf: "center",
    fontWeight: "bold",
    top: -1
  },
});

export default connect(mapStateToProps, { CartItems })(CartIcon);
