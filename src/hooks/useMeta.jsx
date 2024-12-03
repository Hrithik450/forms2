import { useDispatch, useSelector } from "react-redux";
import { updateMeta } from "../Store/Slices/MetaData";

const useMeta = () => {
  const Title = useSelector((state) => state.MetaData.Title);
  const Description = useSelector((state) => state.MetaData.Description);
  const dispatch = useDispatch();

  return {
    Title,
    Description,
    updateMeta: (payload) => dispatch(updateMeta(payload)),
  };
};

export default useMeta;
