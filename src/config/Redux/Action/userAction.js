import toast from "react-hot-toast";
import AxiosJWTConfig from "../../../utils/axiosJWT";

export const updateAccount = async (values) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.patch(`/users/${values.id}`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Successfully Update Account");
    return Promise.resolve({
      message: "Success Update Account",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Update Account",
    });
  }
};
export const addAccount = async (values) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.post(`/register`, values, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    toast.success("Successfully Add Account");
    return Promise.resolve({
      message: "Success Add Account",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Add Account",
    });
  }
};

export const getAllAccount = async (search) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    const response = await axiosJWT.get(`/users?keyword=${search}`);
    return Promise.resolve({
      data: response.data.data,
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Get All Account",
    });
  }
};
export const getAccountById = async (userId) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    const response = await axiosJWT.get(`/users/${userId}`);

    return Promise.resolve({
      data: response.data.data,
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Get All Account",
    });
  }
};
export const checkIsAdmin = async () => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.get("/users/admin");
    return Promise.resolve({
      message: "Success check Admin",
    });
  } catch (error) {
    console.error(error);
    return Promise.reject({
      message: "Failed Get Account",
    });
  }
};
export const deleteAccount = async (userId) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.delete(`/users/${userId}`);
    toast.success("Successfully Delete Account");
    return Promise.resolve({
      message: "Success Delete Account",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Delete Account",
    });
  }
};
