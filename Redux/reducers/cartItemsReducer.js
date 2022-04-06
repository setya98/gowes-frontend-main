import { ADD_TO_CART } from "../actions/type";
import { initialCartItems } from "../../src/util/const";

const initialState = initialCartItems;

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: action.payload.cartItems,
      };
    default:
      return state;
  }
};
