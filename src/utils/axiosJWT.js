import axios from "axios";
import Cookies from "js-cookie";

const AxiosJWTConfig = async () => {
  const api = import.meta.env.VITE_API_SERVER;
  let exp = Cookies.get("expire");

  const axiosJWT = axios.create({
    baseURL: api,
    withCredentials: true,
  });

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (exp < currentDate.getTime()) {
        try {
          await axios.get(`${api}/users/token`, { withCredentials: true });
        } catch (error) {
          return Promise.reject(error);
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return axiosJWT;
};

export default AxiosJWTConfig;
