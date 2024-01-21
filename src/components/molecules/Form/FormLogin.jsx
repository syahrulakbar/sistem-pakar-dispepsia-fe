import { CiLock } from "react-icons/ci";
import { Button, Input } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { loginAccount } from "../../../config/Redux/Action";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineMail } from "react-icons/ai";
import Form from "./Form";

export default function FormLogin() {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      await loginAccount(values);
      formik.setSubmitting(false);
      formik.resetForm();
      navigate("/");
    } catch (error) {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: handleLogin,
  });

  const bodyContent = (
    <form onSubmit={formik.handleSubmit} className="p-6 flex flex-col gap-8">
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
        label="Password"
        placeholder="*********"
        formik={formik}
        formatPassword
        required
      />
      <Button
        type="submit"
        label="Login"
        onClick={formik.handleSubmit}
        disabled={formik.isSubmitting}
      />
    </form>
  );
  return <Form title="Sistem Pakar Diagnosa Dispepsia" bodyContent={bodyContent} />;
}
