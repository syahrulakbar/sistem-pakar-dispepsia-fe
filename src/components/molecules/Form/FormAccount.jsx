import { CiLock } from "react-icons/ci";
import { Button, Input } from "../../atoms";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineMail } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import Form from "./Form";
import { updateAccount } from "../../../config/Redux/Action";
import Cookies from "js-cookie";

export default function FormAccount() {
  const name = Cookies.get("name");
  const email = Cookies.get("email");

  const handleLogin = async (values) => {
    try {
      if (values.password === "") delete values.password;
      await updateAccount(values);
      formik.setSubmitting(false);
      formik.resetForm();
    } catch (error) {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: name || "",
      email: email || "",
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
          if (password.length >= 1) {
            return schema;
          }
          return schema.required("Confirm Password is required");
        }),
    }),
    onSubmit: handleLogin,
  });

  const bodyContent = (
    <form onSubmit={formik.handleSubmit} className="p-6 flex flex-col gap-8">
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
