import { useCallback, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { PiProjectorScreen } from "react-icons/pi";
import { CurrentUser } from "../../../Common/currentUser";
import { GroupTasksByDate } from "../../../Common/sortDate";
import { UseFetch } from "../../../Common/useFetch";
import { AddTask } from "./addTask";
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
  title: string
  description: string;
  status: number;
  level: number;
  action: number;
  employee: string;
  project: string;
  created_at: string;
};

const defaulTask = {
  "" : []
}

interface GroupedTasks {
  [date: string]: TypeTask[];
}


export function SidebarTask() {
  const [currentId, setCurrentId] = useState<number>(0);
  const [dataTask, setDataTask] = useState<GroupedTasks>(defaulTask);
  const [isAdd, setIsAdd] = useState(false);
  const [currentTask, setCurrentTask] = useState({ id: 0, date: "" });

  const { user } = CurrentUser();
  const { loading, isError, onFetch, message,data } = UseFetch();
  const {
    onFetch: fetchTask,
    message: msg,
    isError: err,
    setIsError: setErr,
    setMesage: setmsg,
    loading: loadTask
  } = UseFetch();
  const {onFetch: updatedTask, message:messageUpdate, loading:loadUpdate} = UseFetch()

  const handleOpenProject = (condition: boolean) => {
    setmsg("");
    setErr(false);
    setIsAdd(condition);
  };

  const handleAddTask = (v: TypePaload) => {
    fetchTask({
      url: `/task`,
      method: "POST",
      payload: { ...v, project_id: currentId, employee_id: user.id, action: -1 },
    }).then(() => {
      handleDataTask(currentId)
      setIsAdd(false)
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
  }

  const updateStatus = useCallback(
    ({status, idTask}: {status: number | undefined, idTask: number | undefined}) => {
      updatedTask({
        url: `/task/${idTask}`,
        method: "PATCH",
        payload: { status },
      }).then(() => {});
    },
    [updatedTask] // Include all dependencies
  );

  const updateAction = useCallback(
    ({action, idTask} : {action : number | undefined, idTask: number | undefined}) => {
      updatedTask({
        url: `/task/${idTask}`,
        method: "PATCH",
        payload: { action_name: user.email ,action },
      }).then(() => {});
    }
    ,[updatedTask])

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
    <div className="w-full bg-base-100  min-h-[747px]">
      {isAdd && (
        <AddTask
          setIsAdd={handleOpenProject}
          isError={err}
          message={msg}
          handleEmployee={handleAddTask}
          
        />
      )}
      <div className="w-full h-full grid grid-cols-5">
        <div className="border-r    w-full min-h-[745px] block">
          <div className="border-b px-4 py-4  flex items-center gap-2">
          <p className="p-2  bg-primary/90 rounded-md text-white"><PiProjectorScreen/></p>
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

        <div className=" p-4 relative  col-span-4 w-full min-h-[745px] ">
          {loadTask ? (
          <div className="flex flex-col gap-2">
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
              <div className="skeleton h-6 w-full"></div>
          </div>
          ) : (
            <Task 
            refreshTask={refreshTask}
            setCurrentTask={setCurrentTask}
            currentTask={currentTask}
            message={messageUpdate} loading={loadUpdate} updateAction={updateAction} updateStatus={updateStatus} task={dataTask} msg={msg}  />
          )}

          <div
            className="w-10 h-10 flex hover:bg-primary cursor-pointer items-center justify-center absolute bottom-7 right-7  rounded-md  bg-primary/90 "
            onClick={() => handleOpenProject(true)}
          >
            <p className="text-center text-base-100">
              {" "}
              <FaPlus />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
