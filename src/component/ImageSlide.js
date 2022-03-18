import React, { useState } from "react";
import { Image, View, Dimensions, Modal, TouchableOpacity, StyleSheet } from "react-native";
import Swiper from "react-native-swiper";
import Material from "react-native-vector-icons/MaterialCommunityIcons";

var { width, height } = Dimensions.get("window");

const ImageSlide = ({ images }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <Swiper
        style={{ height: 350 }}
        dotColor={"#c2c2c2"}
        dotStyle={{
          marginBottom: 30,
          height: 6,
          width: 6,
          borderRadius: 20,
          marginRight: 8,
        }}
        activeDotStyle={{
          marginBottom: 30,
          height: 13,
          width: 13,
          borderRadius: 20,
          marginRight: 8,
        }}
      >
        {images.map((image, index) => (
          <TouchableOpacity onPress={openModal}>
            <Image
              key={index}
              source={{ uri: image.downloadUrl }}
              style={{ width: width, height: 350 }}
              resizeMode="cover"
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
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
});

export default ImageSlide;
