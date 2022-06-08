import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Cart from "../../screens/cart/Cart";
import Checkout from "../../screens/cart/Checkout";
import MidtransPayment from "../../screens/cart/MidtransPayment";
import ReactMidtransModal from "../../screens/cart/ReactMidtransModal"
import ProductContainer from "../../screens/products/ProductContainer"
import Buyer from "../../screens/user/buyer/Buyer"

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
                component={ReactMidtransModal}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Payment Checker'
                component={MidtransPayment}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Product Container'
                component={ProductContainer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Buyer'
                component={Buyer}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
