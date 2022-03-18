import { combineReducers } from "redux";
import searchFilterReducer from "./searchFilterReducer";
import orderReducer from "./orderReducer";
import imagePickerReducer from "./imagePickerReducer"

export default combineReducers({
  searchFilter: searchFilterReducer,
  orders: orderReducer,
  imagePicker: imagePickerReducer
});