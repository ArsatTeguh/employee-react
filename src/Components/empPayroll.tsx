import { useState } from "react";
import { useParams } from "react-router-dom";
import { FormatRupiahFromText } from "../Common/formatRupiah";
import { GetCurrentMonthWithZero, GetCurrentYear } from "../Common/sortDate";
import { UseFetch } from "../Common/useFetch";
import { DownloadPdf } from "../Common/htmlPdf";
import { IoInformationCircleOutline } from "react-icons/io5";
import axios from "axios";

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
type TypePayroll = {
  id: number;
  employee_id: number;
  daily_salary: number;
  absence: number;
  bonus: number;
  tax: number;
  total_hour: number;
  total: number;
  created_at: string;
};
export function EmpPayroll() {
  const [payrollForm, setPayrollForm] = useState({
    absen: 0,
    bonus: 0,
    tax: "",
    status: "Prosess",
    year: GetCurrentYear(),
    month: GetCurrentMonthWithZero(),
  });
  const [payroll, setPayroll] = useState<TypePayroll | null>();
  const [bool, setBool] = useState(false);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [load, setLoad] = useState(false);
  const { loading, onFetch, isError, message, setIsError } = UseFetch();
  const { id } = useParams();

  const handleChange = (event: React.ChangeEvent<any>) => {
    const { value, name } = event.target;
    setPayrollForm((e) => ({
      ...e,
      [name]:
        name == "status"
          ? value
          : name == "tax"
          ? value.replace(/[^.\d]/g, "").toString()
          : parseInt(value, 10),
    }));
  };

  const handleRecount = () => {
    setIsError(false);
    setMsg("")
    setErr(false)
    setBool(false)
  }

  const onPayroll = (e: any) => {
    e.preventDefault();
    setIsError(false);
    onFetch({
      method: "POST",
      url: "/payroll",
      payload: {
        absen: payrollForm.absen,
        bonus: payrollForm.bonus,
        tax: Number(payrollForm.tax),
        status: payrollForm.status,
        employee_id: Number(id),
        date: `${payrollForm.year}-${payrollForm.month}`,
      },
    }).then((e) => {
      setPayroll(e);
      setBool(true);
    });
  };

  const onSendEmail = async () => {
    setLoad(true);
    try {
      const pdf = await DownloadPdf(payroll!);
      const formData = new FormData();
      formData.append("pdf", pdf, "payroll.pdf");
      formData.append("date", `${payrollForm.year}-${payrollForm.month}`);

      const response = await axios.post("/payroll-email", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMsg(response.data.message);
    } catch (error: any) {
      setErr(true)
      setMsg(   
        error?.response?.data?.message || "Somethings Wrong, Pleases try Again"
      );
    } finally {
      setLoad(false);
    }
  };

  return (
    <div className="lg:mb-0 mb-6">
        <p className="text-center font-medium text-2xl">Payroll</p>
        <p className="text-sm text-center text-zinc-500 mb-8">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis,
          impedit!
        </p>
        <div className="flex justify-center">
          <div
            className={`transition-all   ease-in-out   rounded   ${
              !isError ? "h-0 " : "h-auto mb-2  py-2 px-8 bg-red-600"
            } `}
          >
            {message?.length != 0 && isError && (
              <p className="text-zinc-100 text-center text-sm lg:text-base capitalize">{message}</p>
            )}
          </div>
        </div>
        <div className="flex justify-center">
        <div
            className={`transition-all   ease-in-out   rounded-sm   ${
              msg?.length == 0 ? "h-0 " : "h-auto mb-2  py-2 px-4 "
            } ${err ? " bg-red-600" : "bg-green-600"}`}
          >
            {msg?.length != 0 && (
              <p className="text-zinc-100 text-sm lg:text-base text-center capitalize">
                { msg}
              </p>
            )}
          </div>
        </div>
        {bool && !loading ? (
          <div className="">
            <div className="flex justify-between border-zinc-200 items-center text-sm border-dashed border-2 lg:p-8 p-4 ">
              <div className="flex flex-col gap-3">
                <p>Daily salary</p>
                <p>Absence</p>
                <p>Bonus</p>
                <p>Tax</p>
                <p>Total hour</p>
                <p>Total</p>
              </div>
              <div className="flex flex-col gap-3   p-4 ">
                <p>{FormatRupiahFromText(String(payroll?.daily_salary))}</p>
                <p>{payroll?.absence}</p>
                <p>{FormatRupiahFromText(String(payroll?.bonus))}</p>
                <p>{payroll?.tax} %</p>
                <p>{payroll?.total_hour}</p>
                <p className="text-black font-medium">
                  {FormatRupiahFromText(String(payroll?.total))}
                </p>
              </div>
            </div>
            <div className="flex justify-end mt-8 gap-4">
              <div className="">
                <button
                  onClick={handleRecount}
                  type="submit"
                  className="text-sm px-8 py-2 disabled:bg-zinc-500 hover:text-white border-primary w-full border text-black rounded-md hover:bg-primary focus:ring-offset-2"
                >
                  Recount
                </button>
              </div>
              <div className="">
                <button
                  disabled={load}
                  onClick={onSendEmail}
                  type="submit"
                  className="text-sm  px-8 py-2 disabled:bg-zinc-500 bg-primary w-full border text-white rounded-md hover:bg-primary/90 focus:ring-offset-2"
                >
                  Email
                </button>
              </div>
            </div>
          </div>
        ) : (
          <form
            className="lg:space-y-4 space-y-3 border-2 border-dashed px-4 py-6 rounded"
            onSubmit={onPayroll}
          >
            <div className="grid grid-cols-2 lg:gap-4 gap-2">
              <div>
                <label className="block text-sm   font-medium mb-1">
                  Absen<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    name="absen"
                    value={payrollForm.absen}
                    onChange={handleChange}
                    type="number"
                    className="w-full pl-4 pr-4 py-2 border placeholder:text-sm  border-gray-300 rounded focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Bonus<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    name="bonus"
                    value={payrollForm.bonus}
                    onChange={handleChange}
                    placeholder="Rp"
                    type="number"
                    className="w-full pl-4 placeholder:text-sm pr-4 py-2 border border-gray-300 rounded focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:gap-4 gap-2">
              <div>
                <label className=" flex text-sm items-center lg:items-start  font-medium mb-1">
                  Tax
                  <div
                    className="pl-1 lg:tooltip"
                    data-tip="You can enter 2.5 for a result of 2.5%"
                  >
                    <span className="text-sm">
                      <IoInformationCircleOutline />
                    </span>
                  </div>
                </label>
                <div className="relative">
                  <input
                    name="tax"
                    value={payrollForm.tax}
                    onChange={handleChange}
                    type="string"
                    placeholder="0.00"
                    className="w-full pl-4 pr-4  py-[11px] border placeholder:text-sm  border-gray-300 rounded   focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm  font-medium mb-1">
                  Status<span className="text-red-500"> *</span>
                </label>
                <select
                  name="status"
                  value={payrollForm.status}
                  onChange={handleChange}
                  className="select  rounded  select-bordered w-full max-w-xl focus:outline-none  "
                >
                  <option value="Finished">Finished</option>
                  <option value="Prosess">Prosess</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 lg:gap-4 gap-2">
              <div>
                <label className="block text-sm  font-medium mb-1">
                  Month<span className="text-red-500"> *</span>
                </label>
                <select
                  name="month"
                  value={payrollForm.month}
                  onChange={handleChange}
                  className="select  rounded select-bordered w-full max-w-xl focus:outline-none  "
                >
                  {month.map((v, i: number) => (
                    <option key={i} value={v.value}>
                      {v.month}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm  font-medium mb-1">
                  Year
                  <span className="text-red-500"> *</span>
                </label>
                <select
                  disabled
                  className="select   select-bordered w-full max-w-xl focus:outline-none  "
                >
                  <option>{GetCurrentYear()}</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-8 gap-4 pt-4 lg:pt-0">
              <div className="">
                <button
                  disabled={loading || payrollForm.tax == ""}
                  type="submit"
                  className="text-sm px-8 py-2 disabled:bg-zinc-500 bg-primary w-full border text-white rounded hover:bg-primary/90 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}

    </div>
  );
}
