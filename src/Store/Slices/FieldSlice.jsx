import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: [
    { id: 1, label: "Name" },
    { id: 2, label: "Date of Birth" },
    { id: 3, label: "Contact" },
    { id: 4, label: "Email" },
  ],
};

const FieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    addField: (state, action) => {
      const label = action.payload.label || "Name";
      const newField = { id: state.fields.length + 1, label: label };
      state.fields.push(newField);
    },
    deleteField: (state, action) => {
      const idToDelete = action.payload.id;
      state.fields = state.fields
        .filter((field) => field.id !== idToDelete)
        .map((field, index) => ({ ...field, id: index + 1 }));
    },
  },
});

export const { addField, deleteField } = FieldSlice.actions;
export default FieldSlice.reducer;
