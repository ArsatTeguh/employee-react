import { RiPencilFill } from "react-icons/ri";
import { FormatRupiahFromText } from "../Common/formatRupiah";
import { UseFetch } from "../Common/useFetch";
import { useEffect, useState } from "react";
import { EditWallet } from "../Common/empWallet";
import { useParams } from "react-router-dom";

type Typeforms = {
  hourly_salary: number;
  monthly_salary: number;
  no_rekening: number;
  name_banking: string;
  type_banking: string;
};

const defaultValue = {
  hourly_salary: 0,
  monthly_salary: 0,
  no_rekening: 0,
  name_banking: "",
  type_banking: "",
};

export function Profile() {
  const [wallet, setWallet] = useState<Typeforms>(defaultValue);
  const [isEdit, setIsEdit] = useState(false);
  const { onFetch, loading } = UseFetch();
  const { id } = useParams();

  useEffect(() => {
    onFetch({ method: "GET", url: `/wallet/${id}` }).then((e) => {
      setWallet(e);
    });
    return () => {};
  }, []);

  return (
    <div className="flex flex-col gap-4 h-full">
      {isEdit && (
        <EditWallet
          id={id}
          forms={wallet}
          handleCLose={setIsEdit}
          setEmployee={setWallet}
        />
      )}
      {loading ? (
        <div className="flex w-full flex-col gap-4">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      ) : (
        <div className="w-full flex gap-3 flex-col rounded-md  border   ">
          <div className="flex items-center justify-between border-b pb-2 px-6 py-2 bg-zinc-100">
            <p className="font-semibold ">Wallet</p>
            <p
              className="p-2 rounded hover:bg-primary text-white bg-primary/90 cursor-pointer"
              onClick={() => setIsEdit(true)}
            >
              <RiPencilFill />
            </p>
          </div>
          <div className="grid grid-cols-3 gap-y-6 mt-2  w-full items-center px-6 pb-4">
            <div className="flex flex-col gap-2">
              <p className="font-semibold">Hourly Salary</p>
              <p className="text-zinc-600">{FormatRupiahFromText(String(wallet.hourly_salary))}</p>
            </div>
            <div className="flex flex-col lg:w-[300px] flex-wrap gap-2">
              <p className="font-semibold">Monthly Salary</p>
              <p className="text-zinc-600">{FormatRupiahFromText(String(wallet.monthly_salary))}</p>
            </div>
            <div className="flex flex-col lg:w-[300px] flex-wrap gap-2">
              <p className="font-semibold">No Rekening</p>
              <p className="text-zinc-600">{wallet.no_rekening}</p>
            </div>
            <div className="flex flex-col lg:w-[300px] flex-wrap gap-2">
              <p className="font-semibold">Name Bank</p>
              <p className="text-zinc-600">{wallet.name_banking}</p>
            </div>
            <div className="flex flex-col lg:w-[300px] flex-wrap gap-2">
              <p className="font-semibold">Type Bank</p>
              <p className="text-zinc-600">{wallet.type_banking}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
