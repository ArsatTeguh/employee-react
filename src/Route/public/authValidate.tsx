import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const ValidateAuth = () => {
  const token = Cookies.get("token");

  return !token ? <Outlet /> : <Navigate to={`/dashboard`} />;
};
