import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

export const ValidateAuth = () => {
  const token = Cookies.get("token"); // kebalik

  return (
    <>
    {!token ? <Outlet /> : <Navigate to={`/attedance`} />}
    </>
  )
};
