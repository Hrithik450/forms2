import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  fields: [
    { id: 1, label: "Name", name: "Name", type: "text", required: false },
    {
      id: 2,
      label: "Date of Birth",
      name: "DOB",
      type: "date",
      required: false,
    },
    {
      id: 3,
      label: "Contact",
      name: "Contact",
      type: "number",
      required: false,
    },
    { id: 4, label: "Email", name: "email", type: "email", required: false },
  ],
};

const FieldSlice = createSlice({
  name: "fields",
  initialState,
  reducers: {
    addField: (state, action) => {
      const id = action.payload.id;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);
      const newField = {
        ...state.fields[fieldIndex],
        id: state.fields.length + 1,
      };
      state.fields.push(newField);
    },

    deleteField: (state, action) => {
      const idToDelete = action.payload.id;
      state.fields = state.fields
        .filter((field) => field.id !== idToDelete)
        .map((field, index) => ({ ...field, id: index + 1 }));
    },

    updateField: (state, action) => {
      const { id, updates } = action.payload;
      const fieldIndex = state.fields.findIndex((field) => field.id === id);

      if (fieldIndex !== -1) {
        state.fields[fieldIndex] = {
          ...state.fields[fieldIndex],
          ...updates,
        };
      }
    },
  },
});

export const { addField, deleteField, updateField } = FieldSlice.actions;
export default FieldSlice.reducer;
