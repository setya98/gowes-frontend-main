import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import Buyer from "../../screens/user/buyer/Buyer";
import EditBuyer from "../../screens/user/buyer/EditBuyer";
import Seller from "../../screens/user/seller/Seller";
import EditSeller from "../../screens/user/seller/EditSeller";
import AddProduct from "../../screens/user/seller/AddProduct";
import ProductContainerSeller from "../../screens/user/seller/ProductContainerSeller"
import EditProduct from "../../screens/user/seller/EditProduct";
import Order from "../../screens/order/Order";
import OrderSeller from "../../screens/order/OrderSeller";
import OrderDetail from "../../screens/order/OrderDetail";
import OrderDetailSeller from "../../screens/order/OrderDetailSeller";
import ImagePicker from "../../screens/user/seller/ImagePicker"
import AddReview from "../../screens/user/buyer/AddReview";
import AuthNavigator from "../authentication/AuthNavigator";
import AddProductReview from "../../screens/order/AddProductReview";
import MessageScreen from "../../screens/chat/Message"

const Stack = createStackNavigator()

export default function UserNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="User">
            <Stack.Screen
                name='Buyer'
                component={Buyer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Seller'
                component={Seller}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Edit Buyer'
                component={EditBuyer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Edit Seller'
                component={EditSeller}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Add Product'
                component={AddProduct}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Product List'
                component={ProductContainerSeller}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Edit Product'
                component={EditProduct}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Order'
                component={Order}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Order Seller'
                component={OrderSeller}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Order Detail'
                component={OrderDetail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Order Seller Detail'
                component={OrderDetailSeller}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Image Picker"
                component={ImagePicker}
                options={{ headerRightContainerStyle: { paddingRight: 20 } }}
            />
            <Stack.Screen
                name='Add Review'
                component={AddReview}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Add Product Review'
                component={AddProductReview}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Message Screen'
                component={MessageScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Authentication'
                component={AuthNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
