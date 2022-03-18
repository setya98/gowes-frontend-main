import * as React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const BorderWishlist = (props) => (
  <View style={styles.borderWhislist}>
    <Icon
      name="heart"
      size={15}
      color={props.like ? "rgba(245, 42, 42, 0.2)" : "#ff0000"}
    />
  </View>
);

const styles = StyleSheet.create({
  borderWhislist: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(245, 42, 42, 0.2)",
  },
});

export default BorderWishlist;
