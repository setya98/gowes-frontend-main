import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Dimensions,
} from "react-native";
import { Card, Avatar, Text, Button } from "react-native-paper";
import { Rating } from "react-native-ratings";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import moment from "moment";

var { width, height } = Dimensions.get("window");

const ProductReviewCard = (props) => {
  const review = props.review;
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  console.log("score", review.score);
  // console.log("gambar", review.images);

  return (
    <View>
      <Card style={styles.card}>
        <Card.Content>
          <View style={{ flexDirection: "row" }}>
            <Avatar.Image
              source={{ uri: review.user.buyer.avatar }}
              style={{ margin: 4 }}
              size={40}
            />
            <Card.Title
              title={review.user.buyer.name}
              titleStyle={{ fontSize: 20, fontWeight: "bold" }}
              style={{ alignSelf: "flex-end", marginTop: -10 }}
            />
          </View>
          <Text style={{ marginStart: 65, marginTop: -10, color: "#8c8c8c" }}>
            {moment(review.createdAt).format("lll")}
          </Text>
          <Rating
            startingValue={review.score}
            type="star"
            readonly={true}
            ratingColor="#F18c06"
            imageSize={16}
            style={{ marginStart: -90, marginTop: 10 }}
          />
          <View style={{ flexDirection: "row", marginStart: 65 }}>
            {review.images.map((image, index) => (
              <TouchableOpacity
                onPress={openModal}
                style={{ marginStart: -20, marginEnd: 25 }}
              >
                <Image
                  key={index}
                  source={{ uri: image.downloadUrl }}
                  style={{
                    width: 60,
                    height: 70,
                    marginStart: 10,
                    marginTop: 30,
                  }}
                  resizeMode="contain"
                />
                <Modal visible={modalVisible} transparent={true}>
                  <View style={styles.centeredView}>
                    <Image
                      key={index}
                      source={{ uri: image.downloadUrl }}
                      style={{
                        width: width,
                        height: height,
                      }}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        position: "absolute",
                        right: 15,
                        top: 25,
                        height: 30,
                        width: 30,
                        backgroundColor: "#fff",
                        borderRadius: 20,
                        justifyContent: "center",
                      }}
                    >
                      <Material
                        name="close"
                        onPress={() => setModalVisible(false)}
                        size={19}
                        color={"#000"}
                        style={{ alignSelf: "center" }}
                      />
                    </View>
                  </View>
                </Modal>
              </TouchableOpacity>
            ))}
          </View>
        </Card.Content>
        <Card.Content style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#595959",
              marginBottom: 15,
              marginStart: 60,
              marginTop: 10,
            }}
          >
            {review.body}
          </Text>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginTop: 15,
    elevation: 2,
  },
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});

export default ProductReviewCard;
