import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Cart from "../../screens/cart/Cart";
import Checkout from "../../screens/cart/Checkout";
import reactMidtrans from "../../util/reactMidtrans";
import MidtransPayment from "../../screens/cart/MidtransPayment";

const Stack = createStackNavigator()

export default function CartNavigator({ navigation }) {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name='Carts'
                component={Cart}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Checkout'
                component={Checkout}
                options={{ title : "", headerShown: false }}
            />
            <Stack.Screen
                name='Midtrans'
                component={reactMidtrans}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Payment Checker'
                component={MidtransPayment}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
