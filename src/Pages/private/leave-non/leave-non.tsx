import { useEffect, useState } from "react";
import { UseFetch } from "../../../Common/useFetch";
import { AddLeave } from "./add-leave";
import { TableLeaveNon } from "./tableLeave-non";

type Form = {
  leave_type: string,
  start_date: string,
  end_date: string,
}

export function LeaveNon() {
  const [reload, setReload] = useState(0);
  const [isAdd, setIsAdd] = useState(false)

  const { data, loading, onFetch, message} = UseFetch();
  const { loading:load, onFetch:fetch, message:msg, setMesage, setIsError, isError:err} = UseFetch();

  const handleEmployee = (v: Form) => {
    setIsError(false)
    setMesage("")
    fetch({method: 'POST', url:`/leave`, payload: v}).then(() => {
      setReload(prev => prev + 1)
    }).catch(() => {} )
  };

    const handleOpenProject = (condition: boolean) => {
      setIsError(false)
      setMesage("")
      setIsAdd(condition)
    }


  useEffect(() => {
    onFetch({
      method: "GET",
      url: `/leave-employee`,
    })
      .then(() => {})
      .catch((e) => console.log(e));
  }, [reload]);

  return (
    <div className="w-full p-4 lg:p-8  lg:min-h-[745px] ">
       {isAdd && <AddLeave setIsAdd={handleOpenProject} load={load} handleEmployee={handleEmployee} message={msg} isError={err}  />}
      <div className="flex flex-col pb-14 lg:gap-2 gap-1 justify-center items-center">
        <p className="lg:text-3xl text-2xl font-semibold">Leave Data</p>
        <p className=" lg:w-1/2 text-center text-zinc-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
          accusamus consequuntur error quas. Odio optio doloremque non hic
          recusandae quam?
        </p>
      </div>
      <TableLeaveNon setIsAdd={setIsAdd} data={data} loading={loading} message={message} />
    </div>
  );
}
