import { useState } from "react";
import { VscEye, VscEyeClosed } from "react-icons/vsc";

export default function Input({ ...rest }) {
  const {
    id,
    label,
    placeholder,
    type = "text",
    required,
    disabled,
    formatPassword,
    icon,
    formik,
  } = rest;
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <div className="relative h-10 w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400">{icon}</div>
        <input
          {...formik.getFieldProps(id)}
          id={id}
          type={showPassword ? "text" : type}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className={`focus:outline-none  disabled:bg-gray-200 disabled:cursor-not-allowed border-2  w-full h-10 p-2 rounded-lg pl-8 ${
            formik.touched[id] && formik.errors[id]
              ? "bg-red-100 border-red-300 focus:border-red-400"
              : "focus:border-sky-400 border-slate-300"
          }`}
        />
        {formatPassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <VscEye /> : <VscEyeClosed />}
          </button>
        )}
        {formik.touched[id] && formik.errors[id] && (
          <div className="text-sm text-red-500 mt-1">{formik.errors[id]}</div>
        )}
      </div>
    </div>
  );
}
