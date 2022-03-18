import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { ImageBrowser } from "expo-image-picker-multiple";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { uploadMultipleImage } from "../../../../Redux/actions/imagePickerAction";

const ImagePicker = (props) => {
  const getHeaderLoader = () => (
    <ActivityIndicator size="small" color={"#000"} />
  );

  const imagesCallback = (callback) => {
    const { navigation } = props;
    navigation.setOptions({
      headerRight: () => getHeaderLoader(),
    });

    callback
      .then(async (photos) => {
        const cPhotos = [];
        for (let photo of photos) {
          cPhotos.push({
            uri: photo.uri,
            name: photo.filename,
            type: "image/jpg",
          });
        }
        props.uploadMultipleImage(cPhotos);
        props.navigation.goBack(null);
      })
      .catch((e) => console.log(e));
  };

  const renderDoneButton = (count, onSubmit) => {
    if (!count) return null;
    return (
      <TouchableOpacity title={"Done"} onPress={onSubmit}>
        <Text onPress={onSubmit}>Done</Text>
      </TouchableOpacity>
    );
  };

  const updateHandler = (count, onSubmit) => {
    props.navigation.setOptions({
      title: `Selected ${count} files`,
      headerRight: () => renderDoneButton(count, onSubmit),
    });
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

  const emptyStayComponent = () => <Text style={styles.emptyStay}>Empty</Text>;

  return (
    <View style={[styles.flex, styles.container]}>
      <ImageBrowser
        max={4}
        onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    position: "relative",
  },
  emptyStay: {
    textAlign: "center",
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: "absolute",
    right: 3,
    bottom: 3,
    justifyContent: "center",
    backgroundColor: "#0580FF",
  },
  countBadgeText: {
    fontWeight: "bold",
    alignSelf: "center",
    padding: "auto",
    color: "#ffffff",
  },
});

ImagePicker.propTypes = {
  uploadMultipleImage: PropTypes.func.isRequired,
  photos: PropTypes.array,
};
const mapStateToProps = (state) => ({
  photos: state.imagePicker.photos,
});

export default connect(mapStateToProps, { uploadMultipleImage })(ImagePicker);
