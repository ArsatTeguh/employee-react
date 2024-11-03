import { Dashboard, Project } from "../../Pages/private";
import Attedances from "../../Pages/private/attedances";

export const PrivateRoutes: Iroute[] = [
  { path: `/master`, component: <Dashboard /> , role: "hr"},
  { path: `/project`, component: <Project />, role: "hr" },
  { path: `/attedance`, component: <Attedances />, role: "karyawan" },
];
