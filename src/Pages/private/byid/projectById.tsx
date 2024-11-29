import { ChangeEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";
import { PiProjectorScreenFill } from "react-icons/pi";
import { RiPencilFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import ConfirmationPopup from "../../../Common/confirmationPopup";
import EditProject from "../../../Common/editProject";
import Popup from "../../../Common/popup";
import { UseFetch } from "../../../Common/useFetch";
import { hasEmptyField } from "../../../Common/validate";

type TypeIntial = {
  id: number;
  name: string;
  status: string;
  id_employee: { name: string; id: number | null };
};

type TypeProjectData = {
  name: string;
  status: "Complete" | "Running" | "Pending";
  Estimation: string;
  positions: Array<TypeIntial>;
};

export function ProjectById() {
  const [popup, setPopup] = useState(false);
  const [currentPopup, setCurrentPopup] = useState<number | null>(null);
  const [valid, setValid] = useState<boolean>(false);
  const [positions, setPositions] = useState<Array<TypeIntial | any>>([]);
  const [isProject, setIsProject] = useState(false);
  const [projectData, setProjectData] = useState<TypeProjectData | any>([]);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  const navigate = useNavigate();
  const { loading, isError, onFetch, message, setMesage, setIsError } =
    UseFetch();

  const random = Math.floor(Math.random() * 101);
  const { id } = useParams();

  const onPopup = (id: number) => {
    setPopup(true);
    setCurrentPopup(id);
  };

  const onAddPositions = (data: TypeIntial) =>
    setPositions((e) => [...e, data]);
  const onDeletePositions = (index: number) =>
    setPositions((e) => e.filter((e) => e.id !== index));

  const handlePositionChange = (
    id: number,
    fieldName: string,
    newValue: string | number
  ) => {
    setPositions((prevPositions) =>
      prevPositions.map((position) =>
        position.id === id ? { ...position, [fieldName]: newValue } : position
      )
    );
  };

  const handleEmpId = (id: number, value: { name: string; id: number | null }) => {
    setPositions((prev) =>
      prev.map((position) =>
        position.id === id
          ? { ...position, id_employee: value, name: value.name }
          : position
      )
    );
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>, id: number) => {
    const { name, value } = e.target;
    handlePositionChange(id, name, value);
  };

  const onSubmit = () => {
    const validate = hasEmptyField(positions);
    const format = positions.map((e) => {
      return {
        position: e.name,
        status: e.status,
        employee_id: e.id_employee.id,
        project_id: parseFloat(id!),
      };
    });

    if (validate) {
      setValid(validate);
      setIsError(validate);
      setMesage("make sure all data filled in");
    } else {
      setValid(true);
      onFetch({ method: "PATCH", url: "/positions", payload: format}).then(
        () => {setIsError(false)}
      );
    }
  };

  const onDeleteProject = (path: string) => {
    onFetch({ method: "DELETE", url: "/project/" + id }).then(() => {
      navigate(path);
    });
  };

  useEffect(() => {
    onFetch({ method: "GET", url: "project/" + id })
      .then((res: any) => {
        setProjectData(res);
        if (res?.position?.length > 0) {
          res.position.map(
            (data: {
              id: number;
              status: string;
              employee_id: number;
              position: string;
            }) => {
              setPositions((e) => [
                ...e,
                {
                  id: data.id,
                  name: data.position,
                  status: data.status,
                  id_employee: { name: "Secreet", id: data.employee_id },
                },
              ]);
            }
          );
        } else {
          setPositions([
            {
              id: 0,
              name: "",
              status: "",
              id_employee: { name: "", id: null },
            },
          ]);
        }
      })
      .catch((e) => {
        if (e.message === "400") {
          navigate("/not-found");
        }
      });
  }, [id]);

  return (
    <>
      {popup && (
        <Popup
          disable="projects"
          onChange={handleEmpId}
          currentPopup={currentPopup}
          setPopup={setPopup}
        />
      )}
      {isDelete && (
        <ConfirmationPopup submit={onDeleteProject} setIsDelete={setIsDelete} />
      )}
      <div className=" p-4 relative mb-6 text-black flex flex-col gap-4 lg:min-h-[720px] ">
        <div className="  h-64 relative w-full rounded-md  bg-zinc-100">
          <div className="absolute right-6 lg:top-3 top-5 flex flex-col lg:flex-row items-center gap-4">
            <span
              className=" text-sm flex items-center gap-2 border-2 border-primary  hover:bg-primary  rounded-full p-2 text-white cursor-pointer bg-primary/90 font-semibold "
              onClick={() => setIsProject(true)}
            >
              <p className="text-xl">
                <RiPencilFill />
              </p>
            </span>
            <span
              className=" text-lg lg:text-sm flex items-center gap-2 border-2 hover:bg-red-600 hover:text-white hover:border-red-600 border-primary rounded-full p-2 text-primary cursor-pointer font-semibold "
              onClick={() => setIsDelete(true)}
            >
              <FaTrash />
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 col w-full h-full px-5">
            <div className="  h-full flex items-center gap-5">
              <div className=" lg:h-32 h-20 flex items-center justify-center  lg:w-32 w-20 rounded-full  bottom-5 left-5 bg-zinc-200">
                <p className="lg:text-6xl text-4xl text-primary">
                  {" "}
                  <PiProjectorScreenFill />
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-2xl font-semibold">{projectData?.name}</p>
                <p className="pt-2">{projectData?.position?.length} Person</p>
                <p className="">{projectData?.Estimation} Duration</p>
              </div>
            </div>
            <div className="flex flex-col lg:items-end px-5   justify-center gap-2">
              <p className="font-semibold  text-xl ">Project #{id}</p>
              <div className="flex items-center  gap-3">
                <p className="text-4xl">
                  {" "}
                  <FaCirclePlay />
                </p>
                <p className="font-semibold">{projectData?.status}</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`transition-all   ease-in-out   rounded-sm   ${
            message?.length == 0 || !valid ? "h-0 " : "h-auto  py-2 px-4 "
          } ${isError ? " bg-red-600" : "bg-green-600"}`}
        >
          {message?.length != 0 && valid && (
            <p className="text-zinc-100 text-center capitalize">{message}</p>
          )}
        </div>

        <div
          className={`px-5 pb-5 pt-14 pattern relative border-slate-400 flex flex-wrap gap-4 ${
            positions?.length > 3 ? "justify-center" : "justify-start"
          } `}
        >
          {positions.map((v, i) => (
            <div
              key={i}
              className="flex flex-col bg-zinc-100 px-3 pt-8 pb-3 rounded relative  gap-2"
            >
              <input
                type="text"
                placeholder="Name"
                className="border disabled:bg-slate-100 py-2 px-4 rounded"
                name="name"
                defaultValue={v.name}
                disabled
              />
              <input
                type="text"
                placeholder="Status"
                className="border py-2 px-4 rounded"
                name="status"
                value={v.status}
                onChange={(e) => handleChange(e, v.id)}
              />
              {v.id_employee.id === null ? (
                <div
                  className="text-sm text-center bg-white px-2 py-4 rounded cursor-pointer hover:bg-primary hover:text-white"
                  onClick={() => onPopup(v.id)}
                >
                  Add Employee +
                </div>
              ) : (
                <div
                  className="text-sm text-center bg-primary/90 text-white px-2 py-4 rounded cursor-pointer hover:bg-primary "
                  onClick={() => onPopup(v.id)}
                >
                  Has been Add
                </div>
              )}
              {i >= 1 && (
                <span
                  onClick={() => onDeletePositions(v.id)}
                  className="absolute  text-primary/90 hover:text-primary cursor-pointer font-semibold right-3 top-2"
                >
                  <FaTrash />
                </span>
              )}
            </div>
          ))}
          <div className="justify-end flex    h-full  w-full">
            <button
              className="  px-8 py-2 rounded flex hover:bg-primary  bg-primary/90 text-white text-sm"
              onClick={() =>
                onAddPositions({
                  id: random,
                  name: "",
                  status: "",
                  id_employee: { name: "", id: null },
                })
              }
            >
              + Position
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 justify-end">
          <button
            className=" py-2 mt-4 hover:bg-primary text-sm hover:text-white px-8 bg-white border-2 border-primary text-primary font-semibold rounded-md"
            onClick={() => navigate("/master")}
          >
            Back
          </button>
          <button
            className=" py-2 mt-4 hover:bg-primary px-8 bg-primary/90 text-white rounded-md"
            onClick={onSubmit}
          >
            Save
          </button>
        </div>
        {isProject && (
          <EditProject
            id={id!}
            onFetch={onFetch}
            projectData={projectData}
            onClose={setIsProject}
          />
        )}
      </div>
    </>
  );
}
