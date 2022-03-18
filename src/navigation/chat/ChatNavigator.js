import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Chat from "../../screens/chat/Chat";
import Message from "../../screens/chat/Message";

const ChatNavigator = createStackNavigator();

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
        options={{ headerShown: false }}
      />
    </ChatNavigator.Navigator>
  );
}