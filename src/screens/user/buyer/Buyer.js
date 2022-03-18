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
  Text
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import StarIcon from "react-native-vector-icons/AntDesign";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Card, Avatar } from "react-native-paper";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { FETCH_USER_QUERY, FETCH_SINGLE_ITEM_QUERY } from "../../../util/graphql";

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
        <SafeAreaView style={{ backgroundColor: "#f2f2f2" }}>
          <View style={styles.header}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 0.3,
              }}
            >
              Akun
            </Text>
            <Icon onPress={() => props.navigation.navigate("Chat")} name="envelope" size={20} />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 190 }}
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
                    marginStart: 15,
                    letterSpacing: 0.6,
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
                marginStart: -65,
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
                    marginTop: 5,
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
                  <Image
                    source={require("../../../assets/shopbag.png")}
                    resizeMode="contain"
                    style={{
                      width: 20,
                      height: 20,
                      top: 30,
                      tintColor: "#595959",
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: "500",
                      top: 10,
                      marginStart: 30,
                      color: "#595959",
                      fontSize: 18,
                    }}
                  >
                    Daftar Pesanan
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ top: -5, color: "#595959", marginStart: 300 }}
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
                  <Icon
                    name="heart"
                    size={17}
                    style={{
                      alignSelf: "flex-start",
                      top: 30,
                      marginStart: 3,
                      color: "#595959",
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: "500",
                      top: 10,
                      marginStart: 32,
                      color: "#595959",
                      fontSize: 18,
                    }}
                  >
                    Wishlist
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ top: -5, color: "#595959", marginStart: 300 }}
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
                  <Icon
                    name="address-book"
                    size={17}
                    style={{
                      alignSelf: "flex-start",
                      top: 30,
                      marginStart: 4,
                      color: "#595959",
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: "500",
                      top: 10,
                      marginStart: 33,
                      color: "#595959",
                      fontSize: 18,
                    }}
                  >
                    Edit Profil
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ top: -5, color: "#595959", marginStart: 300 }}
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
                  onPress={() => props.navigation.navigate("Add Review" )
                }
                >
                  <StarIcon
                    name="star"
                    size={17}
                    style={{
                      alignSelf: "flex-start",
                      top: 30,
                      marginStart: 5,
                      color: "#595959",
                    }}
                  />
                  <Text
                    style={{
                      fontWeight: "500",
                      top: 10,
                      marginStart: 35,
                      color: "#595959",
                      fontSize: 18,
                    }}
                  >
                    Ulasan
                  </Text>
                  <Icon
                    name="chevron-right"
                    style={{ top: -5, color: "#595959", marginStart: 300 }}
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
              style={{backgroundColor: "#000", borderRadius: 20, width: "75%", height: 45, alignSelf: "center", marginTop: 25, justifyContent: "center"}}
            >
              <View style={{flexDirection: "row", justifyContent: "center"}}>
              <StarIcon name="logout" style={{color: "#fff", marginEnd: 10}} size={18}/>
                <Text style={{fontSize: 18, color: "white", fontWeight: "bold", alignSelf: "center", marginTop: -2}}>Logout</Text>
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
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
    justifyContent: "space-between",
  },
  ImageContainer: {
    backgroundColor: "#f2f2f2",
    alignItems: "flex-start",
    flexDirection: "row",
    height: "15%",
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    elevation: 5,
    marginTop: 25,
    height: 250,
    borderRadius: 30,
  },
});

export default Buyer;
