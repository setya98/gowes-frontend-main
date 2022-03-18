import { UPLOAD_MULTIPLE_IMAGE } from "../actions/type";
import { initialPhotos } from "../../src/util/const";

const initialState = initialPhotos;

export default function (state = initialState, action) {
  switch (action.type) {
    case UPLOAD_MULTIPLE_IMAGE:
      return {
        ...state,
        photos: action.payload.photos,
      };
    default:
      return state;
  }
}