import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fieldsReducer from "./Slices/FieldSlice";

const reducer = combineReducers({
  fields: fieldsReducer,
});

const Store = configureStore({ reducer });

export default Store;
