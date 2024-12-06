import OnRouter from "../../../Common/onRouter";
import { FormatDateTime, GetCurrentYear } from "../../../Common/sortDate";
import { AiOutlineScan } from "react-icons/ai";
import { IoInformationCircleOutline } from "react-icons/io5";

const month = [
  { value: "01", month: "January" },
  { value: "02", month: "February" },
  { value: "03", month: "March" },
  { value: "04", month: "April" },
  { value: "05", month: "May" },
  { value: "06", month: "June" },
  { value: "07", month: "July" },
  { value: "08", month: "August" },
  { value: "09", month: "September" },
  { value: "10", month: "October" },
  { value: "11", month: "November" },
  { value: "12", month: "December" },
];

const thead = [
  "no",
  "chekin",
  "chekout",
  "project",
  "location",
  "working Hours",
];

type Props = {
  data: any;
  loading: boolean;
  searchQuery: {
    month: string;
    year: number;
    limit: number;
  };
  handleChange: (e: React.ChangeEvent<any>) => void;
  message: string
};

export function TableAten({message, searchQuery, handleChange, data, loading }: Props) {
  const { router } = OnRouter();

  return (
    <div className="">
      <header className=" space-y-4 py-2 px-0 sm:px-8 sm:py-6 lg:p-4 xl:px-0 xl:py-2">
        <div className="flex items-center justify-end pb-4 lg:pb-0">
          <div
            className=" cursor-pointer  flex gap-2 bg-primary/90  items-center rounded text-base-100 text-sm font-medium px-4 py-2 lg:px-6 lg:py-3 "
            onClick={() => router("/attedance")}
          >
            <p className="text-lg">
              <AiOutlineScan />
            </p>
            <p className="text-sm lg:text-base text-base-100"> Attedance</p>
          </div>
        </div>
        <div className="flex items-center gap-2 lg:gap-6">
          <div>
            <select
              value={searchQuery.month}
              name="month"
              onChange={handleChange}
              className="select select-sm lg:select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100 w-full lg:max-w-xs"
            >
              {month.map((v, i: number) => (
                <option key={i} value={v.value}>
                  {v.month}
                </option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={searchQuery.year}
              name="year"
              onChange={handleChange}
              className="select select-sm lg:select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100 w-full lg:max-w-xs"
            >
              {Array(3)
                .fill(null)
                .map((_, i: number) => (
                  <option key={i} value={GetCurrentYear() - i}>
                    {GetCurrentYear() - i}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </header>
      <div className="pb-2 flex gap-1">
        <select
          value={searchQuery.limit}
          name="limit"
          onChange={handleChange}
          className="select select-sm  lg:select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100  lg:max-w-xs"
        >
          {Array(3)
            .fill(null)
            .map((_, i: number) => (
              <option key={i} value={10 * (i + 1)}>
                {10 * (i + 1)}
              </option>
            ))}
        </select>
        <div className="lg:tooltip" data-tip="Total list to be returned">
              <span className="text-lg">
              <IoInformationCircleOutline />
              </span>
            </div>
      </div>
      <div className="overflow-x-auto w-full  lg:min-h-[300px]  ">
        <div className=" w-full    py-5 lg:py-0">
          <table className="min-w-full bg-white min-h-full text-sm lg:text-base  border border-gray-200 ">
            <thead className="bg-primary/90 text-zinc-200">
              <tr>
                {thead.map((v, index: number) => (
                  <th
                    key={index}
                    className="px-4 py-2 border  whitespace-nowrap capitalize"
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
                      </tr>
                    ))
                : message === "Data empty" ? (
                  <tr className="relative">
                <div className=" absolute w-full py-5  flex justify-center items-center">
                  <p className="text-xl text-zinc-300">No Record</p>
                </div>
                      </tr>
                )
                  : 
                    data?.attedances?.map((value: any, index: number) => (
                      <tr key={index}>
                        <td className="border whitespace-nowrap px-4 py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="border whitespace-nowrap px-4 py-2">
                          {FormatDateTime(value?.chekin)}
                        </td>
  
                        <td className={`border whitespace-nowrap px-4 py-2`}>
                          {value?.chekout
                            ? FormatDateTime(value?.chekout)
                            : "Not Checkout"}
                        </td>
                        <td className={`border whitespace-nowrap px-4 py-2`}>
                          {value.project.name}
                        </td>
                        <td className="border capitalize whitespace-nowrap px-4 py-2">
                          {value.location}
                        </td>
                        <td className="border whitespace-nowrap px-4 py-2">
                          {value.working_house}
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
