import { NavLink  } from "react-router-dom";

type Props = { path: string; children: React.ReactNode };

function UseLink({ path, children }: Props) {
  const onPath = () => localStorage.setItem("path", path);

  return (
    <NavLink
      to={path}
      onClick={onPath}
      className={({ isActive, isPending }) => isPending ? "bg-black" : isActive ? "text-primary  " : "text-zinc-400"}
    >
      {children}
    </NavLink>
  );
}

export default UseLink;
