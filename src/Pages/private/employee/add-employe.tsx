import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { ImFlag } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { hasEmptyFieldObjs } from "../../../Common/validate";

type TEmployee = {
  email: string;
  password: string;
  repeat_password: string;
  address: string;
  name: string;
  role: "hr" | "karyawan";
};

type Props = {
  setIsAdd:  (condition: boolean) => void
  handleEmployee: (v: TEmployee) => void
  message: string
  isError: boolean
  msg:string
  loading: boolean
};

export function AddEmploye({loading, msg, setIsAdd, handleEmployee, message, isError  }: Props) {
  const [forms, setForms] = useState<TEmployee>({
    email: "",
    password: "",
    repeat_password: "",
    address: "",
    name: "",
    role: "hr",
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForms((prevForms) => ({ ...prevForms, [name]: value }));
  };
  const validate = hasEmptyFieldObjs(forms)

  const onSubmit = (e: any) => {
    e.preventDefault()
    handleEmployee(forms)
  }

  const handleCLose = () => {
    setForms({
      email: "",
      password: "",
      repeat_password: "",
      address: "",
      name: "",
      role: "hr",
    })
    setIsAdd(false)
  }

  return (
    <div className="fixed inset-0  z-20 bg-black bg-opacity-50 flex items-start lg:items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-xl shadow-xl">
        <div className="px-4 lg:px-6 lg:pb-8 pb-4 pt-12 relative">
          {/* Header */}
          <div className=" lg:mb-2 flex gap-1 px-2">
            <p className="-rotate-12 text-lg">
              <ImFlag />
            </p>
            <div className="flex flex-col lg:gap-1">
              <h2 className="lg:text-xl text-base font-semibold">Add Employee</h2>
              <p className="text-gray-600 text-sm lg:mb-6 mb-4">
                Create New Employee or User
              </p>
            </div>
          </div>
          <div
            className="px-3 bg-black/10 absolute rounded-full lg:right-4 lg:top-3 right-2 top-2  text-zinc-700 hover:bg-black/20 cursor-pointer"
            onClick={handleCLose}
          >
            <p className="text-xl text-center mb-1 flex justify-center w-full h-full items-center text-">
              x
            </p>
          </div>

          {/* Form */}
          <div
          className={`transition-all   ease-in-out   rounded-sm   ${
           msg?.length == 0  ? "h-0 " : "h-auto lg:mb-2 mb-1  py-2 px-4 "
          } ${isError ? " bg-red-600" : "bg-green-600"}`}
        >
          {message?.length != 0 && msg?.length != 0  && (
            <p className="text-zinc-100 text-center text-sm lg:text-base capitalize">{isError ? message : msg}</p>
          )}
        </div>
          
          <form className="lg:space-y-4 space-y-2" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm  font-medium text-black mb-1">
                Email<span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <span className="absolute left-2 lg:left-3 top-[12px] lg:text-xl text-base text-gray-500">
                  <MdEmail />
                </span>
                <input
                  name="email"
                  value={forms.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="e.g @gmail.com"
                  className="w-full pl-8 lg:pl-10 pr-5 text-sm lg:text-base py-2 border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:gap-4">
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  Password<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-2 lg:left-3 top-[12px] lg:text-lg text-sm text-gray-500">
                    <FaLock />
                  </span>
                  <input
                    name="password"
                    value={forms.password}
                    onChange={handleChange}
                    type="password"
                    placeholder="make sure secret"
                    className="w-full pl-8 lg:pl-10 pr-4 py-2 border text-sm lg:text-base placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  Repeat Password<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-2 lg:left-3 top-[12px] lg:text-lg text-sm text-gray-500">
                    <FaLock />
                  </span>
                  <input
                    name="repeat_password"
                    value={forms.repeat_password}
                    onChange={handleChange}
                    type="password"
                    placeholder="make sure secret"
                    className="w-full pl-8 lg:pl-10 pr-4 placeholder:text-sm  text-sm lg:text-base py-2 border border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:gap-4">
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  Full Name<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-2 lg:left-3 top-[12px] lg:text-lg text-sm text-gray-500">
                    <FaUser />
                  </span>
                  <input
                    name="name"
                    value={forms.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Username"
                    className="w-full pl-8 lg:pl-10 pr-4 py-2 border text-sm lg:text-base placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Role<span className="text-red-500"> *</span>
                </label>
                <select
                  value={forms.role}
                  onChange={handleChange}
                  name="role"
                  className="w-full px-3 py-2 border text-sm lg:text-base border-gray-300 rounded-md focus:border-primary"
                >
                  <option value="Hr">hr</option>
                  <option value="karyawan">Karyawan</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Address<span className="text-red-500"> *</span>
              </label>
              <textarea
                name="address"
                value={forms.address}
                onChange={handleChange}
                rows={2}
                placeholder="e.g. you can add province, city and current address"
                className="w-full px-3 py-2 text-sm lg:text-base placeholder:text-sm border border-gray-300 rounded-md  focus:border-primary "
              />
              <div className="text-sm text-gray-500 ">100 characters left</div>
            </div>
            <div className="flex justify-between mt-8 gap-4">
            <button
            type="submit"
          
              className="px-4 py-2 text-black text-sm lg:text-base w-full border-2 rounded border-zinc-500 hover:bg-primary hover:text-base-100"
              onClick={handleCLose}
            >
              Back
            </button>
            <button
              disabled={validate || loading} 
            type="submit" className="px-4 py-2 text-sm lg:text-base disabled:bg-zinc-500 bg-primary w-full border text-white rounded-md hover:bg-primary/90 focus:ring-offset-2">
              Add employee
            </button>
          </div>
          </form>

        </div>
      </div>
    </div>
  );
}
