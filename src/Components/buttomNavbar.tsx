import { NavLink } from "react-router-dom";
import { Path, PathEmployee } from "../Common";
import OnRouter from "../Common/onRouter";
import { IoIosLogOut } from "react-icons/io";
import Cookies from "js-cookie";
import { UseFetch } from "../Common/useFetch";

const roleRestrictedAdmin = import.meta.env.VITE_REACT_APP_ROLE1;

type Props = {
  decoded: {
    id: number;
    email: string;
    role: string;
  };
  image: any;
  loading: boolean;
};

function ButtonNavbar({ image, loading, decoded }: Props) {
  const { router } = OnRouter();
  const {onFetch, loading:load } = UseFetch();

  const handleLogout = () => {
    if (!load) {
      onFetch({ method: "POST", url: "/auth/logout" }).then(() => {
        Cookies.remove("token", { path: "/" });
        window.location.reload();
      });
    }
  };

  return (
    <div className="fixed bottom-0  left-0 z-50 w-full bg-white  border-t border-gray-200  ">
      <div
        className={`grid h-full max-w-lg ${
          decoded.role == roleRestrictedAdmin ? "grid-cols-6" : "grid-cols-5"
        } mx-auto font-medium`}
      >
        {decoded.role == roleRestrictedAdmin
          ? PathEmployee.map((value, i: number) => 
            i !== 0 && (
              <NavLink
              to={value.sub}
              key={value.path}
              style={{
                display: "inline-flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                padding: ".7rem 0rem .7rem 0rem",
              }}
              className={({ isActive, isPending }) =>
                isPending
                  ? "bg-black"
                  : isActive
                  ? " text-black   hover:bg-gray-100  group bg-zinc-200 "
                  : "text-zinc-500 hover:text-black"
              }
            >
              <p className={`text-[19px]  ${i == 3 && "text-[21px]"}`}>
                {value.icon}
              </p>
              <p className="text-[10px] capitalize font-normal">
                {value.path}
              </p>
            </NavLink>
            )
          )
          : Path.map((value, i) => (
              <NavLink
                to={value.sub}
                key={value.path}
                style={{
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  padding: ".7rem 0rem .7rem 0rem",
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? "bg-black"
                    : isActive
                    ? " text-black  hover:bg-gray-100 dark:hover:bg-gray-800 group bg-base-200 "
                    : "text-zinc-500 hover:text-black"
                }
              >
                <p className={`text-[20px]  ${i == 4 && "text-[21px]"}`}>
                  {value.icon}
                </p>
                <p className="text-[10px] capitalize font-normal">
                  {value.path}
                </p>
              </NavLink>
            ))}
        <div className="inline-flex flex-col items-center justify-center"
        onClick={handleLogout}
        >
        <p className={`text-[20px] text-zinc-500 hover:text-black`}>
            <IoIosLogOut/></p>
          <p className="text-[10px] text-zinc-500 hover:text-black  font-normal">
            Log out</p>
        </div>
        <div
          className=""
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {decoded.role !== roleRestrictedAdmin && (
            <div>
              {image !== "" && !loading ? (
                <img
                  onClick={() => router(`/profile/${decoded.id}`)}
                  loading="lazy"
                  src={`http://localhost:8000/${image}`}
                  alt="picture"
                  className="w-8 h-8 cursor-pointer  object-cover rounded-full"
                />
              ) : (
                <div
                  className="w-8 h-8  cursor-pointer rounded-full relative bg-zinc-200"
                  onClick={() => router(`/profile/${decoded.id}`)}
                >
                  <div className="flex justify-center items-center w-full h-full">
                    <p className="capitalize text-s lg:text-xl">{decoded.email[0]}</p>
                    <p className="capitalize text-sm lg:text-xl">{decoded.email[1]}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ButtonNavbar;
