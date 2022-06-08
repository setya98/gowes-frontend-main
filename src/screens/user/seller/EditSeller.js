import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { useTheme } from "react-native-paper";
import Toast from "react-native-toast-message";
import BottomSheet from "reanimated-bottom-sheet";
import { Button, Text, Item, Picker } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Animated from "react-native-reanimated";
import * as ImagePicker from "expo-image-picker";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { CommonActions } from "@react-navigation/native";
import { AuthContext } from "../../../context/auth";
import { useForm } from "../../../util/hooks";
import { storage } from "../../../firebase";
import {
  FETCH_USER_QUERY,
  UPDATE_SELLER_PROFILE_MUTATION,
} from "../../../util/graphql";

var { height } = Dimensions.get("window");

const EditSeller = (props) => {
  const { colors } = useTheme();

  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [isSaved, setSave] = useState(false);
  const [avatar, setAvatar] = useState("https://react.semantic-ui.com/images/avatar/large/molly.png");

  const {loading, data} = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: context.user.id,
    },
  });
  const { getUser: currentUser } = data ? data : [];

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      uploadImage(result.uri, `avatar-${new Date().toISOString()}`)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      uploadImage(result.uri, `avatar-${new Date().toISOString()}`)
        .then(() => {
          console.log("Success");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const uploadImage = async (uri, imageName) => {
    if (uri) {
      const response = await fetch(uri);
      const blob = await response.blob();
      const uploadTask = storage.ref(`images/avatar/${imageName}`).put(blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("images/avatar")
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              setAvatar(url);
              console.log("this is the avatar " + url);
            });
        }
      );
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Update Foto Profil Berhasil",
      });
    }
  };

  let userObj = {
    avatar: "",
    username: currentUser.seller.username,
    description: currentUser.seller.description,
  };

  if (currentUser) {
    userObj = {
      username: currentUser.seller.username,
      description: currentUser.seller.description,
    };
  }

  let { onChange, onSubmit, values } = useForm(updateSellerProfile, userObj);

  // const [values, setValues] = useState({
  //   avatar: "https://react.semantic-ui.com/images/avatar/large/molly.png",
  //   username: currentUser.seller.username,
  //   description: currentUser.seller.description,
  // });

  // const onChange = (key, val) => {
  //   setValues({ ...values, [key]: val });
  // };

  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(values)
  //   sellerProfileUpdate();
  // };

  const [sellerProfileUpdate] = useMutation(UPDATE_SELLER_PROFILE_MUTATION, {
    refetchQueries: [{
      query: FETCH_USER_QUERY
    }],
    update(_, { data: { updateSellerProfile: sellerData } }) {
      sellerData.username = sellerData.seller.username;
      context.login(sellerData)
      console.log("updated")
      setErrors({});
      props.navigation.dispatch(CommonActions.goBack());
      Toast.show({
        topOffset: 30,
        type: "success",
        text1: "Update Profil Toko Tersimpan",
      });
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      setSave(true);
    },
    variables: values
  });

  function updateSellerProfile() {
    values.avatar = avatar
    sellerProfileUpdate();
  }

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Unggah Foto</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={openCamera}>
        <Text style={styles.panelButtonTitle}>Ambil Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={pickImage}>
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
              marginStart: 5,
            }}
          >
        <FontAwesome
          onPress={() => props.navigation.navigate("Seller")}
          name="chevron-left"
          size={14}
          style={{ alignSelf: "center", marginStart: -2, color: "#fff" }}
        />
        </View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.3,
            marginStart: 75,
            marginTop: 5
          }}
        >
          Edit Profil Toko
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          backgroundColor: "#f2f2f2",
        }}
      >
        <BottomSheet
          ref={bottomSheet}
          snapPoints={[510, 0]}
          renderContent={renderInner}
          renderHeader={renderHeader}
          initialSnap={1}
          callbackNode={fall}
          enabledGestureInteraction={true}
          enabledContentTapInteraction={false}
        />

        <Animated.View
          style={{
            marginBottom: 20,
            marginTop: 15,
            opacity: Animated.add(0.1, Animated.multiply(fall, 1.0)),
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <TouchableOpacity onPress={() => bottomSheet.current.snapTo(0)}>
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
                  source={{ uri: currentUser.seller.avatar }}
                  style={{ height: 100, width: 100, marginTop: 15 }}
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
            <Text style={{ marginTop: 15, fontSize: 22, fontWeight: "bold" }}>
              {currentUser.seller.username}
            </Text>
          </View>
          <View style={styles.detailContainer}>
            <View style={{ paddingVertical: 20, marginStart: 15 }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Profil Toko</Text>
        </View>
            <View style={styles.action}>
          <Image source={require('../../../assets/store.png')} style={{marginStart: 15, marginTop: 12, height: 20, width: 20}} />
          <TextInput
            name="username"
            placeholder="Nama Toko"
            placeholderTextColor="#666666"
            autoCorrect={false}
            value={values.username}
            onChangeText={(val) => onChange("username", val)}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          />
        </View>
        <View style={styles.actionDescription}>
          <Image source={require('../../../assets/info.png')} style={{marginStart: 15, marginTop: 12, height: 18, width: 18}} />
          <TextInput
            name="description"
            placeholder="Deskripsi Toko"
            placeholderTextColor="#666666"
            value={values.description}
            onChangeText={(val) => onChange("description", val)}
            multiline={true}
            autoCorrect={false}
            numberOfLines={10}
            style={[styles.textInputDescription,
                {
                  color: colors.text,
                },
            ]}
          />
        </View>
        <Button style={styles.commandButton} onPress={onSubmit}>
          <Text style={styles.panelButtonTitle}>Simpan</Text>
        </Button>
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
  },
  panelButtonTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginStart: "50%",
    color: "white",
  },
  commandButton: {
    width: "60%",
    height: 40,
    borderRadius: 15,
    backgroundColor: "#000",
    alignSelf: "center",
    marginTop: 20,
    justifyContent: "center",
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
  actionDescription: {
    flexDirection: "row",
    marginTop: 5,
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
    marginTop: -77,
    paddingLeft: 15,
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  pickerStyle: {
    borderColor: "transparent",
    alignSelf: "center",
    flex: 1,
    marginLeft: 5,
  },
});

export default EditSeller;
