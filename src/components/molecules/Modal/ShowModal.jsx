import { useSelector } from "react-redux";
import ModalLogout from "./ModalLogout";
import ModalDelete from "./ModalDelete";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalAddUser from "./ModalAddUser";

export default function ShowModal() {
  const { modal } = useSelector((state) => state.globalReducer);

  switch (modal) {
    case "logout":
      return <ModalLogout />;
    case "delete-user":
      return <ModalDelete />;
    case "update-user":
      return <ModalUpdateUser />;
    case "setting-user":
      return <ModalUpdateUser />;
    case "add-user":
      return <ModalAddUser />;
    default:
      break;
  }
}
