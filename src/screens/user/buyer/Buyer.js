import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableRipple,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import StarIcon from "react-native-vector-icons/AntDesign";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Card, Avatar, Divider } from "react-native-paper";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import {
  FETCH_USER_QUERY,
  FETCH_SINGLE_ITEM_QUERY,
} from "../../../util/graphql";

const Buyer = (props) => {
  const { user, logout } = useContext(AuthContext);

  const { loading, data: data } = useQuery(FETCH_USER_QUERY, {
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
      {loading ? (
        <ActivityIndicator
          style={{
            justifyContent: "center",
            alignSelf: "center",
            marginTop: "50%",
          }}
          size="large"
          color="#000"
        />
      ) : (
        <SafeAreaView style={{ backgroundColor: "#fff" }}>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 0.3,
                marginTop: 5,
              }}
            >
              Akun
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 190, backgroundColor: "#f2f2f2" }}
          >
            <View style={styles.ImageContainer}>
              <Avatar.Image
                source={{ uri: currentUser.buyer.avatar }}
                size={55}
                style={{
                  marginStart: 15,
                  marginTop: 5,
                  backgroundColor: "#8c8c8c",
                }}
              />
              <TouchableWithoutFeedback
                onPress={() => props.navigation.navigate("Edit Buyer")}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                    marginStart: 20,
                    letterSpacing: 0.6,
                    marginTop: 5
                  }}
                >
                  {currentUser.buyer.name}
                </Text>
              </TouchableWithoutFeedback>
            </View>
            <Card
              onPress={() => props.navigation.navigate("Seller")}
              style={{
                width: 130,
                height: 30,
                borderRadius: 10,
                alignSelf: "center",
                marginTop: -28,
                marginStart: -60,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    marginStart: 10,
                    marginTop: 7,
                    color: "#595959",
                    fontWeight: "700",
                  }}
                >
                  Toko Saya
                </Text>
                <Icon
                  name="chevron-right"
                  style={{ top: 9, end: 10, color: "#595959" }}
                />
              </View>
            </Card>

            <View style={styles.detailContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Order")}
                >
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "#f2f2f2",
                      marginTop: 30,
                      justifyContent: "center",
                      borderRadius: 20,
                    }}
                  >
                    <Image
                      source={require("../../../assets/shopbag.png")}
                      resizeMode="contain"
                      style={{
                        width: 17,
                        height: 16,
                        tintColor: "#595959",
                        alignSelf: "center",
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
                    Daftar Pesanan
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{
                      marginTop: -13,
                      color: "#595959",
                      marginStart: 298,
                    }}
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
                  onPress={() => props.navigation.navigate("Wishlist")}
                >
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "#f2f2f2",
                      marginTop: 30,
                      justifyContent: "center",
                      borderRadius: 20,
                    }}
                  >
                  <Icon
                    name="heart"
                    size={15}
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
                      marginStart: 52,
                      color: "#595959",
                      fontSize: 18,
                    }}
                  >
                    Wishlist
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ marginTop: -14, color: "#595959", marginStart: 298 }}
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
                  onPress={() => props.navigation.navigate("Edit Buyer")}
                >
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "#f2f2f2",
                      marginTop: 30,
                      justifyContent: "center",
                      borderRadius: 20,
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
                    Edit Profil
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ marginTop: -13, color: "#595959", marginStart: 297 }}
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
                  onPress={() => props.navigation.navigate("Add Review")}
                >
                  <View
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "#f2f2f2",
                      marginTop: 30,
                      justifyContent: "center",
                      borderRadius: 20,
                    }}
                  >
                  <StarIcon
                    name="star"
                    size={15}
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
                    Ulasan
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ marginTop: -13, color: "#595959", marginStart: 297 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                logout;
                props.navigation.navigate("Authentication", {
                  screen: "Login",
                });
              }}
              style={{
                backgroundColor: "#000",
                borderRadius: 20,
                width: "75%",
                height: 45,
                alignSelf: "center",
                marginTop: 25,
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <StarIcon
                  name="logout"
                  style={{ color: "#fff", marginEnd: 10 }}
                  size={18}
                />
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    fontWeight: "bold",
                    alignSelf: "center",
                    marginTop: -2,
                  }}
                >
                  Logout
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 3,
    marginBottom: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignSelf: "center"
  },
  ImageContainer: {
    backgroundColor: "#f2f2f2",
    alignItems: "flex-start",
    flexDirection: "row",
    height: "15%",
    marginTop: 15
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    elevation: 3,
    marginTop: 25,
    height: 270,
    borderRadius: 20,
  },
});

export default Buyer;
