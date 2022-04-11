import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Button } from "native-base";
import { Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo"
import moment from "moment";
import { CommonActions } from "@react-navigation/native";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { FETCH_USER_QUERY } from "../../../util/graphql";

var { height } = Dimensions.get("window");

const Seller = (props) => {
  const { user } = useContext(AuthContext);
  console.log("user login", user.id);

  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: user.id,
    },
  });
  const { getUser: currentUser } = data ? data : [];

  const [avatar, setAvatar] = useState(
    "https://react.semantic-ui.com/images/avatar/large/molly.png"
  );

  return (
    <>
      {loading || currentUser.seller.username === "" ? (
        <>
          <View style={{ alignItems: "center", marginVertical: 50 }}>
            <Image
              source={require("../../../assets/ilus-open.webp")}
              resizeMode="contain"
              style={{ height: 250, width: 250 }}
            />
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Kamu masih belum punya toko
            </Text>
            <Button
              style={{
                backgroundColor: "#000",
                borderRadius: 20,
                marginTop: 30,
                alignSelf: "center",
                width: 150,
                justifyContent: "center",
              }}
              onPress={() => {
                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: "Edit Seller",
                      },
                    ],
                  })
                );
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 15 }}>
                Buka Toko
              </Text>
            </Button>
          </View>
        </>
      ) : (
        <SafeAreaView style={{ backgroundColor: "#fff" }}>
          <View style={styles.header}>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: "#000",
                alignItems: "center",
                borderRadius: 10,
                justifyContent: "center",
                elevation: 3,
                marginStart: 5,
              }}
            >
              <Icon
                onPress={() => props.navigation.navigate("Buyer")}
                name="chevron-left"
                size={14}
                style={{ alignSelf: "center", marginStart: -2, color: "#fff" }}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 0.3,
                marginEnd: 122,
                marginTop: 5,
              }}
            >
              Toko Saya
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          >
            <View style={styles.ImageContainer}>
              <Image
                source={{ uri: currentUser.seller.avatar }}
                style={{
                  marginStart: 20,
                  width: 55,
                  height: 55,
                  borderRadius: 10,
                  marginTop: -20
                }}
              />
              <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate("Edit Seller")}
              >
                <Text
                  style={{
                    fontSize: 22,
                    color: "#000",
                    fontWeight: "700",
                    marginStart: 20,
                    letterSpacing: 0.6,
                    marginTop: -55
                  }}
                >
                  {currentUser.seller.username}
                </Text>
              </TouchableWithoutFeedback>
            </View>

            <View
              style={{ flexDirection: "row", alignSelf: "flex-start", marginTop: -60, marginStart: 75 }}
            >
              <Icon name="map-marker" color={"#8c8c8c"} size={17} style={{marginStart: 20}} />
                 <Text
                style={{
                  color: "#595959",
                  fontWeight: "bold",
                  marginTop: 2,
                  fontSize: 15,
                  marginStart: 6,
                  alignSelf: "center"
                }}
              >
                {currentUser.address.cityName}
              </Text>
            </View>

              <View style={{flexDirection: "row", justifyContent: "space-between", marginTop: 25}}>
               <View style={{width: 100, height: 60, borderRadius: 10, marginStart: 40}}> 
              <MaterialIcon name="door-open" color={"#000"} size={22} style={{alignSelf: "center", padding: 5}} />
              <Text
                style={{
                  color: "#595959",
                  fontWeight: "bold",
                  marginTop: 2,
                  fontSize: 15,
                  alignSelf: "center"
                }}
              >
                {moment(currentUser.seller.createdAt).format("LL")}
              </Text>
              </View>
              <Divider
                  style={{
                    width: 1,
                    height: 50,
                    backgroundColor: "#c9c7c7",
                    marginStart: 20,
                    marginTop: 5,
                  }}
                />
               <View style={{width: 100, height: 60, borderRadius: 10, marginEnd: 60}}> 
              <Entypo name="info-with-circle" color={"#000"} size={22} style={{alignSelf: "center", padding: 5}} />
              <Text
                style={{
                  color: "#595959",
                  fontWeight: "bold",
                  marginTop: 2,
                  fontSize: 15,
                  alignSelf: "center"
                }}
              >
                {currentUser.seller.description}
              </Text>
              </View>
              </View>
            {/* <View
              style={{ flexDirection: "row", marginStart: 80, marginTop: 10 }}
            >
              <StarIcon name="star" size={20} color={"#F18c06"} />
              <Text
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: 22,
                  marginStart: 5,
                }}
              >
                4.8
              </Text>
              <Text
                style={{
                  color: "#595959",
                  fontWeight: "bold",
                  marginStart: 7,
                  marginTop: 5,
                }}
              >
                Rating
              </Text>
            </View> */}

            <View style={styles.detailContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Order Seller")}
                >
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      borderRadius: 20,
                      marginTop: 30,
                    }}
                  >
                    <Image
                      source={require("../../../assets/bill.png")}
                      resizeMode="contain"
                      style={{
                        width: 16,
                        height: 16,
                        tintColor: "#595959",
                        alignSelf: "center",
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontWeight: "500",
                      marginTop: -26,
                      marginStart: 50,
                      color: "#595959",
                      fontSize: 18,
                    }}
                  >
                    Daftar Penjualan
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ marginTop: -13, color: "#595959", marginStart: 300 }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Add Product")}
                >
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      borderRadius: 20,
                      marginTop: 30,
                    }}
                  >
                  <Icon
                    name="plus"
                    size={16}
                    style={{
                      alignSelf: "center",
                      color: "#595959",
                    }}
                  />
                  </View>
                  <Text
                    style={{
                      fontWeight: "500",
                      marginTop: -27,
                      marginStart: 50,
                      color: "#595959",
                      fontSize: 18,
                    }}
                  >
                    Tambah Produk
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ marginTop: -13, color: "#595959", marginStart: 300 }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Product List")}
                >
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      borderRadius: 20,
                      marginTop: 30,
                    }}
                  >
                  <Image
                    source={require("../../../assets/store.png")}
                    resizeMode="contain"
                    style={{
                      width: 16,
                      height: 16,
                      alignSelf: "center",
                      tintColor: "#595959",
                    }}
                  />
                  </View>
                  <Text
                    style={{
                      fontWeight: "500",
                      marginTop: -27,
                      marginStart: 50,
                      color: "#595959",
                      fontSize: 18,
                    }}
                  >
                    Daftar Produk
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ marginTop: -13, color: "#595959", marginStart: 300 }}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Edit Seller")}
                >
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "#fff",
                      justifyContent: "center",
                      borderRadius: 20,
                      marginTop: 30,
                    }}
                  >
                  <Icon
                    name="address-book"
                    size={14}
                    style={{
                      alignSelf: "center",
                      color: "#595959",
                    }}
                  />
                  </View>
                  <Text
                    style={{
                      fontWeight: "500",
                      marginTop: -27,
                      marginStart: 50,
                      color: "#595959",
                      fontSize: 18,
                    }}
                  >
                    Edit Profil Toko
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ marginTop: -13, color: "#595959", marginStart: 300 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  ImageContainer: {
    backgroundColor: "#fff",
    alignItems: "center",
    flexDirection: "row",
    height: "15%",
    marginTop: -1,
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    elevation: 5,
    marginTop: 25,
    height: height,
    borderRadius: 30,
  },
});

export default Seller;
