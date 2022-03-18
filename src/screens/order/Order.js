import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { Card, Chip } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ListItem, Badge } from "native-base";

import { useQuery } from "@apollo/client";
import { FETCH_USER_ORDER_QUERY } from "../../util/graphql";
import { objectSize } from "../../util/extensions";

import OrderCardComponent from "../../component/OrderCardComponent";

var { height } = Dimensions.get("window");

const Order = (props) => {
  const { loading, data, error } = useQuery(FETCH_USER_ORDER_QUERY);
  const { getUserOrders: orders } = data ? data : [];
  console.log(error);

  const [activeChip, setActiveChip] = useState("-1");
  const [active, setActive] = useState("Confirmation");
  const [status, setStatus] = useState("Ongoing");

  const handleChip = (name) => {
    setActiveChip(name);
    console.log(name);
  };

  const handleStatus = (name) => {
    setStatus(name);
    console.log(name);
  };

  var orderList = [];

  if (
    orders &&
    status === "Ongoing" &&
    activeChip === "Confirmation" &&
    orders.find((order) => order.state.stateType === "CONFIRMATION")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "CONFIRMATION")
    );
  } else if (
    orders &&
    status === "Ongoing" &&
    activeChip === "Processed" &&
    orders.find((order) => order.state.stateType === "PROCESSED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "PROCESSED")
    );
  } else if (
    orders &&
    status === "Ongoing" &&
    activeChip === "Delivery" &&
    orders.find((order) => order.state.stateType === "DELIVERY")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "DELIVERY")
    );
  } else if (
    orders &&
    status === "Ongoing" &&
    activeChip === "Arrived" &&
    orders.find((order) => order.state.stateType === "ARRIVED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "ARRIVED")
    );
  } else if (
    orders &&
    status === "Completed" &&
    orders.find((order) => order.state.stateType === "COMPLETED")
  ) {
    orderList.push(
      orders.filter((orders) => orders.state.stateType === "COMPLETED")
    );
  } else if (
    orders &&
    status === "Failed" &&
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
  var sizeOngoing = 0;

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
    sizeOngoing = sizeConfirmation + sizeProcessed + sizeDelivery + sizeArrived;
  }

  return (
    <>
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
              marginStart: 100,
            }}
          >
            Daftar Pesanan
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
                  justifyContent: "space-evenly",
                  flexDirection: "row",
                  borderBottomColor: "transparent",
                }}
              >
                <Chip
                  icon="clock"
                  textStyle={styles.text}
                  style={[
                    styles.center,
                    { margin: 5 },
                    active == -1 ? styles.active : styles.inactive,
                  ]}
                  onPress={() => handleStatus("Ongoing")}
                >
                  Menunggu
                  {sizeOngoing > 0 && status !== "Ongoing" ? (
                    <Badge
                      style={{
                        left: 315,
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
                        {sizeOngoing}
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
                  onPress={() => handleStatus("Completed")}
                >
                  Selesai
                  {sizeCompleted > 0 && status !== "Completed" ? (
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
                  onPress={() => handleStatus("Failed")}
                >
                  Dibatalkan
                  {sizeFailed > 0 && status !== "Failed" ? (
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
          <Text style={{fontSize: 18, fontWeight: "bold", marginStart: 20, marginBottom: 15}}>
            Status Pesanan
          </Text>
          {status === "Ongoing" ? (
            <Card.Content style={{ marginTop: -10, marginStart: -20 }}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <ListItem
                  style={{
                    padding: 0,
                    borderRadius: 3,
                    marginTop: -10,
                    height: 75,
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    borderBottomColor: "transparent",
                  }}
                >
                  <Chip
                    icon="check-circle"
                    textStyle={styles.text}
                    style={[
                      styles.center,
                      { margin: 5 },
                      active == -1 ? styles.active : styles.inactive,
                    ]}
                    onPress={() => handleChip("Confirmation")}
                  >
                    Konfirmasi
                    {sizeConfirmation > 0 && status !== "Confirmation" ? (
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
                    icon="package-up"
                    textStyle={styles.text}
                    style={[
                      styles.center,
                      { margin: 5 },
                      active == -1 ? styles.active : styles.inactive,
                    ]}
                    onPress={() => handleChip("Processed")}
                  >
                    Diproses
                    {sizeProcessed > 0 && status !== "Processed" ? (
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
                    onPress={() => handleChip("Delivery")}
                  >
                    Dikirim
                    {sizeDelivery > 0 && status !== "Delivery" ? (
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
                    name="arrived"
                    textStyle={styles.text}
                    style={[
                      styles.center,
                      { margin: 5 },
                      active == -1 ? styles.active : styles.inactive,
                    ]}
                    onPress={() => handleChip("Arrived")}
                  >
                    Diterima
                    {sizeArrived > 0 && status !== "Arrived" ? (
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
                </ListItem>
              </ScrollView>
            </Card.Content>
          ) : (
            <></>
          )}
          {!loading ? (
            orderList.length > 0 ? (
              <Card.Content>
                {orderList[0] &&
                  orderList[0].map((orderItem) => (
                    <OrderCardComponent
                      order={orderItem}
                      navigation={props.navig1ation}
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
                  Kamu belum punya transaksi
                </Text>
              </Card.Content>
            )
          ) : (
            <Card.Content
              style={{ backgroundColor: "#f2f2f2", height: "100%" }}
            >
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
    </>
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
    fontSize: 15,
    fontWeight: "bold",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#f2f2f2",
  },
  inactive: {
    backgroundColor: "#fff",
    borderColor: "#8c8c8c",
  },
});

export default Order;
