import { useFormik } from "formik";
import * as Yup from "yup";
import { Input, Button } from "../components";
import { AiOutlineMail } from "react-icons/ai";
import { CiLock } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { loginAccount } from "../config/Redux/Action";

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    try {
      await loginAccount(values);
      formik.setSubmitting(false);
      formik.resetForm();
      navigate("/dashboard");
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

  return (
    <div className="flex flex-row w-full h-screen ">
      <div className="hidden xl:w-2/3  xl:flex justify-center items-center">
        <img src="/bg-login.png" alt="bg login" className="object-cover w-full h-full " />
      </div>
      <div className="w-full xl:w-1/3 shadow-2xl bg-white">
        <div className="flex flex-col h-screen justify-center">
          <h1 className="font-semibold text-2xl text-center">Sistem Pakar Diagnosa Dispepsia</h1>
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
        </div>
      </div>
    </div>
  );
}
