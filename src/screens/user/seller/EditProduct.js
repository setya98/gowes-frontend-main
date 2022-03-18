import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Picker,
  KeyboardAvoidingView
} from "react-native";
import { useTheme } from "react-native-paper";
import { Text } from "native-base";
import { uploadMultipleImage } from "../../../../Redux/actions/imagePickerAction";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";
import Toast from "react-native-toast-message";
import PropTypes from "prop-types";
import BottomSheet from "reanimated-bottom-sheet";

import { useMutation } from "@apollo/client";
import { connect } from "react-redux";
import { storage } from "../../../firebase";
import { useForm } from "../../../util/hooks";
import { AuthContext } from "../../../context/auth";
import {
  UPDATE_ITEM_MUTATION,
  DELETE_ITEM_MUTATION,
  FETCH_ITEM_SELLER_QUERY,
} from "../../../util/graphql";

var { height, width } = Dimensions.get("window");

const EditProduct = (props) => {
  const itemId = props.route.params.item.id;
  const product = props.route.params.product;
  const { colors } = useTheme();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [isSaved, setSave] = useState(false);
  const [image, setImage] = useState([]);

  console.log("category", typeof(product.getItem.category))
  console.log("foto", props.photos);

  const deleteAlert = () =>
  Alert.alert("Hapus Produk", "Kamu yakin ingin hapus produk?", [
    {
      text: "Batal",
      onPress: () => null,
    },
    {
      text: "Hapus",
      onPress: () => itemDelete()
    },
  ]);

  let itemObj;

  if (product) {
    itemObj = {
      name: product.getItem.name,
      price: product.getItem.price.toString(),
      stock: product.getItem.stock.toString(),
      category: product.getItem.category,
      condition: product.getItem.condition,
      weight: product.getItem.weight.toString(),
      description: product.getItem.description,
      length: product.getItem.dimension.length.toString(),
      width: product.getItem.dimension.width.toString(),
      height: product.getItem.dimension.height.toString(),
      itemId: itemId,
    };
  } else {
    itemObj = {
      name: "",
      price: 0,
      stock: 0,
      category: "",
      condition: "",
      weight: 0,
      description: "",
      length: 0,
      width: 0,
      height: 0,
      itemId: itemId
    };
  }

  const { onChange, onSubmit, values } = useForm(editItem, itemObj)

  // const [values, setValues] = useState({
  //   name: product.getItem.name,
  //   price: product.getItem.price.toString(),
  //   stock: product.getItem.stock.toString(),
  //   category: product.getItem.category,
  //   condition: product.getItem.condition,
  //   weight: product.getItem.weight.toString(),
  //   description: product.getItem.description,
  //   length: product.getItem.dimension.length.toString(),
  //   width: product.getItem.dimension.width.toString(),
  //   height: product.getItem.dimension.height.toString(),
  //   itemId: itemId,
  //   images: [
  //     {
  //       downloadUrl:
  //         "https://react.semantic-ui.com/images/avatar/large/molly.png",
  //     },
  //     {
  //       downloadUrl:
  //         "https://react.semantic-ui.com/images/avatar/large/molly.png",
  //     },
  //   ],
  // });

  // const onChange = (key, val) => {
  //   setValues({ ...values, [key]: val });
  // };

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   editItem();
  // };

  const uploadImage = async (uri, imageName) => {
    if (uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = storage.ref(`images/itemImg/${imageName}`).put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images/itemImg")
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              // setImages(url);
              setImage((img) => [...img, url]);
              console.log("img url", url);
            });
        }
      );
    }
  };

  useEffect(() => {
    console.log(image.length, "here");
    if (props.photos && image.length == props.photos.length) {
      let downloadUrlImages = [];
      image.forEach((img) => {
        downloadUrlImages.push({
          downloadUrl: img,
        });
      });
      values.images = downloadUrlImages;
      updateItem();
    }
  }, [image]);

  const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, {
    update(_, { data: { updateItem: updatedItem } }) {
      setErrors({});
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Produk Berhasil Tersimpan",
      });
      props.navigation.navigate("Seller");
    },
    onError(err) {
      console.log("error");
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0]);
    },
    variables: values,
  });

  function editItem() {
    props.photos.forEach((pic) => {
      uploadImage(pic.uri, `item-${new Date().toISOString()}`)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    });
    (values.price = parseInt(values.price)),
      (values.stock = parseInt(values.stock)),
      (values.weight = parseInt(values.weight)),
      (values.length = parseInt(values.length)),
      (values.width = parseInt(values.width)),
      (values.height = parseInt(values.height));
  }

  function itemDelete(){
    deleteItem()
  }

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    update(proxy) {
      const data = proxy.readQuery({
        query: FETCH_ITEM_SELLER_QUERY,
        variables: { userId: context.user.id },
      });

      proxy.writeQuery({
        query: FETCH_ITEM_SELLER_QUERY,
        data: {
          getSellerItems: data.getSellerItems.filter((p) => p.id !== itemId),
        },
      });

      console.log("product deleted")
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Produk Berhasil Dihapus",
      });
      props.navigation.navigate("Seller");
    },
    variables: { itemId: itemId },
  });

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Unggah Foto</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => props.navigation.navigate("Image Picker")}
      >
        <Text style={styles.panelButtonTitle}>Pilih Dari Galeri</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bottomSheet.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headerRender}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bottomSheet = React.createRef();
  const fall = new Animated.Value(1);

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
      <KeyboardAvoidingView
        enabled={true}
        contentContainerStyle={styles.container}
      >
        <BottomSheet
          ref={bottomSheet}
          snapPoints={[330, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
          enabledContentTapInteraction={false}
        />
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: height }}
          style={{
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          {props.photos ? (
            <View
              style={{
                alignItems: "center",
                marginBottom: 10,
                marginTop: 15,
              }}
            >
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
              <TouchableOpacity onPress={() => bottomSheet.current.snapTo(0)} style={{flexDirection: "row", marginStart: 25, marginEnd: 25}}>
                {props.photos.map((pic) => (
                  <View
                    style={{
                      height: 100,
                      width: 100,
                      borderRadius: 15,
                      justifyContent: "center",
                      alignItems: "center",
                      marginHorizontal: 5
                    }}
                  >
                    <ImageBackground
                      source={{
                        uri: pic.uri,
                      }}
                      style={{ height: 100, width: 100 }}
                      imageStyle={{ borderRadius: 20 }}
                    ></ImageBackground>
                  </View>
                ))}
              </TouchableOpacity>
              </ScrollView>
            </View>
          ) : (
            <View
              style={{
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <TouchableOpacity onPress={() => bottomSheet.current.snapTo(0)}>
                <View style={{ flexDirection: "row" }}>
                  <View
                    style={{
                      height: 100,
                      marginTop: 15,
                      width: "90%",
                      marginStart: 15,
                      borderRadius: 20,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#f2f2f2",
                      borderWidth: 1,
                      borderColor: "#000",
                      borderTopColor: "#000",
                      borderStyle: "dashed",
                    }}
                  >
                    <Image
                      source={require("../../../assets/plus.png")}
                      style={{
                        opacity: 0.8,
                        alignItems: "center",
                        justifyContent: "center",
                        tintColor: "#000",
                        width: 25,
                        height: 25,
                      }}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          )}
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
                selectedValue={values.category}
                value={values.category}
                onValueChange={(val) => onChange("category", val)}
              >
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
                selectedValue={values.condition}
                value={values.condition}
                onValueChange={(val) => onChange("condition", val)}
              >
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
            <TouchableOpacity style={styles.commandButton} onPress={deleteAlert}>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000" }}>
                Hapus
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.commandButtonSave}
              onPress={onSubmit}
            >
              <Text style={styles.panelButtonTitle}>Simpan</Text>
            </TouchableOpacity>
          </View>
          </Animated.ScrollView>
      </KeyboardAvoidingView>
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
    marginStart: "50%",
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
    width: "40%",
    alignSelf: "flex-end",
    marginTop: 30,
    marginEnd: 15,
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
    backgroundColor: "#cfcfcf",
    paddingTop: 20,
  },
  headerRender: {
    backgroundColor: "#cfcfcf",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    paddingTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 50,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#000",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    marginTop: -5,
    fontWeight: "bold",
    marginBottom: 20,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 20,
    width: "70%",
    backgroundColor: "#000",
    alignItems: "center",
    marginVertical: 7,
    alignSelf: "center",
  },
  panelButtonTitle: {
    fontSize: 16,
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

EditProduct.propTypes = {
  uploadMultipleImage: PropTypes.func.isRequired,
  photos: PropTypes.array,
};
const mapStateToProps = (state) => ({
  photos: state.imagePicker.photos,
});

export default connect(mapStateToProps, { uploadMultipleImage })(
  EditProduct
);
