import { useSelector } from "react-redux";
import ModalLogout from "./ModalLogout";

export default function ShowModal() {
  const { modal } = useSelector((state) => state.globalReducer);

  switch (modal) {
    case "logout":
      return <ModalLogout />;
    case "delete":
      return <ModalLogout />;
    case "edit":
      return <ModalLogout />;
    case "add":
      return <ModalLogout />;
    default:
      break;
  }
}
