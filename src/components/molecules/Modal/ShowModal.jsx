import { useSelector } from "react-redux";
import ModalLogout from "./ModalLogout";
import ModalDelete from "./ModalDelete";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalAddUser from "./ModalAddUser";
import ModalDeleteBlog from "./ModalDeleteBlog";
import ModalUpdateBlog from "./ModalUpdateBlog";
import ModalAddBlog from "./ModalAddBlog";
import ModalDeletePenyakit from "./ModalDeletePenyakit";
import ModalAddPenyakit from "./ModalAddPenyakit";
import ModalUpdatePenyakit from "./ModalUpdatePenyakit";
import ModalDeleteGejala from "./ModalDeleteGejala";
import ModalAddGejala from "./ModalAddGejala";
import ModalUpdateGejala from "./ModalUpdateGejala";
import ModalDeleteRule from "./ModalDeleteRule";
import ModalAddRule from "./ModalAddRule";
import ModalUpdateRule from "./ModalUpdateRule";

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
    case "delete-penyakit":
      return <ModalDeletePenyakit />;
    case "add-penyakit":
      return <ModalAddPenyakit />;
    case "update-penyakit":
      return <ModalUpdatePenyakit />;
    case "delete-gejala":
      return <ModalDeleteGejala />;
    case "add-gejala":
      return <ModalAddGejala />;
    case "update-gejala":
      return <ModalUpdateGejala />;
    case "delete-rule":
      return <ModalDeleteRule />;
    case "add-rule":
      return <ModalAddRule />;
    case "update-rule":
      return <ModalUpdateRule />;
    default:
      break;
  }
}
