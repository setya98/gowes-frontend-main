import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Text, Button } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import StarIcon from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Avatar } from "react-native-paper";
import { CommonActions } from "@react-navigation/native";
import { useQuery } from "@apollo/react-hooks";
import { AuthContext } from "../../../context/auth";
import { FETCH_USER_QUERY } from "../../../util/graphql";


var { height } = Dimensions.get("window");

const Seller = (props) => {
  const { user } = useContext(AuthContext)
  console.log('user login', user.id )
  
  const { loading, data } = useQuery(FETCH_USER_QUERY, {
    variables: {
      userId: user.id
    }
  })
  const { getUser: currentUser } = data ? data : []

  const [avatar, setAvatar] = useState(
    "https://react.semantic-ui.com/images/avatar/large/molly.png"
  )

  return (
    <>
      {loading || currentUser.seller.username === "" ? (
        <>
          <View style={{ alignItems: "center", marginVertical: 50 }}>
          <Image 
          source={require("../../../assets/ilus-open.webp")}
          resizeMode="contain"
          style={{height: 250, width: 250}}
          />
          <Text style={{fontSize: 20, fontWeight: "bold"}}>
              Kamu masih belum punya toko
            </Text>
            <Button
              style={{backgroundColor: "#000", borderRadius: 20, marginTop: 30, alignSelf: "center", width: 150, justifyContent: "center"}}
              onPress={() => {
                props.navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [
                      {
                        name: "Edit Seller",
                      },
                    ],
                  })
                );
              }}
            >
            <Text style={{fontWeight: "bold", fontSize: 15}}>Buka Toko</Text>
            </Button>
          </View>
        </>
      ) : (
        <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <View style={styles.header}>
        <Icon onPress={() => props.navigation.navigate("Buyer")}
        name="chevron-left" size={18} style={{top: 4}} />
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            letterSpacing: 0.3,
            marginEnd: 130
          }}
        >
          Toko Saya
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        <View style={styles.ImageContainer}>
          <Avatar.Image
            source={{ uri: currentUser.seller.avatar }}
            size={50}
            style={{ marginStart: 15, marginTop: 5 }}
          />
          <TouchableWithoutFeedback
          onPress={() => props.navigation.navigate("Edit Seller")}
          >
            <Text style={{ fontSize: 20, color: "#000",fontWeight: "700", marginStart: 20, letterSpacing: 0.6 }}>
            {currentUser.seller.username}
            </Text>
          </TouchableWithoutFeedback>
          </View>

          <View style={{flexDirection: "row", marginStart: 85, marginTop: -45 }}>
          <FontAwesome name="map-marker" color={"#8c8c8c"} size={14}  />
          <Text style={{color: "#595959", fontWeight: "bold", marginStart: 7, marginTop: -2}}>{currentUser.address.cityName}</Text>
          </View>
          <View style={{flexDirection: "row", marginStart: 80, marginTop: 10}}>
          <StarIcon name="star" size={20} color={"#F18c06"}/> 
          <Text style={{color: "#000",  fontWeight: "bold", fontSize: 22, marginStart: 5}}>4.8</Text>
          <Text style={{color: "#595959",  fontWeight: "bold", marginStart: 7, marginTop: 5}}>Rating</Text>
          </View>
        
        <View style={styles.detailContainer}>
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Order Seller")}>
        <Image source={require("../../../assets/bill.png")} resizeMode="contain" style={{width: 20, height: 20, top: 30, tintColor: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 30, color: "#595959", fontSize: 18 }}>Daftar Penjualan</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Add Product")}>
        <Icon name="plus" size={17} style={{ alignSelf:"flex-start", top: 30, marginStart: 3, color: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 32, color: "#595959", fontSize: 18 }}>Tambah Produk</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Product List")}>
        <Image source={require("../../../assets/store.png")} resizeMode="contain" style={{width: 21, height: 21, top: 30, tintColor: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 33, color: "#595959", fontSize: 18 }}>Daftar Produk</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:"row", justifyContent: "space-between", paddingHorizontal: 20}}>
        <TouchableOpacity
           onPress={() => props.navigation.navigate("Edit Seller")}>
        <Icon name="address-book" size={18} style={{ alignSelf:"flex-start", top: 30, marginStart: 4, color: "#595959"}} />
        <Text style={{fontWeight:"500", top: 10, marginStart: 33, color: "#595959", fontSize: 18 }}>Edit Profil Toko</Text>
        <Icon name="chevron-right" style={{ top: -5,color: "#595959", marginStart: 300}} />
        </TouchableOpacity>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    margin: 15,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  ImageContainer: {
    backgroundColor: "#fff",
    alignItems: "flex-start",
    flexDirection: "row",
    height: "10%",
    marginTop: 10
  },
  detailContainer: {
    flexGrow: 1,
    backgroundColor: "#f2f2f2",
    elevation: 5,
    marginTop: 25,
    height: height,
    borderRadius: 30
  },
});

export default Seller;
