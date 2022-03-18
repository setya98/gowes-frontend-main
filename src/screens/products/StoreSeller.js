import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { Text } from "native-base";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import moment from "moment";
import ProductList from "./ProductList";
import { Avatar, Divider } from "react-native-paper";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import {
  FETCH_USER_QUERY,
  FETCH_CHATS_QUERY,
  FETCH_ITEM_SELLER_QUERY,
} from "../../util/graphql";


const StoreSeller = (props) => {
  const context = useContext(AuthContext);
  const sellerId = props.route.params.storeId;
  const userId = props.route.params.userId;

  const { chatData } = useQuery(FETCH_CHATS_QUERY);
  const { getChats: chats } = chatData ? chatData : [];

  const receiver = (users) => {
    let userReceiver;
    if (users[0].id !== context.id) {
      userReceiver = users[0];
    } else {
      userReceiver = users[1];
    }
    return userReceiver;
  };
  console.log("chats", chats);


  const { loading, data: userData } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: sellerId,
    },
  });
  const { getUser: currentUser } = userData ? userData : [];

  const { data } = useQuery(FETCH_ITEM_SELLER_QUERY, {
    variables: {
      userId: sellerId,
    },
  });
  const { getSellerItems: itemSeller } = data ? data : [];

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
            <FontAwesome
              onPress={() => props.navigation.navigate("Buyer")}
              name="chevron-left"
              size={18}
              style={{ top: 4 }}
            />
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                letterSpacing: 0.3,
                marginEnd: 130,
              }}
            >
              Profil Toko
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 190,
              backgroundColor: "#f2f2f22",
            }}
          >
            <View style={{ flexDirection: "row", marginTop: 15 }}>
              <View style={styles.ImageContainer}>
                <Avatar.Image
                  source={{ uri: currentUser.seller.avatar }}
                  size={50}
                  style={{ marginStart: 15, marginTop: 5 }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginStart: 25,
                  marginTop: 20,
                }}
              >
                <View style={{ flexDirection: "column" }}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: "#000",
                      fontWeight: "700",
                      letterSpacing: 0.6,
                    }}
                  >
                    {currentUser.seller.username}
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <FontAwesome
                      name="map-marker"
                      color={"#8c8c8c"}
                      size={14}
                    />
                    <Text
                      style={{
                        color: "#595959",
                        fontWeight: "bold",
                        marginStart: 7,
                        marginTop: -2,
                      }}
                    >
                      {currentUser.address.cityName}
                    </Text>
                  </View>
                </View>

                <View style={{ marginStart: 30, marginTop: 5 }}>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      props.navigation.navigate("Message Screen", {
                        username: receiver(chats.users).seller.username,
                        chatId: chats.id,
                      })
                    }
                  >
                    <View
                      style={{
                        height: 40,
                        width: 40,
                        backgroundColor: "#595959",
                        borderRadius: 12,
                        justifyContent: "center",
                      }}
                    >
                      <FontAwesome
                        name="envelope"
                        style={{
                          color: "#fff",
                          alignSelf: "center",
                        }}
                        size={17}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View
                style={{
                  flexDirection: "column",
                  marginStart: 50,
                  marginTop: 30,
                }}
              >
                <View style={{ flexDirection: "row", marginStart: -20 }}>
                  <Icon name="door-open" size={16} color={"#595959"} />
                  <Text
                    style={{
                      color: "#595959",
                      fontWeight: "bold",
                      marginStart: 10,
                    }}
                  >
                    Buka sejak
                  </Text>
                </View>
                <Text
                  style={{
                    color: "#8c8c8c",
                    fontWeight: "bold",
                    marginStart: -20,
                    marginTop: 10,
                  }}
                >
                  {moment(currentUser.seller.createdAt).format("LL")}
                </Text>
              </View>
              <Divider
                style={{
                  width: 1,
                  height: 45,
                  backgroundColor: "#c9c7c7",
                  marginStart: 45,
                  marginTop: 32,
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  marginStart: 55,
                  marginTop: 30,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginStart: -20,
                    marginTop: 3,
                  }}
                >
                  <Entypo name="info-with-circle" size={15} color={"#595959"} />
                  <Text
                    style={{
                      color: "#595959",
                      fontWeight: "bold",
                      marginStart: 10,
                      marginTop: -2,
                    }}
                  >
                    Info
                  </Text>
                  <Text
                    style={{
                      color: "#8c8c8c",
                      fontWeight: "bold",
                      marginStart: -47,
                      marginTop: 22,
                    }}
                  >
                    {currentUser.seller.description}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.detailContainer}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  color: "#595959",
                  marginStart: 20,
                  marginTop: 25,
                }}
              >
                Daftar Produk
              </Text>
              <View style={styles.listContainer}>
                {itemSeller &&
                  itemSeller.map((item, index) => (
                    <TouchableWithoutFeedback>
                      <ProductList
                        key={index}
                        item={item}
                        navigation={props.navigation}
                        userId={userId}
                      />
                    </TouchableWithoutFeedback>
                  ))}
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
    height: "10%",
    marginTop: 15,
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    elevation: 25,
    marginTop: 25,
    height: "100%",
    borderRadius: 30,
  },
  listContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 25,
    backgroundColor: "#fff",
  },
});

export default StoreSeller;
