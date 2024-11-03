import { useEffect, useState } from "react";
import logo from "/public/logo.svg";
import picture from "/public/teguh.jpg";
import { MdSpaceDashboard } from "react-icons/md";
import { RiQrScan2Fill,RiEmpathizeFill  } from "react-icons/ri";
import { FaFileAlt, FaMoneyCheck  } from "react-icons/fa";

type TypePath = {
  path: string;
  sub: Array<string>;
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
    sub: ["Checkin", "checkout"],
    icon : < MdSpaceDashboard />
  },
  {
    path: "attedance",
    sub: ["Checkin", "checkout"],
    icon: <RiQrScan2Fill  />
  },
  {
    path: "Employees",
    sub: ["Checkin", "checkout"],
    icon: <RiEmpathizeFill />
  },
  {
    path: "leaves",
    sub: ["Proces", "add"],
    icon: < FaFileAlt />
  },
  {
    path: "payrolls",
    sub: ["Proces", "add"],
    icon : <FaMoneyCheck  />
  },
]

function Sidebar({ decoded }: props) {
  const [isPath, setIsPath] = useState<string>("master");

  return (
    <div className="bg-[#0B192C] text-white flex flex-col pt-6 gap-10 items-center h-screen overflow-y-hidden w-full ">
      <div className="flex gap-2 items-center pt-4">
        <img src={logo} alt="logo" className="w-8 h-8" />
        <p className="font-bold text-white text-lg">Logoipsum</p>
      </div>
      <div className="image flex flex-col gap-2 justify-center items-center ">
        <img
          src={picture}
          alt="picture"
          className="w-16 h-16 object-cover rounded-full"
        />

        <div className="flex flex-col gap-0 items-center">
          <p className="text-lg font-medium capitalize">{decoded.email.split("@gmail.com")}</p>
          <p className="text-zinc-400 capitalize">{decoded.role}</p>
        </div>
      </div>

      <ul className="menu capitalize flex flex-col gap-7">
        {PathEmployee?.map((value: TypePath) => (
          <li
          key={value.path}
            className={`${
              isPath == value.path
                ? "font-medium  tex-black"
                : "font-normal text-zinc-600 hover:text-zinc-200 "
            } cursor-pointer transition-all ease-in-out flex items-center gap-3 `}
          >
            <p className="text-xl ">{value.icon}</p>
            <p>{value.path}</p>
          </li>
        ))}
      </ul>
      <div className="buttom flex p-6 items-end h-full text-zinc-500">
        <span>Sign out</span>
      </div>
    </div>
  );
}
export default Sidebar;
