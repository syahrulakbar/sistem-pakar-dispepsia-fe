import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../atoms";
import Modal from "./Modal";
import { deletePenyakit } from "../../../config/Redux/Action";

export default function ModalDeletePenyakit() {
  const dispatch = useDispatch();
  const { penyakit, isUpdate } = useSelector((state) => state.globalReducer);

  const handleCancel = async () => {
    dispatch({ type: "SET_MODAL", payload: false });
    dispatch({ type: "SET_PENYAKIT", payload: {} });
  };
  const handleDelete = async () => {
    await deletePenyakit(penyakit.id);
    dispatch({ type: "IS_UPDATE", payload: !isUpdate });
    dispatch({ type: "SET_MODAL", payload: false });
    dispatch({ type: "SET_PENYAKIT", payload: {} });
  };

  const bodyContent = (
    <div className="w-full flex flex-row gap-2">
      <Button outline type="button" label="Cancel" onClick={handleCancel} />
      <Button type="button" label="Delete" onClick={handleDelete} />
    </div>
  );
  return (
    <Modal
      gap
      title="Delete Data Penyakit"
      subTitle="Are you sure you want to delete this data?"
      bodyContent={bodyContent}
    />
  );
}
