import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "../../components";
import PropTypes from "prop-types";
import { checkIsAdmin } from "../Redux/Action";

export default function ProtectedRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const checkAUTH = async () => {
    setIsLoading(true);
    try {
      await checkIsAdmin();
      setIsAuth(true);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsAuth(false);
    }
  };

  useEffect(() => {
    checkAUTH();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return isAuth ? children : <Navigate to="/login" />;
}
ProtectedRoute.propTypes = {
  children: PropTypes.element.isRequired,
};
