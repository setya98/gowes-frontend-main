import React, { useState, useEffect } from "react";
import { StyleSheet, Image, View, Dimensions } from "react-native";
import { Card, Divider } from "react-native-paper";
import { Text, ListItem, List, Right, Left } from "native-base";
import SelectPicker from "react-native-form-select-picker";
import DropDownPicker from "react-native-dropdown-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { objectSize } from "../../util/extensions";
import {
  setOrderIdsWillBePayed,
  setAddOrder,
  checkoutItems,
} from "../../../Redux/actions/orderAction";
import {
  FETCH_COST_COURIER_QUERY,
  ADD_ORDER,
  FETCH_USER_CART_QUERY,
} from "../../util/graphql";
import ItemCheckoutCard from "./ItemCheckoutCard";

var { width } = Dimensions.get("window")

const CheckoutCard = (props) => {
  const [updateUserCartCache, {}] = useLazyQuery(FETCH_USER_CART_QUERY);
  const [courier, setCourier] = useState({
    code: "",
    service: "",
    amount: 0,
  });
  let weightTotal = 0;
  let cartItemIds = [];
  let items = props.cartItem.map((item) => {
    cartItemIds = [...cartItemIds, item.id];
    weightTotal += item.item.weight * item.amountItem;
    return {
      id: item.item.id,
      name: item.item.name,
      price: item.item.price,
      weight: item.item.weight,
      images: [
        {
          downloadUrl: item.item.images[0].downloadUrl,
        },
      ],
      amountItem: item.amountItem,
      note: item.note,
    };
  });

  let costVariables = {
    origin: props.cartItem[0].item.user.address.cityId,
    destination: props.user.address.cityId,
    weight: weightTotal,
    courier: "tiki",
  };

  const courierChange = (value) => {
    const courierSplit = value.split(" ");
    setCourier({
      code: courierSplit[0],
      service: courierSplit[1],
      amount: parseInt(courierSplit[2]),
    });
  };

  const [addOrder] = useMutation(ADD_ORDER, {
    variables: {
      items: items,
      state: "CONFIRMATION",
      shipping: {
        awbNumber: "",
        courierName: courier.code,
        buyerAddress: `${props.user.address.detail}, ${props.user.address.district}, ${props.user.address.cityName}, ${props.user.address.postalCode}`,
        shippingCost: courier.amount,
      },
      sellerUsername: props.cartItem[0].item.user.seller.username,
      cartItemIds: cartItemIds,
    },
    update(proxy, result) {
      updateUserCartCache();
      const updatedOrderIds = [...props.orderIds, result.data.addOrder.id];
      console.log(updatedOrderIds);
      props.setOrderIdsWillBePayed(updatedOrderIds);
    },
  });

  useEffect(() => {
    if (props.isAddOrder) {
      addOrder();
      props.setAddOrder(false);
    }
  }, [props.isAddOrder]);

  useEffect(() => {
    let carts = props.carts;
    let cartObj;
    let cartItemObj;
    let indexCartObj;
    let indexCartItemObj;
    carts.forEach((cart, indexCart) => {
      if (
        cart.user.seller.username ===
        props.cartItem[0].item.user.seller.username
      ) {
        indexCartObj = indexCart;
        cartObj = cart;
        cart.cartItems.forEach((cartItem, indexCartItem) => {
          indexCartItemObj = indexCartItem;
          cartItemObj = cartItem;
          cartItemObj = { ...cartItemObj, courier: courier };
          cartObj.cartItems[indexCartItemObj] = cartItemObj;
        });
        return;
      }
    });
    carts[indexCartObj] = cartObj;
    props.checkoutItems(carts, !props.isChange);
  }, [courier]);

  const { loading, data } = useQuery(FETCH_COST_COURIER_QUERY, {
    variables: costVariables,
  });

  costVariables.courier = "jne";
  const { loading: jneLoading, data: jneData } = useQuery(
    FETCH_COST_COURIER_QUERY,
    {
      variables: costVariables,
    }
  );

  costVariables.courier = "pos";
  const { loading: posLoading, data: posData } = useQuery(
    FETCH_COST_COURIER_QUERY,
    {
      variables: costVariables,
    }
  );
  let { getCosts: tikiCosts } = data ? data : [];
  let { getCosts: jneCosts } = jneData ? jneData : [];
  let { getCosts: posCosts } = posData ? posData : [];

  let cartCheckoutScreen = <></>;

  if (!loading && !jneLoading && !posLoading) {
    const tikiSize = objectSize(tikiCosts);
    const jneSize = objectSize(jneCosts);
    const posSize = objectSize(posCosts);
    let options = [];
    if (tikiSize > 0 && tikiCosts[0].costs) {
      tikiCosts[0].costs.forEach((cost) => {
        options = [
          ...options,
          {
            key: cost.cost[0].etd,
            text: `${tikiCosts[0].code} (${cost.service}) Rp${cost.cost[0].value}`,
            value: `${tikiCosts[0].code} ${cost.service} ${cost.cost[0].value}`,
            content: (
              <>
                <List>
                  <ListItem>
                    <Right>
                      <Text> Rp{cost.cost[0].value}</Text>
                    </Right>
                  </ListItem>
                  <ListItem>
                    <Left>
                      {tikiCosts[0].code} ({cost.service})
                    </Left>
                  </ListItem>
                </List>
              </>
            ),
          },
        ];
      });
    }
    if (jneSize > 0 && jneCosts[0].costs) {
      jneCosts[0].costs.forEach((cost) => {
        options = [
          ...options,
          {
            key: cost.cost[0].etd,
            text: `${jneCosts[0].code} (${cost.service}) Rp${cost.cost[0].value}`,
            value: `${jneCosts[0].code} ${cost.service} ${cost.cost[0].value}`,
            content: (
              <>
                <List>
                  <ListItem>
                    <Right>
                      <Text> Rp{cost.cost[0].value}</Text>
                    </Right>
                  </ListItem>
                  <ListItem>
                    <Left>
                      {jneCosts[0].code} ({cost.service})
                    </Left>
                  </ListItem>
                </List>
              </>
            ),
          },
        ];
      });
    }

    cartCheckoutScreen = (
      <Card style={{borderRadius: 20, marginStart: 15, marginEnd: 25, marginTop: 20, width: "90%"}}>
        <Card.Content style={{flexDirection: "row", marginBottom: 10}}>
        <Image
            source={require("../../assets/store.png")}
            style={{
              width: 16,
              height: 16,
            }}
          />
          <Text style={{ fontWeight: "bold", marginStart: 10 }}>
            {props.cartItem[0].item.user.seller.username}
          </Text>
        </Card.Content>
        {props.cartItem &&
          props.cartItem.map((item, index) => (
            <ItemCheckoutCard key={index} item={item}/>
          ))}
        <Card.Content>
        <Divider style={{height: 1, marginTop: 10, marginStart: -16, marginEnd: -16}}/>
        <View style={{flexDirection: "row", marginStart: 5, marginBottom: 5}}>
        <FontAwesome name="truck" size={13} style={{marginTop: 15, color: "#595959"}} />
        <Text style={{fontSize: 15, marginTop: 15, marginStart: 10, fontWeight: "bold", color: "#595959"}}>Metode Pengiriman</Text>
        </View>
        <View style={{flexDirection: "row", justifyContent: "space-between", borderColor: "#8c8c8c", borderStyle: "dotted", borderWidth: 1, borderRadius: 15, marginTop: 10, marginBottom: 10}}>
          <SelectPicker
            onValueChange={(value) => {
              console.log("chosen courier", value), courierChange(value);
            }}
            placeholder="Pilih jasa pengiriman"
            placeholderStyle={{fontWeight: "600"}}
            style={{width: "90%"}}
          >
            
            {Object.values(options).map((val) => (
              <SelectPicker.Item
                label={val.text}
                value={val.value}
                key={val.key}
              />
            ))}
          </SelectPicker>
          <FontAwesome 
            name="sort-down"
            size={15}
            style={{color: "#000", marginEnd: 10, marginTop: 5}}
            />
          </View>
        </Card.Content>
      </Card>
    );
  }
  return cartCheckoutScreen;
};

const styles = StyleSheet.create({
  pickerStyle: {
    borderColor: "gainsboro",
    alignSelf: "center",
    flex: 1,
    marginLeft: 5,
  },
});

CheckoutCard.propTypes = {
  checkoutItems: PropTypes.func.isRequired,
  setAddOrder: PropTypes.func.isRequired,
  carts: PropTypes.array,
};
const mapStateToProps = (state) => ({
  carts: state.orders.checkoutOrders,
  isChange: state.orders.isChange,
  isAddOrder: state.orders.isAddOrder,
  orderIds: state.orders.orderIds,
});

export default connect(mapStateToProps, {
  checkoutItems,
  setAddOrder,
  setOrderIdsWillBePayed,
})(CheckoutCard);
