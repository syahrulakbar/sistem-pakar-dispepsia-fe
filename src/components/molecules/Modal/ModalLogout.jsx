import { useDispatch } from "react-redux";
import { Button } from "../../atoms";
import Modal from "./Modal";
import { logoutAccount } from "../../../config/Redux/Action";
import { useNavigate } from "react-router-dom";

export default function ModalLogout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    dispatch({ type: "SET_MODAL", payload: false });
    await logoutAccount().then(() => {
      navigate("/login");
    });
  };
  const handleCancel = () => {
    dispatch({ type: "SET_MODAL", payload: false });
  };

  const bodyContent = (
    <div className="w-full flex flex-row gap-2">
      <Button outline type="button" label="Cancel" onClick={handleCancel} />
      <Button type="button" label="Yes" onClick={handleLogout} />
    </div>
  );
  return (
    <Modal
      gap
      title="Logout"
      subTitle="You will be returned to the login screen"
      bodyContent={bodyContent}
    />
  );
}
