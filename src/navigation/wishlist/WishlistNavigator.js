import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Wishlist from "../../screens/wishlist/Wishlist";

const Stack = createStackNavigator()

export default function WishlistNavigator({ navigation }) {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='Wishlist Screen'
                component={Wishlist}
                options={{ headerShown: false }}
            />
            
        </Stack.Navigator>
    )
}
