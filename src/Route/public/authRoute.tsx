import { ForgotPassword, Login, Main } from "../../Pages/public";

export const AuthRoutes: Iroute[] = [
  { path: `/login`, component: <Login /> },
  { path: `/forgot`, component: <ForgotPassword /> },
  { path: `/`, component: <Main /> },
];
