import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdSearch } from "react-icons/io";
import { RiEmpathizeFill } from "react-icons/ri";

import { PiProjectorScreenFill } from "react-icons/pi";
import { UseFetch } from "./useFetch";

type Props = {
  disable: "employees" | "projects";
  onChange: (id: number, value: { name: string; id: number | null }) => void;
  currentPopup: number | null;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
};

type TypeProject = {
  id: number;
  name: string;
  Estimation: string;
  status: string;
};

type TypeEmployee = {
  id: number;
  name: string;
  status: string;
};

function Popup({ disable, onChange, setPopup, currentPopup }: Props) {
  const [select, setSelect] = useState<"employees" | "projects" | "">("");
  const [selectData, setSelectData] = useState<any>({});
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<Array<TypeProject> | null>(null);
  const [employees, setEmployee] = useState<TypeEmployee[] | null>(null);

  const { loading, onFetch } = UseFetch();

  const onSelect = (current: "employees" | "projects" | "") => {
    if (disable != current) {
      setSelect(current);

      if (projects === null && current === "projects") {
        onFetch({ method: "GET", url: "/project-popup"}).then((res) =>
          setProjects(res)
        );
      }

      if (employees === null && current === "employees") {
        onFetch({ method: "GET", url: "/employee-popup"}).then((res) =>
          setEmployee(res)
        );
      }
    } else {
      setSelect("");
    }
  };

  const onBack = (to: "employees" | "projects" | "") => {
    setSelect(to);
    setSelectData({});
  };

  const onClose = () => {
    setPopup(false);
    setSelectData({});
  };

  const onSelecData = (data: any) => {
    setSelectData(data);
  };

  const onReturn = () => {
    onChange(currentPopup!, selectData);
    setSelectData({});
    setPopup(false);
  };

  return (
    <div className="fixed inset-0 flex lg:items-center pt-10 lg:pt-0  justify-center bg-black/50 z-20 p-4">
      <div className=" lg:h-[70%] h-[80%] max-w-xl relative bg-zinc-100 text-black rounded-md ">
      <div className="px-3 bg-black/10 absolute rounded-full lg:right-4 lg:top-3 right-2 top-2  text-zinc-700 hover:bg-black/20 cursor-pointer"
          onClick={onClose}
          >
            <p className="text-xl text-center mb-1 flex justify-center w-full h-full items-center text-">
              x
            </p>
          </div>
      <div className="pb-10 pt-12 flex flex-col items-center">
      <p className="text-center font-semibold text-black text-xl lg:text-2xl ">
          Master Data
        </p>
        <p className="text-center text-xs lg:text-sm text-zinc-500 w-10/12">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, quasi.</p>
      </div>
        {select == "projects" && disable != "projects" ? (
          <div className=" gap-2 flex flex-col h-[43vh] ">
            <div
              className="flex items-center  w-1/4 lg:gap-1 cursor-pointer  px-4 lg:px-6"
              onClick={() => onBack("")}
            >
              <p className="lg:text-xl">
                <IoIosArrowBack />
              </p>
              <p className="font-medium lg:text-base text-sm">Menu</p>
            </div>
            <div className="px-4 lg:px-6 border-b-2 mt-4 pb-2 relative">
              <input
                value={search}
                type="text"
                className="border w-full py-2 rounded-md px-4 text-sm"
                placeholder="Search Name"
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute lg:text-2xl text-xl right-7  text-zinc-500 top-[.5rem]">
                <IoMdSearch />
              </span>
            </div>
            <div className=" overflow-y-auto  flex flex-col bg-zinc-200 gap-1 px-4 lg:px-6 py-2">
              {loading
                ? Array(3)
                    .fill(null)
                    .map((_, i: number) => (
                      <div
                        className="h-12 block animate-pulse bg-zinc-400 w-full rounded"
                        key={i}
                      />
                    ))
                : projects
                    ?.filter((e: any) =>
                      search
                        ? e.name.toLowerCase().includes(search.toLowerCase())
                        : true
                    )
                    .map((v: any, i: number) => (
                      <div
                        key={i}
                        className={`${
                          v.id == selectData?.id
                            ? "bg-primary/90 text-white  hover:bg-primary"
                            : "bg-zinc-50 hover:bg-zinc-100"
                        } rounded px-6 cursor-pointer  flex justify-between  gap-2 border-b-2 p-2 `}
                        onClick={() => onSelecData(v)}
                      >
                        <div className="">
                          <p className="text-sm font-semibold">{v.name}</p>
                          <p className=" text-sm text-zinc-500">{v.status}</p>
                        </div>

                        {/* <p className="text-sm flex items-center gap-1 text-zinc-600">
                          {v.position?.length} <span className="text-xl"><RiEmpathizeFill /></span>
                        </p> */}
                      </div>
                    ))}
            </div>
          </div>
        ) : select == "employees" && disable != "employees" ? (
          <div className=" gap-2 flex flex-col h-[43vh] ">
            <div
              className="flex items-center gap-1 cursor-pointer  px-6 w-1/4"
              onClick={() => onBack("")}
            >
              <p className="text-xl">
                <IoIosArrowBack />
              </p>
              <p className="font-semibold">Menu</p>
            </div>
            <div className="px-6 border-b-2 mt-4 pb-2 relative">
              <input
                value={search}
                type="text"
                className="border w-full py-2 rounded-md px-4 text-sm"
                placeholder="Search Name"
                onChange={(e) => setSearch(e.target.value)}
              />
              <span className="absolute text-2xl right-7 text-zinc-500 top-[.5rem]">
                <IoMdSearch />
              </span>
            </div>
            <div className=" overflow-y-auto  flex flex-col bg-zinc-200 gap-1 px-6 py-2">
              {loading
                ? Array(3)
                    .fill(null)
                    .map((_, i: number) => (
                      <div
                        className="h-12 block animate-pulse bg-zinc-400 w-full rounded"
                        key={i}
                      />
                    ))
                : employees
                    ?.filter((e: any) =>
                      search
                        ? e.name.toLowerCase().includes(search.toLowerCase())
                        : true
                    )
                    .map((v: any, i: any) => (
                      <div
                        key={i}
                        className={`${
                          v.id == selectData?.id
                            ? "bg-primary/90 text-white  hover:bg-primary"
                            : "bg-zinc-50 hover:bg-zinc-100"
                        } rounded  p-2  px-4 cursor-pointer  flex items-center  gap-2 `}
                        onClick={() => onSelecData(v)}
                      >
                        <span className="block h-10 w-10 bg-zinc-300 rounded-full"></span>
                        <div className="">
                          <p className="text-sm">{v.name}</p>
                          <p className=" text-sm">{v.status}</p>
                        </div>
                      </div>
                    ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <div
              className={` px-6 flex items-center justify-between py-3 border-b-2 font-medium  ${
                disable == "employees"
                  ? "text-zinc-400"
                  : "cursor-pointer hover:bg-zinc-200"
              }`}
              onClick={() => onSelect("employees")}
            >
              <div className="flex items-center gap-2">
                <p className="lg:text-2xl text-xl">
                  <RiEmpathizeFill />
                </p>
                <p className="font-medium lg:text-base text-sm">Employees</p>
              </div>
              <span className="lg:text-xl">
                <IoIosArrowForward />
              </span>
            </div>
            <div
              className={` px-6 flex items-center justify-between py-3 border-b-2 font-medium  ${
                disable == "projects"
                  ? "text-zinc-400"
                  : "cursor-pointer hover:bg-zinc-200"
              }`}
              onClick={() => onSelect("projects")}
            >
              <div className="flex items-center gap-2">
                <p className="lg:text-2xl text-xl">
                  <PiProjectorScreenFill />
                </p>
                <p className="font-medium lg:text-base text-sm">Projects</p>
              </div>
              <span className="lg:text-xl">
                <IoIosArrowForward />
              </span>
            </div>
          </div>
        )}
        <button
          disabled={selectData.id == null}
          className="bg-primary/90  hover:bg-primary px-8 py-2 disabled:bg-primary/50 rounded text-white text-sm absolute bottom-5 right-5"
          onClick={onReturn}
        >
          Return
        </button>
      </div>
    </div>
  );
}

export default Popup;
