import { useEffect, useState } from "react";
import { UseFetch } from "../Common/useFetch";

type TypedataProject = {
  id: number;
  name: string;
  Estimation: string;
  status: string;
  employee_id: number;
  created_at: string;
  updated_at: string;
};

type TypeDataPosition = {
  id: number;
  status: string;
  project: TypedataProject;
};

export function EmpProject() {
  const [data, setData] = useState<Array<TypeDataPosition>>();
  const { loading, onFetch } = UseFetch();

  useEffect(() => {
    onFetch({
      method: "POST",
      url: "/positionAllById",
      payload: { employee_id: 2 },
    }).then((e) => setData(e));
    return () => {};
  }, []);

  return (
    <div className="flex pb-5  gap-2 w-full">
      {loading
        ? Array(3)
            .fill(null)
            .map((_, i) => (
              <div
                className="w-full h-4 lg:h-24 block bg-zinc-300 rounded animate-pulse"
                key={i}
              ></div>
            ))
        : (
            <div className="overflow-x-auto w-full">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Position</th>
                    <th>Project</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((v: TypeDataPosition, index: number) => (
                    <tr tabIndex={index}>
                      <td className="whitespace-nowrap" >{index + 1}</td  >
                      <td className="whitespace-nowrap">{v.status}</td>
                      <td className="whitespace-nowrap">{v.project.name}</td>
                      <td className="whitespace-nowrap">{v.project.Estimation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
    </div>
  );
}
