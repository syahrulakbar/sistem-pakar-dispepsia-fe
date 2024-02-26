import { Button, Input } from "../../atoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "../Form/Form";
import { updatePenyakit } from "../../../config/Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import Editor from "react-simple-wysiwyg";

export default function ModalUpdatePenyakit() {
  const { isUpdate } = useSelector((state) => state.globalReducer);
  const { penyakit } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const { nama_penyakit, solusi } = penyakit;

  const handleSubmit = async (values) => {
    try {
      values.id = penyakit.id;
      await updatePenyakit(values);
      dispatch({ type: "IS_UPDATE", payload: !isUpdate });
      dispatch({ type: "SET_BLOG", payload: {} });
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
      nama_penyakit: nama_penyakit || "",
      solusi: solusi || "",
    },
    validationSchema: Yup.object({
      nama_penyakit: Yup.string().required("Nama Penyakit is required"),
      solusi: Yup.string().required("Solusi is required"),
    }),
    onSubmit: handleSubmit,
  });

  const bodyContent = (
    <form onSubmit={formik.handleSubmit} className="px-6 py-2 flex flex-col gap-8">
      <Input id="nama_penyakit" label="Nama Penyakit" formik={formik} required />
      <div>
        <label htmlFor="solusi">Solusi</label>
        <Editor {...formik.getFieldProps("solusi")} id="solusi" />
        {formik.touched.solusi && formik.errors.solusi && (
          <p className="text-red-500 text-sm">{formik.errors.solusi}</p>
        )}
      </div>
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
  return (
    <Modal
      title="Update Data Penyakit"
      bodyContent={<Form bodyContent={bodyContent} />}
      small={false}
    />
  );
}
