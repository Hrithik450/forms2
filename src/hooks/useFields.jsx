import { useDispatch, useSelector } from "react-redux";
import { addField, deleteField } from "../Store/Slices/FieldSlice";

const UseFields = () => {
  const fields = useSelector((state) => state.fields.fields);
  const dispatch = useDispatch();

  return {
    fields,
    addField: (payload) => dispatch(addField(payload)),
    deleteField: (payload) => dispatch(deleteField(payload)),
  };
};

export default UseFields;
