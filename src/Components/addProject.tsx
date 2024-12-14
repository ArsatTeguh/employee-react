import { useState } from "react";
import { ImFlag } from "react-icons/im";
import { hasEmptyFieldObjs } from "../Common/validate";

type TEmployee = {
  name: string;
  estimation: string;
  status: "Complete" | "Running" | "Pending";
};

type Props = {
  setIsAdd: (condition: boolean) => void;
  handleEmployee: (v: TEmployee) => void;
  isError: boolean;
  msg: string;
  loading: boolean
};

export function AddProject({
  loading,
  msg,
  setIsAdd,
  handleEmployee,
  isError,
}: Props) {
  const [forms, setForms] = useState<TEmployee>({
    name: "",
    estimation: "3 Month",
    status: "Running",
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForms((prevForms) => ({ ...prevForms, [name]: value }));
  };
  const validate = hasEmptyFieldObjs(forms);

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleEmployee(forms);
  };

  const handleCLose = () => {
    setForms({
      name: "",
      estimation: "3 Month",
      status: "Running",
    });
    setIsAdd(false);
  };

  return (
    <div className="fixed inset-0  z-20 bg-black bg-opacity-50 flex items-start pt-10 lg:pt-0  lg:items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div className="px-4 lg:px-6 lg:pb-8 pb-6 pt-12 relative">
          {/* Header */}
          <div className=" mb-2 flex gap-1 px-2">
            <p className="-rotate-12 text-lg">
              <ImFlag />
            </p>
            <div className="flex flex-col  lg:gap-1">
              <h2 className="lg:text-xl text-base font-semibold">Add Project</h2>
              <p className="text-gray-600 text-sm lg:mb-6 mb-4">Create New Project</p>
            </div>
          </div>
          <div
            className="px-3 bg-black/10 absolute rounded-full lg:right-4 lg:top-3 right-2 top-2 text-zinc-700 hover:bg-black/20 cursor-pointer"
            onClick={handleCLose}
          >
            <p className="text-xl text-center mb-1 flex justify-center w-full h-full items-center ">
              x
            </p>
          </div>

          {/* Form */}
          <div
            className={`transition-all   ease-in-out   rounded-sm   ${
              msg?.length == 0 ? "h-0 " : "h-auto mb-2  py-2 px-4 "
            } ${isError ? " bg-red-600" : "bg-green-600"}`}
          >
            {msg?.length != 0 && (
              <p className="text-zinc-100  lg:text-base text-sm text-center capitalize">
                { msg}
              </p>
            )}
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm  font-medium text-black mb-1">
                Name<span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <input
                  name="name"
                  value={forms.name}
                  onChange={handleChange}
                  type="text"
                  placeholder="Name project"
                  className="w-full pl-4 pr-5 lg:text-base text-sm py-2 border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Status<span className="text-red-500"> *</span>
                </label>
                <select
                  value={forms.status}
                  onChange={handleChange}
                  name="status"
                  className="w-full px-3 py-2 lg:text-base text-sm border border-gray-300 rounded-md focus:border-primary"
                >
                  <option value="Complete">Complete</option>
                  <option value="Running">Running</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Estimation<span className="text-red-500"> *</span>
                </label>
                <select
                  value={forms.estimation}
                  onChange={handleChange}
                  name="estimation"
                  className="w-full px-3 py-2 border lg:text-base text-sm border-gray-300 rounded-md focus:border-primary"
                >
                  <option value="3 Month">3 Month</option>
                  <option value="6 Month">6 Month</option>
                  <option value="Others">Others</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between pt-2 lg:pt-10  gap-4">
              <button
                type="submit"
                className="px-4 py-2 lg:text-base text-sm text-black w-full border-2 rounded border-zinc-500 hover:bg-primary hover:text-base-100"
                onClick={handleCLose}
              >
                Back
              </button>
              <button
                disabled={validate || loading}
                type="submit"
                className="px-4 py-2 lg:text-base text-sm disabled:bg-zinc-500 bg-primary w-full border text-white rounded-md hover:bg-primary/90 focus:ring-offset-2"
              >
                Add 
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
