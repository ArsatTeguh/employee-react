import { useState } from "react";
import { ImFlag } from "react-icons/im";
import { hasEmptyFieldObjs } from "../../../Common/validate";

type TypeTask = {
  description: string;
  status: number;
  level: number;
  title: string;
};

type Props = {
  setIsAdd: (condition: boolean) => void;
  handleEmployee: (v: TypeTask) => void;
  message: string;
  isError: boolean;
  loading: boolean;
};

const def = {
  status: 2,
  level: 1,
  description: "",
  title: "",
};

export function AddTask({
  setIsAdd,
  handleEmployee,
  message,
  isError,
  loading,
}: Props) {
  const [forms, setForms] = useState<TypeTask>(def);

  const handleChange = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setForms((prevForms) => ({
      ...prevForms,
      [name]:
        name == "description" || name === "title" ? value : parseInt(value, 10),
    }));
  };
  const validate = hasEmptyFieldObjs(forms);

  const onSubmit = (e: any) => {
    e.preventDefault();
    handleEmployee(forms);
  };

  const handleCLose = () => {
    setForms(def);
    setIsAdd(false);
  };

  return (
    <div className="fixed inset-0  z-20 bg-black bg-opacity-50 flex items-start  pt-10 lg:pt-0  lg:items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg shadow-xl">
        <div className="px-4 lg:px-6 pt-12 pb-8 relative">
          {/* Header */}
          <div className=" mb-2 flex gap-1 px-2">
            <p className="-rotate-12 text-lg">
              <ImFlag />
            </p>
            <div className="flex flex-col  lg:gap-1">
              <h2 className="lg:text-xl text-base font-semibold">Add Task</h2>
              <p className="text-gray-600 text-sm lg:mb-6 mb-4">
                Create New Task Inside Project
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
              !isError ? "h-0 " : "h-auto mb-2  py-2 px-4  bg-red-600 "
            } `}
          >
            {message?.length != 0 && (
              <p className="text-zinc-100 text-center lg:text-base text-sm capitalize">{message}</p>
            )}
          </div>

          <form className="space-y-3  lg:space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="block text-sm  font-medium text-black mb-1">
                Title<span className="text-red-500"> *</span>
              </label>
              <div className="relative">
                <input
                  name="title"
                  value={forms.title}
                  onChange={handleChange}
                  type="text"
                  placeholder="Ex: Front End"
                  className="w-full pl-4 text-sm lg:text-base pr-4 py-2 border placeholder:text-sm  border-gray-300 rounded-md focus:border-primary"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:gap-4 text-sm">
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Status<span className="text-red-500"> *</span>
                </label>
                <select
                  value={forms.status}
                  onChange={handleChange}
                  name="status"
                  className="w-full  text-sm lg:text-base px-3 py-2 border border-gray-300 rounded-md focus:border-primary"
                >
                  <option value={1}>On Going</option>
                  <option value={2}>On Progress</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-1">
                  Priority<span className="text-red-500"> *</span>
                </label>
                <select
                  value={forms.level}
                  onChange={handleChange}
                  name="level"
                  className="w-full px-3 text-sm lg:text-base py-2 border border-gray-300 rounded-md focus:border-primary"
                >
                  <option value={1}>Low</option>
                  <option value={2}>Medium</option>
                  <option value={3}>Hard</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm  font-medium text-black mb-1">
                Task List<span className="text-red-500"> *</span>
              </label>
              <textarea
                name="description"
                value={forms.description}
                onChange={handleChange}
                rows={4}
                placeholder="- Design UI"
                className="w-full placeholder:text-sm text-sm lg:text-base px-3 py-2 border border-gray-300 rounded-md  focus:border-primary "
              />
              <div className="text-sm text-gray-500 ">100 characters left</div>
            </div>

            <div className="flex justify-between lg:pt-10  gap-4">
              <button
                type="submit"
                className="px-4 py-2 text-sm lg:text-base text-black w-full border-2 rounded border-zinc-500 hover:bg-primary hover:text-base-100"
                onClick={handleCLose}
              >
                Back
              </button>
              <button
                disabled={validate || loading}
                type="submit"
                className="px-4 py-2  text-sm lg:text-base disabled:bg-zinc-500 bg-primary w-full border text-white rounded-md hover:bg-primary/90 focus:ring-offset-2"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
