import { FormatDate } from "../../../Common/sortDate";

const thead = [
  "no",
  "start date",
  "end date",
  "leave type",
  "status",
];

type Props = {
  data: any;
  loading: boolean;
  message: string;
  setIsAdd: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TableLeaveNon({setIsAdd, message, data, loading }: Props) {
  return (
    <div className="">
      <div className="flex items-center justify-end lg:py-8 py-4">
        <div
          className="hover:bg-primary cursor-pointer group flex  items-center rounded-md bg-primary/90 text-white text-sm font-medium  px-6 py-2 shadow-sm"
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
      <div className="overflow-x-auto w-full min-h-[170px]  lg:min-h-[300px]  ">
        <div className=" w-full    py-5 lg:py-0">
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
           
                    </tr>
                  ))
              ) : message === "Data Not Found" ? (
                <div className=" absolute w-full py-5  flex justify-center items-center">
                  <p className="text-xl text-zinc-300">
                   No Record
                  </p>
                </div>
              ) : (
                data?.map((value: any, index: number) => (
                  <tr key={index}>
                    <td className="border text-sm lg:text-base  whitespace-nowrap px-4 py-2 text-center">
                      {index + 1}
                    </td>
                    <td className={`border whitespace-nowrap text-sm lg:text-base  px-4 py-2`}>
                      {FormatDate(String(value.start_date))}
                    </td>
                    <td className="border capitalize whitespace-nowrap text-sm lg:text-base  px-4 py-2">
                    {FormatDate(String(value.end_date))}
                    </td>
                    <td className="border whitespace-nowrap text-sm lg:text-base  px-4 py-2">
                      {value.leave_type}
                    </td>
                    <td className="border whitespace-nowrap text-sm lg:text-base  px-4 py-2">
                      {value.status}
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
