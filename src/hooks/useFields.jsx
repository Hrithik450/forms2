import { useDispatch, useSelector } from "react-redux";
import { addField, deleteField, updateField } from "../Store/Slices/FieldSlice";

const UseFields = () => {
  const fields = useSelector((state) => state.fields.fields);
  const dispatch = useDispatch();

  return {
    fields,
    addField: (payload) => dispatch(addField(payload)),
    deleteField: (payload) => dispatch(deleteField(payload)),
    updateField: (payload) => dispatch(updateField(payload)),
  };
};

export default UseFields;
