import toast from "react-hot-toast";
import AxiosJWTConfig from "../../../utils/axiosJWT";
import Cookies from "js-cookie";

const userId = Cookies.get("userId");

export const updateAccount = async (values) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.patch(`/users/${userId}`, values, {
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
