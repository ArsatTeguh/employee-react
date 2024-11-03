import { Link } from "react-router-dom"

type Props = { path: string; children: React.ReactNode; }

function UseLink({ path, children } : Props) {
    const onPath = () => localStorage.setItem('path', path);
        
  return (
    <Link to={path} onClick={onPath}>
        {children}
    </Link>
  )
}

export  default UseLink