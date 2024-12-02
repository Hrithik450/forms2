import { useDispatch, useSelector } from "react-redux";
import { handleField, handlePopUp } from "../Store/Slices/PopupSlice";

const UsePopUp = () => {
  const PopUpData = useSelector((state) => state.PopUp);
  const dispatch = useDispatch();

  return {
    PopUpData,
    handleField: (payload) => dispatch(handleField(payload)),
    handlePopUp: (payload) => dispatch(handlePopUp(payload)),
  };
};

export default UsePopUp;
