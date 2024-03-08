import { Button, Input } from "../../atoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "../Form/Form";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { updateGejala } from "../../../config/Redux/Action";

export default function ModalUpdateGejala() {
  const { isUpdate, gejalas, gejala } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const { nama_gejala, pertanyaan, ya_tanya, tidak_tanya, mulai, selesai } = gejala;

  const handleSubmit = async (values) => {
    try {
      values.id = gejala.id;
      const transformedValues = {
        ...values,
        mulai: values.mulai === "true" ? true : false,
        selesai: values.selesai === "true" ? true : false,
        ya_tanya: values.ya_tanya === "" ? null : parseInt(values.ya_tanya),
        tidak_tanya: values.tidak_tanya === "" ? null : parseInt(values.tidak_tanya),
      };
      await updateGejala(transformedValues);
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
      nama_gejala: nama_gejala || "",
      pertanyaan: pertanyaan || "",
      ya_tanya: ya_tanya || "",
      tidak_tanya: tidak_tanya || "",
      mulai: mulai || false,
      selesai: selesai || false,
    },
    validationSchema: Yup.object({
      nama_gejala: Yup.string().required("Nama Gejala is required"),
      pertanyaan: Yup.string().required("Pertanyaan is required"),
    }),
    onSubmit: handleSubmit,
  });

  const bodyContent = (
    <form onSubmit={formik.handleSubmit} className="px-6 py-2 flex flex-col gap-5">
      <Input id="nama_gejala" label="Nama Gejala" placeholder="Mual" formik={formik} required />
      <Input
        id="pertanyaan"
        label="Pertanyaan"
        placeholder="Apakah kamu mengalami mual ?"
        formik={formik}
        required
      />
      <div>
        <label htmlFor="ya_tanya">Ya Tanya</label>
        <select
          name="ya_tanya"
          id="tidak_tanya"
          {...formik.getFieldProps("ya_tanya")}
          className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full h-10 p-2 rounded-lg   ${
            formik.touched.ya_tanya && formik.errors.ya_tanya
              ? "bg-red-100 border-red-300 focus:border-red-400"
              : "focus:border-sky-400 border-slate-300"
          }`}
        >
          <option value="">Tidak Ada</option>
          {gejalas?.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nama_gejala}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="tidak_tanya">Tidak Tanya</label>
        <select
          name="tidak_tanya"
          id="tidak_tanya"
          {...formik.getFieldProps("tidak_tanya")}
          className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full h-10 p-2 rounded-lg   ${
            formik.touched.tidak_tanya && formik.errors.tidak_tanya
              ? "bg-red-100 border-red-300 focus:border-red-400"
              : "focus:border-sky-400 border-slate-300"
          }`}
        >
          <option value="">Tidak Ada</option>
          {gejalas?.map((g) => (
            <option key={g.id} value={g.id}>
              {g.nama_gejala}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="mulai">Mulai</label>
        <select
          name="mulai"
          id="mulai"
          {...formik.getFieldProps("mulai")}
          className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full h-10 p-2 rounded-lg   ${
            formik.touched.mulai && formik.errors.mulai
              ? "bg-red-100 border-red-300 focus:border-red-400"
              : "focus:border-sky-400 border-slate-300"
          }`}
        >
          <option value={true}>Iya</option>
          <option value={false}>Tidak</option>
        </select>
      </div>
      <div>
        <label htmlFor="selesai">Selesai</label>
        <select
          name="selesai"
          id="selesai"
          {...formik.getFieldProps("selesai")}
          className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full h-10 p-2 rounded-lg   ${
            formik.touched.selesai && formik.errors.selesai
              ? "bg-red-100 border-red-300 focus:border-red-400"
              : "focus:border-sky-400 border-slate-300"
          }`}
        >
          <option value={true}>Iya</option>
          <option value={false}>Tidak</option>
        </select>
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
      title="Update Data Gejala"
      bodyContent={<Form bodyContent={bodyContent} />}
      small={false}
    />
  );
}
