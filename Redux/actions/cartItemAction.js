import { ADD_TO_CART } from "./type";

export const CartItems = (cartItems) => (dispatch) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
        cartItems: cartItems,
    },
  });
};