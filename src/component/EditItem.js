import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Picker,
} from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";

import { useMutation, useQuery } from "@apollo/client";
import {
  UPDATE_ITEM_MUTATION,
  FETCH_SINGLE_ITEM_QUERY
} from "../util/graphql";

var { height, width } = Dimensions.get("window");

const EditItem = (props) => {
  const itemData = props.route.params.itemData
  console.log("form", itemData)
  const { colors } = useTheme();
  const [errors, setErrors] = useState({});
  const [isSaved, setSave] = useState(false);
  const [image, setImage] = useState(null);
  
  const [values, setValues] = useState({
    name: itemData.name,
    price: itemData.price,
    stock: itemData.stock,
    category: itemData.category,
    condition: itemData.condition,
    weight: itemData.weight,
    description: itemData.description,
    length: itemData.dimension.length,
    width: itemData.dimension.width,
    height: itemData.dimension.height,
    itemId: itemData.id,
    images: [
      {
        downloadUrl:
          "https://react.semantic-ui.com/images/avatar/large/molly.png",
      },
      {
        downloadUrl:
          "https://react.semantic-ui.com/images/avatar/large/molly.png",
      },
    ],
  });

  const onChange = (key, val) => {
    setValues({ ...values, [key]: val });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    editItem();
  };

  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, {
    update(_, { data: { updateItem: updatedItem } }) {
      setErrors({});
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Produk Berhasil Tersimpan",
      });
      props.navigation.navigate("Product Container");
    },
    onError(err) {
      console.log("error");
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0]);
    },
    variables: values,
  });

  function editItem() {
    values.price = parseInt(values.price);
    values.stock = parseInt(values.stock);
    values.weight = parseInt(values.weight);
    values.length = parseInt(values.length);
    values.width = parseInt(values.width);
    values.height = parseInt(values.height);
    updateItem();
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#f2f2f2" }}>
      <View style={styles.header}>
        <FontAwesome
          onPress={() => props.navigation.goBack()}
          name="chevron-left"
          size={18}
          style={{ top: 4 }}
        />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.3,
            marginStart: 105,
          }}
        >
          Edit Produk
        </Text>
      </View>
       <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 190,
          backgroundColor: "#f2f2f2",
        }}
      >
        <Animated.View>
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <TouchableOpacity onPress={pickImage}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ImageBackground
                  source={require("../assets/store.png")}
                  style={{ height: 100, width: 100, borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../assets/plus.png")}
                      style={{
                        opacity: 0.8,
                        alignItems: "center",
                        justifyContent: "center",
                        tintColor: "#fff",
                        width: 25,
                        height: 25,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.detailContainer}>
            <View style={{ paddingVertical: 20, marginStart: 15 }}>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                Detail Produk
              </Text>
            </View>
            <View style={styles.action}>
              <TextInput
                name="name"
                placeholder="Nama"
                placeholderTextColor="#666666"
                value={values.name}
                onChangeText={(val) => onChange("name", val)}
                autoCorrect={false}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
            <View style={styles.action}>
              <Text
                style={{
                  marginStart: 15,
                  marginTop: 14,
                  marginEnd: -10,
                  color: "#000",
                  fontWeight: "700",
                }}
              >
                Rp{" "}
              </Text>
              <TextInput
                name="price"
                placeholder="Harga"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                autoCorrect={false}
                value={values.price}
                onChangeText={(val) => onChange("price", val)}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
            <View style={styles.action}>
              <TextInput
                name="stock"
                placeholder="Stok"
                placeholderTextColor="#666666"
                keyboardType="number-pad"
                autoCorrect={false}
                value={values.stock}
                onChangeText={(val) => onChange("stock", val)}
                style={[
                  styles.textInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
            <View
              style={{
                backgroundColor: "#f2f2f2",
                marginStart: 15,
                marginEnd: 15,
                marginBottom: 10,
                borderRadius: 15,
                paddingStart: 7,
              }}
            >
              <Picker
                name="category"
                value={values.category}
                onValueChange={(val) => onChange("category", val)}
              >
                <Picker.Item label="-" value="-" />
                <Picker.Item label="sparepart" value="sparepart" />
                <Picker.Item label="accessories" value="accessories" />
                <Picker.Item label="apparel" value="apparel" />
              </Picker>
            </View>
            <View
              style={{
                backgroundColor: "#f2f2f2",
                marginStart: 15,
                marginEnd: 15,
                marginBottom: 10,
                borderRadius: 15,
                paddingStart: 7,
              }}
            >
              <Picker
                name="condition"
                value={values.condition}
                onValueChange={(val) => onChange("condition", val)}
              >
                <Picker.Item label="-" value="-" />
                <Picker.Item label="New" value="New" />
                <Picker.Item label="Used" value="Used" />
              </Picker>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.actionDimension}>
                <TextInput
                  name="weight"
                  placeholder="Berat"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  value={values.weight}
                  onChangeText={(val) => onChange("weight", val)}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                />
              </View>
              <View style={styles.actionDimension}>
                <TextInput
                  name="length"
                  placeholder="Panjang"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  value={values.length}
                  onChangeText={(val) => onChange("length", val)}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.actionDimension}>
                <TextInput
                  name="height"
                  placeholder="Tinggi"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  value={values.height}
                  onChangeText={(val) => onChange("height", val)}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                />
              </View>
              <View style={styles.actionDimension}>
                <TextInput
                  name="width"
                  placeholder="Lebar"
                  placeholderTextColor="#666666"
                  keyboardType="number-pad"
                  autoCorrect={false}
                  value={values.width}
                  onChangeText={(val) => onChange("width", val)}
                  style={[
                    styles.textInput,
                    {
                      color: colors.text,
                    },
                  ]}
                />
              </View>
            </View>
            <View style={styles.actionDescription}>
              <TextInput
                name="description"
                placeholder="Deskripsi Barang"
                multiline={true}
                numberOfLines={5}
                placeholderTextColor="#666666"
                keyboardType="email-address"
                autoCorrect={false}
                value={values.description}
                onChangeText={(val) => onChange("description", val)}
                style={[
                  styles.textInputDescription,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={styles.commandButtonSave}
              onPress={onSubmit}
            >
              <Text style={styles.panelButtonTitle}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView> 
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#f2f2f2",
  },
  ImageContainer: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    flexDirection: "row",
    height: "8%",
    marginTop: 10,
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  commandButton: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    width: "40%",
    marginTop: 30,
    marginStart: 15,
  },
  commandButtonSave: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#000",
    alignItems: "center",
    width: "90%",
    alignSelf: "flex-end",
    marginTop: 30,
    marginEnd: 15,
    marginStart: 15
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    marginTop: 25,
    height: height,
    borderRadius: 30,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
  },
  headerRender: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "green",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    height: 45,
    marginStart: 15,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    marginEnd: 15,
    paddingBottom: 5,
  },
  actionDimension: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    height: 45,
    marginStart: 15,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    marginEnd: 15,
    paddingBottom: 5,
    width: "40%",
  },
  actionDescription: {
    flexDirection: "row",
    marginTop: 5,
    marginBottom: 10,
    height: 135,
    marginStart: 15,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    marginEnd: 15,
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 7,
    paddingLeft: 15,
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  textInputDescription: {
    flex: 1,
    marginTop: -80,
    paddingLeft: 15,
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default EditItem;
