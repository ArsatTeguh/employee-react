import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ImFlag } from "react-icons/im";
import { MdEmail } from "react-icons/md";
import { UseFetch } from "./useFetch";

type Typeforms = {
  email: string
  address: string
  phone: number
  name : string
  join?: string;
}

type Props = {
    handleCLose :React.Dispatch<React.SetStateAction<boolean>>
    forms : Typeforms
    setEmployee: React.Dispatch<React.SetStateAction<Typeforms>>
}

export function EditEmployee({setEmployee,handleCLose, forms}: Props) {
  const [contact, setContact] = useState<Typeforms>(forms)

  const { onFetch, loading, message, setMesage, setIsError, isError } = UseFetch();

  const handleChange = (v: React.ChangeEvent<any>) => {
    const { name, value } = v.target
    setContact((e) => ({...e, [name]:value}))
  }
const close = () => {
  handleCLose(false)
  setIsError(false)
  setMesage("")
}
  const onSubmit = (e: any) => {
    e.preventDefault()
    onFetch({method:"PATCH", payload:{name:contact.name,address:contact.address,phone:Number(contact.phone)}, url:"/employee"}).then(() => {
      setEmployee((e) => ({...e, name:contact.name, phone:contact.phone, address: contact.address}))
    })
  }

  return (
<div className="fixed inset-0  z-20 bg-black bg-opacity-50 flex items-start lg:items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-xl shadow-xl">
        <div className="px-6 pt-12 pb-8 relative">
          {/* Header */}
          <div className=" mb-2 flex gap-1 px-2">
            <p className="-rotate-12 text-lg">
              <ImFlag />
            </p>
            <div className="flex flex-col  gap-1">
              <h2 className="text-xl font-semibold">Edit Contact</h2>
              <p className="text-gray-600 text-sm mb-6">
                Change New contact 
              </p>
            </div>
          </div>
          <div className="px-3 bg-black/10 absolute rounded-full right-4 top-3 text-zinc-700 hover:bg-black/20 cursor-pointer"
          onClick={close}
          >
            <p className="text-xl text-center mb-1 flex justify-center w-full h-full items-center text-">
              x
            </p>
          </div>

          {/* Form */}
          <div
          className={`transition-all   ease-in-out   rounded-sm   ${
           message?.length == 0 ? "h-0 " : "h-auto mb-2  py-2 px-4 "
          } ${isError ? " bg-red-600" : "bg-green-600"}`}
        >
          {message?.length != 0 && message?.length != 0  && (
            <p className="text-zinc-100 text-center capitalize">{message}</p>
          )}
        </div>
          
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm  font-medium text-black mb-1">
                Email<span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-[12px] text-xl text-gray-500">
                  <MdEmail />
                </span>
                <input
                disabled
                  name="email"
                  value={contact.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="e.g @gmail.com"
                  className="disabled:bg-zinc-100 w-full pl-10 pr-5 py-2 border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                />
              </div>
            </div>

 
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  Full Name<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-[12px] w-3 h-3 text-gray-500">
                    <FaUser />
                  </span>
                  <input
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Username"
                    className="w-full pl-9 pr-4 py-2 border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  No.Hp<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-[12px] w-3 h-3 text-gray-500">
                    <FaUser />
                  </span>
                  <input
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                    type="number"
                    placeholder="Enter Username"
                    className="w-full pl-9 pr-4 py-2 border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>

            </div>

            <div>
              <label className="block text-sm font-medium text-black mb-1">
                Address<span className="text-red-500"> *</span>
              </label>
              <textarea
                name="address"
                value={contact.address}
                onChange={handleChange}
                rows={4}
                placeholder="e.g. you can add province, city and current address"
                className="w-full px-3 py-2 border border-gray-300 rounded-md  focus:border-primary "
              />
              <div className="text-sm text-gray-500 ">100 characters left</div>
            </div>
            <div className="flex justify-between mt-8 gap-4">
            <button
            type="submit"
          
              className="px-4 py-2 text-black w-full border-2 rounded border-zinc-500 hover:bg-primary hover:text-base-100"
              onClick={() => handleCLose(false)}
            >
              Back
            </button>
            <button
              disabled={loading} 
            type="submit" className="px-4 py-2 disabled:bg-zinc-500 bg-primary w-full border text-white rounded-md hover:bg-primary/90 focus:ring-offset-2">
              Save contact
            </button>
          </div>
          </form>

        </div>
      </div>
    </div>
  )
}
