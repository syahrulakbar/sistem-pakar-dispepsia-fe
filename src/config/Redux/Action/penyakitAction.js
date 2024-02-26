import toast from "react-hot-toast";
import AxiosJWTConfig from "../../../utils/axiosJWT";

export const getAllPenyakit = async (keyword) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    const response = await axiosJWT.get(`/penyakit?keyword=${keyword}`);
    return Promise.resolve({
      data: response.data.data,
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Get All Penyakit",
    });
  }
};

export const deletePenyakit = async (penyakitId) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.delete(`/penyakit/${penyakitId}`);
    toast.success("Successfully Delete Data Penyakit");
    return Promise.resolve({
      message: "Success Delete Data Penyakit",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Delete Data Penyakit",
    });
  }
};

export const addPenyakit = async (values) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.post(`/penyakit`, values);
    toast.success("Successfully Add Data Penyakit");
    return Promise.resolve({
      message: "Success Add Data Penyakit",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Add Data Penyakit",
    });
  }
};

export const updatePenyakit = async (values) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.patch(`/penyakit/${values.id}`, values);
    toast.success("Successfully Update Data Penyakit");
    return Promise.resolve({
      message: "Success Update Data Penyakit",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Update Data Penyakit",
    });
  }
};
