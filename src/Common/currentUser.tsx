import { jwtDecode } from 'jwt-decode';
import Cookies from "js-cookie";


type JwtPayload = {
    id: number;
    email: string;
    role: string;
    exp: number;
    nbf: number;
    iat: number;
  };


export function CurrentUser() {
    const token = Cookies.get("token"); 
    const decoded = jwtDecode<JwtPayload>(token ?? "");

    const user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role, // hr | karyawan
    };
  return {user}
}

