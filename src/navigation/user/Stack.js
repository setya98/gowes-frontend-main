import React from "react";
import { createStackNavigator } from "@react-navigation/stack"

import EditSeller from "../../screens/user/seller/EditSeller";
import AddProduct from "../../screens/user/seller/AddProduct";
import ProductContainerSeller from "../../screens/user/seller/ProductContainerSeller"
import OrderList from "../../screens/user/seller/OrderList";

const Stack = createStackNavigator()

export default function Stack({ navigation }) {
    return (
        <Stack.Navigator initialRouteName="User">
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
                name='Order List'
                component={OrderList}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}
