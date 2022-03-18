import React, { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Alert,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  SafeAreaView,
  View,
  ImageBackground,
  Image,
} from "react-native";
import { Card, Divider, useTheme } from "react-native-paper";
import { Rating } from "react-native-ratings";
import { uploadMultipleImage } from "../../../Redux/actions/imagePickerAction";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import PropTypes from "prop-types";

import Toast from "react-native-toast-message";
import Material from "react-native-vector-icons/MaterialCommunityIcons";

import { useMutation } from "@apollo/react-hooks";
import { connect } from "react-redux";
import { storage } from "../../firebase";
import { useForm } from "../../util/hooks";
import { ADD_REVIEW_MUTATION } from "../../util/graphql";

import OrderCardDetail from "../../component/OrderCardDetail";

var { height } = Dimensions.get("window");

const AddProductReview = (props) => {
  const order = props.route.params.order;
  const { colors } = useTheme();
  const [errors, setErrors] = useState({});
  // const [score, setScore] = useState(0);
  const [itemId, setItemId] = useState("");
  // const [body, setBody] = useState("");
  const [image, setImage] = useState([]);

  console.log("foto", props.photos);

  let itemPrice;
  let amountItem;
  let idTemp;

  {
    order.items.map((item) => {
      itemPrice = item.price;
      amountItem = item.amountItem;
      idTemp = item.id;
    });
  }

  // const handleRating = (rating) => {
  //   setScore(rating);
  // };

  // const handleChange = (val) => {
  //   setBody(val);
  // };

  // const reviewHandler = () => {
  //   addReview();
  //   // addReviewProduct()
  // };

  const { onChange, onSubmit, values } = useForm(addReview, {
    body: "",
    score: 0,
    itemId: itemId
  });

  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

  //   if (!result.cancelled) {
  //     uploadImage(result.uri, `avatar-${new Date().toISOString()}`)
  //       .then(() => {
  //         console.log("Success");
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // };

  const uploadImage = async (uri, imageName) => {
    if (uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = storage.ref(`images/itemReview/${imageName}`).put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images/itemReview")
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
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
      addReviewProduct();
    }
  }, [image]);

  const [addReviewProduct] = useMutation(ADD_REVIEW_MUTATION, {
    update(_, { data: { addReview: reviewData } }) {
      console.log("updated");
      props.navigation.navigate("Buyer");
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Review berhasil ditambahkan",
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      body: values.body,
      score: parseInt(values.score)

    }
  });

  function addReview() {
    props.photos.forEach((pic) => {
      uploadImage(pic.uri, `item-${new Date().toISOString()}`)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
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
            marginStart: 110,
          }}
        >
          Nilai Produk
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: height,
          backgroundColor: "#f2f2f2",
        }}
      >
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 25,
            backgroundColor: "#fff",
            paddingBottom: 15,
            paddingTop: 15,
          }}
        >
          {order.items &&
            order.items.map((item) => <OrderCardDetail item={item} />)}
        </Card.Content>
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 25,
            backgroundColor: "#fff",
            paddingBottom: 25,
            paddingTop: 15,
          }}
        >
          <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 15}}>Beri Rating</Text>
          <Divider
            style={{
              height: 1,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 25,
            }}
          />
          <Rating
            type="star"
            ratingTextColor="#000"
            ratingCount={5}
            imageSize={30}
            showRating
            onFinishRating={(rating) => onChange(rating)}
          />
        </Card.Content>
        <Card.Content
          style={{
            marginStart: 15,
            marginEnd: 15,
            borderRadius: 20,
            marginTop: 25,
            backgroundColor: "#fff",
            paddingBottom: 15,
            paddingTop: 15,
          }}
        >
          <Text style={{fontWeight: "bold", fontSize: 18, marginBottom: 15}}>Detail Ulasan</Text>
          <Divider
            style={{
              height: 1,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 25,
            }}
          />
          {/* <View style={{ alignItems: "center", marginBottom: 10 }}>
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
                  // source={{ uri: loading ? avatar : currentUser.buyer.avatar }}
                  style={{
                    height: 100,
                    width: 100,
                    marginTop: 15,
                    backgroundColor: "#8c8c8c",
                    borderRadius: 25,
                  }}
                  imageStyle={{ borderRadius: 25 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FontAwesome
                      name="camera"
                      size={30}
                      color={"#fff"}
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View> */}
          {props.photos ? (
            <View
              style={{
                alignItems: "center",
                marginBottom: 10,
                marginTop: 15,
              }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                <TouchableOpacity
                 onPress={() => props.navigation.navigate("Image Picker")}
                  style={{
                    flexDirection: "row",
                    marginStart: 25,
                    marginEnd: 25,
                  }}
                >
                  {props.photos.map((pic) => (
                    <View
                      style={{
                        height: 100,
                        width: 100,
                        borderRadius: 15,
                        justifyContent: "center",
                        alignItems: "center",
                        marginHorizontal: 5,
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
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Image Picker")}
              >
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
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#000",
                      borderTopColor: "#000",
                      borderStyle: "dashed",
                    }}
                  >
                    <Image
                      source={require("../../assets/plus.png")}
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
          <View style={styles.action}>
          <TextInput
            name="body"
            placeholder="Tulis ulasan produk"
            placeholderTextColor="#666666"
            value={values.body}
            onChangeText={(val) => onChange("body", val)}
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
          </View>
        </Card.Content>
        <TouchableOpacity
          style={styles.commandButtonSave}
          onPress={onSubmit}
        >
          <Text style={styles.panelButtonTitle}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 15,
    flexDirection: "row",
  },
  textInput: {
    flex: 1,
    marginTop: -70,
    paddingLeft: 15,
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  commandButtonSave: {
    padding: 12,
    borderRadius: 15,
    backgroundColor: "#000",
    alignItems: "center",
    width: "70%",
    alignSelf: "center",
    marginTop: 30,
    marginEnd: 15,
    marginStart: 15,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 10,
    height: 125,
    marginStart: 15,
    borderBottomWidth: 1,
    borderBottomColor: "transparent",
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    marginEnd: 15,
    paddingBottom: 5,
  },
});

AddProductReview.propTypes = {
    uploadMultipleImage: PropTypes.func.isRequired,
    photos: PropTypes.array,
  };
  const mapStateToProps = (state) => ({
    photos: state.imagePicker.photos,
  });
  
  export default connect(mapStateToProps, { uploadMultipleImage })(AddProductReview);
  
