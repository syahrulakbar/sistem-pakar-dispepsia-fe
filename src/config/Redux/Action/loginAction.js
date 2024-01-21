import Axios from "axios";
import toast from "react-hot-toast";
import AxiosJWTConfig from "../../../utils/axiosJWT";

const api = import.meta.env.VITE_API_SERVER;

export const loginAccount = async (data) => {
  try {
    await Axios.post(`${api}/login`, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    toast.success("Successfully Login");

    return Promise.resolve({
      message: "Success Login",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: errorMessage || "failed to login",
    });
  }
};

export const logoutAccount = async () => {
  try {
    await Axios.delete(`${api}/logout`, {
      withCredentials: true,
    });
    toast.success("Successfully Logout");

    return Promise.resolve({
      message: "Success Logout",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: errorMessage || "failed to logout",
    });
  }
};

export const checkAuth = async () => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.get(`/users/profile`);
    return Promise.resolve({
      message: "Success Authenticated",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Not Authenticated",
    });
  }
};
