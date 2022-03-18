import React, { useContext, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Image,
  RefreshControl,
  Dimensions
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Card } from "react-native-paper";

import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../context/auth";
import { FETCH_BOOKMARKS_QUERY } from "../../util/graphql";

import ProductList from "../products/ProductList";

var { height } = Dimensions.get("window")

const Wishlist = (props) => {
  const context = useContext(AuthContext);

  const { loading, data, refetch } = useQuery(FETCH_BOOKMARKS_QUERY, {
    variables: {
      userId: context.user.id,
    },
  });

  const { getBookmarks: bookmarks } = data ? data : [];

  return (
    <>
      <SafeAreaView style={{ backgroundColor: "#fff" }}>
        <View style={styles.header}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              letterSpacing: 0.3,
            }}
          >
            Wishlist
          </Text>
        </View>
        <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingBottom: 190}}
        >
          {!loading ? (
            bookmarks.length > 0 ? (
              <View style={styles.listContainer}>
                {bookmarks &&
                  bookmarks.map((item, index) => (
                    <TouchableWithoutFeedback>
                      <ProductList
                        key={index}
                        item={item}
                        userId={context.user.id}
                        navigation={props.navigation}
                        refetch={refetch}
                      />
                    </TouchableWithoutFeedback>
                  ))}
              </View>
            ) : (
              <Card.Content>
                <Image
                  source={require("../../assets/illus-wishlist.webp")}
                  resizeMode="contain"
                  style={{
                    width: 250,
                    height: 250,
                    alignSelf: "center",
                    marginTop: "15%",
                  }}
                />
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 18,
                    fontWeight: "bold",
                    marginBottom: "100%"
                  }}
                >
                  Kamu belum punya wishlist
                </Text>
              </Card.Content>
            )
          ) : (
            <View style={{height: height}}>
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
        </ScrollView>
        </>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    marginTop: 15,
  },
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignSelf: "center"
  },
});
export default Wishlist;
