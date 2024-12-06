import { Outlet, useParams } from "react-router-dom";
import { General, Others } from "../../../Common";
import { GiHamburgerMenu } from "react-icons/gi";
import UseLink from "../../../Common/useLink";

export function EmployyeeById() {
  const { id } = useParams();
  return (
    <div className="w-full drawer bg-zinc-50 min-h-[560px] lg:min-h-[747px]">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-[6]">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-100 p-0  text-base-content min-h-full w-56 ">
            <div className="border-r  lg:hidden  w-full  block">
              <p className="font-semibold border-b px-6 py-4 ">General</p>
              <div className="px-6 py-4">
                {General.map((v, i) => (
                  <UseLink path={`${v.path}/${id}`}>
                    <div className="py-3 cursor-pointer font-semibold text-sm flex items-center  gap-2">
                      <p className={`${i == 0 ? "text-2xl" : "text-xl"} `}>
                        {v.icon}
                      </p>
                      <p>{v.name}</p>
                    </div>
                  </UseLink>
                ))}
              </div>
              <p className="font-semibold  border-b px-6 py-4 ">Other</p>
              <div className="px-6 py-4">
                {Others.map((v) => (
                  <UseLink path={`${v.path}/${id}`}>
                    <div className="py-3 cursor-pointer font-semibold text-sm flex items-center  gap-2">
                      <p className="text-xl">{v.icon}</p>
                      <p>{v.name}</p>
                    </div>
                  </UseLink>
                ))}
              </div>
            </div>
          </ul>
        </div>
      <div className="w-full  drawer-content relative h-full lg:grid grid-cols-5">
        <div className="border-r  hidden  w-full  lg:block">
          <p className="font-semibold border-b px-6 py-4 ">General</p>
          <div className="px-6 py-4">
            {General.map((v, i) => (
              <UseLink path={`${v.path}/${id}`}>
                <div className="py-3 cursor-pointer font-semibold text-sm flex items-center  gap-2">
                  <p className={`${i == 0 ? "text-2xl" : "text-xl"} `}>
                    {v.icon}
                  </p>
                  <p>{v.name}</p>
                </div>
              </UseLink>
            ))}
          </div>
          <p className="font-semibold  border-b px-6 py-4 ">Other</p>
          <div className="px-6 py-4">
            {Others.map((v) => (
              <UseLink path={`${v.path}/${id}`}>
                <div className="py-3 cursor-pointer font-semibold text-sm flex items-center  gap-2">
                  <p className="text-xl">{v.icon}</p>
                  <p>{v.name}</p>
                </div>
              </UseLink>
            ))}
          </div>
        </div>

        <div className="absolute z-[5] left-0 top-2 block lg:hidden border-b w-full">
          <label
            htmlFor="my-drawer"
            className="btn bg-transparent border-none shadow-none "
          >
            <p className="p-2  bg-primary/90 rounded text-white">
              <GiHamburgerMenu />
            </p>
          </label>
        </div>
        <div className=" px-4 lg:px-8 pt-20 lg:py-6  col-span-4 w-full  lg:min-h-[745px] ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
