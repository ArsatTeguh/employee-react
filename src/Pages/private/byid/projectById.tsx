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
  const [preload, setPreload] = useState(0)

  const navigate = useNavigate();
  const {  onFetch, loading:bool } = UseFetch();
  const { isError:err, onFetch:fetchPosition, message:msgPosition, setMesage:setMsg, setIsError:errPosition, loading:load } = UseFetch();

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

  const handleEmpId = (
    id: number,
    value: { name: string; id: number | null }
  ) => {
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
    errPosition(false);
    setMsg("");
    setValid(false);
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
      errPosition(validate);
      setMsg("make sure all data filled in");
    } else {
      setValid(true);
      fetchPosition({ method: "PATCH", url: "/positions", payload: format }).then(
        () => {
          errPosition(false);
        }
      );
    }
  };

  const onDeleteProject = (_path: string) => {
    onFetch({ method: "DELETE", url: "/project/" + id }).then(() => {
      navigate("/project");
    });
  };

  useEffect(() => {
    if (preload == 0) {
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
    }
    setPreload(1)
    return () => {}
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
        <div className=" h-52 lg:h-64 relative w-full rounded-md  bg-zinc-100">
          <div className="absolute right-3 lg:right-6 lg:top-3 top-6 flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
            <span
              className=" text-sm flex items-center gap-2 border-2 border-primary  hover:bg-primary  rounded-full p-2 text-white cursor-pointer bg-primary/90 font-semibold "
              onClick={() => setIsProject(true)}
            >
              <p className="lg:text-xl">
                <RiPencilFill />
              </p>
            </span>
            <span
              className=" text-lg lg:text-sm flex items-center gap-2 border-2 hover:bg-red-600 hover:text-white hover:border-red-600 border-primary rounded-full p-2 text-primary cursor-pointer font-semibold "
              onClick={() => setIsDelete(true)}
            >
              <p className="text-sm lg:text-base">
                <FaTrash />
              </p>
            </span>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 col w-full h-full px-2 lg:px-5">
            <div className="  h-full flex items-center gap-3 lg:gap-5">
              <div className=" lg:h-32 h-20 flex items-center justify-center  lg:w-32 w-20 rounded-full  bottom-5 left-5 bg-zinc-200">
                <p className="lg:text-6xl text-4xl text-primary">
                  {" "}
                  <PiProjectorScreenFill />
                </p>
              </div>
              {bool ? (
                <div className="w-1/3">
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton mt-2 h-4 w-full"></div>
                </div>
              ) : (
                <div className="flex flex-col flex-wrap">
                  <p className="text-xl  lg:text-2xl font-semibold">
                    {projectData?.name}
                  </p>
                  <p className="lg:pt-2 pt-1 lg:text-base text-sm">
                    {projectData?.position?.length} Person
                  </p>
                  <p className="lg:text-base text-sm">
                    {projectData?.Estimation} Duration
                  </p>
                </div>
              )}
            </div>
            <div className="flex flex-col lg:items-end lg:px-5 px-2   justify-center gap-2">
              <p className="font-semibold text-base lg:text-xl ">
                Project #{id}
              </p>
              <div className="flex items-center  gap-2 lg:gap-3">
                <p className="text-3xl lg:text-4xl">
                  {" "}
                  <FaCirclePlay />
                </p>
                {bool ? (
                
                    <span className="skeleton h-4 w-1/3 lg:w-full block px-10"></span>
                 
                ) : (
                  <p className="font-semibold lg:text-base text-sm">
                    {projectData?.status}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div
            className={`transition-all   ease-in-out   rounded   ${
              msgPosition?.length == 0 || !valid ? "h-0 " : "h-auto   py-2 px-8 "
            } ${err ? " bg-red-600" : "bg-green-600"}`}
          >
            {msgPosition?.length != 0 && valid && (
              <p className="text-zinc-100 lg:text-base text-sm text-center capitalize">
                {msgPosition}
              </p>
            )}
          </div>
        </div>

        <div
          className={`px-2 lg:px-5 pb-5 lg:pt-14 pt-4 pattern relative border-slate-400 flex  flex-wrap gap-4 ${
            positions?.length > 3
              ? "justify-center"
              : "lg:justify-start justify-center"
          } `}
        >
          {bool
            ? Array(3)
                .fill(null)
                .map((_, i: number) => (
                  <div
                    key={i}
                    className="skeleton   rounded h-36 lg:w-1/5 w-[90%] "
                  ></div>
                ))
            : positions.map((v, i) => (
                <div
                  key={i}
                  className="flex flex-col bg-zinc-100 px-3 pt-8 pb-3 rounded relative  gap-2"
                >
                  <input
                    type="text"
                    placeholder="Name"
                    className="border lg:text-base text-sm disabled:bg-slate-100 py-2 px-4 rounded"
                    name="name"
                    defaultValue={v.name}
                    disabled
                  />
                  <input
                    type="text"
                    placeholder="Status"
                    className="border lg:text-base text-sm py-2 px-4 rounded"
                    name="status"
                    value={v.status}
                    onChange={(e) => handleChange(e, v.id)}
                  />
                  {v.id_employee.id === null ? (
                    <div
                      className="text-sm text-center bg-white px-2 lg:py-4 py-3 rounded cursor-pointer hover:bg-primary hover:text-white"
                      onClick={() => onPopup(v.id)}
                    >
                      Add Employee +
                    </div>
                  ) : (
                    <div
                      className="text-sm text-center bg-primary/90 text-white px-2 lg:py-4 py-3 rounded cursor-pointer hover:bg-primary "
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

          <div className="justify-end flex lg:mt-0 mt-10  h-full  w-full">
            <button
              className=" px-8 py-2 rounded flex hover:bg-primary  bg-primary/90 text-white text-sm"
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
            onClick={() => navigate("/project")}
          >
            Back
          </button>
          <button
           disabled={load}
            className=" py-2 disabled:bg-zinc-500 mt-4 hover:bg-primary px-8 text-sm bg-primary/90 text-white rounded-md"
            onClick={onSubmit}
          >
            Save
          </button>
        </div>
        {isProject && (
          <EditProject
            id={id!}
            projectData={projectData}
            onClose={setIsProject}
          />
        )}
      </div>
    </>
  );
}
