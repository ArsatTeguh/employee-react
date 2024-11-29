import { ChangeEvent, useState } from "react";

type TypeProjectData = {
  name: string
  status: "Complete" | "Running" | "Pending"
  Estimation: string
}

type Props = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  projectData: TypeProjectData
  onFetch: ({ url, method, payload }: {
    url: string;
    method: string;
    payload?: any;
}) => Promise<any>
id: string
};

function EditProject({id,onFetch, onClose, projectData }: Props) {
  const [data, setData] = useState<TypeProjectData>({name: projectData.name, status: projectData.status, Estimation:projectData.Estimation})

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => { 
    const { name, value } = e.target; setData((prevData : TypeProjectData) => ({ ...prevData, [name]: value, })); 
  };

  const onSubmit =  (e: any) => {
    e.preventDefault()
   onFetch({method: "PATCH", url:"/project/"+parseFloat(id), payload:{name:data.name, status:data.status, estimation: data.Estimation }}).then(() => {
    window.location.reload()
   })
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
      <div className="bg-slate-50 relative rounded p-8 h-[70%] w-1/3">
      <div className="px-3 bg-black/10 absolute rounded-full right-4 top-3 text-zinc-700 hover:bg-black/20 cursor-pointer"
          onClick={() => onClose(false)}
          >
            <p className="text-xl text-center mb-1 flex justify-center w-full h-full items-center text-">
              x
            </p>
          </div>
        <div className="py-10">
          <p className="text-2xl font-semibold text-center">Edit Project</p>
          <p className=" text-center text-sm text-zinc-400">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, dolor!
          </p>
        </div>
        <form onSubmit={onSubmit} action="" className="flex flex-col gap-6">
          <div className="w-full flex flex-col gap-2 ">
            <label htmlFor="name" className=" font-medium text-sm">
              Name
            </label>
            <input
              type="text"
              className="py-2 rounded-sm bg-slate-50 border w-full px-4"
              value={data.name}
              onChange={(e) => handleChange(e)}
              name="name"
            />
          </div>
          <div className=" w-full flex flex-col gap-2 ">
            <label htmlFor="status" className=" font-medium  dark:text-white text-sm">
              Status
            </label>
            <select
              id="status"
              name="status"
              className="border bg-slate-50 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"

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
              className="border bg-slate-50 border-gray-300 text-gray-900 text-sm rounded-sm focus:ring-primary focus:border-primary block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary dark:focus:border-primary"

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
          <button type="submit" className="px-6 py-2  bg-primary rounded text-white text-sm">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProject;
