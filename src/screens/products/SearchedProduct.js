import React from "react";
import { View, StyleSheet, Dimensions, Text, Image } from "react-native";
import { Content } from "native-base";
import { Avatar, Card, List, Divider } from "react-native-paper";

var { width } = Dimensions.get("window");

const SearchedProduct = (props) => {
  const { productsFiltered, userId } = props;

  // console.log("filter length", productsFiltered);

  return (
    <Content style={{ width: width }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((item) => (
          <Card>
            <Divider
              style={{
                marginTop: 5,
                marginBottom: 5,
                marginStart: 15,
                marginEnd: 15,
              }}
            />
            <List.Item
              noBorder
              onPress={() => {
                props.navigation.navigate("Product Detail", {
                  item: item,
                  userId: userId,
                });
              }}
              key={item.id}
              left={() => (
                <Avatar.Image
                  size={55}
                  style={{ marginStart: 5 }}
                  source={{
                    uri: item.images[0].downloadUrl
                      ? item.images[0].downloadUrl
                      : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                  }}
                />
              )}
              title={item.name}
            />
          </Card>
        ))
      ) : (
        <View style={styles.center}>
          <Image
            source={require("../../assets/ilus-empty.webp")}
            style={{
              height: 150,
              width: 250,
              alignSelf: "center",
              marginTop: "15%",
            }}
          />
          <Text
            style={{
              alignSelf: "center",
              fontWeight: "bold",
              fontSize: 17,
              marginTop: 20,
            }}
          >
            Barang Tidak Ditemukan
          </Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchedProduct;
