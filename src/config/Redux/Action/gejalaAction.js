import toast from "react-hot-toast";
import AxiosJWTConfig from "../../../utils/axiosJWT";

export const getAllBlog = async (search) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    const response = await axiosJWT.get(`/gejala?keyword=${search}`);
    return Promise.resolve({
      data: response.data.data,
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Get All Data Gejala",
    });
  }
};
