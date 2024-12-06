import { RiPencilFill } from "react-icons/ri";
import { FaCamera } from "react-icons/fa";
import { EditEmployee } from "../../../Common";
import { useEffect, useState } from "react";
import { UseFetch } from "../../../Common/useFetch";

type Props = {
  email: string;
  address: string;
  phone: number;
  name: string;
  join?: string;
};

export function EmployeeById() {
  const [isContact, setIsContact] = useState(false);
  const [profile, setProfile] = useState({ preview: "", file: "" });
  const [employee, setEmployee] = useState<Props>({
    name: "",
    address: "",
    phone: 0,
    email: "",
    join: "",
  });

  const { onFetch, loading } = UseFetch();
  const {
    onFetch: fetchImage,
    loading: loadImage,
    setMesage: setMsg,
    message: msgImage,
    isError: err,
  } = UseFetch();

  const handleImageChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile(() => ({ file: file, preview: imageUrl }));
    }
  };

  const onSaveImage = () => {
    const form = new FormData();
    form.append("image", profile.file);
    fetchImage({ method: "PATCH", url: "/upload", payload: form }).then((e) =>
      setProfile({ file:e, preview: "" })
    );
  };

  useEffect(() => {
    onFetch({ method: "GET", url: "/employee-one" }).then((e) => {
      setEmployee({
        name: e?.employee?.name,
        address: e?.employee?.address,
        phone: e?.employee?.phone,
        email: e?.employee?.email,
        join: e?.joiningDuration,
      });
      setProfile((prev) => ({ ...prev, file: e?.employee?.Picture }));
    });
    return () => {};
  }, []);

  useEffect(() => {
    let timeout: any
    if(msgImage.length > 0) {
      timeout = setInterval(() => {
        setMsg("")
      }, 2500);
    }
    return () => clearInterval(timeout)
  },[msgImage])

  return (
    <div className="w-full py-8 lg:px-12 px-4 relative lg:min-h-[745px] ">
      <div className="flex justify-center">
        <div
          className={`transition-all   ease-in-out   rounded-sm   ${
            msgImage?.length == 0 ? "h-0 " : "h-auto mb-2  py-2 px-11 "
          } ${err ? " bg-red-600" : "bg-primary/90"}`}
        >
          {msgImage?.length != 0 && msgImage?.length != 0 && (
            <p className="text-zinc-100 text-center lg:text-base text-sm capitalize">{msgImage}</p>
          )}
        </div>
      </div>
      {isContact && (
        <EditEmployee setEmployee={setEmployee} handleCLose={setIsContact} forms={employee} />
      )}
      {loading ? (
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="skeleton h-40 w-40 shrink-0 rounded-full"></div>
            <div className="flex flex-col gap-4">
              <div className="skeleton h-4 w-20"></div>
              <div className="skeleton h-4 w-28"></div>
            </div>
          </div>
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-32 w-full"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="avatar  flex  gap-2 items-center ">
            {!loading && profile?.file !== "" && profile.preview == "" ? (
              <div className="w-32 lg:w-40 rounded-full relative">
                <img  loading="lazy" src={`http://localhost:8000/${profile?.file}`} alt="profile" className="object-cover" />
                <span className="absolute cursor-pointer w-full h-10 flex items-center justify-center bottom-0  bg-black/50">
                <input
                      onChange={(e) => handleImageChange(e)}
                      name="image"
                      type="file"
                      id="fileName"
                      accept=".jpg,.jpeg,.png"
                      className="bg-transparent  w-full h-full  text-transparent cursor-pointer  absolute"
                    />
                  <p className="text-base-200 text-xl ">
                    <FaCamera />
                  </p>
                </span>
              </div>
            ) : (
              <div className="w-32 h-32 lg:w-40 lg:h-40 bg-zinc-100 rounded-full relative">
                {profile.file == "" && profile.preview == "" && (
                  <div className="flex items-center justify-center  h-full w-full">
                    <p className="lg:text-4xl capitalize text-2xl">{employee.name[0]}</p>
                    <p className="lg:text-4xl capitalize text-2xl">{employee.name[1]}</p>
                  </div>
                )}

                {profile.preview === "" ? (
                  <span className="absolute  w-full h-11 flex items-center justify-center bottom-0  bg-black/50">
                    <input
                      onChange={(e) => handleImageChange(e)}
                      name="image"
                      type="file"
                      id="fileName"
                      accept=".jpg,.jpeg,.png"
                      className="bg-transparent  w-full h-full  text-transparent cursor-pointer  absolute"
                    />
                    <p className="text-base-200 text-xl ">
                      <FaCamera />
                    </p>
                  </span>
                ) : (
                  <div className="lg:w-40 lg:h-40 w-32 h-32 rounded-full relative">
                    <img
                      className="object-cover"
                      src={profile.preview}
                      alt="profile"
                    />
                    <span className="absolute cursor-pointer w-full h-10 flex items-center justify-center bottom-0  bg-black/50">
                      <input
                        onChange={(e) => handleImageChange(e)}
                        name="image"
                        type="file"
                        id="fileName"
                        accept=".jpg,.jpeg,.png"
                        className="bg-transparent  w-full h-full  text-transparent cursor-pointer  absolute"
                      />
                      <p className="text-base-200 text-xl ">
                        <FaCamera />
                      </p>
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
          {profile.file !== "" && profile.preview != "" && (
            <div className="lg:px-8 px-5 mb-4">
              <button
              disabled={loadImage}
                onClick={onSaveImage}
                className="px-8 py-2 text-sm rounded bg-primary/90 hover:bg-primary text-white"
              >
                Save
              </button>
            </div>
          )}
          <div className="mt-4 lg:mt-0">
            <div className="w-full  rounded  border h-full flex flex-col gap-4">
              <div className="flex items-center justify-between  border-b pb-2 px-4 lg:px-6 py-2 bg-zinc-100">
                <p className="font-semibold ">Contact Detail</p>
                <p
                  className="p-[6px] lg:p-2 rounded hover:bg-primary text-white bg-primary/90  cursor-pointer "
                  onClick={() => setIsContact(true)}
                >
                  <RiPencilFill />
                </p>
              </div>

              <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-y-0 gap-y-4 lg:items-center px-4 lg:px-6">
                <div className="flex flex-col lg:gap-2">
                  <p className="font-semibold ">Full Name</p>
                  <p className="text-zinc-600">{employee?.name}</p>
                </div>
                <div className="flex flex-col lg:w-[300px]  lg:gap-2">
                  <p className="font-semibold">Email</p>
                  <p className="text-zinc-600">{employee?.email}</p>
                </div>
              </div>
              <div className="flex-col flex lg:flex-row lg:justify-between lg:gap-y-0 gap-y-4 lg:items-center px-4 lg:px-6 mt-2 w-full ">
                <div className="flex flex-col lg:gap-2">
                  <p className="font-semibold">No.hp</p>
                  <p className="text-zinc-600">{employee?.phone}</p>
                </div>
                <div className="flex flex-col lg:w-[300px] flex-wrap lg:gap-2">
                  <p className="font-semibold">Address</p>
                  <p className="text-zinc-600">{employee?.address}</p>
                </div>
              </div>
              <div className="flex justify-between w-full items-center px-4 lg:px-6 pb-4">
                <div className="flex flex-col lg:gap-2">
                  <p className="font-semibold">Joined</p>
                  <p className="text-zinc-600">{employee?.join}</p>
                </div>
                <div className="flex flex-col lg:w-[300px] flex-wrap gap-2"></div>
              </div>
            </div>
          </div>

          <div className="w-full flex gap-3 flex-col rounded  border h-full   ">
            <div className="flex items-center justify-between border-b pb-2 lg:px-6 px-4 py-2 bg-zinc-100">
              <p className="font-semibold ">Account Overview</p>
              <p className="p-[6px] lg:p-2 rounded rounded hover:bg-primary text-white bg-primary/90 cursor-pointer">
                <RiPencilFill />
              </p>
            </div>
            <div className="flex mt-2 pb-5 flex-wrap gap-6 lg:gap-2 px-4 lg:px-6">
              <p className="font-semibold lg:w-[300px]">Password</p>
              <p className="text-zinc-600">******************</p>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
