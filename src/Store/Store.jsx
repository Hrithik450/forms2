import { combineReducers, configureStore } from "@reduxjs/toolkit";
import fieldsReducer from "./Slices/FieldSlice";
import MetaReducer from "./Slices/MetaData";

const reducer = combineReducers({
  fields: fieldsReducer,
  MetaData: MetaReducer,
});

const Store = configureStore({ reducer });

export default Store;
