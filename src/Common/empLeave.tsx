import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseFetch } from "../Common/useFetch";
import { FormatDate } from "./sortDate";

export function EmpLeave() {
  const { loading, onFetch, data, message } = UseFetch();
  const {id} = useParams()

  useEffect(() => {
    onFetch({
      method: "GET",
      url: `/leaves-employee/${id}`,
    });
    return () => {};
  }, []);

  return (
    <div className="flex  gap-2 w-full pb-5">
      {loading
        ? Array(3)
            .fill(null)
            .map((_, i) => (
              <div
                className="w-full h-4 lg:h-24 block bg-zinc-300 rounded animate-pulse"
                key={i}
              ></div>
            ))
        :  (
            <div className="overflow-x-auto w-full">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Start date</th>
                    <th>End date</th>
                    <th>Leave type</th>
                    <th>Status</th>
                    <th>Craeted</th>
                  </tr>
                </thead>
                <tbody>
                  {message === "" ? (
                    <div className=""></div>
                  ) : 
                    data?.map((v: any, index: number) => (
                      <tr tabIndex={index}>
                        <td className="whitespace-nowrap">{index + 1}</td>
                        <td className="whitespace-nowrap">{FormatDate(v.start_date)}</td>
                        <td className="whitespace-nowrap">{FormatDate(v.end_date)}</td>
                        <td className="whitespace-nowrap">{v.leave_type}</td>
                        <td className="whitespace-nowrap">{v.status}</td>
                        <td className="whitespace-nowrap">{FormatDate(v.created_at)}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )}
    </div>
  );
}
