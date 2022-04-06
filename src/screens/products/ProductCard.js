import React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import { Text } from "native-base";
import { currencyIdrConverter } from "../../util/extensions";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

var { width } = Dimensions.get("window");

const ProductCard = (props) => {
  const { item } = props;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: item.images[0].downloadUrl }}
      />
      <View style={styles.card}>
        <Text style={styles.title}>
          {item.name.length > 15
            ? item.name.substring(0, 18 - 3) + "..."
            : item.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignSelf: "flex-start",
            marginBottom: 3,
            marginStart: 10,
          }}
        >
          <FontAwesome
            name="map-marker"
            color={"#8c8c8c"}
            size={13}
            style={{ marginTop: 8 }}
          />
          <Text
            style={{
              color: "#8c8c8c",
              top: 6,
              fontWeight: "bold",
              fontSize: 13,
              marginStart: 5,
            }}
          >
            {item.user.address.cityName}
          </Text>
        </View>
        <Text style={styles.price}>
          Rp {currencyIdrConverter(item.price, 0, ".", ",")}
        </Text>
        <View
          style={{
            height: 25,
            width: 25,
            backgroundColor: "#f2f2f2",
            alignItems: "center",
            borderRadius: 7,
            justifyContent: "center",
            marginTop: -25,
            elevation: 2,
            alignSelf: "flex-end",
            marginEnd: 10
          }}
        >
          <FontAwesome
            onPress={() => navigation.goBack()}
            name="chevron-right"
            size={11}
            style={{ alignSelf: "center" }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    borderRadius: 20,
    marginLeft: 12,
    marginTop: 5,
    marginRight: 12,
    marginBottom: 10,
    elevation: 2,
    alignItems: "center",
    backgroundColor: "#f2f2f2",
  },
  image: {
    width: "90%",
    height: "50%",
    borderRadius: 10,
    backgroundColor: "transparent",
    position: "absolute",
    top: 20,
    resizeMode: "cover",
  },
  card: {
    height: width / 2 - 20 - 65,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 170,
    marginBottom: 5,
    borderRadius: 15,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
    textAlign: "left",
    alignSelf: "flex-start",
    marginTop: 10,
    marginStart: 10,
  },
  price: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginStart: 10,
    marginTop: 15,
  },
});

export default ProductCard;
