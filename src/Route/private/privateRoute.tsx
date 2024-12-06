import { EmpLeave } from "../../Common/empLeave";
import { EmpPayroll, EmpProject, Profile } from "../../Components";
import { EmpAttedance } from "../../Components/empAttedance";
import { HandleError } from "../../Components/handleError";


import NotFound from "../../Components/notFound";
import { Attedances, AttedancesList,  Employee, EmployeeById, Leave, LeaveNon, ProjectById, ProjectList } from "../../Pages/private";
import { Payroll } from "../../Pages/private/payroll/payroll";
import { SidebarTask } from "../../Pages/private/task/sidebarTask";

export const PrivateRoutes: Iroute[] = [
  { path: `/project`, component: <ProjectList />, role: "hr" },
  { path: `/attedance`, component: <Attedances />, role: "karyawan" },
  { path: `/attedance-list`, component: <AttedancesList />, role: "karyawan" },
  { path: `/project/:id`, component: <ProjectById />, role: "hr" },
  { path: `/not-found`, component: <NotFound />, role: "karyawan" },
  { path: `/employee`, component: <Employee />, role: "hr" },
  { path: `/task`, component: <SidebarTask />, role: "karyawan" },
  { path: `/profile/:id`, component: <EmployeeById />, role: "karyawan" },
  { path: `/leave`, component: <Leave />, role: "hr" },
  { path: `/leave-employee`, component: <LeaveNon />, role: "karyawan" },
  { path: `/payroll`, component: <Payroll />, role: "hr" },
  { path: `/error-server`, component: <HandleError />, role: "karyawan" },
];

export const PrivateRoutesHome = [
  { path: `/wallet/:id`, component: <Profile /> , role: "hr", strict:"/employee/wallet/:id"},
  { path: `/project/:id`, component: <EmpProject /> , role: "hr",strict:"/employee/project/:id"},
  { path: `/payroll/:id`, component: <EmpPayroll /> , role: "hr",strict:"/employee/payroll/:id"},
  { path: `/attedance/:id`, component: <EmpAttedance /> , role: "hr",strict:"/employee/attedance/:id"},
  { path: `/leave/:id`, component: <EmpLeave /> , role: "hr",strict:"/employee/leave/:id"},
]