import { Button, Input } from "../../atoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { addBlog } from "../../../config/Redux/Action";
import { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import Editor from "react-simple-wysiwyg";

export default function ModalAddBlog() {
  const [imgPreview, setImgPreview] = useState(null);

  const { isUpdate } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      await addBlog(values);
      dispatch({ type: "IS_UPDATE", payload: !isUpdate });
      dispatch({ type: "SET_MODAL", payload: false });

      formik.setSubmitting(false);
      formik.resetForm();
    } catch (error) {
      formik.setSubmitting(false);
    }
  };
  const handleCancel = () => {
    dispatch({ type: "SET_MODAL", payload: false });
    dispatch({ type: "SET_BLOG", payload: {} });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      description: "",
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.mixed()
        .test("fileSize", "Image size maks 3 MB", (value) => {
          if (value.size) {
            const maxSize = 3 * 1024 * 1024;
            return value.size <= maxSize;
          }
          return true;
        })
        .test("imageType", "Only image files are allowed", (value) => {
          if (value.type) {
            const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
            return allowedTypes.includes(value.type);
          }
          return true;
        }),
    }),
    onSubmit: handleSubmit,
  });
  const handleChangeImage = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("image", file);
    setImgPreview(URL.createObjectURL(file));
  };

  const bodyContent = (
    <form onSubmit={formik.handleSubmit} className="px-6 py-2 flex flex-col gap-8">
      <div className="w-full flex flex-col justify-center">
        <div className="relative w-full h-[200px]">
          <div className="w-full border  border-slate-300 h-[200px] rounded-md absolute">
            <div className="w-full h-full flex justify-center items-center">
              <AiFillCamera size={30} />
            </div>
          </div>
          {imgPreview && (
            <img
              loading="lazy"
              className="object-cover object-center absolute inset-0 w-full h-full p-1 border rounded-md"
              src={imgPreview}
              alt="Bordered avatar"
            />
          )}
          <input
            accept="image/*"
            id="image"
            name="image"
            type="file"
            className="absolute z-10 p-0 h-[200px] opacity-0 cursor-pointer"
            onChange={(event) => handleChangeImage(event)}
          />
        </div>
        {formik.errors.image && <p className="text-red-500 text-sm">{formik.errors.image}</p>}
      </div>
      <Input id="title" label="Title" formik={formik} required />
      {/* <Input id="description" label="Description" formik={formik} required /> */}
      <Editor {...formik.getFieldProps("description")} id="description" />
      <div className="w-full flex xl:flex-row-reverse flex-col gap-5">
        <Button
          type="submit"
          label="Submit"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        />
        <Button
          outline
          type="button"
          label="Cancel"
          onClick={handleCancel}
          disabled={formik.isSubmitting}
        />
      </div>
    </form>
  );
  return <Modal title="Add New Blog" bodyContent={<Form bodyContent={bodyContent} />} />;
}
