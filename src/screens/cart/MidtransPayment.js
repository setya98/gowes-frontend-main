import React from "react";
import { Text, Dimensions, StyleSheet, Image, Pressable } from "react-native";
import { Button } from "react-native-paper";
import { Container } from "native-base";

import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { setOrderIdsWillBePaid } from "../../../Redux/actions/orderAction";

var { height, width } = Dimensions.get("window");

const MidtransPayment = (props) => {
  console.log(props.route.params, "sampe pembayaran");
  const navigation = useNavigation()

  const redirectToHomeScreen = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Product Container'}]
    })
  };

  return (
    <Container style={styles.container}>
      <Image
        source={require("../../assets/ilus-success.png")}
        resizeMode="contain"
        style={{
          width: 250,
          height: 250,
          alignSelf: "center",
          marginTop: "-35%",
        }}
      />
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        Terimakasih transaksi anda sukses!
      </Text>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "700",
          color: "#8c8c8c",
          marginTop: 15,
        }}
      >
        Yuk pesan barang yang kamu ingin
      </Text>
      <Pressable
        style={{
          borderRadius: 15,
          backgroundColor: "#000",
          marginTop: 25,
          alignSelf: "center",
          width: 155,
          height: 48,
          justifyContent: "center",
        }}
        onPress={redirectToHomeScreen}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: "#fff",
            alignSelf: "center",
          }}
        >
          Belanja Lagi
        </Text>
      </Pressable>
      {/* <Button mode="contained" onPress={redirectToHomeScreen}>
        Back to homescreen
      </Button> */}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    height: height,
    paddingBottom: 10,
  },
});

const mapStateToProps = (state) => ({
  orderIds: state.orders.orderIds,
});

export default connect(mapStateToProps, { setOrderIdsWillBePaid })(
  MidtransPayment
);
