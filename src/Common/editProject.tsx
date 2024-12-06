import { ChangeEvent, useState } from "react";
import { UseFetch } from "./useFetch";

type TypeProjectData = {
  name: string;
  status: "Complete" | "Running" | "Pending";
  Estimation: string;
};

type Props = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  projectData: TypeProjectData;
  id: string;
};

function EditProject({ id, onClose, projectData }: Props) {
  const [data, setData] = useState<TypeProjectData>({
    name: projectData.name,
    status: projectData.status,
    Estimation: projectData.Estimation,
  });
  const { isError, onFetch, message, setMesage, setIsError, loading } =
    UseFetch();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setData((prevData: TypeProjectData) => ({ ...prevData, [name]: value }));
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    setMesage("");
    setIsError(false);
    onFetch({
      method: "PATCH",
      url: "/project/" + parseFloat(id),
      payload: {
        name: data.name,
        status: data.status,
        estimation: data.Estimation,
      },
    }).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="fixed inset-0 flex lg:items-center justify-center bg-black/50 z-20">
      <div className="bg-slate-50 relative rounded p-4 lg:p-8 mt-4 lg:mt-0 h-[80%] lg:h-[75%] lg:w-1/3 w-[90%]">
        <div
          className="px-3 bg-black/10 absolute rounded-full lg:right-4 lg:top-3 right-2 top-2 text-zinc-700 hover:bg-black/20 cursor-pointer"
          onClick={() => onClose(false)}
        >
          <p className="text-xl text-center mb-1 flex justify-center w-full h-full items-center text-">
            x
          </p>
        </div>
        <div className="lg:py-10 p-5">
          <p className="lg:text-2xl text-xl font-semibold text-center">
            Edit Project
          </p>
          <p className=" text-center text-sm text-zinc-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, dolor!
          </p>
        </div>
        <div className="flex justify-center">
          <div
            className={`transition-all   ease-in-out   rounded   ${
              message?.length === 0 ? "h-0 " : "h-auto   py-2 px-8 "
            } ${isError ? " bg-red-600" : "bg-green-600"}`}
          >
            {message?.length != 0 && (
              <p className="text-zinc-100 lg:text-base text-sm text-center capitalize">
                {message}
              </p>
            )}
          </div>
        </div>
        <form
          onSubmit={onSubmit}
          action=""
          className="flex flex-col gap-4 lg:gap-6"
        >
          <div className="w-full flex flex-col gap-2 ">
            <label htmlFor="name" className=" font-medium text-sm">
              Name
            </label>
            <input
              type="text"
              className="py-2 rounded-sm text-sm lg:text-base bg-slate-50 border w-full px-4"
              value={data.name}
              onChange={(e) => handleChange(e)}
              name="name"
            />
          </div>
          <div className=" w-full flex flex-col gap-2 ">
            <label
              htmlFor="status"
              className=" font-medium  dark:text-white text-sm"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="border bg-slate-50  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              value={data.status}
              onChange={(e) => handleChange(e)}
            >
              <option selected>Status</option>
              <option value="Complete">Complete</option>
              <option value="Running">Running</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className=" w-full flex flex-col gap-2 ">
            <label
              htmlFor="estimation"
              className=" font-medium  dark:text-white text-sm"
            >
              Estimation
            </label>
            <select
              name="Estimation"
              id="estimation"
              className="border bg-slate-50  border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"
              value={data.Estimation}
              onChange={(e) => handleChange(e)}
            >
              <option selected>Estimation</option>
              <option value="3 Month">3 Month</option>
              <option value="6 Month">6 Month</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div className="flex justify-end w-full pt-4">
            <button
              disabled={loading}
              type="submit"
              className="px-6 py-2 disabled:bg-zinc-500  bg-primary rounded text-white text-sm"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProject;
