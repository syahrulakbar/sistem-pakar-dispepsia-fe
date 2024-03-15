import { CiLock } from "react-icons/ci";
import { Button, Input } from "../../atoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import Form from "../Form/Form";
import { addAccount } from "../../../config/Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

export default function ModalAddUser() {
  const { isUpdate } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();

  const handleSubmit = async (values) => {
    try {
      await addAccount(values);
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
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "1",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string().required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password must be match")
        .required("Confrim Password is required"),
    }),
    onSubmit: handleSubmit,
  });

  const bodyContent = (
    <form onSubmit={formik.handleSubmit} className="px-6 py-2 flex flex-col gap-5">
      <Input
        icon={<CiUser />}
        id="name"
        label="Name"
        placeholder="John Doe"
        formik={formik}
        required
      />
      <Input
        icon={<AiOutlineMail />}
        id="email"
        label="Email"
        placeholder="johndoe@gmail.com"
        formik={formik}
        required
      />
      <div>
        <label htmlFor="role">Role</label>
        <select
          name="role"
          id="role"
          {...formik.getFieldProps("role")}
          className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full h-10 p-2 rounded-lg   ${
            formik.touched.role && formik.errors.role
              ? "bg-red-100 border-red-300 focus:border-red-400"
              : "focus:border-sky-400 border-slate-300"
          }`}
        >
          <option value="1">User</option>
          <option value="2">Admin</option>
        </select>
      </div>
      <Input
        icon={<CiLock />}
        id="password"
        type="password"
        label="New Password"
        placeholder="*********"
        formik={formik}
        formatPassword
        required
      />
      <Input
        icon={<CiLock />}
        id="confirmPassword"
        type="password"
        label="Confirm New Password"
        placeholder="*********"
        formik={formik}
        formatPassword
        required
      />
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

  return <Modal title="Add Account" bodyContent={<Form bodyContent={bodyContent} />} />;
}
