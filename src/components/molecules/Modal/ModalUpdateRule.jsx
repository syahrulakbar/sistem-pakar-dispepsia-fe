import { Button } from "../../atoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { updateRule } from "../../../config/Redux/Action";
import Select from "react-select";

export default function ModalUpdateRule() {
  const { isUpdate, gejalas, penyakits, rule } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  const optionGejala = gejalas.map((g) => ({ value: g.id, label: g.nama_gejala }));

  const handleSubmit = async (values) => {
    try {
      values.id = rule.id;
      await updateRule(values);
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
      penyakit_id: rule?.penyakits.id || "",
      gejala_ids: rule.gejalas.map((gejala) => gejala.id) || "",
    },
    validationSchema: Yup.object({
      penyakit_id: Yup.string().required("Nama Penyakit is required"),
      gejala_ids: Yup.array().min(1, "Minimal 1 Gejala").required("Gejala is required"),
    }),
    onSubmit: handleSubmit,
  });

  const bodyContent = (
    <form onSubmit={formik.handleSubmit} className="px-6 py-2 flex flex-col gap-5">
      <div>
        <label htmlFor="penyakit_id">Nama Penyakit</label>
        <select
          name="penyakit_id"
          id="penyakit_id"
          {...formik.getFieldProps("penyakit_id")}
          className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full h-10 p-2 rounded-lg   ${
            formik.touched.penyakit_id && formik.errors.penyakit_id
              ? "bg-red-100 border-red-300 focus:border-red-400"
              : "focus:border-sky-400 border-slate-300"
          }`}
        >
          {penyakits?.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nama_penyakit}
            </option>
          ))}
        </select>
        {formik.touched.penyakit_id && formik.errors.penyakit_id && (
          <div className="text-sm text-red-500 mt-1">{formik.errors.penyakit_id}</div>
        )}
      </div>
      <div>
        <label htmlFor="gejala_ids">Gejala</label>
        <Select
          name="gejala_ids"
          id="gejala_ids"
          value={optionGejala.filter((g) => formik.values.gejala_ids.includes(g.value))}
          onChange={(e) =>
            formik.setFieldValue(
              "gejala_ids",
              e.map((x) => x.value),
            )
          }
          options={optionGejala}
          isMulti
          required
        />

        {formik.touched.gejala_ids && formik.errors.gejala_ids && (
          <div className="text-sm text-red-500 mt-1">{formik.errors.gejala_ids}</div>
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
      title="Add New Data Rule"
      bodyContent={<Form bodyContent={bodyContent} />}
      small={false}
    />
  );
}
