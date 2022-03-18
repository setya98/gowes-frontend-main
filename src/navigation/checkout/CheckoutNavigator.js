import React, {useState} from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import Checkout from '../../screens/checkout/CheckoutScreen'
import Payment from '../../screens/checkout/Payment'
import Confirm from '../../screens/checkout/Confirm'

const checkoutTab = createMaterialTopTabNavigator()

export default function CheckoutNavigator() {

    const [swipeEnabled, setSwipeEnabled] = useState(false)

    return (
        <checkoutTab.Navigator swipeEnabled={swipeEnabled}>
            <checkoutTab.Screen name="Pengiriman" component={Checkout} />
            <checkoutTab.Screen name="Pembayaran" component={Payment}/>
            <checkoutTab.Screen name="Konfirmasi" component={Confirm}/>
        </checkoutTab.Navigator>
    )
}