import React from "react";
import { View, Dimensions, TouchableWithoutFeedback } from "react-native";

import ProductCard from "./ProductCard";

var { width } = Dimensions.get("window");

const ProductList = (props) => {
  const { item, userId } = props;
  
  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate("Product Detail", { item: item, userId: userId  })
      }
    >
      <View style={{ width: width / 2, backgroundColor: "white" }}>
        <ProductCard item={item} userId={userId} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductList;
