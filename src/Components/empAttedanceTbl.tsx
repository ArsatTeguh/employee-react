import { FormatDateTime, GetCurrentYear } from "../Common/sortDate";
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

const duration = [
  { value: 40, title: "40 Hours" },
  { value: 35, title: "35 Hours" },
  { value: 30, title: "30 Hours" },
  { value: 25, title: "25 Hours" },
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
    duration: number;
  };
  handleChange: (e: React.ChangeEvent<any>) => void;
  message: string;
};

export function EmpTableAten({
  message,
  searchQuery,
  handleChange,
  data,
  loading,
}: Props) {
  return (
    <div className="">
      <div className="mb-2 flex items-center gap-2 ">
        <select
          value={searchQuery.month}
          name="month"
          onChange={handleChange}
          className="select select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100 w-full max-w-xs"
        >
          {month.map((v, i: number) => (
            <option key={i} value={v.value}>
              {v.month}
            </option>
          ))}
        </select>
        <select
          value={searchQuery.year}
          name="year"
          onChange={handleChange}
          className="select select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100 w-full max-w-xs"
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
      <div className="lg:py-6 py-4 flex flex-col ">
        <p className="text-sm font-medium mb-1 lg:mbb-0">Total Hours / Month</p>
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-3 gap-2">
          <progress
            className="progress progress-info lg:w-1/3 w-10/12 h-[8px]"
            value={message === "Data empty" ? 0 : data?.hoursMonth}
            max={searchQuery.duration}
          ></progress>
          <div className="flex gap-1">
            <p className="text-sm font-semibold">
              {message === "Data empty" ? 0 : data?.hoursMonth} Hours{" "}
            </p>
            <div
              className="lg:tooltip"
              data-tip="Total working hours per month."
            >
              <span className="text-sm">
                <IoInformationCircleOutline />
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <select
              value={searchQuery.duration}
              name="duration"
              onChange={handleChange}
              className="select select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100  max-w-xs"
            >
              {duration.map((v, i: number) => (
                <option key={i} value={v.value}>
                  {v.title}
                </option>
              ))}
            </select>
            <div
              className="lg:tooltip"
              data-tip="Change the target hours per month. Make sure to look at holidays or leave."
            >
              <span className="text-lg">
                <IoInformationCircleOutline />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-2 flex gap-1">
        <select
          value={searchQuery.limit}
          name="limit"
          onChange={handleChange}
          className="select select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100  max-w-xs"
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
        <div className=" w-full    ">
          <table className="min-w-full bg-white min-h-full text-sm lg:text-base  border border-gray-200 ">
            <thead className="bg-primary/90 text-zinc-200">
              <tr>
                {thead.map((v, index: number) => (
                  <th
                    key={index}
                    className="px-4 py-2 border text-sm  whitespace-nowrap capitalize"
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
                        <span className="border block m-2 animate-pulse whitespace-nowrap px-4 py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-2 animate-pulse whitespace-nowrap px-4 py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-2 animate-pulse whitespace-nowrap px-4 py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-2 animate-pulse whitespace-nowrap px-4 py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-2 animate-pulse whitespace-nowrap px-4 py-2 bg-zinc-300 rounded-full " />
                      </td>
                      <td>
                        <span className="border block m-2 animate-pulse whitespace-nowrap px-4 py-2 bg-zinc-300 rounded-full " />
                      </td>
                     
                    </tr>
                  ))
              ) : message === "Data empty" ? (
                <tr className="relative">
                  <div className=" absolute w-full py-5  flex justify-center items-center">
                    <p className="text-xl text-zinc-300">No Record</p>
                  </div>
                </tr>
              ) : (
                data?.attedances?.map((value: any, index: number) => (
                  <tr key={index}>
                    <td className="border whitespace-nowrap text-sm px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border whitespace-nowrap text-sm px-4 py-2">
                      {FormatDateTime(value?.chekin)}
                    </td>

                    <td
                      className={`border whitespace-nowrap text-sm px-4 py-2`}
                    >
                      {value?.chekout
                        ? FormatDateTime(value?.chekout)
                        : "Not Checkout"}
                    </td>
                    <td
                      className={`border whitespace-nowrap text-sm px-4 py-2`}
                    >
                      {value.project.name}
                    </td>
                    <td className="border capitalize whitespace-nowrap text-sm px-4 py-2">
                      {value.location}
                    </td>
                    <td className="border whitespace-nowrap text-sm px-4 py-2">
                      {value.working_house}
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
