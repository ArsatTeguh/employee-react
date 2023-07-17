import { motion } from "framer-motion";
import { useState } from "react";
import * as AiIcons from "react-icons/ai";
import * as MdIcons from "react-icons/md";

export const Menu: Imenu[] = [
  {
    icon: <AiIcons.AiOutlineHome />,
    title: "Home",
  },
  {
    icon: <MdIcons.MdOutlineDashboardCustomize />,
    title: "Dashboard",
  },
  {
    icon: <AiIcons.AiOutlineLogout />,
    title: "Login",
  },
  {
    icon: <AiIcons.AiOutlineInfoCircle />,
    title: "About",
  },
];

export function MainMenu({
  onBg,
}: {
  onBg: React.Dispatch<React.SetStateAction<number>>;
}) {
  const [position, positionSet] = useState(1);

  const handleRight = () => {
    if (position !== Menu.length - 1) {
      positionSet((prev) => {
        onBg(prev + 1);
        return prev + 1;
      });
    }
  };

  const handleLeft = () => {
    if (position !== 0) {
      positionSet((prev) => {
        onBg(prev - 1);
        return prev - 1;
      });
    }
  };

  return (
    <>
      <div className="slider h-full">
        <div className="content-slider realative h-full">
          <div className=" laptop:container mx-auto list-slider h-full flex items-center">
            <motion.div className="App">
              <div className="navigation flex justify-between top-[1rem] z-10 w-full h-full items-center ">
                <button
                  className=" flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-white  rounded-full shadow-xl "
                  onClick={handleLeft}
                >
                  <span className="text-xl">
                    <AiIcons.AiOutlineArrowLeft />
                  </span>
                </button>

                <button
                  className=" flex items-center justify-center w-[2.5rem] h-[2.5rem] bg-white font-semibold rounded-full shadow-xl "
                  onClick={() => handleRight()}
                >
                  <span className="text-xl">
                    <AiIcons.AiOutlineArrowRight />
                  </span>
                </button>
              </div>
              <div className="row">
                {Menu?.map((item: Imenu, index: number) => (
                  <motion.div
                    className={`containers cursor-pointer flex items-center justify-center ${
                      index !== position && "blur-[2px]"
                    }`}
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{
                      rotate: 0,
                      left: `${(index - position) * 15 - 6}vw`,

                      scale: index === position ? 1.2 : 0.9,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                  >
                    <div className="flex gap-3 items-center">
                      <span>
                        <span className="text-[22px] text-white">
                          {" "}
                          {item.icon}{" "}
                        </span>
                      </span>
                      <span>
                        <span
                          className={`font-bold text-[22px] ${
                            index === position ? "txt-primary" : "text-white"
                          }`}
                        >
                          {item.title}{" "}
                        </span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
