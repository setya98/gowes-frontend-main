import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import Chat from "../../screens/chat/Chat";
import Message from "../../screens/chat/Message";

const ChatNavigator = createStackNavigator();

const MyCustomHeaderBackImage = () => (
  <View
    style={{
      height: 30,
      width: 30,
      backgroundColor: "#000",
      alignItems: "center",
      borderRadius: 10,
      justifyContent: "center",
      elevation: 3,
      marginStart: 5
    }}
  >
    <FontAwesome
      onPress={() => props.navigation.goBack()}
      name="chevron-left"
      size={13}
      style={{ marginStart: -2, color: "#fff" }}
    />
  </View>
);

export default function ChatScreenNavigator() {
  return (
    <ChatNavigator.Navigator initialRouteName="Chat Screen">
      <ChatNavigator.Screen
        name="Chat Screen"
        component={Chat}
        options={{ headerShown: false }}
      />
      <ChatNavigator.Screen
        name="Message Screen"
        component={Message}
        options={({ route }) => ({
          title: route.params.username,
          headerStyle: { elevation: 0.3 },
          headerTitleStyle: { fontWeight: "bold" },
          headerBackImage: MyCustomHeaderBackImage,
          headerTitleAlign: "center"
        })}
      />
    </ChatNavigator.Navigator>
  );
}
