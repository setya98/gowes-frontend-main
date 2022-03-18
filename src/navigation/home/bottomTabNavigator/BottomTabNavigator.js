import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { View, Image, StyleSheet, Dimensions, Animated } from "react-native";
import { useRef } from "react";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// Stacks
import HomeNavigator from "../HomeNavigator";
import CartNavigator from "../../cart/CartNavigator";
import WishlistNavigator from "../../wishlist/WishlistNavigator";
import UserNavigator from "../../user/UserNavigator";

// import CartIcon from "../../../component/CartIcon";

const Tab = createBottomTabNavigator();

export default function Main({ navigation }) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          keyboardHidesTabBar: true,
          showLabel: false,
          tabStyle: {
            backgroundColor: "white",
          },
          style: {
            position: "absolute",
            bottom: 0,
            marginHorizontal: 20,
            paddingHorizontal: 8,
            paddingTop: 8,
            paddingBottom: 8,
            height: 65,
            elevation: 5,
            borderRadius: 20,
            shadowColor: "#737575",
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            shadowOffset: {
              width: 0,
              height: 10,
            },
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={({ route }) => ({
            tabBarVisible: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              if (routeName === "Product Detail") {
                return false
              } if (routeName === "Chat") {
                return false
              } if(routeName === "Product Review"){
                return false
              } if(routeName === "Edit Product"){
                return false
              } if(routeName === "Store Seller"){
                return false
              } if(routeName === "Search Product"){
                return false
              } if(routeName === "Image Picker"){
                return false
              }
              return true
          })(route),
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../../assets/homepage.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#000" : "#8c8c8c",
                  }}
                />
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="Cart"
          component={CartNavigator}
          options={({ route }) => ({
            tabBarVisible: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
               if (routeName === "Checkout") {
                return false
               } if (routeName === "Midtrans") {
                return false
               } if (routeName === "Payment Checker") {
                return false
              } 
              return true
          })(route),
            tabBarIcon: ({ focused }) => (
              <View>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("../../../assets/bag.png")}
                    resizeMode="contain"
                    style={{
                      width: 25,
                      height: 25,
                      tintColor: focused ? "#000" : "#8c8c8c",
                    }}
                  />
                </View>
                {/* <CartIcon /> */}
              </View>
            ),
          })}
        />
        <Tab.Screen
          name="Wishlist"
          component={WishlistNavigator}
          options={{
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Image
                  source={require("../../../assets/heart.png")}
                  resizeMode="contain"
                  style={{
                    width: 23,
                    height: 25,
                    tintColor: focused ? "#000" : "#8c8c8c",
                  }}
                />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={UserNavigator}
          options={({ route }) => ({
            tabBarVisible: ((route) => {
              const routeName = getFocusedRouteNameFromRoute(route) ?? ""
              if (routeName === "Edit Buyer") {
                  return false
              } if (routeName === "Seller") {
                return false
              } if(routeName === "Order"){
                return false
              } if(routeName === "Add Product"){
                return false
              } if(routeName === "Edit Product"){
                return false
              } if(routeName === "Order Seller"){
                return false
              } if(routeName === "Product List"){
                return false
              } if(routeName === "Edit Seller"){
                return false
              } if(routeName === "Order Seller Detail"){
                return false
              } if(routeName === "Order Detail"){
                return false
              } if(routeName === "Add Review"){
                return false
              } if(routeName === "Image Picker"){
                return false
              } if(routeName === "Authentication"){
                return false
              } if(routeName === "Add Product Review"){
                return false
              } 
              return true
          })(route),
            tabBarIcon: ({ focused }) => (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <Image
                  source={require("../../../assets/user.png")}
                  resizeMode="contain"
                  style={{
                    width: 25,
                    height: 25,
                    tintColor: focused ? "#000" : "#8c8c8c",
                  }}
                />
              </View>
            ),
          })}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
