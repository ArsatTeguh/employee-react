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
  const [msg, setSmg] = useState("")

  const { data, loading, onFetch, message, setMesage, isError, setIsError } = UseFetch();


  const handleEmployee = (v: TProject) => {
    onFetch({method: 'POST', url:"/project", payload: v}).then(() => {
      setSmg("Insert data")
    }).catch((e) => setSmg(e.message) )
  };

  const handleOpenProject = (condition: boolean) => {
    setMesage("")
    setSmg("")
    setIsError(false)
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
    onFetch({method: "DELETE", url:"/project/"+currentId}).then(() => {
      window.location.reload()
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
    onFetch({
      method: "PARAMS",
      url: "/projects",
      payload: { name: currentSearch, page, sizePage: 5 },
    }).then(() => {}).catch((e) => console.log(e))
  }, [currentSearch, page]);



  return (
    <div className="w-full lg:min-h-[745px] p-8 ">
      {isAdd && (
        <AddProject message={message}  handleEmployee={handleEmployee} setIsAdd={handleOpenProject} isError={isError} msg={msg} />
      )}
      {isDelete && (
        <ConfirmationPopup submit={onDelete} setIsDelete={setIsDelete}/>
      )}
      <div className="flex flex-col pb-8 gap-2 justify-center items-center">
        <p className="text-3xl font-semibold">Projects Data</p>
        <p className=" lg:w-1/2 text-center text-zinc-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
          accusamus consequuntur error quas. Odio optio doloremque non hic
          recusandae quam?
        </p>
      </div>

      <ComTable setIsAdd={handleOpenProject} data={data} loading={loading} setIsDelete={setIsDelete} pathEdit="project" currentId={currentId} searchQuery={searchQuery} setCurrentId={setCurrentId} setSearchQuery={setSearchQuery} />
      <div className="w-full flex    justify-end ">
        <div className="flex gap-4 ">
          <button
            className="rounded border px-6 py-2 hover:bg-primary hover:text-white  text-sm  m-0 "
            onClick={() => handlePage("previous")}
          >
            Previous
          </button>
          <div className="flex justify-center items-center">
            <p className="text-lg font-semibold">{data?.page}</p>
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
