import { useEffect, useState } from "react";
import { ImFlag } from "react-icons/im";
import { UseFetch } from "./useFetch";

type Typeforms = {
  hourly_salary: number;
  monthly_salary: number;
  no_rekening: number;
  name_banking: string;
  type_banking: string;
};

type Props = {
  handleCLose: React.Dispatch<React.SetStateAction<boolean>>;
  forms: Typeforms;
  setEmployee: React.Dispatch<React.SetStateAction<Typeforms>>;
  id: string | undefined
};

export function EditWallet({id, setEmployee, handleCLose, forms }: Props) {
  const [contact, setContact] = useState<Typeforms>(forms);

  const { onFetch, loading, message, setMesage, setIsError, isError } =
    UseFetch();

  const handleChange = (v: React.ChangeEvent<any>) => {
    const { name, value } = v.target;
    setContact((e) => ({ ...e, [name]: name === "name_banking" ||  name === "type_banking" ?  value : parseInt(value, 10) }));
  };

  const close = () => {
    handleCLose(false);
    setIsError(false);
    setMesage("");
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    onFetch({ method: "PATCH", payload: contact, url: `/wallet/${id}` }).then(
      () => {
        setEmployee(contact);
      }
    );
  };

  useEffect(() => {
    let interval:any
    if (message !== "") {
      interval = setTimeout(() => {
        setMesage("")
        setIsError(false)
      } ,1500)
    }
    return () => clearTimeout(interval)
  },[message])

  return (
    <div className="fixed inset-0  z-20 bg-black bg-opacity-50 flex items-start pt-10 lg:pt-0 lg:items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-xl shadow-xl">
        <div className="px-6 pb-8 pt-12 relative">
          {/* Header */}
          <div className=" mb-2 flex gap-1 px-2">
            <p className="-rotate-12 text-lg">
              <ImFlag />
            </p>
            <div className="flex flex-col  lg:gap-1">
              <h2 className="lg:text-xl text-base font-semibold">Edit Wallet</h2>
              <p className="text-gray-600 text-sm lg:mb-6 mb-4">
                Lorem ipsum dolor sit.
              </p>
            </div>
          </div>
          <div className="px-3 bg-black/10 absolute rounded-full lg:right-4 lg:top-3 right-2 top-2  text-zinc-600 hover:bg-black/20 cursor-pointer"
          onClick={close}
          >
            <p className="text-xl text-center mb-1 flex justify-center w-full h-full items-center ">
              x
            </p>
          </div>

          {/* Form */}
          <div
            className={`transition-all   ease-in-out   rounded-sm   ${
              message?.length == 0 ? "h-0 " : "h-auto mb-2  py-2 px-4 "
            } ${isError ? " bg-red-600" : "bg-green-600"}`}
          >
            {message?.length != 0 && message?.length != 0 && (
              <p className="text-zinc-100 text-sm lg:text-base text-center capitalize">{message}</p>
            )}
          </div>

          <form className="space-y-4 " onSubmit={onSubmit}>
            <div>
              <label className="block text-sm  font-medium text-black mb-1">
                Hourly salary<span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <input
                  name="hourly_salary"
                  value={contact.hourly_salary}
                  onChange={handleChange}
                  type="number"
                  className="w-full pl-4 pr-5 py-2 border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:gap-4">
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  Monthly salary<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    name="monthly_salary"
                    value={contact.monthly_salary}
                    onChange={handleChange}
                    type="number"
                    placeholder="Enter Username"
                    className="w-full pl-4 pr-4 py-2 border text-sm lg:text-base placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  No rekening<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    name="no_rekening"
                    value={contact.no_rekening}
                    onChange={handleChange}
                    type="number"
                    placeholder="ex: 6982"
                    className="w-full pl-4 pr-4 py-2 text-sm lg:text-base border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:gap-4 pb-4">
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  Name banking<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    name="name_banking"
                    value={contact.name_banking}
                    onChange={handleChange}
                    type="text"
                    placeholder="Alexander..."
                    className="w-full pl-4 pr-4 py-2 text-sm lg:text-base border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  Type banking<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    name="type_banking"
                    value={contact.type_banking}
                    onChange={handleChange}
                    type="text"
                    placeholder="BCA"
                    className="w-full pl-4 pr-4 py-2 text-sm lg:text-base border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between  gap-4">
              <button
                type="submit"
                className="px-4 py-2 text-black w-full text-sm lg:text-base border-2 rounded border-zinc-500 hover:bg-primary hover:text-base-100"
                onClick={() => handleCLose(false)}
              >
                Back
              </button>
              <button
                disabled={loading}
                type="submit"
                className="px-4 py-2 disabled:bg-zinc-500 text-sm lg:text-base bg-primary w-full border text-white rounded-md hover:bg-primary/90 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
