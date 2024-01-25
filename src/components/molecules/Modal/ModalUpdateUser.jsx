import { CiLock } from "react-icons/ci";
import { Button, Input } from "../../atoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import Form from "../Form/Form";
import { updateAccount } from "../../../config/Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

export default function ModalUpdateUser() {
  const { user, isUpdate } = useSelector((state) => state.globalReducer);
  const dispatch = useDispatch();
  const { name, email, role } = user;

  const handleSubmit = async (values) => {
    try {
      values.id = user.id;
      if (values.password === "") delete values.password;
      await updateAccount(values);
      dispatch({ type: "IS_UPDATE", payload: !isUpdate });
      dispatch({ type: "SET_USER", payload: {} });
      dispatch({ type: "SET_MODAL", payload: false });

      formik.setSubmitting(false);
      formik.resetForm();
    } catch (error) {
      formik.setSubmitting(false);
    }
  };
  const handleCancel = () => {
    dispatch({ type: "SET_MODAL", payload: false });
    dispatch({ type: "SET_USER", payload: {} });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || "",
      email: email || "",
      role: role || 2,
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string(),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password must be match")
        .when("password", (password, schema) => {
          if (password[0] !== undefined) {
            return schema.required("Confirm Password is required");
          }
          return schema;
        }),
    }),
    onSubmit: handleSubmit,
  });

  const bodyContent = (
    <form onSubmit={formik.handleSubmit} className="px-6 py-2 flex flex-col gap-6">
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
      <div className="flex flex-col">
        <label htmlFor="role">Role</label>
        <select
          {...formik.getFieldProps("role")}
          name="role"
          id="role"
          className="border focus:border-sky-400 border-slate-300 w-full h-10 p-2 rounded-lg"
        >
          <option value="2">Admin</option>
          <option value="1">User</option>
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
  return <Modal title="Update Account" bodyContent={<Form bodyContent={bodyContent} />} />;
}
