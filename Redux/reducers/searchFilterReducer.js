import { SEARCH_FILTER } from "../actions/type";
import { initialFilter } from "../../src/util/const";

const initialState = initialFilter;

export default function (state = initialState, action) {
  switch (action.type) {
    case SEARCH_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    default:
      return state;
  }
}