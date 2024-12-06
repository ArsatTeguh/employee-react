import React, { useEffect, useState } from "react";

import { UseFetch } from "../Common/useFetch";
import { GetCurrentMonthWithZero, GetCurrentYear } from "../Common/sortDate";
import { useParams } from "react-router-dom";
import { EmpTableAten } from "./empAttedanceTbl";

export function EmpAttedance() {
  const [searchQuery, setSearchQuery] = useState({
    month: GetCurrentMonthWithZero(),
    year: GetCurrentYear(),
    limit: 10,
    duration: 40
  });
  const [page, setPage] = useState(1);
  const { id } = useParams();
  const { data, loading, onFetch, message } = UseFetch();

  const handlePage = (action: "next" | "previous") => {
    if (data?.totalPages > page && action === "next") {
      setPage((e) => e + 1);
    }
    if (page > 1 && action === "previous") {
      setPage((e) => e - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setSearchQuery((prevForms) => ({ ...prevForms, [name]: value }));
  };

  const handleSearch = () => {
    onFetch({
      method: "PARAMS",
      url: `/attedance/${id}`,
      payload: {
        date: `${searchQuery.year}-${searchQuery.month}`,
        page,
        sizePage: searchQuery.limit,
      },
    })
      .then(() => {})
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    handleSearch();
  }, [searchQuery, page]);

  return (
    <div className="w-full  lg:min-h-[695px]">
      <div className="flex flex-col pb-14 gap-2 justify-center items-center">
        <p className=" lg:w-1/2 text-center text-zinc-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
          accusamus consequuntur error quas
        </p>
      </div>
      <EmpTableAten
        data={data}
        loading={loading}
        searchQuery={searchQuery}
        handleChange={handleChange}
        message={message}
      />
      <div className="w-full flex   pt-4 pb-5 lg:mt-0 justify-end ">
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
}
