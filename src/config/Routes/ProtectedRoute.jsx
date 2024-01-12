import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "../../components";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const refreshToken = Cookies.get("refreshToken");

    setTimeout(() => {
      if (refreshToken) {
        setIsAuth(true);
      } else {
        setIsAuth(false);
        toast.error("Please login to continue");
      }
      setIsLoading(false);
    }, 5000);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? children : <Navigate to="/login" />;
}
ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
