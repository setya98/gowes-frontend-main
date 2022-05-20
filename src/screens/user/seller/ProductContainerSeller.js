import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Image,
  StatusBar,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { FAB, Card } from "react-native-paper";
import ProductListSeller from "./ProductListSeller";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { FETCH_ITEM_SELLER_QUERY } from "../../../util/graphql";
import { objectSize } from "../../../util/extensions";

var { height } = Dimensions.get("window");

const ProductContainerSeller = (props) => {
  const context = useContext(AuthContext);

  const { loading, data, refetch } = useQuery(FETCH_ITEM_SELLER_QUERY, {
    variables: {
      userId: context.user.id,
    },
  });
  const { getSellerItems: sellerItems } = data ? data : [];

  var size = objectSize(sellerItems);

  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
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
            <FontAwesome
              onPress={() => props.navigation.goBack()}
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
              marginStart: 75,
              marginTop: 5,
            }}
          >
            Daftar Produk
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            height: 90,
            marginTop: 15,
            marginBottom: 15,
            borderRadius: 15,
            backgroundColor: "#f2f2f2",
            borderWidth: 1,
            marginStart: 15,
            borderColor: "#000",
            borderTopColor: "#000",
            borderStyle: "dashed",
            justifyContent: "center",
          }}
        >
          <FAB
            style={styles.fab}
            medium
            icon="plus"
            onPress={() => props.navigation.navigate("Add Product")}
          />
        </View>
        {!loading ? (
          size > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 200 }}
            >
              <View style={styles.listContainer}>
                {sellerItems &&
                  sellerItems.map((item) => (
                    <ProductListSeller
                      navigation={props.navigation}
                      key={item.id}
                      item={item}
                      userId={context.user.id}
                      refetchCatalog={refetch}
                    />
                  ))}
              </View>
            </ScrollView>
          ) : (
            <Card.Content>
              <Image
                source={require("../../../assets/ilus-empty.webp")}
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
                  marginBottom: "100%",
                }}
              >
                Kamu belum punya produk
              </Text>
            </Card.Content>
          )
        ) : (
          <View style={{ backgroundColor: "#fff", height: height }}>
            <ActivityIndicator
              style={{
                justifyContent: "center",
                alignSelf: "center",
                marginTop: "50%",
              }}
              size="large"
              color="#000"
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: height,
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    marginTop: 10,
  },
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  fab: {
    position: "absolute",
    alignSelf: "center",
    backgroundColor: "#000",
  },
});

export default ProductContainerSeller;
