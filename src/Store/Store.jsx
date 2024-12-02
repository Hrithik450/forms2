import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fieldsReducer from "./Slices/FieldSlice";
import PopUpReducer from "./Slices/PopupSlice";

const reducer = combineReducers({
  fields: fieldsReducer,
  PopUp: PopUpReducer,
});

const Store = configureStore({ reducer });

export default Store;
