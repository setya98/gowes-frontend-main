import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  View,
} from "react-native";
import { Card, Divider, useTheme, Button } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import { currencyIdrConverter } from "../../util/extensions";
import moment from "moment";

import { useMutation } from "@apollo/react-hooks";
import { UPDATE_ORDER, ADD_AWB_NUMBER } from "../../util/graphql";

import OrderCardDetail from "../../component/OrderCardDetail";

var { height } = Dimensions.get("window")

const OrderDetailSeller = (props) => {
  const { colors } = useTheme();
  const [errors, setErrors] = useState({});
  const [stateType, setStateType] = useState("");
  const [editState, setEditState] = useState(false);
  const [modalVisible, setModalVisible] = useState("");

  const order = props.route.params.order;
  const orderId = order.id;

  let itemPrice;
  let amountItem;

  {
    !loading ? (
      order.items.map((item) => {
        itemPrice = item.price;
        amountItem = item.amountItem;
      })
    ) : (
      <></>
    );
  }
  const shippingCost = order.shipping.shippingCost

  const grossAmount = itemPrice * amountItem
  const totalPrice = itemPrice * amountItem + shippingCost

  const [values, setValues] = useState({ awbNumber: "" })

  const onChange = (key, val) => {
    setValues({ ...values, [key]: val });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addResiCallback();
    // console.log(addAwbNumber())
  };

  const [addResi] = useMutation(ADD_AWB_NUMBER, {
    update(_, { data: { addResi: data } }) {
      console.log("updated");
      values.awbNumber = ""
      shipOrder()
      setModalVisible(!modalVisible)
      props.navigation.navigate("Order Seller");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setSave(true);
    },
    variables: { 
      orderId: orderId,
      awbNumber: values.awbNumber,
      courierName: order.shipping.courierName,
      buyerAddress: order.shipping.buyerAddress,
      shippingCost: order.shipping.shippingCost 
    },
  });

  function addResiCallback() {
    addResi();
  }

  const [changeState, {loading}] = useMutation(UPDATE_ORDER, {
    update(_, { data: { updateOrder: orderData } }) {
      setEditState(false)
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { orderId: orderId, state: stateType }
  })

  function confirmOrder() {
    setStateType("PROCESSED");
    props.navigation.navigate("Order Seller");
    Toast.show({
      topOffset: 30,
      type: "success",
      text1: "Pesanan telah diproses",
    });
    setEditState(true);
  }
  function rejectOrder() {
    setStateType("FAILED");
    props.navigation.navigate("Order Seller");
    Toast.show({
      topOffset: 30,
      type: "success",
      text1: "Pesanan telah dibatalkan",
    });
    setEditState(true);
  }
  function shipOrder() {
    setStateType("DELIVERY");
    props.navigation.navigate("Order Seller");
    Toast.show({
      topOffset: 30,
      type: "success",
      text1: "Pesanan telah dikirim",
    });
    setEditState(true);
  }
  if (editState) {
    changeState();
  }

  var orderButton;

  const confirmAlert = () =>
    Alert.alert("Proses Pesanan ?", "Apa kamu sudah yakin untuk memproses pesanan?", [
      {
        text: "Batal",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Konfirmasi",
        onPress: () => confirmOrder(),
      },
    ]);

  const rejectAlert = () =>
    Alert.alert("Tolak Pesanan ?", "Apa kamu sudah yakin untuk menolak pesanan?", [
      {
        text: "Batal",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Konfirmasi",
        onPress: () => rejectOrder(),
      },
    ]);

  const shipAlert = () =>
    Alert.alert("Kirim Pesanan ?", "Apa kamu sudah yakin untuk mengirim pesanan?", [
      {
        text: "Batal",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Konfirmasi",
        onPress: () => {
          setModalVisible(true);
        },
      },
    ]);

    if (order.state.stateType === "CONFIRMATION") {
      orderButton = (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 30,
          }}
        >
          <TouchableOpacity
            style={{
              borderRadius: 15,
              backgroundColor: "red",
              alignItems: "center",
              width: "40%",
              justifyContent: "center",
              marginStart: 20
            }}
            mode="contained"
            onPress={rejectAlert}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Tolak Pesanan</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={{
              padding: 15,
              borderRadius: 15,
              backgroundColor: "#000",
              justifyContent: "center",
              width: "40%",
              alignItems: "center",
              marginEnd: 20
            }}
            mode="contained"
            onPress={confirmAlert}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Proses Pesanan</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (order.state.stateType === "PROCESSED") {
      orderButton = (
        <View
          style={{
            paddingBottom: 30,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              padding: 15,
              borderRadius: 15,
              backgroundColor: "#000",
              alignItems: "center",
              marginTop: 30,
              width: "90%",
              justifyContent: "center"
            }}
            mode="contained"
            onPress={shipAlert}
          >
            <Text style={{ color: "white", fontWeight: "bold", fontSize: 18 }}>Kirim Pesanan</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
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
          Detail Pesanan
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: height,
          backgroundColor: "#f2f2f2",
        }}
      >
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 25,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Detail Pesanan
          </Text>
          <Divider
            style={{
              height: 1,
              marginTop: 10,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 10,
            }}
          />
          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              No. Pesanan:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#595959",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              INV/<Text style={{ color: "#595959" }}>{order.id}</Text>
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>Status:</Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#F18c06",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              {order.state.stateType}
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              Nama Toko:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#595959",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              {order.seller.username}
            </Text>
          </View>
          <View
            style={{ flexDirection: "column", marginTop: 10, marginBottom: 15 }}
          >
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              Waktu Transaksi:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#595959",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              {moment(order.state.createdAt).format('lll')}
            </Text>
          </View>
        </Card.Content>
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 15,
            backgroundColor: "#fff",
            paddingBottom: 15,
          }}
        >
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Detail Produk
          </Text>
          <Divider
            style={{
              height: 1,
              marginTop: 10,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 5,
            }}
          />
          {order.items &&
            order.items.map((item) => <OrderCardDetail item={item} />)}
        </Card.Content>
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 25,
            backgroundColor: "#fff",
            paddingBottom: 15,
          }}
        >
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Detail Pengiriman
          </Text>
          <Divider
            style={{
              height: 1,
              marginTop: 10,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 10,
            }}
          />
          <View style={{ flexDirection: "column", marginTop: 5 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              Alamat Pengiriman:
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginTop: 5 }}>
              {order.user.buyer.name}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#595959",
                fontSize: 15,
                marginTop: 5,
              }}
            >
              {order.shipping.buyerAddress}
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              Metode Pengiriman:
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#595959",
                fontSize: 16,
                marginTop: 5,
              }}
            >
              {order.shipping.courierName}
            </Text>
          </View>
          <View style={{ flexDirection: "column", marginTop: 10 }}>
            <Text style={{ fontWeight: "700", color: "#8c8c8c" }}>
              No. Resi:
            </Text>
            {order.state.stateType === "DELIVERY" || "ARRIVED" ? (
              <Text
                style={{
                  fontWeight: "bold",
                  color: "#595959",
                  fontSize: 16,
                  marginTop: 5,
                }}
              >
               {order.shipping.awbNumber}
              </Text>
            ) : (
              <></>
            )}
          </View>
        </Card.Content>
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 25,
            backgroundColor: "#fff",
            paddingBottom: 15,
          }}
        >
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Rincian Pembayaran
          </Text>
          <Divider
            style={{
              height: 1,
              marginTop: 10,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#595959" }}
            >
              Item ({amountItem} produk)
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
              Rp {currencyIdrConverter(grossAmount, 0, ".", ",")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#595959" }}
            >
              Shipping Cost
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
              Rp {currencyIdrConverter(shippingCost, 0, ".", ",")}
            </Text>
          </View>
          <Divider style={{ height: 1, marginTop: 10 }} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
              Total Pembayaran
            </Text>
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#000" }}>
              Rp {currencyIdrConverter(totalPrice, 0, ".", ",")}
            </Text>
          </View>
        </Card.Content>
        {orderButton}
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <KeyboardAvoidingView>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <View style={{ position: "absolute", right: 15, top: 15 }}>
                  <Material
                    name="close"
                    onPress={() => setModalVisible(false)}
                    size={18}
                  />
                </View>
                <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 15}}>Input Nomer Resi</Text>
                <View style={{backgroundColor: "#f2f2f2", height: 50, marginTop: 20, width: 250, marginBottom: 20, borderRadius: 15}}>
                <TextInput 
                  name="awbNumber"
                  placeholder="Nomer Resi"
                  placeholderTextColor="#666"
                  value={values.awbNumber}
                  onChangeText={(val) => onChange("awbNumber", val)}
                  autoCorrect={false}
                  style={[styles.textInput,{ color: colors.text, }]}
                />
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={onSubmit}
                >
                  <Text style={styles.textStyle}>Simpan Nomer Resi</Text>
                </Pressable>
              </View>
            </View>
            </KeyboardAvoidingView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
     );
    };

    const styles = StyleSheet.create({
      header: {
        margin: 15,
        flexDirection: "row",
        backgroundColor: "#fff",
      },
      centeredView: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      modalView: {
        margin: 20,
        height: "50%",
        width: "80%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 15,
        padding: 10,
        elevation: 2,
        marginBottom: -20
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#000",
        width: 150,
        height: 40
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center",
      },
      textInput: {
        flex: 1,
        paddingLeft: 15,
        color: "#000",
        fontWeight: "500",
        fontSize: 16,
      },
    });

  export default OrderDetailSeller