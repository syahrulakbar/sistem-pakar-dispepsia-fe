import toast from "react-hot-toast";
import AxiosJWTConfig from "../../../utils/axiosJWT";

export const getAllRule = async (search) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    const response = await axiosJWT.get(`/rule?keyword=${search}`);
    return Promise.resolve({
      data: response.data.data,
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Get All Data Rule",
    });
  }
};

export const deleteRule = async (ruleId) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.delete(`/rule/${ruleId}`);
    toast.success("Successfully Delete Data Rule");
    return Promise.resolve({
      message: "Success Delete Data Rule",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Delete Data Rule",
    });
  }
};

export const addRule = async (values) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.post(`/rule`, values);
    toast.success("Successfully Add Data Rule");
    return Promise.resolve({
      message: "Success Add Data Rule",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Add Data Rule",
    });
  }
};

export const updateRule = async (values) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.patch(`/rule/${values.id}`, values);
    toast.success("Successfully Update Data Rule");
    return Promise.resolve({
      message: "Success Update Data Rule",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Update Data Rule",
    });
  }
};
