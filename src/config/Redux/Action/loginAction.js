import Axios from "axios";
import toast from "react-hot-toast";

const api = import.meta.env.VITE_API_SERVER;

export const loginAccount = async (data) => {
  try {
    await Axios.post(`${api}/login`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Logged in successfully");

    return Promise.resolve({
      message: "Success Login",
    });
  } catch (error) {
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: errorMessage || "failed to login",
    });
  }
};
