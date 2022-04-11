import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { Text } from "native-base";
import { Avatar, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import TitleHeader from "../../component/TitleHeader";
import BorderPrice from "../../component/BorderPrice";
import ImageSlide from "../../component/ImageSlide";

import { useQuery } from "@apollo/client";
import { AuthContext } from "../../context/auth";
import { FETCH_ITEM_QUERY } from "../../util/graphql";

import ButtonWishlist from "../../component/ButtonWishlist";
import ItemButtonOrder from "../../component/ItemButtonOrder";
import EditButtonItem from "../../component/EditButtonItem";

const ProductDetail = (props) => {
  const itemUserId = props.route.params.userId;
  const item = props.route.params.item;
  const context = useContext(AuthContext);
  const user = useContext(AuthContext);
  const {
    loading: loadingItem,
    data: itemData,
    data: itemReview,
    data: chatData,
  } = useQuery(FETCH_ITEM_QUERY, {
    variables: {
      itemId: item.id,
      itemUserId: itemUserId,
      currentUserId: context.user
        ? context.user.id
        : "000000000000000000000000",
    },
  });
  const { getItem: itemDetail } = itemData ? itemData : [];
  const { getItemReviews: items } = itemReview ? itemReview : [];
  const { isChatExists } = chatData ? chatData : [];

  if (!loadingItem) {
    console.log("item", item.id);
    console.log("itemUser", itemUserId);
    console.log("context", context.user.id);
    // console.log("review", items);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {loadingItem ? (
        <></>
      ) : (
        <>
          <View style={styles.header}>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: "#000",
                alignItems: "center",
                borderRadius: 10,
                justifyContent: "center",
                marginTop: 5,
                elevation: 3,
              }}
            >
              <FontAwesome
                onPress={() => props.navigation.goBack()}
                name="chevron-left"
                size={14}
                style={{ alignSelf: "center", marginStart: -2, color: "#fff"}}
              />
            </View>
            <View style={{marginTop: 5, marginBottom: 5}}>
            <TouchableWithoutFeedback>
              <ButtonWishlist user={user} item={itemDetail} />
            </TouchableWithoutFeedback>
            </View>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 190 }}
          >
            <View style={{ height: "100%", flexGrow: 1 }}>
              <View style={styles.ImageContainer}>
                <ImageSlide images={itemDetail.images} />
              </View>
              <View style={styles.detailContainer}>
                <View style={{marginTop: 15}}>
                <TitleHeader style={styles.text} title={itemDetail.name} />
                </View>
                <View style={{flexDirection: "row", marginStart: 20}}>
                <Text
                    style={{
                      fontWeight: "300",
                      color: "#000",
                    }}
                  >
                    Tersisa
                  </Text>
                  <Text
                    style={{
                      fontWeight: "300",
                      color: "#000",
                      marginStart: 5
                    }}
                  >
                    {itemDetail.stock}
                  </Text>
                  </View>
                <View style={styles.review}>
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("Product Review", {
                        item: itemDetail,
                      })
                    }
                  >
                    <Icon name="star" size={20} color={"#F18c06"} />
                    <Text style={styles.textRating}>{items.score}</Text>
                    <Text
                      style={{
                        marginTop: -37,
                        marginStart: 25,
                        fontWeight: "600",
                        color: "#595959",
                        fontSize: 14,
                      }}
                    >
                      Lihat Review
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableWithoutFeedback
                  onPress={() =>
                    props.navigation.navigate("Store Seller", {
                      storeId: itemDetail.user.id,
                      userId: context.user.id,
                    })
                  }
                >
                  <View
                    style={{
                      width: "90%",
                      height: 75,
                      backgroundColor: "#fff",
                      marginStart: 15,
                      marginTop: 35,
                      borderRadius: 15,
                      elevation: 0.2,
                    }}
                  >
                    <Image
                      source={{ uri: itemDetail.user.seller.avatar }}
                      style={{
                        marginStart: 15,
                        marginTop: 15,
                        marginEnd: 10,
                        borderRadius: 10,
                        width: 45,
                        height: 45,
                      }}
                    />
                    <View style={{ flexDirection: "column", height: 40 }}>
                      <Text
                        style={{
                          marginStart: 75,
                          marginTop: -47,
                          fontWeight: "bold",
                          color: "#000",
                          fontSize: 18,
                        }}
                      >
                        {itemDetail.user.seller.username}
                      </Text>
                      <View style={{ flexDirection: "row" }}>
                        <FontAwesome
                          name="map-marker"
                          size={14}
                          color={"#595959"}
                          style={{ marginStart: 75, marginTop: 10 }}
                        />
                        <Text
                          style={{
                            marginStart: 8,
                            fontSize: 15,
                            fontWeight: "bold",
                            color: "#595959",
                            marginTop: 8,
                          }}
                        >
                          {itemDetail.user.address.cityName}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        height: 35,
                        width: 35,
                        backgroundColor: "#000",
                        marginTop: -80,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignSelf: "flex-end",
                        marginEnd: 15,
                      }}
                    >
                      <FontAwesome
                        name="chevron-right"
                        style={{ alignSelf: "center", color: "#fff" }}
                      />
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <Text
                  style={{
                    marginTop: 30,
                    marginLeft: 15,
                    fontWeight: "bold",
                    fontSize: 22,
                    letterSpacing: 0.3,
                  }}
                >
                  Informasi Produk
                </Text>
                <View style={{ flexDirection: "row" }}>
                  <View style={{ flexDirection: "column" }}>
                    <View style={{ flexDirection: "row" }}>
                    <View
                        style={{
                          height: 35,
                          width: 35,
                          backgroundColor: "#fff",
                          justifyContent: "center",
                          borderRadius: 10,
                          elevation: 1,
                          marginStart: 20,
                          marginTop: 20
                        }}
                      >
                      <Image
                        source={require("../../assets/box.png")}
                        resizeMode="contain"
                        style={{
                          width: 16,
                          height: 16,
                          tintColor: "#595959",
                          alignSelf: "center"
                        }}
                      />
                      </View>
                      <Text
                        style={{
                          marginTop: 27,
                          marginStart: 10,
                          fontWeight: "bold",
                          color: "#595959",
                        }}
                      >
                        {itemDetail.condition}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginStart: 20,
                        marginTop: 20,
                      }}
                    >
                      <View
                        style={{
                          height: 35,
                          width: 35,
                          backgroundColor: "#fff",
                          justifyContent: "center",
                          borderRadius: 10,
                          elevation: 1,
                        }}
                      >
                      <Image
                        source={require("../../assets/settings.png")}
                        resizeMode="contain"
                        style={{
                          width: 18,
                          height: 18,
                          tintColor: "#595959",
                          alignSelf: "center"
                        }}
                      />
                      </View>
                      <Text
                        style={{
                          marginStart: 10,
                          fontWeight: "bold",
                          color: "#595959",
                          marginTop: 7
                        }}
                      >
                        {itemDetail.category}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      marginTop: 30,
                      marginStart: 30,
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          height: 35,
                          width: 35,
                          backgroundColor: "#fff",
                          justifyContent: "center",
                          borderRadius: 10,
                          elevation: 1,
                          marginTop: -10
                        }}
                      >
                        <Image
                          source={require("../../assets/weight.png")}
                          resizeMode="contain"
                          style={{
                            width: 17,
                            height: 17,
                            tintColor: "#595959",
                            alignSelf: "center",
                          }}
                        />
                      </View>
                      <Text
                        style={{
                          marginTop: -1,
                          marginStart: 10,
                          fontWeight: "bold",
                          color: "#595959",
                        }}
                      >
                        {itemDetail.weight} gr
                      </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 25 }}>
                    <View
                        style={{
                          height: 35,
                          width: 35,
                          backgroundColor: "#fff",
                          justifyContent: "center",
                          borderRadius: 10,
                          elevation: 1,
                          marginTop: -5,
                        }}
                      >
                      <Image
                        source={require("../../assets/cube.png")}
                        resizeMode="contain"
                        style={{
                          width: 18,
                          height: 18,
                          tintColor: "#595959",
                          alignSelf: "center"
                        }}
                      />
                      </View>
                      <Text
                        style={{
                          marginStart: 10,
                          fontWeight: "bold",
                          color: "#595959",
                          marginTop: 3
                        }}
                      >
                        {itemDetail.dimension.length} x{" "}
                        {itemDetail.dimension.width} x{" "}
                        {itemDetail.dimension.height} cm
                      </Text>
                    </View>
                  </View>
                </View>
                 <Text
                  style={{
                    marginTop: 30,
                    marginLeft: 15,
                    fontWeight: "bold",
                    fontSize: 22,
                    letterSpacing: 0.3,
                  }}
                >
                  Deskripsi
                </Text>
                <Text
                  style={{
                    marginLeft: 15,
                    marginTop: 25,
                    fontWeight: "700",
                    color: "#595959",
                  }}
                >
                  {itemDetail.description}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.bottomHeader}>
            {context.user ? (
              context.user.id !== item.user.id ? (
                <ItemButtonOrder
                  item={itemDetail}
                  isChatExists={isChatExists}
                  onChatVisible={props.onChatVisible}
                  navigation={props.navigation}
                />
              ) : (
                <EditButtonItem
                  item={itemDetail}
                  itemEdit={item}
                  navigation={props.navigation}
                />
              )
            ) : (
              <></>
            )}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomHeader: {
    height: 65,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    marginTop: 15,
    elevation: 1,
  },
  review: {
    marginTop: -22,
    marginEnd: 30,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  ImageContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 25,
    marginBottom: 20,
  },
  image: {
    width: 500,
    height: 250,
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    elevation: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000",
    shadowOpacity: 0.5,
    height: "100%",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    top: -85,
  },
  text: {
    marginLeft: 20,
    marginTop: 15,
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 0.5,
  },
  textRating: {
    marginLeft: 7,
    fontSize: 22,
    marginTop: -2,
    color: "#000",
    fontWeight: "bold",
  },
  line: {
    width: 60,
    height: 5,
    borderRadius: 15,
    marginTop: 15,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignSelf: "center",
  },
  btnCart: {
    width: 220,
    backgroundColor: "#000",
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginEnd: 15,
  },
});

export default ProductDetail;
