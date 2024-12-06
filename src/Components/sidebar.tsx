import Cookies from "js-cookie";
import { NavLink } from "react-router-dom";
import { Path, PathEmployee } from "../Common";
import OnRouter from "../Common/onRouter";
import { UseFetch } from "../Common/useFetch";
import logo from "/logoipsum-256.svg"

type TypePath = {
  path: string;
  sub: string;
  icon?: any;
};

type props = {
  decoded: {
    id: number;
    email: string;
    role: string;
  };
  image: any
loading: boolean
};

const roleRestrictedAdmin = import.meta.env.VITE_REACT_APP_ROLE1

function Sidebar({image, loading, decoded }: props) {
  const {onFetch } = UseFetch();
  const { router } = OnRouter();

  const handleLogout = () => {
    onFetch({ method: "POST", url: "/auth/logout" }).then(() => {
      Cookies.remove("token", { path: "/" });
      window.location.reload();
    });
  };



  return (
    <div className="bg-zinc-100  text-black  flex flex-col pt-6 gap-10 items-center h-screen overflow-y-hidden w-full ">
      <div className="flex gap-2 items-center pt-4">

      <img
            onClick={() => router(`/profile/${decoded.id}`)}
            loading="lazy"
            src={logo}
            alt="picture"
            className=""
          />
      </div>
      <div className="image  flex flex-col gap-2 justify-center items-center ">
        {image !== "" && !loading ? (
          <img
            onClick={() => router(`/profile/${decoded.id}`)}
            loading="lazy"
            src={`http://localhost:8000/${image}`}
            alt="picture"
            className="w-16 cursor-pointer h-16 object-cover rounded-full"
          />
        ) : (
          <div
            className="h-16 w-16 cursor-pointer rounded-full relative bg-zinc-200"
            onClick={() => router(`/profile/${decoded.id}`)}
          >
            <div className="flex justify-center items-center w-full h-full">
              <p className="capitalize text-xl">{decoded.email[0]}</p>
              <p className="capitalize text-xl">{decoded.email[1]}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-0 items-center">
          <p className="text-lg font-medium capitalize">
            {decoded.email.split("@gmail.com")}
          </p>
          <p className="text-zinc-600 capitalize">{decoded.role}</p>
        </div>
      </div>

      <ul className="menu capitalize flex flex-col gap-2  ">
        {decoded.role == roleRestrictedAdmin
          ? PathEmployee?.map((value: TypePath, i) => (
              <NavLink
                to={value.sub}
                key={value.path}
                style={{
                  padding: "0.5rem 4rem 0.5rem 4rem",
                  display: "flex",
                  gap: "0.75rem",
                  borderRadius: "0.375rem",
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "bg-black"
                    : isActive
                    ? "font-medium  text-black  bg-base-100 "
                    : "font-medium text-zinc-500 hover:text-black"
                }
              >
                <p className={`text-[19px]  ${i == 4 && "text-[21px]"}`}>
                  {value.icon}
                </p>
                <p>{value.path}</p>
              </NavLink>
            ))
          : Path?.map((value: TypePath, i) => (
              <NavLink
                to={value.sub}
                key={value.path}
                style={{
                  padding: "0.5rem 4rem 0.5rem 4rem",
                  display: "flex",
                  gap: "0.75rem",
                  borderRadius: "0.375rem",
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "bg-black"
                    : isActive
                    ? "font-medium  text-black  bg-base-100 "
                    : "font-medium text-zinc-500 hover:text-black"
                }
              >
                <p className={`text-[19px]  ${i == 4 && "text-[21px]"}`}>
                  {value.icon}
                </p>
                <p>{value.path}</p>
              </NavLink>
            ))}
      </ul>
      <div className="buttom flex p-6 items-end h-full ">
        <p
          className=" border py-2 px-8 rounded bg-primary/90 cursor-pointer hover:bg-primary text-base-100"
          onClick={handleLogout}
        >
          Sign out
        </p>
      </div>
    </div>
  );
}
export default Sidebar;
