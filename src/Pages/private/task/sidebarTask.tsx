import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PiProjectorScreen } from "react-icons/pi";
import { CurrentUser } from "../../../Common/currentUser";
import { GroupTasksByDate } from "../../../Common/sortDate";
import { UseFetch } from "../../../Common/useFetch";
import { AddTask } from "./addTask";
import { GiHamburgerMenu } from "react-icons/gi";
import { Task } from "./task";

type TypePaload = {
  description: string;
  title: string;
  status: number;
  level: number;
};

type TypeTask = {
  id: number;
  action_name: string;
  title: string;
  description: string;
  status: number;
  level: number;
  action: number;
  employee: string;
  project: string;
  created_at: string;
};

const defaulTask = {
  "": [],
};

interface GroupedTasks {
  [date: string]: TypeTask[];
}

export function SidebarTask() {
  const [currentId, setCurrentId] = useState<number>(0);
  const [dataTask, setDataTask] = useState<GroupedTasks>(defaulTask);
  const [isAdd, setIsAdd] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: 0, date: "" });

  const { user } = CurrentUser();
  const { loading, isError, onFetch, message, data } = UseFetch();
  const { onFetch: fetchTask, message: msg, loading: loadTask } = UseFetch();

  const {
    onFetch: updatedTask,
    message: messageUpdate,
    setMesage: setMessageUpdate,
    loading: loadUpdate,
  } = UseFetch();

  const {
    onFetch: addFetch,
    message: msgAdd,
    setMesage: setMsgAdd,
    isError: errAdd,
    setIsError: setErrAdd,
    loading: loadAdd,
  } = UseFetch();

  const handleOpenProject = (condition: boolean) => {
    setMsgAdd("");
    setErrAdd(false);
    setIsAdd(condition);
  };

  const handleAddTask = (v: TypePaload) => {
    setErrAdd(false)
    setMsgAdd("")
    addFetch({
      url: `/task`,
      method: "POST",
      payload: {
        ...v,
        project_id: currentId,
        employee_id: user.id,
        action: -1,
      },
    }).then(() => {
      handleDataTask(currentId);
      setIsAdd(false);
    });
  };

  const handleDataTask = (idProject: number) => {
    fetchTask({ url: `/task/${idProject}`, method: "GET" }).then((e) =>
      setDataTask(GroupTasksByDate(e))
    );
    setCurrentId(idProject);
  };

  const refreshTask = () => {
    fetchTask({ url: `/task/${currentId}`, method: "GET" }).then((e) =>
      setDataTask(GroupTasksByDate(e))
    );
  };

  const updateStatus = useCallback(
    ({
      status,
      idTask,
    }: {
      status: number | undefined;
      idTask: number | undefined;
    }) => {
      updatedTask({
        url: `/task/${idTask}`,
        method: "PATCH",
        payload: { status },
      }).then(() => {});
    },
    [updatedTask] // Include all dependencies
  );

  const updateAction = useCallback(
    ({
      action,
      idTask,
    }: {
      action: number | undefined;
      idTask: number | undefined;
    }) => {
      updatedTask({
        url: `/task/${idTask}`,
        method: "PATCH",
        payload: { action_name: user.email, action },
      }).then(() => {});
    },
    [updatedTask]
  );

  useEffect(() => {
    let timeout: any;
    if (messageUpdate.length > 0) {
      timeout = setInterval(() => {
        setMessageUpdate("");
      }, 2500);
    }
    return () => clearInterval(timeout);
  }, [messageUpdate]);

  useEffect(() => {
    onFetch({ url: "/projects", method: "GET" }).then((e) => {
      setCurrentId(e.projects[0].id);
      fetchTask({ url: `/task/${e.projects[0].id}`, method: "GET" }).then((e) =>
        setDataTask(GroupTasksByDate(e))
      );
    });
    return () => {};
  }, []);

  return (
    <div className="drawer w-full relative bg-base-100 ">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-[6]">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-100 p-0  text-base-content min-h-full w-56 ">
        <div className="px-4 py-3 flex items-center border-b rounded  gap-2 ">
            <p className=" p-2 bg-primary/90 text-base rounded-md text-base-100">
              <PiProjectorScreen />
            </p>
            <p className="font-medium">Projects</p>
          </div>
          <span className="pt-3"></span>
         <div className="px-2">
         {data?.projects?.map((v: { name: string; id: number }) => (
            <li
              key={v.id}
              className={`py-1 px-4 rounded-md   ${
                v.id === currentId
                  ? "bg-zinc-200 text-black "
                  : " text-zinc-500 "
              } cursor-pointer font-medium text-sm hover:text-black flex items-start gap-2`}
              onClick={() => handleDataTask(v.id)}
            >
              <p>{v.name}</p>
            </li>
          ))}
         </div>
        </ul>
      </div>
      {isAdd && (
        <AddTask
          setIsAdd={handleOpenProject}
          message={msgAdd}
          isError={errAdd}
          loading={loadAdd}
          handleEmployee={handleAddTask}
        />
      )}

      <div className="w-full drawer-content h-full lg:grid grid-cols-5">
        <div className="border-r lg:block   w-full min-h-[745px] hidden">
          <div className="border-b px-4 py-4  flex items-center gap-2">
            <p className="p-2  bg-primary/90 rounded-md text-white">
              <PiProjectorScreen />
            </p>
            <p className="font-semibold ">Projects</p>
          </div>
          {loading ? (
            <div className="p-4 flex flex-col gap-2">
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-full"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              <p
                className={`${
                  isError ? "py-2 px-6" : "p-0"
                } text-sm bg-red-500 text-base-100 font-semibold text-center`}
              >
                {isError && message}
              </p>
              {data?.projects?.map((v: { name: string; id: number }) => (
                <div
                  key={v.id}
                  className={`py-3 px-6  ${
                    v.id === currentId
                      ? "bg-zinc-100 text-black "
                      : "bg-base-100 text-zinc-500 "
                  } cursor-pointer font-medium text-sm hover:text-black flex items-center  gap-2`}
                  onClick={() => handleDataTask(v.id)}
                >
                  <p>{v.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className=" p-4  relative  col-span-4 w-full  min-h-[560px] lg:min-h-[745px] ">
 
       <div className="absolute z-[5] left-0 top-2 blcok lg:hidden border-b w-full">
            <label
              htmlFor="my-drawer"
              className="btn bg-transparent border-none shadow-none "
            >
              <p className="p-2  bg-primary/90 rounded text-white">
                <GiHamburgerMenu />
              </p>
            </label>
      
       </div>
          {loadTask ? (
            <div className="flex flex-col gap-2">
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
            </div>
          ) : (
            <div className="z-[8]">
              <Task
              refreshTask={refreshTask}
              setCurrentTask={setCurrentTask}
              currentTask={currentTask}
              message={messageUpdate}
              loading={loadUpdate}
              updateAction={updateAction}
              updateStatus={updateStatus}
              task={dataTask}
              msg={msg}
              role={user.role}
            />
            </div>
          )}

          {msg !== "Akses tidak diizinkan" && (
            <div
              className="lg:w-10 lg:h-10 w-8 h-8 flex hover:bg-primary cursor-pointer items-center justify-center absolute bottom-4 right-4 lg:bottom-7 lg:right-7  rounded-md  bg-primary/90 "
              onClick={() => handleOpenProject(true)}
            >
              <p className="text-center text-sm lg:text-base text-base-100">
                {" "}
                <FaPlus />
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
