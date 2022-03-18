import React from "react";
import { createStackNavigator } from "@react-navigation/stack"
import ProductContainer from "../../screens/products/ProductContainer";
import ProductDetail from "../../screens/products/ProductDetail"
import ChatNavigator from "../chat/ChatNavigator";
import SearchedProduct from "../../screens/products/SearchedProduct";
import ProductReview from "../../screens/review/ProductReview";
import EditProduct from "../../screens/user/seller/EditProduct";
import ImagePicker from "../../screens/user/seller/ImagePicker";
import StoreSeller from "../../screens/products/StoreSeller";

const Stack = createStackNavigator()

export default function HomeNavigator({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="Product Container">
            <Stack.Screen
                name='Product Container'
                component={ProductContainer}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Product Detail'
                component={ProductDetail}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Chat'
                component={ChatNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Search Product'
                component={SearchedProduct}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Product Review'
                component={ProductReview}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Edit Product'
                component={EditProduct}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Store Seller'
                component={StoreSeller}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name='Image Picker'
                component={ImagePicker}
                options={{ headerRightContainerStyle: { paddingRight: 20 } }}
            />
        </Stack.Navigator>
    )
}
