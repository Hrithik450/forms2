import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  FieldType: {},
  Data: {},
  popUp: false,
};

const PopupSlice = createSlice({
  name: "PopUp",
  initialState,
  reducers: {
    handleField: (state, action) => {
      state.FieldType = {
        ...action.payload,
        icon: action.payload.icon,
      };
    },
    handlePopUp: (state, action) => {
      state.popUp = action.payload.setPopUp;
      state.Data = {
        ...action.payload.data,
      };
    },
  },
});

export const { handleField, handlePopUp } = PopupSlice.actions;
export default PopupSlice.reducer;
