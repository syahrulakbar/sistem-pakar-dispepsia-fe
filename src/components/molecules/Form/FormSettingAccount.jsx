import { CiLock } from "react-icons/ci";
import { Button, Input } from "../../atoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import Form from "./Form";
import { getAccountById, updateAccount } from "../../../config/Redux/Action";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function FormSettingAccount() {
  const { isUpdate } = useSelector((state) => state.globalReducer);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (values) => {
    try {
      if (values.password === "") delete values.password;
      values.id = userId;
      await updateAccount(values);
      dispatch({ type: "IS_UPDATE", payload: !isUpdate });
      dispatch({ type: "SET_MODAL", payload: false });

      formik.setSubmitting(false);
      formik.resetForm();
    } catch (error) {
      formik.setSubmitting(false);
    }
  };
  const getCurrentUser = async () => {
    try {
      const res = await getAccountById(userId);
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, [isUpdate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: user.name || "",
      email: user.email || "",
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
    <form onSubmit={formik.handleSubmit} className="px-6 py-2 flex flex-col gap-8">
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
      <Button
        type="submit"
        label="Submit"
        onClick={formik.handleSubmit}
        disabled={formik.isSubmitting}
      />
    </form>
  );
  return <Form bodyContent={bodyContent} />;
}
