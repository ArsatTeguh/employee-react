import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UseFetch } from "../../Common/useFetch";
import { useMediaQuery } from "../../Common/useQuery";
import ButtonNavbar from "../../Components/buttomNavbar";
import Sidebar from "../../Components/sidebar";
import { PrivateRoutes, PrivateRoutesHome } from "./privateRoute";

const roleRestrictedClient = import.meta.env.VITE_REACT_APP_ROLE2;
const roleRestrictedAdmin = import.meta.env.VITE_REACT_APP_ROLE1;

type JwtPayload = {
  id: number;
  email: string;
  role: string;
  exp: number;
  nbf: number;
  iat: number;
};

export const ValidatePrivate = () => {
  const token = Cookies.get("token");
  const location = useLocation();
  const { matches } = useMediaQuery("(max-width: 400px)");

  const { data, loading, onFetch } = UseFetch();

  if (!token) {
    return <Navigate to={`/login`} />;
  }

  const decoded = jwtDecode<JwtPayload>(token ?? "");

  const result = {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
  };

  const findMatchingRoute = (pathname: string) => {
    let matchedRoute: any;
    matchedRoute = PrivateRoutes.find((route) =>
      new RegExp(`^${route.path.replace(/:\w+/, "\\d+")}$`).test(pathname)
    );

    if (!matchedRoute) {
      matchedRoute = PrivateRoutesHome.find(
        (route) =>
          route.strict &&
          new RegExp(`^${route.strict.replace(/:\w+/, "\\d+")}$`).test(pathname)
      );
    }

    return matchedRoute;
  };

  const matchedRoute = findMatchingRoute(location.pathname);

  const shouldRedirect = () => {
    if (!matchedRoute) return false;

    if (result?.role === roleRestrictedAdmin) return false;

    if (result?.role === roleRestrictedClient) {
      return matchedRoute.role === roleRestrictedAdmin;
    }

    return true;
  };

  useEffect(() => {
    onFetch({ method: "GET", url: `/profile/${result?.id}` });
    return () => {};
  }, [result.id]);

  return (
    <div className="w-full ">
      {matches ? (
        <ButtonNavbar image={data} loading={loading} decoded={result} />
      ) : (
        <div className="w-64 fixed md:block hidden">
          <Sidebar decoded={result} image={data} loading={loading} />
        </div>
      )}
      <div className="lg:pl-64 lg:pr-3 bg-zinc-100 lg:py-3">
        {shouldRedirect() ? (
          <Navigate to="/attedance" />
        ) : (
          <div className="bg-base-100 pb-14 lg:pb-0 lg:border lg:rounded-lg lg:shadow-lg">
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};
