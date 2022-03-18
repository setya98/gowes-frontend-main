import React from "react";
import { Text, Dimensions, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { Container } from "native-base";

import { connect } from "react-redux";
import { setOrderIdsWillBePaid } from "../../../Redux/actions/orderAction";

var { height, width } = Dimensions.get("window");

const MidtransPayment = (props) => {
  console.log(props.route.params, "im here");

  const redirectToHomeScreen = () => {
    props.navigation.navigate("Product Container");
  }

  return (
    <Container style={styles.container}>
      <Text>Payment Succesful!</Text>
      <Button mode="contained" onPress={redirectToHomeScreen}>
        Back to homescreen
      </Button>
    </Container>
  );
}

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