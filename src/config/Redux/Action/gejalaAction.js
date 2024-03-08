import toast from "react-hot-toast";
import AxiosJWTConfig from "../../../utils/axiosJWT";

export const getAllGejala = async (search = "") => {
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

export const deleteGejala = async (gejalaId) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.delete(`/gejala/${gejalaId}`);
    toast.success("Successfully Delete Data Gejala");
    return Promise.resolve({
      message: "Success Delete Data Gejala",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Delete Data Gejala",
    });
  }
};

export const addGejala = async (values) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.post(`/gejala`, values);
    toast.success("Successfully Add Data Gejala");
    return Promise.resolve({
      message: "Success Add Data Gejala",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Add Data Gejala",
    });
  }
};

export const updateGejala = async (values) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.patch(`/gejala/${values.id}`, values);
    toast.success("Successfully Update Data Gejala");
    return Promise.resolve({
      message: "Success Update Data Gejala",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Update Data Gejala",
    });
  }
};
