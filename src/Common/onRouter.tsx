import { useNavigate } from "react-router-dom";

export default function OnRouter() {
    const navigate = useNavigate();
    const router = (path: string) => {
    localStorage.setItem("path", path);
    navigate(path);
  };

  return { router };
}
