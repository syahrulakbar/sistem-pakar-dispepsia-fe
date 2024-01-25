import { useSelector } from "react-redux";
import ModalLogout from "./ModalLogout";
import ModalDelete from "./ModalDelete";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalAddUser from "./ModalAddUser";
import ModalDeleteBlog from "./ModalDeleteBlog";
import ModalUpdateBlog from "./ModalUpdateBlog";
import ModalAddBlog from "./ModalAddBlog";

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
    case "delete-blog":
      return <ModalDeleteBlog />;
    case "update-blog":
      return <ModalUpdateBlog />;
    case "add-blog":
      return <ModalAddBlog />;
    default:
      break;
  }
}
