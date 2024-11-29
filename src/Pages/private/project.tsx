import { useEffect, useState } from "react";
import { UseFetch } from "../../Common/useFetch";
type Props = {};

export const Project = ({}: Props) => {
  const [name, setName] = useState("")
  const  [status, setStatus] = useState("")
  const [estimation, setEstimation] = useState("")

  const { loading, message, isError, onFetch, setMesage, setIsError } = UseFetch();

  const onSubmit =  (e: any) => {
    e.preventDefault()
    // alert(JSON.stringify({name, status, estimation}))
   onFetch({method: "POST", url:"/project", payload:{name, status, estimation}}).then(() => {})
   setName("")
   setStatus("")
   setEstimation("")
  }

  useEffect(() => {
    let handler: any
    if(message !== "") {
      handler = setTimeout(() => {
        setMesage("")
        setIsError(false)
      },2000)
    }

    return () => clearTimeout(handler)

  },[message])

  return (
    <div className="w-full h-full flex flex-col justify-center pt-10 items-center">
      <p className="text-2xl font-medium ">New Project</p>
      <p className="text-zinc-500 text-sm pb-10 pt-2">
        After create product, you can create a position for the project
      </p>
      <form onSubmit={onSubmit} className=" lg:w-[60%] w-full flex  justify-center items-center flex-col   p-6">

      <div
            className={`transition-all  ease-in-out   rounded-sm   ${
              message?.length == 0 ? "h-0 " : "h-auto  py-2 px-4 "
            } ${isError ? ' bg-red-600' : 'bg-green-600'}`}
          >
            {message?.length != 0 && <p className="text-zinc-100 capitalize">{message}</p>}

          </div>

        <div className="w-full flex flex-col gap-2 pb-8">
          <label htmlFor="name" className="text-zinc-700">
            Name
          </label>
          <input
            type="text"
            className="py-2 rounded-sm bg-slate-50 border w-full px-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4 w-full pb-8">
          <div className=" w-full flex flex-col gap-2">
            <label htmlFor="status" className=" text-zinc-700 dark:text-white">
              Status
            </label>
            <select
              id="status"
              className="border bg-slate-50 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option selected>Status</option>
              <option value="Complete">Complete</option>
              <option value="Running">Running</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className=" w-full flex flex-col gap-2">
            <label
              htmlFor="estimation"
              className=" text-zinc-700 dark:text-white"
            >
              Estimation
            </label>
            <select
              id="estimation"
              className="border bg-slate-50 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              value={estimation}
              onChange={(e) => setEstimation(e.target.value)}
            >
              <option selected>Estimation</option>
              <option value="3 Month">3 Month</option>
              <option value="6 Month">6 Month</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <button
        disabled={loading || name == ""}
          type="submit"
          className="w-full disabled:bg-zinc-500 hover:bg-primary/90  bg-primary mt-2 py-2 rounded-sm text-white "
        >
          Create Product
        </button>
      </form>
  
    </div>
  );
};
