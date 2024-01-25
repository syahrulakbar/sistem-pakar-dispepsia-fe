import toast from "react-hot-toast";
import AxiosJWTConfig from "../../../utils/axiosJWT";

export const getAllBlog = async (search) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    const response = await axiosJWT.get(`/blog?keyword=${search}`);
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
export const deleteBlog = async (blogId) => {
  try {
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.delete(`/blog/${blogId}`);
    toast.success("Successfully Delete Blog");
    return Promise.resolve({
      message: "Success Delete Blog",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Delete Blog",
    });
  }
};

export const updateBlog = async (values) => {
  try {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("image", values.image);
    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.patch(`/blog/${values.id}`, formData);
    toast.success("Successfully Update Blog");
    return Promise.resolve({
      message: "Success Update Account",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Update Blog",
    });
  }
};
export const addBlog = async (values) => {
  try {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("image", values.image);

    const axiosJWT = await AxiosJWTConfig();
    await axiosJWT.post(`/blog`, formData);
    toast.success("Successfully Add Blog");
    return Promise.resolve({
      message: "Success Add Account",
    });
  } catch (error) {
    console.error(error);
    const errorMessage = error.response?.data.message;
    toast.error(errorMessage || "Server Error");
    return Promise.reject({
      message: "Failed Add Blog",
    });
  }
};
