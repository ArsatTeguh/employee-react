
import { ForgotPassword, Login } from "../../Pages/public";

export const AuthRoutes: Iroute[] = [
  { path: `/login`, component: <Login /> },
  { path: `/register`, component: <Login /> },
  { path: `/forgot`, component: <ForgotPassword /> },
];
