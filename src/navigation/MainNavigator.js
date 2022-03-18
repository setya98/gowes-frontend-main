import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

// Stacks
import AuthNavigator from "../navigation/authentication/AuthNavigator";
import BottomTabNavigator from "../navigation/home/bottomTabNavigator/BottomTabNavigator";

const Main = createStackNavigator()

export default function MainNavigator({ navigation }) {
  return (
      <Main.Navigator
      initialRouteName="Authentication"
      screenOptions={{
        gestureEnabled: false
      }}
      >
        <Main.Screen 
          name="Authentication"
          component={AuthNavigator}
          options={{
            title: "",
            headerShown: false
          }}
        />
        <Main.Screen 
          name="HomeTabNavigator"
          component={BottomTabNavigator}
          options={({ navigation, route }) => ({
            headerShown: false
          })}
        />
      </Main.Navigator>
  );
}

