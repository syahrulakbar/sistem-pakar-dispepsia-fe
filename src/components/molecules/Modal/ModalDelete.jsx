import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../atoms";
import Modal from "./Modal";
import { deleteAccount } from "../../../config/Redux/Action";

export default function ModalDelete() {
  const dispatch = useDispatch();
  const { user, isUpdate } = useSelector((state) => state.globalReducer);

  const handleCancel = async () => {
    dispatch({ type: "SET_MODAL", payload: false });
    dispatch({ type: "SET_USER", payload: {} });
  };
  const handleDelete = async () => {
    await deleteAccount(user.id);
    dispatch({ type: "IS_UPDATE", payload: !isUpdate });
    dispatch({ type: "SET_MODAL", payload: false });
    dispatch({ type: "SET_USER", payload: {} });
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
      title="Delete Account"
      subTitle="Are you sure you want to delete this account?"
      bodyContent={bodyContent}
    />
  );
}
