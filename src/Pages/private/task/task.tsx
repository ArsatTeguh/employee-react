import { FaInbox } from "react-icons/fa";
import { FaCalendarDays,FaCircleUser } from "react-icons/fa6";
import { IoIosArrowRoundForward } from "react-icons/io";
import { RiDraggable } from "react-icons/ri";
import { FormatDate } from "../../../Common/sortDate";
import { CgAlignCenter } from "react-icons/cg";
import { Details } from "./details";
import { TbListDetails } from "react-icons/tb";
import { LuActivity } from "react-icons/lu";
import { BsAlignEnd } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { useMemo, useState } from "react";

type Props = {
  task: GroupedTasks;
  msg: string;
  updateStatus: ({ status, idTask }: {
    status : number | undefined, idTask: number | undefined
}) => void
updateAction: ({ action, idTask }: {
  action : number | undefined, idTask: number | undefined
}) => void
loading: boolean
message: string
refreshTask: () => void
currentTask: {
  id: number;
  date: string;
}
setCurrentTask: React.Dispatch<React.SetStateAction<{
  id: number;
  date: string;
}>>
role:string
};

type TypeTask = {
  id: number;
  action: number;
  action_name: string;
  description: string;
  employee: string;
  level: number;
  project: string;
  status: number;
  title: string;
  created_at: string;
};

interface GroupedTasks {
  [date: string]: TypeTask[];
}

export function Task({role,currentTask, setCurrentTask,refreshTask, msg, task, updateStatus, updateAction, loading, message  }: Props) {
  const [isDetail, setDetail] = useState(false);

  const details = useMemo(() => 
    task[currentTask.date]?.find((e) => e.id === currentTask.id), 
    [task, currentTask.date, currentTask.id]
  );

  const handleOpen = (id: number, date: string) => {
    setDetail(true);
    setCurrentTask({ id, date });
  };

  return (
    <div className="w-full h-full relative pt-14 lg:pt-0">
      {msg === "Not Record" ? (
        <div className="flex w-full  lg:gap-4 gap-0  h-full justify-center py-20">
           <p className="lg:text-6xl  text-zinc-100">
            <FaInbox />
          </p>
          <p className="md:text-xl   py-4  rounded-sm   text-zinc-300">
            {msg} Task
          </p>
         
        </div>
      ) : task?.entries?.length == 0 ? (
        <div className="">
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : msg === "Akses tidak diizinkan" ? (
        <div className=" w-full justify-center pt-20 gap-1 lg:gap-2 flex">
          <p className="text-zinc-300  text-3xl lg:text-4xl">
            <MdOutlinePrivacyTip />
          </p>
          <p className="text-zinc-300 text-xl lg:text-2xl">Cann't Access</p>
        </div>
      ) : (
        <div className="flex flex-col !z-20 gap-2">
          {isDetail && <Details
          role={role} 
          loading={loading} 
          message={message} 
          updateStatus={updateStatus} 
          updateAction={updateAction} 
          setIsAdd={setDetail} 
          task={details}
          refreshTask={refreshTask}
          />}
          {task &&
            Object.entries(task)
              .sort()
              .reverse()
              .map(([date, tasksForDate], index: number) => (
                <div key={index} className={`collapse collapse-arrow text-black ${date == currentTask.date && "collapse-open"}   relative bg-zinc-50 border  border-zinc-200 rounded-none`} >
                  <input type="checkbox" className="peer" />

                  <div
                    className={`collapse-title font-normal peer-checked:border-b `}
                  >
                    <div className="grid   text-sm ">
                      <div className="flex items-center col-span-2 gap-2">
                        <p className="text-sm p-2 rounded-md text-zinc-50 bg-primary/90">
                          <FaCalendarDays />
                        </p>
                        <p className="lg:text-base text-sm">{FormatDate(date)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="collapse-content  flex relative flex-col  pl-6   ">
                    {tasksForDate?.map((v: TypeTask, i: number) => (
                      <div key={v.id} className="relative py-1 text-sm  ">
                        <div className="flex items-center">
                          <span className="text-zinc-300 text-xl ">
                            <IoIosArrowRoundForward />
                          </span>
                          <span className="text-zinc-400 text-xl ">
                            <RiDraggable />
                          </span>
                          <div className="grid grid-cols-5 lg:grid-cols-8 w-full border border-zinc-100 pl-3 hover:bg-zinc-100  bg-zinc-50 px-5 py-2">
                            <p className="col-span-2  ">{v.title}</p>
                            <div className="flex items-center gap-2 lg:col-span-0 col-span-2 ">
                            <p className="text-zinc-600"><FaCircleUser/></p>
                            <p>{v.employee}</p>
                          
                            </div>

                            <div className=" lg:flex hidden items-center gap-2">
                              <p
                                className={`text-lg ${
                                  v.status === 1
                                    ? "text-orange-600"
                                    : v.status == 2
                                    ? "text-blue-600"
                                    : "text-green-600"
                                }`}
                              >
                                <LuActivity />
                              </p>
                              <p>
                                {v.status == 1
                                  ? "Going"
                                  : v.status == 2
                                  ? "Progress"
                                  : "Finished"}
                              </p>
                            </div>
                            <div className="lg:flex hidden  items-center gap-2">
                              <p
                                className={`text-lg ${
                                  v.action === 1
                                    ? "text-blue-600"
                                    : v.action == 2
                                    ? "text-green-600" : v.action == 3 ? "text-red-600"
                                    : "text-zinc-600"
                                }`}
                              >
                                <BsAlignEnd />
                              </p>
                              <p>
                                {v.action == 1
                                  ? "Checking"
                                  : v.action == 2
                                  ? "Approved"
                                  : v.action == 3 
                                  ? "Rejected"
                                  : "No action"
                                }
                              </p>
                            </div>

                            <div className="lg:flex hidden  items-center gap-2">
                              <p
                                className={`text-xl ${
                                  v.level === 1
                                    ? "text-blue-600"
                                    : v.level == 2
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                }`}
                              >
                                <CgAlignCenter />
                              </p>
                              <p>
                                {v.level == 1
                                  ? "Low"
                                  : v.level == 2
                                  ? "Medium"
                                  : "Hard"}
                              </p>
                            </div>

                            <div
                              className="flex items-center gap-2 cursor-pointer"
                              onClick={() => handleOpen(v.id, date)}
                            >
                              <p className="text-xl text-zinc-700  ">
                                <TbListDetails />
                              </p>
                            </div>
                          </div>
                        </div>

                        <span
                          className={`${
                            i < tasksForDate.length - 1 ? "h-full " : "h-[50%] "
                          }  -top-0 peer-checked:w-[1px] transition-all ease-in-out absolute  w-[1px] left-1 flex bg-zinc-200 `}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
        </div>
      )}
    </div>
  );
}
