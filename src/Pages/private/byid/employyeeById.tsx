type Props = {};
import { FaFileAlt } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { PiProjectorScreen, PiWallet } from "react-icons/pi";
import { Outlet, useParams } from "react-router-dom";
import UseLink from "../../../Common/useLink";


const general = [
  { name: "Wallet", path: "/employee/wallet",icon:<PiWallet/> },
  { name: "Project", path: "/employee/project",icon:<PiProjectorScreen/>  },
  
];

const others = [
  { name: "Payroll", path: "/employee/payroll",icon:<MdPayment/> },
  { name: "Leave", path: "/employee/leave", icon: <FaFileAlt/> },
];

export function EmployyeeById({}: Props) {
  const { id } = useParams();
  return (
    <div className="w-full bg-zinc-50  min-h-[747px]">
      <div className="w-full h-full grid grid-cols-5">
        <div className="border-r    w-full  block">
          <p className="font-semibold border-b px-6 py-4 ">General</p>
          <div className="px-6 py-4">
            {general.map((v,i) => (
              <UseLink path={`${v.path}/${id}`}>
                <div className="py-3 cursor-pointer font-semibold text-sm flex items-center  gap-2">
                  <p className={`${i == 0 ? "text-2xl" : "text-xl"} `}>
                    {v.icon}
                  </p>
                  <p >{v.name}</p>
                </div>
              </UseLink>
            ))}
          </div>
          <p className="font-semibold  border-b px-6 py-4 ">Other</p>
          <div className="px-6 py-4">
            {others.map((v) => (
              <UseLink path={`${v.path}/${id}`}>
                <div className="py-3 cursor-pointer font-semibold text-sm flex items-center  gap-2">
                  <p className="text-xl">
                    {v.icon}
                  </p>
                  <p>{v.name}</p>
                </div>
              </UseLink>
            ))}
          </div>
        </div>

        <div className=" px-8 py-6  col-span-4 w-full min-h-[745px] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
