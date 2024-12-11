import { IoInformationCircleOutline } from "react-icons/io5";
import { FormatRupiahFromText } from "../../../Common/formatRupiah";
import { FormatDate, GetCurrentYear } from "../../../Common/sortDate";
import { SiMicrosoftexcel } from "react-icons/si";

type TypeForm = {
  payroll : {
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
  }[]
 };

const month = [
  { value: "", month: "All" },
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
  "employee",
  "Daily salary",
  "absence",
  "bonus",
  "tax",
  "total hours",
  "status",
  "total",
  "created",
];

type Props = {
  data: any;
  loading: boolean;
  searchQuery: {
    month: string;
    year: number;
    limit: number;
    employee: { name: string; id: number | null };
  };
  handleName: (
    _id: number,
    value: {
      name: string;
      id: number | null;
    }
  ) => void;
  setPopup: React.Dispatch<React.SetStateAction<boolean>>;
  handleChange: (e: React.ChangeEvent<any>) => void;
  message: string;
  load: boolean;
  handleExcel: (data: TypeForm) => Promise<void>
};

export function TablePayroll({
  setPopup,
  message,
  searchQuery,
  handleChange,
  data,
  loading,
  handleName,
  load,
  handleExcel,
}: Props) {
  return (
    <div className="">
      <header className=" lg:space-y-4 space-y-8 p-3 px-0 lg:px-3 sm:px-8 sm:py-6 lg:p-4 xl:px-0 xl:py-6">
        <div className="flex lg:flex-row flex-col lg:items-center gap-2 lg:gap-2 pt-0 lg:pt-10">
          <select
            value={searchQuery.month}
            name="month"
            onChange={handleChange}
            className="select select-sm lg:select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100 w-full max-w-xs"
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
            disabled={searchQuery.month == ""}
            onChange={handleChange}
            className="select select-sm lg:select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100 w-full max-w-xs"
          >
            {Array(3)
              .fill(null)
              .map((_, i: number) => (
                <option key={i} value={GetCurrentYear() - i}>
                  {GetCurrentYear() - i}
                </option>
              ))}
          </select>
          {searchQuery.employee.name == "" ? (
            <div className="">
              <button
                onClick={() => setPopup(true)}
                className="px-6 lg:px-8 lg:py-3 py-2  text-zinc-500 text-sm rounded border lg:border-2 border-dashed "
              >
                + Employee
              </button>
            </div>
          ) : (
            <div className="relative flex">
              <span
                className="w-4 h-4  cursor-pointer absolute right-1 bg-base-100  top-1 rounded-full text-sm flex justify-center items-center pb-[2px] font-medium text-black"
                onClick={() => handleName(0, { name: "", id: null })}
              >
                x
              </span>
              <div
                onClick={() => setPopup(true)}
                className="px-6 lg:px-8 lg:py-3 py-2 text-sm lg:text-base  rounded border bg-primary/90 text-white "
              >
                {searchQuery.employee.name}
              </div>
            </div>
          )}
          <div className="flex gap-1">
            <button
              disabled={message == "Data empty" || load}
              onClick={() => handleExcel(data)}
              className="px-6 lg:px-8 lg:py-3 py-2 flex items-center gap-2 bg-primary/90 text-base-100 disabled:bg-zinc-300 text-sm rounded  "
            >
              <p className="lg:text-xl">
                <SiMicrosoftexcel />
              </p>
              <p>Export</p>
            </button>
            <div className="lg:tooltip" data-tip="only the data displayed in the table will be printed">
              <span className="lg:text-lg">
                <IoInformationCircleOutline />
              </span>
            </div>
          </div>
        </div>
      </header>
      <div className="pb-2 pt-4 lg:pt-0 flex gap-1">
        <select
          value={searchQuery.limit}
          name="limit"
          onChange={handleChange}
          className="select select-sm  lg:select-md select-bordered focus:outline-none  focus:border-[1px] rounded focus:scale-100  max-w-xs"
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
        <div className=" w-full   ">
          <table className="min-w-full bg-white min-h-full text-sm lg:text-base  border border-gray-200 ">
            <thead className="bg-primary/90 text-zinc-200">
              <tr>
                {thead.map((v, index: number) => (
                  <th
                    key={index}
                    className="px-4 py-2 border lg:text-base text-sm  whitespace-nowrap capitalize"
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
              ) : message === "Data empty" ? (
                <tr className="relative">
                  <div className=" absolute w-full py-5  flex justify-center items-center">
                    <p className="lg:text-xl  text-zinc-300">No Record</p>
                  </div>
                </tr>
              ) : (
                data?.payroll?.map((value: any, index: number) => (
                  <tr key={index}>
                    <td className="border whitespace-nowrap lg:text-base text-sm px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className="border whitespace-nowrap px-4 py-2 lg:text-base text-sm">
                      {value.Employee.name}
                    </td>
                    <td className="border whitespace-nowrap px-4 py-2 lg:text-base text-sm">
                      {FormatRupiahFromText(String(value.daily_salary))}
                    </td>

                    <td className={`border whitespace-nowrap px-4 py-2 lg:text-base text-sm`}>
                      {value.absence}
                    </td>
                    <td className={`border whitespace-nowrap px-4 py-2 lg:text-base text-sm`}>
                      {FormatRupiahFromText(String(value.bonus))}
                    </td>
                    <td className="border capitalize whitespace-nowrap px-4 py-2 lg:text-base text-sm">
                      {value.tax} %
                    </td>
                    <td className="border whitespace-nowrap px-4 py-2 lg:text-base text-sm">
                      {value.total_hour}
                    </td>
                    <td className="border whitespace-nowrap px-4 py-2 lg:text-base text-sm">
                      {value.status}
                    </td>
                    <td className="border whitespace-nowrap px-4 py-2 lg:text-base text-sm">
                      {FormatRupiahFromText(String(value.total))}
                    </td>
                    <td className="border whitespace-nowrap px-4 py-2 lg:text-base text-sm">
                      {FormatDate(value.created_at)}
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
