import { useState } from "react";

function Card({ prop }: any) {
  const [editable, setEditable] = useState(false);
  const handleClick = () => {
    setEditable(!editable);
  };
  return (
    <div
      className="
        flex
        justify-center
        text-3xl md:text-7xl 
        p-6 w-50 h-50  md:p-10 md:w-60 md:h-60 
        items-center
        drop-shadow-md	
        rounded-md"
    >
      <div onClick={handleClick} className="flex">
        <div className={prop.active ? "text-white" : "text-black"}>{prop}</div>
      </div>
    </div>
  );
}

export default Card;
