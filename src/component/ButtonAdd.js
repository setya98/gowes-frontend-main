import * as React from "react";
import { StyleSheet, View, Text } from "react-native";

const ButtonAdd = () => (
    <View style={styles.btnBorder}>
    <Text
      style={{
        fontWeight: "500",
        justifyContent: "center",
        marginTop: 8,
        marginLeft: 7,
        color: "#fff",
        fontSize: 16,
      }}
    >
      Tambah
    </Text>
    </View>
);

const styles = StyleSheet.create({
    btnBorder: {
        width: "100%",
        height: 35,
        flexDirection: "row",
        borderRadius: 15,
        marginBottom: 10,
        justifyContent: "center",
        backgroundColor: "#000",
      },
});

export default ButtonAdd;
