import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";

const CartIcon = (props) => {
  return (
    <>
      {props.item.length ? (
        <Badge style={styles.badge}>
          <Text style={styles.text}>{props.item.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const mapStateProps = (state) => {
  const { item } = state;
  return {
    item : item,
  };
};

const styles = StyleSheet.create({
  badge: {
    width: 16,
    height:18, 
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    top: -2,
    right: -4,
  },
  text: {
    fontSize: 12,
    width: 13,
    alignSelf: "center",
    fontWeight: "bold",
    top: -2
  },
});

export default connect(mapStateProps)(CartIcon);
