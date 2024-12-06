import { IoDocumentAttachOutline, IoDocumentOutline } from "react-icons/io5";
import { MdOutlinePermIdentity, MdPayment } from "react-icons/md";
import { PiProjectorScreen, PiWallet } from "react-icons/pi";
import { RiQrScan2Line } from "react-icons/ri";
import { TbSubtask } from "react-icons/tb";

export const PathEmployee = [
    // {
    //   path: "master",
    //   sub: "/master",
    //   icon: <MdOutlineSpaceDashboard />,
    // },
    {
      path: "attedance",
      sub: "/attedance",
      icon: <RiQrScan2Line />,
    },
    {
      path: "task",
      sub: "/task",
      icon: <TbSubtask />,
    },
    {
      path: "project",
      sub: "/project",
      icon: <PiProjectorScreen />,
    },
    {
      path: "employee",
      sub: "/employee",
      icon: <MdOutlinePermIdentity />,
    },
    {
      path: "leave",
      sub: "/leave",
      icon: <IoDocumentAttachOutline />,
    },
    {
      path: "payroll",
      sub: "/payroll",
      icon: <MdPayment />,
    },
  ];
  
 export const Path = [
    {
      path: "attedance",
      sub: "/attedance",
      icon: <RiQrScan2Line />,
    },
    {
      path: "task",
      sub: "/task",
      icon: <TbSubtask />,
    },
    {
      path: "leave",
      sub: "/leave-employee",
      icon: <IoDocumentOutline />,
    },
  ];

  export const General = [
    { name: "Wallet", path: "/employee/wallet",icon:<PiWallet/> },
    { name: "Project", path: "/employee/project",icon:<PiProjectorScreen/>  },
    { name: "Attedance", path: "/employee/attedance",icon:<RiQrScan2Line />  },
    
  ];
  
  export const Others = [
    { name: "Leave", path: "/employee/leave", icon: <IoDocumentAttachOutline/> },
    { name: "Payroll", path: "/employee/payroll",icon:<MdPayment/> },
  ];