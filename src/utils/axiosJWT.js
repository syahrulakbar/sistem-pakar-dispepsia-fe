import axios from "axios";

const AxiosJWTConfig = async () => {
  const api = import.meta.env.VITE_API_SERVER;
  let exp = localStorage.getItem("exp");

  const axiosJWT = axios.create({
    baseURL: api,
    withCredentials: true,
  });
  console.log(exp, "exp");

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (exp < currentDate.getTime()) {
        try {
          console.log("get new token");
          const response = await axios.get(`${api}/users/token`, { withCredentials: true });
          const { expire } = response.data.data;
          localStorage.setItem("exp", expire);
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
