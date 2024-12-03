import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Title: "UVCE",
  Description: "Lorem, ipsum dolor.",
};

const MetaData = createSlice({
  name: "MetaData",
  initialState,
  reducers: {
    updateMeta: (state, action) => {
      (state.Title = action.payload.title),
        (state.Description = action.payload.description);
    },
  },
});

export const { updateMeta } = MetaData.actions;
export default MetaData.reducer;
