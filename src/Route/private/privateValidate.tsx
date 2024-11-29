import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import ButtonNavbar from "../../Components/buttomNavbar";
import Sidebar from "../../Components/sidebar";
import { PrivateRoutes } from "./privateRoute";



type JwtPayload = {
  id: number;
  email: string;
  role: string;
  exp: number;
  nbf: number;
  iat: number;
};

const roleRestricted = import.meta.env.VITE_REACT_APP_ROLE2

export const ValidatePrivate = () => {
  const token = Cookies.get("token"); // kebalik
  const location = useLocation();

  if (!token) {
    return <Navigate to={`/login`} />;
  }


  const decoded = jwtDecode<JwtPayload>(token ?? "");

  const data = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role, // hr | karyawan
  };

  const notAccess = PrivateRoutes.filter((route) => route.role != roleRestricted)

  return (
    <div className="w-full  ">
      <div className="w-64 fixed md:block hidden">
        <Sidebar decoded={data} />
      </div>
      <div className="relative md:hidden ">
        <ButtonNavbar />
      </div>
      <div className="lg:pl-64 lg:pr-3  bg-zinc-100   lg:py-3  ">
       {notAccess.find(e => e.path.includes(location.pathname)) && data.role == roleRestricted ? (
        <Navigate to="/attedance" />
       ) : (
        <div className=" bg-base-100 pb-14 lg:pb-0 lg:border lg:rounded-lg  lg:shadow-lg">
          <Outlet />
        </div>
       )}
      </div>
    </div>
  );
};
