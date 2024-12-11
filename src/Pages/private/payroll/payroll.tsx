import axios from "axios";
import React, { useEffect, useState } from "react";
import Popup from "../../../Common/popup";
import {
  GetCurrentMonthWithZero,
  GetCurrentYear
} from "../../../Common/sortDate";
import { UseFetch } from "../../../Common/useFetch";
import { TablePayroll } from "./payrollTable";

type TypeSearch = {
  month: string;
  year: number;
  limit: number;
  employee: { name: string; id: number | null };
};

type TypeForm = {
  payroll: {
    id: number;
    employee: string;
    daily_salary: number;
    absence: number;
    bonus: number;
    status: string;
    tax: number;
    total_hour: number;
    total: number;
    created: Date;
  }[];
};

export function Payroll() {
  const [searchQuery, setSearchQuery] = useState<TypeSearch>({
    month: GetCurrentMonthWithZero(),
    year: GetCurrentYear(),
    limit: 10,
    employee: { name: "", id: null },
  });
  const [page, setPage] = useState(1);
  const [load, setLoad] = useState(false);
  const [msg, setMsg] = useState("");
  const [popup, setPopup] = useState(false);
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

  const handleEmpId = (
    _id: number,
    value: { name: string; id: number | null }
  ) => {
    setSearchQuery((prev) => ({
      ...prev,
      employee: { name: value.name, id: value.id },
    }));
  };

  const handleExcel = async (data: TypeForm) => {
    setMsg("");
    setLoad(true);
    const format = data?.payroll?.map((data: any) => {
      return {
        id: data.id,
        employee_name: data.Employee.name,
        daily_salary: data.daily_salary,
        absence: data.absence,
        bonus: data.bonus,
        status: data.status,
        tax: data.tax,
        total_hour: data.total_hour,
        total: data.total,
        created: data.created_at,
      };
    });

    try {
      const response = await axios.post("/payroll-excel", format, {
        responseType: "blob", // Important for file download
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "payroll.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error: any) {
      setMsg(
        error?.response?.data?.message || "Somethings Wrong, Pleases try Again"
      );
    } finally {
      setLoad(false);
    }
  };

  const handleSearch = () => {
    onFetch({
      method: "PARAMS",
      url: "/payrolls",
      payload: {
        date: `${
          searchQuery.month == ""
            ? ""
            : `${searchQuery.year}-${searchQuery.month}`
        }`,
        employee_id: searchQuery.employee.id ?? "",
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
    <div className="w-full lg:p-8 pt-4 px-4 pb-8  lg:min-h-[745px]">
      {popup && (
        <Popup
          disable="projects"
          onChange={handleEmpId}
          currentPopup={0}
          setPopup={setPopup}
        />
      )}
      <div className="flex flex-col pb-8 gap-1 lg:gap-2 justify-center items-center">
        <p className="lg:text-3xl text-2xl font-semibold">Payroll Data</p>
        <p className=" lg:w-1/2 text-center text-zinc-500 text-sm">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rem
          accusamus consequuntur error quas
        </p>
      </div>
      <div className="flex justify-center">
        <div
          className={`transition-all   ease-in-out   rounded   ${
            msg?.length == 0 ? "h-0 " : "h-auto mb-2  py-2 px-8 bg-red-600 "
          }`}
        >
          {msg?.length != 0 && (
            <p className="text-zinc-100 text-sm lg:text-base text-center capitalize">{msg}</p>
          )}
        </div>
      </div>
      <TablePayroll
        data={data}
        handleName={handleEmpId}
        loading={loading}
        searchQuery={searchQuery}
        handleChange={handleChange}
        message={message}
        setPopup={setPopup}
        load={load}
        handleExcel={handleExcel}
      />
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
}
