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
import { useQuery } from "@apollo/client";
import { useForm } from "../../util/hooks";
import { ADD_REVIEW_MUTATION, FETCH_ITEM_REVIEWS } from "../../util/graphql";

import OrderCardDetail from "../../component/OrderCardDetail";

var { height } = Dimensions.get("window");

const AddProductReview = (props) => {
  const item = props.route.params.item;
  console.log("item id", item.id)
  const { colors } = useTheme();
  const [errors, setErrors] = useState({});
  const [score, setScore] = useState(0);
  const [itemId, setItemId] = useState("");
  const [body, setBody] = useState("");
  const [showReviewButton, setShowReviewButton] = useState(false);
  const { data } = useQuery(FETCH_ITEM_REVIEWS, {
    variables: {
      itemId: item.id
    }
  })
  const { getItemReviews: reviews } = data ? data : [];
  // console.log("reviews", reviews)

  const handleRating = (rating) => {
    setScore(rating);
  };

  const handleChange = (val) => {
    setBody(val);
  };

  const reviewHandler = () => {
    addReviewProduct();
  };

  // let itemPrice;
  // let amountItem;
  // let idTemp;

  // {
  //   order.items.map((item) => {
  //     itemPrice = item.price;
  //     amountItem = item.amountItem;
  //     idTemp = item.id;
  //   });
  // }

  // const { onChange, onSubmit, values } = useForm(addReview, {
  //   body: "",
  //   score: 0,
  //   itemId: itemId
  // });

  // const uploadImage = async (uri, imageName) => {
  //   if (uri) {
  //     const response = await fetch(uri);
  //     const blob = await response.blob();
  //     const uploadTask = storage
  //       .ref(`images/itemReview/${imageName}`)
  //       .put(blob);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {},
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         storage
  //           .ref("images/itemReview")
  //           .child(imageName)
  //           .getDownloadURL()
  //           .then((url) => {
  //             setImage((img) => [...img, url]);
  //             console.log("img url", url);
  //           });
  //       }
  //     );
  //   }
  // };

  // useEffect(() => {
  //   console.log(image.length, "here");
  //   if (props.photos && image.length == props.photos.length) {
  //     let downloadUrlImages = [];
  //     image.forEach((img) => {
  //       downloadUrlImages.push({
  //         downloadUrl: img,
  //       });
  //     });
  //     values.images = downloadUrlImages;
  //     addReviewProduct();
  //   }
  // }, [image]);

  const [addReviewProduct] = useMutation(ADD_REVIEW_MUTATION, {
    update(_, { data: { addReview: reviews } }) {
      console.log("review added");
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
      body: body,
      score: score,
      itemId: item.id
    },
  });

  return (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <View
          style={{
            height: 35,
            width: 35,
            backgroundColor: "#000",
            alignItems: "center",
            borderRadius: 10,
            justifyContent: "center",
            elevation: 3,
          }}
        >
          <FontAwesome
            onPress={() => props.navigation.goBack()}
            name="chevron-left"
            size={14}
            style={{ marginStart: -2, color: "#fff" }}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.3,
            marginStart: 80,
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
          <OrderCardDetail item={item} review={showReviewButton} />
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
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 15 }}>
            Beri Rating
          </Text>
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
            onFinishRating={(rating) => handleRating(rating)}
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
          <Text style={{ fontWeight: "bold", fontSize: 18, marginBottom: 15 }}>
            Detail Ulasan
          </Text>
          <Divider
            style={{
              height: 1,
              marginStart: -16,
              marginEnd: -16,
              marginBottom: 25,
            }}
          />
          <View style={styles.action}>
            <TextInput
              name="body"
              placeholder="Tulis ulasan produk"
              placeholderTextColor="#666666"
              value={body}
              onChangeText={(val) => handleChange(val)}
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
          onPress={() => {
           reviewHandler();
          }}
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
    marginTop: 10,
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

export default connect(mapStateToProps, { uploadMultipleImage })(
  AddProductReview
);
