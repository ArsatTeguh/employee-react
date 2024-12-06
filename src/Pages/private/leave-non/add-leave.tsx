import { useState } from "react";
import { ImFlag } from "react-icons/im";
import { hasEmptyFieldObjs } from "../../../Common/validate";

type Form = {
  leave_type: string;
  start_date: string;
  end_date: string;
};

type Props = {
  setIsAdd: (condition: boolean) => void;
  handleEmployee: (v: Form) => void;
  message: string;
  isError: boolean;
  load: boolean;
};

export function AddLeave({
  load,
  setIsAdd,
  handleEmployee,
  message,
  isError,
}: Props) {
  const [forms, setForms] = useState<Form>({
    leave_type: "",
    start_date: "",
    end_date: "",
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
      leave_type: "",
      start_date: "",
      end_date: "",
    });
    setIsAdd(false);
  };

  return (
    <div className="fixed inset-0  z-20 bg-black bg-opacity-50 flex items-start lg:items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-xl shadow-xl">
        <div className="px-4 lg:px-6 pb-8 pt-12 relative">
          {/* Header */}
          <div className=" mb-2 flex gap-1 px-2">
            <p className="-rotate-12 text-lg">
              <ImFlag />
            </p>
            <div className="flex flex-col  lg:gap-1">
              <h2 className="lg:text-xl text-base font-semibold">Add Leave</h2>
              <p className="text-gray-600 text-sm lg:mb-6 mb-4">Create New Leave</p>
            </div>
          </div>
          <div
            className="px-3 bg-black/10 absolute rounded-full lg:right-4 lg:top-3 right-2 top-2 text-zinc-700 hover:bg-black/20 cursor-pointer"
            onClick={handleCLose}
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
            {message?.length != 0 && (
              <p className="text-zinc-100 lg:text-base text-sm text-center capitalize">{message}</p>
            )}
          </div>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm  font-medium text-black mb-1">
                Type Leave<span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <input
                  name="leave_type"
                  value={forms.leave_type}
                  onChange={handleChange}
                  type="text"
                  placeholder="Cuti Tahunan"
                  className="w-full pl-4 pr-5 text-sm lg:text-base py-2 border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 lg:gap-4">
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  Start Date<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    name="start_date"
                    value={forms.start_date}
                    onChange={handleChange}
                    type="date"
                    placeholder="make sure secret"
                    className="w-full pl-4 pr-4 py-2 border text-sm lg:text-base placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm  font-medium text-black mb-1">
                  End Date<span className="text-red-500"> *</span>
                </label>
                <div className="relative">
                  <input
                    name="end_date"
                    value={forms.end_date}
                    onChange={handleChange}
                    type="date"
                    placeholder="make sure secret"
                    className="w-full pl-4 text-sm lg:text-base placeholder:text-sm pr-4 py-2 border border-gray-300 rounded-md focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-8 gap-4">
              <button
                type="submit"
                className="px-4 py-2 text-sm lg:text-base text-black w-full border-2 rounded border-zinc-500 hover:bg-primary hover:text-base-100"
                onClick={handleCLose}
              >
                Back
              </button>
              <button
                disabled={validate || load}
                type="submit"
                className="px-4 py-2 text-sm lg:text-base disabled:bg-zinc-500 bg-primary w-full border text-white rounded hover:bg-primary/90 focus:ring-offset-2"
              >
                Add leave
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
