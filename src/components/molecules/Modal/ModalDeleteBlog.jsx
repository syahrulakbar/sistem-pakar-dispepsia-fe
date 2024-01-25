import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../atoms";
import Modal from "./Modal";
import { deleteBlog } from "../../../config/Redux/Action";

export default function ModalDeleteBlog() {
  const dispatch = useDispatch();
  const { isUpdate } = useSelector((state) => state.globalReducer);
  const { blog } = useSelector((state) => state.blogReducer);
  const handleCancel = async () => {
    dispatch({ type: "SET_MODAL", payload: false });
    dispatch({ type: "SET_BLOG", payload: {} });
  };
  const handleDelete = async () => {
    await deleteBlog(blog.id).then(() => {
      dispatch({ type: "IS_UPDATE", payload: !isUpdate });
      dispatch({ type: "SET_MODAL", payload: false });
      dispatch({ type: "SET_BLOG", payload: {} });
    });
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
      title="Delete Blog"
      subTitle="Are you sure you want to delete this blog?"
      bodyContent={bodyContent}
    />
  );
}
