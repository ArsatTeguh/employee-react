import { useEffect, useState } from "react";
import ConfirmationPopup from "../../../Common/confirmationPopup";
import { UseFetch } from "../../../Common/useFetch";
import { TableLeave } from "./tableLeave";

export function Leave() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<{id: number, employeId: number}>({id: 0, employeId: 0});
  const [currentSearch, setCurrenSearch] = useState("");

  const { data, loading, onFetch, message,} = UseFetch();

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
    onFetch({ method: "DELETE", url: "/leave/" + currentId.id }).then(() => {
      window.location.reload();
    });
  };

  const OnApprove = () => {
    onFetch({ method: "PATCH", url: "/leave/" + currentId.id, payload: {status: "APPROVE",employee_id:currentId.employeId} }).then(() => {
      window.location.reload();
    });
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
      url: "/leaves",
      payload: { status: currentSearch, page, sizePage: 5 },
    })
      .then(() => {})
      .catch((e) => console.log(e));
  }, [currentSearch, page]);

  return (
    <div className="w-full p-8  lg:min-h-[745px] ">
      {isDelete && (
        <ConfirmationPopup submit={onDelete} setIsDelete={setIsDelete} />
      )}

      <div className="flex flex-col pb-14 gap-2 justify-center items-center">
        <p className="text-3xl font-semibold">Leave</p>
        <p className=" lg:w-1/2 text-center text-zinc-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
          accusamus consequuntur error quas. Odio optio doloremque non hic
          recusandae quam?
        </p>
      </div>
      <TableLeave
        data={data}
        loading={loading}
        setIsDelete={setIsDelete}
        pathEdit="employee/wallet"
        currentId={currentId}
        searchQuery={searchQuery}
        setCurrentId={setCurrentId}
        setSearchQuery={setSearchQuery}
        message={message}
        OnApprove={OnApprove}
      />
      <div className="w-full flex   mt-4 lg:mt-0 justify-end ">
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
}
