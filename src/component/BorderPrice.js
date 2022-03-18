import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Title } from "react-native-paper";
import { currencyIdrConverter } from "../util/extensions";

const BorderPrice = (props) => (
  <View style={styles.borderPrice}>
    <Title style={[styles.textPrice, props.style]}>Rp {currencyIdrConverter(props.title, 0, ".", ",")}</Title>
    </View>
    
);

const styles = StyleSheet.create({
    borderPrice: {
        width: 115,
        height: 33,
        marginTop: 25,
        marginStart: 20,
        borderRadius: 15,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.2)",
      },
      textPrice: {
        fontSize: 18,
        fontWeight: "700",
      },
});

export default BorderPrice;
