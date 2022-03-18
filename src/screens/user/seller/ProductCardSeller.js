import React from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Text } from "native-base";
import { currencyIdrConverter } from "../../../util/extensions";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@apollo/client";
import { FETCH_SINGLE_ITEM_QUERY } from "../../../util/graphql";

var { width } = Dimensions.get("window");

const ProductCardSeller = (props) => {
  const navigation = useNavigation();
  const { item} = props;

  const { loading, data: data } = useQuery(FETCH_SINGLE_ITEM_QUERY, {
    variables: {
      itemId: item.id,
    },
  });

  return (
    <>
      {!loading ? (
        <View style={styles.container}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={{ uri: item.images[0].downloadUrl }}
          />
          <View style={styles.card} />
          <Text style={styles.title}>
            {item.name.length > 15
              ? item.name.substring(0, 18 - 3) + "..."
              : item.name}
          </Text>
          <Text style={styles.price}>
            Rp {currencyIdrConverter(item.price, 0, ".", ",")}
          </Text>
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate("Edit Product", {
                item: props.item,
                product: data,
              })
            }
          >
            <View
              style={{
                height: 35,
                flexDirection: "row",
                borderRadius: 15,
                marginBottom: 10,
                justifyContent: "center",
                backgroundColor: "#000",
                width: "100%",
              }}
            >
              <Text
                style={{
                  fontWeight: "500",
                  justifyContent: "center",
                  marginTop: 8,
                  marginLeft: 7,
                  color: "#fff",
                  fontSize: 16,
                }}
              >
                Edit Produk
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderRadius: 20,
    marginLeft: 15,
    marginTop: 5,
    marginRight: 15,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  image: {
    flex: 1,
    width: width / 2 - 20 - 25,
    height: width / 2 - 10,
    backgroundColor: "transparent",
    position: "absolute",
    top: 10,
    borderRadius: 15
  },
  card: {
    marginBottom: 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    width: width / 2 - 20 - 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#595959",
    top: 75,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  price: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
    marginTop: 80,
    marginBottom: 15,
    alignSelf: "flex-start",
  },
});

export default ProductCardSeller;
