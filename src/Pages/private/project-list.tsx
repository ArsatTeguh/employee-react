import { useEffect, useState } from "react";
import ConfirmationPopup from "../../Common/confirmationPopup";
import { UseFetch } from "../../Common/useFetch";
import { ComTable } from "../../Components";
import { AddProject } from "../../Components/addProject";

type TProject = {
  name: string;
  estimation: string;
  status: "Complete" | "Running" | "Pending";
};

export const ProjectList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [currentId, setCurrentId] = useState<number>(0)
  const [currentSearch, setCurrenSearch] = useState("")
  const [isAdd, setIsAdd] = useState(false)
  const [reload, setReload] = useState(0)

  const { data, loading, onFetch, message } = UseFetch();
  const {loading:load, onFetch:fetch, message:msg, setMesage:setSmg, isError:err, setIsError:setIsErr} = UseFetch();

  const handleEmployee = (v: TProject) => {
    fetch({method: 'POST', url:"/project", payload: v}).then(() => {
      setSmg("Insert data")
      setReload((e) => e+1)
    }).catch((e) => setSmg(e.message) )
  };

  const handleOpenProject = (condition: boolean) => {
    setSmg("")
    setIsErr(false)
    setIsAdd(condition)
  }

  const onSearch = (searchQuery: string) => {
    setCurrenSearch(searchQuery);
  };

  const handlePage = (action: "next" | "previous") => {
    if (data?.totalPages > page && action === "next") {
      setPage((e) => e + 1);  
    }
    if (page > 1 && action === "previous") {
      setPage((e) => e - 1);
    }
  };


  const onDelete = () => {
    fetch({method: "DELETE", url:"/project/"+currentId}).then(() => {
      setReload((e) => e+1)
      setIsDelete(false)
    })
  }

  useEffect(() => {
    let handler: any;
    if (searchQuery.length >= 3 || searchQuery == "") {
      handler = setTimeout(() => {
        onSearch(searchQuery);
      }, 500);
    }

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  useEffect(() => {
    let interval:any
    if (message !== "") {
      interval = setTimeout(() => {
        setSmg("")
        setIsErr(false)
      } ,1500)
    }
    return () => clearTimeout(interval)
  },[message, msg])

  useEffect(() => {
    onFetch({
      method: "PARAMS",
      url: "/projects",
      payload: { name: currentSearch, page, sizePage: 5 },
    }).then(() => {}).catch((e) => console.log(e))
  }, [currentSearch, page, reload]);



  return (
    <div className="w-full min-h-[550px]  lg:min-h-[745px] p-4 lg:p-8 ">
      {isAdd && (
        <AddProject  loading={load}  handleEmployee={handleEmployee} setIsAdd={handleOpenProject} isError={err} msg={msg} />
      )}
      {isDelete && (
        <ConfirmationPopup submit={onDelete} setIsDelete={setIsDelete}/>
      )}
      <div className="flex flex-col lg:pb-8 pb-4 gap-1 lg:gap-2 justify-center items-center">
        <p className="lg:text-3xl text-2xl font-semibold">Projects Data</p>
        <p className=" lg:w-1/2 text-center text-zinc-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
          accusamus consequuntur error quas. Odio optio doloremque non hic
          recusandae quam?
        </p>
      </div>

      <ComTable setIsAdd={handleOpenProject} data={data} loading={loading} setIsDelete={setIsDelete} pathEdit="project" currentId={currentId} searchQuery={searchQuery} setCurrentId={setCurrentId} setSearchQuery={setSearchQuery} />
      <div className="w-full flex   mt-4 lg:mt-0 justify-end ">
        <div className="flex gap-1 lg:gap-2 ">
          <button
            className="rounded border px-6 py-2 hover:bg-primary hover:text-white  text-sm  m-0 "
            onClick={() => handlePage("previous")}
          >
            Previous
          </button>
          <div className="flex justify-center items-center ">
            <p className="text-sm lg:text-lg font-medium px-4 text-zinc-700 lg:px-5 py-2 rounded-full bg-zinc-100">{data?.page}</p>
          </div>
          <button
            className="rounded border px-8 py-2 hover:bg-primary hover:text-white  text-sm  m-0 "
            onClick={() => handlePage("next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
