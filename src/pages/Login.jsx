import { FormLogin } from "../components";

export default function Login() {
  return (
    <div className="flex flex-row w-full h-screen ">
      <div className="hidden xl:w-2/3  xl:flex justify-center items-center">
        <img src="/bg-login.png" alt="bg login" className="object-cover w-full h-full " />
      </div>
      <div className="w-full xl:w-1/3 shadow-2xl bg-white flex justify-center items-center">
        <div className="w-full">
          <FormLogin />
        </div>
      </div>
    </div>
  );
}
