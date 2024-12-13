import { FaTrash } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdMore } from "react-icons/io";
import OnRouter from "../../../Common/onRouter";

const thead = ["no", "name", "address", "status", "phone", "email", ""];

type Props = {
  data: any;
  loading: boolean;
  setIsDelete: React.Dispatch<React.SetStateAction<boolean>>;
  pathEdit: string;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setCurrentId: React.Dispatch<React.SetStateAction<number>>;
  currentId: number;
  setIsAdd: (condition: boolean) => void;
};

export function TableEmp({
  setIsAdd,
  setCurrentId,
  currentId,
  searchQuery,
  setSearchQuery,
  data,
  loading,
  setIsDelete,
  pathEdit,
}: Props) {
  const { router } = OnRouter();

  return (
    <div className="">
      <header className=" lg:space-y-4 space-y-8 p-3 px-0 lg:px-3 sm:px-8 sm:py-6 lg:p-4 xl:px-0 xl:py-6">
        <div className="flex items-center justify-end">
          <div
            className="hover:bg-primary cursor-pointer group flex  items-center rounded bg-primary/90 text-white text-sm font-medium  px-6 py-2 shadow-sm"
            onClick={() => setIsAdd(true)}
          >
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="mr-2"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            New
          </div>
        </div>
        <form className="group relative">
          <svg
            width="20"
            height="20"
            fill="currentColor"
            className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            />
          </svg>
          <input
            className="focus:ring-2 placeholder:text-sm focus:ring-blue-500 lg:w-1/3 w-full focus:outline-none appearance-none text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm"
            type="text"
            aria-label="Filter projects"
            placeholder="Filter projects Min. 3 character"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
      </header>
      <div className="overflow-x-auto w-full  min-h-[170px]   lg:min-h-[300px]  ">
        <div className=" w-full  ">
          <table className="min-w-full bg-white min-h-full  border border-gray-200 ">
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
              {loading
                ? Array(5)
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
                : data?.employees?.map((value: any, index: number) => (
                    <tr key={index}>
                      <td className="border whitespace-nowrap px-4 text-sm lg:text-base py-2 text-center">
                        {index + 1}
                      </td>
                      <td className="border whitespace-nowrap px-4 text-sm lg:text-base py-2">
                        {value.name}
                      </td>
                      <td
                        className={`border whitespace-nowrap px-4 text-sm lg:text-base py-2`}
                      >
                        {value.address}
                      </td>
                      <td className="border capitalize whitespace-nowrap px-4 text-sm lg:text-base py-2">
                        {value.status}
                      </td>
                      <td className="border whitespace-nowrap px-4 text-sm lg:text-base py-2">
                        {value.phone}
                      </td>
                      <td className="border whitespace-nowrap px-4 text-sm lg:text-base py-2">
                        {value.email}
                      </td>
                      <td
                        className={`text-center relative px-4 text-sm lg:text-base lg:px-0 ${
                          currentId === value.id
                            ? "bg-primary/90 text-white"
                            : "bg-base-100 text-black"
                        }  border `}
                        onClick={() => setCurrentId(value.id)}
                      >
                        <div
                          className={`dropdown  z-10 ${
                            index >= data?.employees.length - 2 &&
                            data?.total >= 3
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
                            <li
                              onClick={() => router(`/${pathEdit}/${value.id}`)}
                            >
                              <p>
                                <span className="text-md pr-1 text-primary">
                                  <FaMagnifyingGlass />
                                </span>{" "}
                                Detail
                              </p>
                            </li>
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
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
