import { EmpPayroll, EmpProject, Profile } from "../../Components";

import NotFound from "../../Components/notFound";
import { Dashboard, Project, ProjectList, Attedances, ProjectById, Employee,  AttedancesList, EmployeeById, Leave } from "../../Pages/private";
import { SidebarTask } from "../../Pages/private/task/sidebarTask";

export const PrivateRoutes: Iroute[] = [
  { path: `/master`, component: <Dashboard /> , role: "hr"},
  { path: `/project`, component: <ProjectList />, role: "hr" },
  { path: `/attedance`, component: <Attedances />, role: "karyawan" },
  { path: `/attedance-list`, component: <AttedancesList />, role: "karyawan" },
  { path: `/project/:id`, component: <ProjectById />, role: "hr" },
  { path: `/project-add`, component: <Project />, role: "hr" },
  { path: `/not-found`, component: <NotFound />, role: "karyawan" },
  { path: `/employee`, component: <Employee />, role: "hr" },
  { path: `/task`, component: <SidebarTask />, role: "karyawan" },
  { path: `/profile/:id`, component: <EmployeeById />, role: "karyawan" },
  { path: `/leave`, component: <Leave />, role: "karyawan" },
];

export const PrivateRoutesHome = [
  { path: `/wallet/:id`, component: <Profile /> , role: "hr"},
  { path: `/project/:id`, component: <EmpProject /> , role: "hr"},
  { path: `/payroll/:id`, component: <EmpPayroll /> , role: "hr"},
]