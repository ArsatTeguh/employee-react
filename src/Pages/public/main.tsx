import React, { useState } from "react";
import { MainMenu } from "../../Components";

type Props = {};

export const Main = () => {
  const [themeBg, onThemeBg] = useState<number>(1);
  return (
    <div className=" w-full h-full relative ">
      <div className="absolute flex w-full h-full bottom-20 items-center justify-center">
        <h1 className="text-white"> {themeBg} </h1>
      </div>
      <MainMenu onBg={onThemeBg} />
    </div>
  );
};
