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
    <div className="flex  gap-2 w-full">
      {loading
        ? Array(3)
            .fill(null)
            .map((_, i) => (
              <div
                className="w-full h-24 block bg-zinc-300 rounded animate-pulse"
                key={i}
              ></div>
            ))
        : (
            <div className="overflow-x-auto w-full">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Position</th>
                    <th>Project</th>
                    <th>Duration</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((v: TypeDataPosition, index: number) => (
                    <tr tabIndex={index}>
                      <th>{index + 1}</th>
                      <td>{v.status}</td>
                      <td>{v.project.name}</td>
                      <td>{v.project.Estimation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
    </div>
  );
}
