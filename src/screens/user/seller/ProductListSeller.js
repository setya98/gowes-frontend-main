import React from "react";
import { View, Dimensions, TouchableWithoutFeedback } from "react-native";

import ProductCardSeller from "./ProductCardSeller";

var { width, height } = Dimensions.get("window");

const ProductListSeller = (props) => {
  const { item, refetchCatalog, userId } = props;

  return (
    <TouchableWithoutFeedback
      onPress={() =>
        props.navigation.navigate("Product Detail", { item: item, userId: userId })
      }
    >
    <View style={{ flexDirection: "column", width: width / 2, backgroundColor: "white", height: height }}>
        <ProductCardSeller 
          item={item}
          navigation={props.navigation}
          refetchCatalog={refetchCatalog}
        />
    </View>
    </TouchableWithoutFeedback>
  );
};

export default ProductListSeller;
