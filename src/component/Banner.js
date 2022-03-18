import React, { useState, useEffect } from "react";
import { StyleSheet, Image, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper";

var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://cdn.dribbble.com/users/376430/screenshots/3975304/media/dc53ddd6fa8633edf9e81f7134861cb2.jpg",
      "https://cdn.dribbble.com/users/432278/screenshots/2571744/media/47926ff0d9df7fea31da73fab6df39eb.jpg",
      "https://cdn.dribbble.com/users/432278/screenshots/2762033/media/53f6de6084c0d08fd3ecfae3163e26ae.jpg",
    ]);

    return () => {
      setBannerData([]);
    };
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 2 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={3}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="cover"
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 20 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 20,
  },
  imageBanner: {
    height: width / 2,
    width: width - 50,
    borderRadius: 25,
    marginHorizontal: 20,
  },
});

export default Banner;
