import { useEffect, useState } from "react";
import { GrScan } from "react-icons/gr";
import { MdOutlinePermIdentity, MdOutlineSpaceDashboard } from "react-icons/md";
import { PiProjectorScreen } from "react-icons/pi";
import { TbSubtask } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import OnRouter from "../Common/onRouter";
import { IoDocumentOutline } from "react-icons/io5";
import { UseFetch } from "../Common/useFetch";

type TypePath = {
  path: string;
  sub: string;
  icon?: any
};

type props = {
  decoded: {
    id: number;
    email: string;
    role: string;
  };
};

const PathEmployee = [
  {
    path: "master",
    sub: "/master",
    icon : < MdOutlineSpaceDashboard />
  },
  {
    path: "attedance",
    sub: "/attedance",
    icon: <GrScan  />
  },
  {
    path: "task",
    sub: "/task",
    icon : <TbSubtask  />
  },
  {
    path: "project",
    sub: "/project",
    icon: <PiProjectorScreen />
  },
  {
    path: "employee",
    sub: "/employee",
    icon: <MdOutlinePermIdentity />
  },
  {
    path: "leave",
    sub: "/leave",
    icon: < IoDocumentOutline />
  }

]

function Sidebar({ decoded }: props) {
  const location = useLocation()
  function getHomePath(path: string) { 
    const parts = path.split('/');
    return `/${parts[1]}`;
  }
  const [isPath, setIsPath] = useState<string>(getHomePath(location.pathname));
  const {data, loading, onFetch} = UseFetch()
  const { router } = OnRouter();
 
  const hanleNavigate = (path: string) => {
    setIsPath(path)
    router(path)
  }

  useEffect(() => {
    onFetch({method:"GET", url:`/profile/${decoded?.id}`})
    return () => {}
  },[decoded.id])

  return (
    <div className="bg-zinc-100  text-black  flex flex-col pt-6 gap-10 items-center h-screen overflow-y-hidden w-full ">
      <div className="flex gap-2 items-center pt-4">
        {/* <img src={logo} alt="logo" className="w-8 h-8" /> */}
        <p className="font-bold text-black text-lg">Logoipsum</p>
      </div>
      <div className="image  flex flex-col gap-2 justify-center items-center ">
        {data !== "" && !loading ? (
          <img
          onClick={() => router(`/profile/${decoded.id}`)}
          loading="lazy"
          src={`http://localhost:8000/${data}`}
          alt="picture"
          className="w-16 cursor-pointer h-16 object-cover rounded-full"
        />
        ): (
          <div className="h-16 w-16 cursor-pointer rounded-full relative bg-zinc-200"
          onClick={() => router(`/profile/${decoded.id}`)}
          >
            <div className="flex justify-center items-center w-full h-full">
            <p className="capitalize text-xl">{decoded.email[0]}</p>
            <p className="capitalize text-xl">{decoded.email[1]}</p>
            </div>

          </div>
        )}

        <div className="flex flex-col gap-0 items-center">
          <p className="text-lg font-medium capitalize">{decoded.email.split("@gmail.com")}</p>
          <p className="text-zinc-600 capitalize">{decoded.role}</p>
        </div>
      </div>

      <ul className="menu capitalize flex flex-col gap-2  ">
        {PathEmployee?.map((value: TypePath, i) => (
          <div
          key={value.path}
            className={`${
              isPath == value.sub
                ? "font-medium  text-black  bg-base-100"
                : "font-medium text-zinc-500 hover:text-black "
            } cursor-pointer transition-all ease-in-out rounded-md flex  gap-3  py-2  px-16 `}
             onClick={() => hanleNavigate(value.sub)}
          >
            <p className={`text-[19px]  ${i == 4 && "text-[21px]"}`}>{value.icon}</p>
            <p>{value.path}</p>
          </div>
        ))}
      </ul>
      <div className="buttom flex p-6 items-end h-full ">
        <p className=" border py-2 px-8 rounded bg-primary/90 cursor-pointer hover:bg-primary text-base-100">Sign out</p>
      </div>
    </div>
  );
}
export default Sidebar;
