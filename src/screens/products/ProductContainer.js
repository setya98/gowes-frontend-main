import React, { useState, useEffect, useContext } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity, StatusBar } from "react-native";
import {
  Container,
  ListItem,
  Header,
  Item,
  Icon,
  Input,
  Text
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ProductList from "./ProductList";
import SearchedProduct from "./SearchedProduct";
import Banner from "../../component/Banner";
import TitleHeader from "../../component/TitleHeader";
import { Chip } from "react-native-paper";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ITEMS_QUERY } from "../../util/graphql";
import { AuthContext } from "../../context/auth"

var { height } = Dimensions.get("window")

const ProductContainer = (props) => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState();
  const [active, setActive] = useState();
  const [activeChip, setActiveChip] = useState();
  const context = useContext(AuthContext)
  const { loading, data, refetch } = useQuery(FETCH_ITEMS_QUERY);
  const { getItems: items } = data ? data : [];

  // console.log("cari", productsFiltered)
  
  useEffect(() => {
    setProducts(items);
    setProductsFiltered(items);
    setFocus(false);
    setActive(-1);
    setActiveChip("All");
    refetchProduct()

    return () => {
      setProducts([]);
      setProductsFiltered([]);
      setFocus();
      setActive();
      setActiveChip();
      refetchProduct()
    };
  }, []);

  // Product Methods
  const searchProduct = (text) => {
    setProductsFiltered(
      products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const openList = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const handleChip = (name) => {
    setActiveChip(name);
  };

  const refetchProduct = () => {
    refetch();
  };

  var productsCategory = [];

  // Categories
  if (items && activeChip === "All") {
    productsCategory.push(items);
  } else if (
    items &&
    activeChip === "Sparepart" &&
    items.find((item) => item.category === "sparepart")
  ) {
    productsCategory.push(
      items.filter((item) => item.category === "sparepart")
    );
  } else if (
    items &&
    activeChip === "Accessories" &&
    items.find((item) => item.category === "accessories")
  ) {
    productsCategory.push(
      items.filter((item) => item.category === "accessories")
    );
  } else if (
    items &&
    activeChip === "Apparel" &&
    items.find((item) => item.category === "apparel")
  ) {
    productsCategory.push(
      items.filter((item) => item.category === "apparel")
    );
  }
 
  return (
    <>
    <StatusBar
      barStyle="dark-content"
      backgroundColor='white'
    />
    <Container>
      <TitleHeader title="Cari yang terbaik untuk sepedamu" />
      <Header style={styles.header} searchBar rounded>
        <Item style={styles.item}>
          <Icon
            name="ios-search"
            style={{ color: "#595959", paddingLeft: 15, marginStart: 0 }}
           
          />
          <Input
            placeholder="Search"
            placeholderTextColor="#595959"
            onFocus={openList}
            onChangeText={(text) => searchProduct(text)}
            style={{ color: "#595959", height: 25 }}
          />
          {focus == true ? (
            <Icon
              onPress={onBlur}
              name="ios-close"
              style={{ color: "#8c8c8c" }}
            />
          ) : null}
        </Item>
        <TouchableOpacity  onPress={() => props.navigation.navigate("Chat")}>
        <View
          style={{
            height: 43,
            width: 43,
            backgroundColor: "#000",
            borderRadius: 12,
            marginTop: 6,
            marginStart: 8,
          }}
        >
          <FontAwesome
            name="envelope"
            style={{
              color: "#fff",
              marginTop: 12,
              marginStart: 13,
              marginEnd: 7,
            }}
            size={17}
          />
        </View>
        </TouchableOpacity>
      </Header>
      {focus == true ? (
        <SearchedProduct
          navigation={props.navigation}
          productsFiltered={productsFiltered}
          userId={context.user.id}
        />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          contentContainerStyle={{ paddingBottom: 190 }}
        >
          <View>
            <Banner />
          </View>
            <View>
              <ListItem
                noBorder
                style={{
                  marginTop: -5,
                  flexDirection: "row",
                }}
              >
                <Chip
                  textStyle={[
                    styles.text,
                    active == -1 ? styles.textActive : styles.textInactive,
                  ]}
                  style={[ styles.center,
                    active == -1 ? styles.active : styles.inactive]}
                  onPress={() => {
                    handleChip("All"), refetchProduct();
                  }}
                >
                  All
                </Chip>
                <Chip
                  textStyle={[
                    styles.text,
                    active == -1 ? styles.textActive : styles.textInactive,
                  ]}
                  style={[ styles.center,
                    active == -1 ? styles.active : styles.inactive]}
                  onPress={() => {
                    handleChip("Sparepart"), refetchProduct();
                  }}
                >
                  Sparepart
                </Chip>
                <Chip
                  textStyle={[
                    styles.text,
                    active == -1 ? styles.textActive : styles.textInactive,
                  ]}
                  style={[ styles.center,
                    active == -1 ? styles.active : styles.inactive]}
                  onPress={() => {
                    handleChip("Accessories"), refetchProduct();
                  }}
                >
                  Accessories
                </Chip>
                <Chip
                  textStyle={[
                    styles.text,
                    active == -1 ? styles.textActive : styles.textInactive,
                  ]}
                  style={[ styles.center,
                    active == -1 ? styles.active : styles.inactive]}
                  onPress={() => {
                    handleChip("Apparel"), refetchProduct();
                  }}
                >
                  Apparel
                </Chip>
              </ListItem>
            </View>
          {!loading ? (
            productsCategory.length > 0 ? (
              <View style={styles.listContainer}>
                {productsCategory[0] &&
                  productsCategory[0].map((item, index) => (
                    <ProductList
                      navigation={props.navigation}
                      key={index}
                      item={item}
                      userId={context.user.id}
                    />
                  ))}
              </View>
            ) : (
              <Text>No Products found</Text>
            )
          ) : (
            <ActivityIndicator style={{justifyContent: "center", marginTop: 30}} size="large" color="#000" />
          )}
        </ScrollView>
      )}
    </Container>
    </>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    marginTop: 10,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    width: "90%",
    marginStart: 17,
    borderRadius: 20,
    marginBottom: 20,
  },
  item: {
    height: 55,
    borderRadius: 20,
    marginStart: -15,
    backgroundColor: "#f2f2f2",
  },
  text: {
    justifyContent: "center",
    alignItems: "center",
  },
  textActive: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8c8c8c",
  },
  textInactive: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000"
  },
  active: {
    backgroundColor: "#fff",
  },
  inactive: {
    backgroundColor: "#fff",
  },
  center: {
    justifyContent: "center",
    alignSelf: "center",
    marginEnd: 5
  },
});

export default ProductContainer;
