import React, { useState, useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Image,
} from "react-native";
import { Card, Chip } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ListItem, Badge } from "native-base";

import { useQuery } from "@apollo/client";
import { FETCH_USER_QUERY, FETCH_SELLER_ORDER_QUERY } from "../../util/graphql";
import { objectSize } from "../../util/extensions";
import { AuthContext } from "../../context/auth";

import OrderCardSellerComponent from "../../component/OrderCardSellerComponent";

const OrderSeller = (props) => {
  const context = useContext(AuthContext);
  const [activeChip, setActiveChip] = useState("Pesanan Masuk");
  const [active, setActive] = useState(-1);

  const handleChip = (name) => {
    setActiveChip(name);
    console.log(name);
  };

  const { loading: loadingUser, data: userData } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: context.user.id,
    },
  });

  // console.log(context.user.id)

  const { getUser: currentUser } = userData ? userData : [];

  let username = "";

  if (!loadingUser) {
    username = currentUser.seller.username;
    console.log(username, "hehe");
  }

  const { loading, data } = useQuery(FETCH_SELLER_ORDER_QUERY, {
    variables: {
      username: username,
    },
  });

  const { getSellerOrders: orders } = data ? data : [];

  var orderList = [];

  if (
    !loading &&
    orders &&
    activeChip === "Pesanan Masuk" &&
    orders.find((order) => order.state.stateType === "CONFIRMATION")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "CONFIRMATION")
    );
  } else if (
    !loading &&
    orders &&
    activeChip === "Siap Dikirim" &&
    orders.find((order) => order.state.stateType === "PROCESSED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "PROCESSED")
    );
  } else if (
    !loading &&
    orders &&
    activeChip === "Pengiriman Diproses" &&
    orders.find((order) => order.state.stateType === "DELIVERY")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "DELIVERY")
    );
  } else if (
    !loading &&
    orders &&
    activeChip === "Dikirim" &&
    orders.find((order) => order.state.stateType === "ARRIVED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "ARRIVED")
    );
  } else if (
    !loading &&
    orders &&
    activeChip === "Pesanan Selesai" &&
    orders.find((order) => order.state.stateType === "COMPLETED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "COMPLETED")
    );
  } else if (
    !loading &&
    orders &&
    activeChip === "Pesanan Dibatalkan" &&
    orders.find((order) => order.state.stateType === "FAILED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "FAILED")
    );
  }

  var sizeConfirmation = 0;
  var sizeProcessed = 0;
  var sizeDelivery = 0;
  var sizeArrived = 0;
  var sizeCompleted = 0;
  var sizeFailed = 0;

  if (orders) {
    sizeConfirmation = objectSize(
      orders.filter((order) => order.state.stateType === "CONFIRMATION")
    );
    sizeProcessed = objectSize(
      orders.filter((order) => order.state.stateType === "PROCESSED")
    );
    sizeDelivery = objectSize(
      orders.filter((order) => order.state.stateType === "DELIVERY")
    );
    sizeArrived = objectSize(
      orders.filter((order) => order.state.stateType === "ARRIVED")
    );
    sizeCompleted = objectSize(
      orders.filter((order) => order.state.stateType === "COMPLETED")
    );
    sizeFailed = objectSize(
      orders.filter((order) => order.state.stateType === "FAILED")
    );
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#f2f2f2" }}>
      <View style={styles.header}>
        <FontAwesome
          onPress={() => props.navigation.goBack()}
          name="chevron-left"
          size={18}
          style={{ top: 4 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.3,
            marginStart: 90,
          }}
        >
          Daftar Penjualan
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 190,
          backgroundColor: "#f2f2f2",
        }}
      >
        <Card.Content style={{ marginStart: -20 }}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              backgroundColor: "#f2f2f2",
            }}
          >
            <ListItem
              style={{
                padding: 0,
                borderRadius: 3,
                marginTop: -10,
                height: 75,
                justifyContent: "space-between",
                flexDirection: "row",
                borderBottomColor: "transparent",
              }}
            >
              <Chip
                icon="note-plus"
                textStyle={styles.text}
                style={[
                  styles.center,
                  { margin: 5 },
                  active == -1 ? styles.active : styles.inactive,
                ]}
                onPress={() => handleChip("Pesanan Masuk")}
              >
                Pesanan Masuk
                {sizeConfirmation > 0 ? (
                  <Badge
                    style={{
                      left: 295,
                      top: 0,
                      bottom: 50,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {sizeConfirmation}
                    </Text>
                  </Badge>
                ) : (
                  <></>
                )}
              </Chip>
              <Chip
                icon="truck-check"
                textStyle={styles.text}
                style={[
                  styles.center,
                  { margin: 5 },
                  active == -1 ? styles.active : styles.inactive,
                ]}
                onPress={() => handleChip("Siap Dikirim")}
              >
                Siap Dikirm
                {sizeProcessed > 0 ? (
                  <Badge
                    style={{
                      left: 295,
                      top: 0,
                      bottom: 50,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {sizeProcessed}
                    </Text>
                  </Badge>
                ) : (
                  <></>
                )}
              </Chip>
              <Chip
                icon="truck-fast"
                textStyle={styles.text}
                style={[
                  styles.center,
                  { margin: 5 },
                  active == -1 ? styles.active : styles.inactive,
                ]}
                onPress={() => handleChip("Pengiriman Diproses")}
              >
                Sedang Dikirm
                {sizeDelivery > 0 ? (
                  <Badge
                    style={{
                      left: 295,
                      top: 0,
                      bottom: 50,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {sizeDelivery}
                    </Text>
                  </Badge>
                ) : (
                  <></>
                )}
              </Chip>
              <Chip
                icon="package-down"
                textStyle={styles.text}
                style={[
                  styles.center,
                  { margin: 5 },
                  active == -1 ? styles.active : styles.inactive,
                ]}
                onPress={() => handleChip("Dikirim")}
              >
                Telah Diterima
                {sizeArrived > 0 ? (
                  <Badge
                    style={{
                      left: 295,
                      top: 0,
                      bottom: 50,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {sizeArrived}
                    </Text>
                  </Badge>
                ) : (
                  <></>
                )}
              </Chip>
              <Chip
                icon="check"
                textStyle={styles.text}
                style={[
                  styles.center,
                  { margin: 5 },
                  active == -1 ? styles.active : styles.inactive,
                ]}
                onPress={() => handleChip("Pesanan Selesai")}
              >
                Selesai
                {sizeCompleted > 0 ? (
                  <Badge
                    style={{
                      left: 295,
                      top: 0,
                      bottom: 50,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {sizeCompleted}
                    </Text>
                  </Badge>
                ) : (
                  <></>
                )}
              </Chip>
              <Chip
                icon="close"
                textStyle={styles.text}
                style={[
                  styles.center,
                  { margin: 5 },
                  active == -1 ? styles.active : styles.inactive,
                ]}
                onPress={() => handleChip("Pesanan Dibatalkan")}
              >
                Dibatalkan
                {sizeFailed > 0 ? (
                  <Badge
                    style={{
                      left: 295,
                      top: 0,
                      bottom: 50,
                    }}
                  >
                    <Text
                      style={{
                        color: "#fff",
                        fontSize: 12,
                        fontWeight: "bold",
                      }}
                    >
                      {sizeFailed}
                    </Text>
                  </Badge>
                ) : (
                  <></>
                )}
              </Chip>
            </ListItem>
          </ScrollView>
        </Card.Content>
        {!loading ? (
          orderList.length > 0 ? (
            <Card.Content>
              {orderList[0] &&
                orderList[0].map((orders) => (
                  <OrderCardSellerComponent
                    order={orders}
                    navigation={props.navigation}
                  />
                ))}
            </Card.Content>
          ) : (
            <Card.Content>
              <Image
                source={require("../../assets/ilus-empty.webp")}
                resizeMode="contain"
                style={{
                  width: 250,
                  height: 250,
                  alignSelf: "center",
                  marginTop: -15,
                }}
              />
              <Text
                style={{
                  alignSelf: "center",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                Kamu belum punya pesanan
              </Text>
            </Card.Content>
          )
        ) : (
          <Card.Content style={{ backgroundColor: "#f2f2f2", height: "100%" }}>
            <ActivityIndicator
              style={{
                justifyContent: "center",
                alignSelf: "center",
                marginTop: "50%",
              }}
              size="large"
              color="#000"
            />
          </Card.Content>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
  },
  text: {
    color: "#595959",
    fontSize: 16,
    fontWeight: "bold",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#8c8c8c"
  },
  active: {
    backgroundColor: "#fff",
  },
  inactive: {
    backgroundColor: "#fff",
    borderColor: "#000",
  },
});

export default OrderSeller;
