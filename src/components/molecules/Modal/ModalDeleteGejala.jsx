import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../atoms";
import Modal from "./Modal";
import { deleteGejala } from "../../../config/Redux/Action";

export default function ModalDeleteGejala() {
  const dispatch = useDispatch();
  const { gejala, isUpdate } = useSelector((state) => state.globalReducer);

  const handleCancel = async () => {
    dispatch({ type: "SET_MODAL", payload: false });
    dispatch({ type: "SET_GEJALA", payload: {} });
  };
  const handleDelete = async () => {
    await deleteGejala(gejala.id);
    dispatch({ type: "IS_UPDATE", payload: !isUpdate });
    dispatch({ type: "SET_MODAL", payload: false });
    dispatch({ type: "SET_GEJALA", payload: {} });
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
      title="Delete Data Gejala"
      subTitle="Are you sure you want to delete this data?"
      bodyContent={bodyContent}
    />
  );
}
