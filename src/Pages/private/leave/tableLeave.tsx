import { FaCheckSquare, FaTrash } from "react-icons/fa";
import { FiInbox } from "react-icons/fi";
import { IoMdMore } from "react-icons/io";

const thead = [
  "no",
  "employee",
  "start date",
  "end date",
  "leave type",
  "status",
  "",
];
const month = [
  { value: "", month: "All" },
  { value: "APPROVE", month: "Approve" },
  { value: "PENDING", month: "Pending" },
];

type Props = {
  data: any;
  loading: boolean;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setCurrentId: React.Dispatch<
    React.SetStateAction<{
      id: number;
      employeId: number;
    }>
  >;
  currentId: {
    id: number;
    employeId: number;
  };
  message: string;
  OnApprove: () => void;
};

export function TableLeave({
  OnApprove,
  message,
  setCurrentId,
  currentId,
  searchQuery,
  setSearchQuery,
  data,
  loading,
  setIsDelete,
}: Props) {
  return (
    <div className="">
      <header className=" lg:space-y-4 space-y-8 p-3 px-0 lg:px-3 sm:px-8 sm:py-6 lg:p-4 xl:px-0 xl:py-6">
        <div>
          <select
            value={searchQuery}
            name="month"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="select select-sm lg:select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100 w-full max-w-xs"
          >
            {month.map((v, i: number) => (
              <option key={i} value={v.value}>
                {v.month}
              </option>
            ))}
          </select>
        </div>
      </header>
      <div className="overflow-x-auto w-full  lg:min-h-[300px]  ">
        <div className=" w-full    pb-4 lg:py-0">
          <table className="min-w-full bg-white min-h-full relative  border border-gray-200 ">
            <thead className="bg-primary/90 text-zinc-200">
              <tr>
                {thead.map((v, index: number) => (
                  <th
                    key={index}
                    className="px-4 py-2 border text-sm lg:text-base whitespace-nowrap capitalize"
                  >
                    {v}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {loading ? (
                Array(5)
                  .fill(null)
                  .map((_, index: number) => (
                    <tr className="" key={index}>
                      <td>
                        <span className="border block m-1 lg:m-2 animate-pulse whitespace-nowrap px-4 py-1 lg:py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-1 lg:m-2 animate-pulse whitespace-nowrap px-4 py-1 lg:py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-1 lg:m-2 animate-pulse whitespace-nowrap px-4 py-1 lg:py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-1 lg:m-2 animate-pulse whitespace-nowrap px-4 py-1 lg:py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-1 lg:m-2 animate-pulse whitespace-nowrap px-4 py-1 lg:py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-1 lg:m-2 animate-pulse whitespace-nowrap px-4 py-1 lg:py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-1 lg:m-2 animate-pulse whitespace-nowrap px-4 py-1 lg:py-2 bg-zinc-300 rounded-full " />
                      </td>
                    </tr>
                  ))
              ) : message === "Data kosong" ? (
                <div className=" absolute w-full py-5  flex justify-center items-center">
                  <p className="text-xl text-zinc-300">No Record</p>
                </div>
              ) : (
                data?.leave?.map((value: any, index: number) => (
                  <tr key={index}>
                    <td className="border whitespace-nowrap px-4 text-sm lg:text-base py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border whitespace-nowrap px-4 text-sm lg:text-base py-2">
                      {value.employee.name}
                    </td>
                    <td className={`border whitespace-nowrap px-4 text-sm lg:text-base py-2`}>
                      {value.start_date}
                    </td>
                    <td className="border capitalize whitespace-nowrap px-4 text-sm lg:text-base py-2">
                      {value.end_date}
                    </td>
                    <td className="border whitespace-nowrap px-4 text-sm lg:text-base py-2">
                      {value.leave_type}
                    </td>
                    <td className="border whitespace-nowrap px-4 text-sm lg:text-base py-2">
                      {value.status}
                    </td>
                    <td
                      className={`text-center relative px-4 text-sm lg:text-base lg:px-0 ${
                        currentId === value.id
                          ? "bg-primary/90 text-white"
                          : "bg-base-100 text-black"
                      }  border `}
                      onClick={() =>
                        setCurrentId({
                          id: value.id,
                          employeId: value.employee_id,
                        })
                      }
                    >
                      <div
                        className={`dropdown  z-10 ${
                          index >= data?.leave.length - 2 && data?.total >= 3
                            ? "dropdown-left dropdown-top"
                            : "dropdown-left"
                        }`}
                      >
                        <button tabIndex={index} className="text-xl ">
                          <IoMdMore />
                        </button>
                        <ul
                          tabIndex={index}
                          className="menu border text-black dropdown-content bg-base-100 rounded  w-52 p-2 shadow"
                        >
                          {value.status === "PENDING" && (
                            <li onClick={OnApprove}>
                              <p>
                                <span className="text-lg  text-primary">
                                  <FaCheckSquare />
                                </span>{" "}
                                Approve
                              </p>
                            </li>
                          )}
                          <li onClick={() => setIsDelete(true)}>
                            <p>
                              <span className=" text-red-500 pr-1">
                                <FaTrash />
                              </span>{" "}
                              Delete
                            </p>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
