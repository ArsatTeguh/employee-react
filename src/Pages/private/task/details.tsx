import { BsAlignEnd } from "react-icons/bs";
import { CgAlignCenter } from "react-icons/cg";
import { LuActivity } from "react-icons/lu";
import { FaUserEdit } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { useCallback, useState } from "react";

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

type Props = {
  setIsAdd: (condition: boolean) => void;
  task: TypeTask | undefined;
  updateStatus: ({ status, idTask }: {
    status : number | undefined, idTask: number | undefined
}) => void
updateAction: ({ action, idTask }: {
  action : number | undefined, idTask: number | undefined
}) => void
loading: boolean
message: string
refreshTask: () => void
};

export function Details({refreshTask, task,updateAction, setIsAdd, updateStatus, loading, message }: Props) {
  const [action, setAction] = useState<number | undefined>(task?.action)
  const [status, setStatus] = useState<number | undefined>(task?.status)
  
  const handleAction = useCallback((e: React.ChangeEvent<any>) => {
    const { value } = e.target;
    const newValue = parseInt(value, 10);
    
    setAction(prevAction => {
      if (!loading && prevAction !== newValue) {
        updateAction({ action: newValue, idTask: task?.id });
      }
      return newValue;
    });
  }, [loading, task?.id, updateAction]);

  const handleStatus = useCallback((e:React.ChangeEvent<any>) => {
      const { value } = e.target;
      const newValue = parseInt(value, 10)
      setStatus(prevAction => {
        if (!loading && prevAction !== newValue) {
          updateStatus({ status: newValue, idTask: task?.id });
        }
        return newValue;
      });
     
  },[loading, task?.id, updateStatus]);

  const handleCLose = () => {
    setIsAdd(false);
    refreshTask()
  };

  return (
    <div className="fixed inset-0  z-20 bg-black bg-opacity-50 flex items-start lg:pt-24 justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div className="px-6 pb-8 pt-12 relative ">
          {/* Header */}
          <div className=" mb-2 flex gap-1 px-2">
            <div className="flex flex-col  gap-1">
              <h2 className="text-xl font-semibold mb-2">{task?.title}</h2>
              <div className="flex items-center gap-6 mb-4 w-full justify-center ">
                <div className="flex items-center gap-2">
                  <p className="text-gray-600 ">
                    <FaCircleUser />
                  </p>
                  <p className="text-gray-600 text-sm">{task?.employee}</p>
                </div>
                <div className="flex items-center gap-2 ">
                  <p className=" text ">
                    <FaUserEdit />
                  </p>
                  <p className="text-xs">{task?.action_name ?? "Not Yet"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="px-3 bg-black/10 absolute rounded-full right-4 top-3 text-zinc-700 hover:bg-black/20 cursor-pointer"
          onClick={handleCLose}
          >
            <p className="text-xl text-center mb-1 flex justify-center w-full h-full items-center text-">
              x
            </p>
          </div>
          <div
            className={`transition-all   ease-in-out   rounded-sm   ${
              message.length === 0 ? "h-0 " : "h-auto mb-2  py-2 px-4  bg-green-600 "
            } `}
          >
            {message?.length != 0 && (
              <p className="text-zinc-100 text-center capitalize">
                {message}
              </p>
            )}
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Action</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="flex items-center gap-2 cursor-pointer ">
                    <p
                      className={`text-lg ${
                                  task?.status === 1
                                    ? "text-orange-600"
                                    : task?.status == 2
                                    ? "text-blue-600"
                                    : "text-green-600"
                                }`}
                    >
                      <LuActivity />
                    </p>
                    <select 
                    onChange={handleStatus}
                    value={status} className="select select-ghost !rounded border-none select-xs focus:border-none focus:ring-0 w-full max-w-xs">
                      <option value={1}>Going</option>
                      <option value={2}>Progress</option>
                    </select>

                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2 cursor-pointer ">
                    <p
                      className={`text-lg ${
                                  task?.action === 1
                                    ? "text-blue-600"
                                    : task?.action == 2
                                    ? "text-green-600" : task?.action == 3 ? "text-red-600"
                                    : "text-zinc-600"
                                }`}
                    >
                      <BsAlignEnd />
                    </p>
                    <select value={action} 
                    onChange={handleAction}
                    className="select select-ghost !rounded border-none select-xs focus:border-none focus:ring-0 w-full max-w-xs">
                      <option   value={1}>Check</option>
                      <option  value={2}>Reject</option>
                      <option  value={3}>Approve</option>
                    </select>
                    <p>
                     
                    </p>
                  </div>
                </td>
                <td>
                  <div className="flex items-center gap-2">
                    <p
                      className={`text-xl ${
                                  task?.level === 1
                                    ? "text-blue-600"
                                    : task?.level == 2
                                    ? "text-yellow-500"
                                    : "text-red-500"
                                }`}
                    >
                      <CgAlignCenter />
                    </p>
                    <p>
                      {task?.level == 1
                        ? "Low"
                        : task?.level == 2
                        ? "Medium"
                        : "Hard"}
                    </p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4  bg-zinc-50 p-4 rounded">
            <p className="mb-2 text-sm">Task List</p>
            <p className="whitespace-pre-line text-sm ">{task?.description}</p>
          </div>

          {/* Form */}
        </div>
      </div>
    </div>
  );
}
