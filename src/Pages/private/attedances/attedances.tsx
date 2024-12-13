import { useEffect, useState } from "react";
import { FaPowerOff } from "react-icons/fa";
import Lottie from "react-lottie";
import animationData from "../../../assets/indicator.json";
import world from "/world-svg.png";
import Popup from "../../../Common/popup";
import { UseFetch } from "../../../Common/useFetch";
import { CurrentUser } from "../../../Common/currentUser";
import { MdOutlineFormatListBulleted } from "react-icons/md";
import OnRouter from "../../../Common/onRouter";

type TypeIntial = {
  id: number | null;
  name: string;
};

export function Attedances() {
  const [popup, setPopup] = useState(false);
  const [project, setProject] = useState<TypeIntial>({ id: null, name: "" });

  const {
    onFetch: fetchCheckout,
    message: msgCheckout,
    loading: loadCheckin,
  } = UseFetch();
  const { onFetch, message } = UseFetch();
  const { user } = CurrentUser();
  const { router } = OnRouter();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleChange = (
    _id: number,
    value: { name: string; id: null | number }
  ) => {
    setProject(value);
  };

  const handleChekin = () => {
    onFetch({
      method: "POST",
      url: "/attedance",
      payload: { location: "medan", project_id: project.id },
    }).then(() => window.location.reload());
  };
  const handleChekout = () => {
    onFetch({ method: "PATCH", url: "/attedance" }).then(() =>
      window.location.reload()
    );
  };

  const handleSwitch = () => {
    switch (msgCheckout) {
      case "Data Not Found":
        handleChekout();
        break;
      case "TRUE":
        handleChekin();
        break;

      default:
        alert(msgCheckout);
    }
  };

  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setLocation({
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         });
  //       },
  //       (error) => {
  //         setError(error.message);
  //       },
  //       { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  //     );
  //   } else {
  //     setError("Geolocation is not supported by this browser.");
  //   }
  // }, []);

  useEffect(() => {
    fetchCheckout({
      method: "POST",
      url: "/chekout",
      payload: { employee_id: user?.id },
    });
  }, [user.id]);

  return (
    <div className="w-full  lg:min-h-[745px]  relative p-4 lg:p-8">
      {popup && (
        <Popup
          disable="employees"
          onChange={handleChange}
          currentPopup={0}
          setPopup={setPopup}
        />
      )}
      <div className="absolute  left-0 flex opacity-10 saturate-50 items-center justify-center w-full h-full top-0 !z-0">
        <img
          src={world}
          alt="World"
          className="!z-0"
          width={800}
          height={700}
        />
      </div>
      <div className="flex items-center   flex-col gap-4 justify-center !z-10 ">
        {loadCheckin ? (
          <div className="skeleton h-8 w-1/3"></div>
        ) : (
          <p className="lg:text-xl text-lg px-16 font-semibold py-2  border bg-primary/90 rounded text-white">
            {msgCheckout == "TRUE"
              ? "Punch In"
              : msgCheckout === "Data Not Found"
              ? "Punch Out"
              : msgCheckout}
          </p>
        )}

        <p className="text-sm px-8 text-center  mb-2 text-zinc-500">
          Make sure active location your browser
        </p>
        <p className="font-medium  text-sm lg:text-base">{message.length !== 0 && message}</p>
        <div className="flex relative lg:h-[300px] w-[350px] h-[350px] lg:w-[300px] items-center mt-8 justify-start ">
          <Lottie options={defaultOptions} />

          <div className="absolute flex justify-center items-center w-full h-full">
            <span
              onClick={handleSwitch}
              className=" font-semibold  text-2xl ml-1  mb-1 h-32 w-32 cursor-pointer  flex justify-center items-center rounded-full "
            >
              <FaPowerOff />
            </span>
          </div>
        </div>
        {msgCheckout == "TRUE" && !loadCheckin && (
          <div className="flex z-10 flex-col-reverse mb-2 lg:mb-0 gap-4 lg:gap-6 border-2 lg:w-1/2 w-full lg:p-4 p-3 border-dashed bg-zinc-100/50 rounded">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setPopup(true)}
                className="text-sm  px-10 lg:px-8 py-2 rounded bg-primary/90 text-white hover:bg-primary font-semibold"
              >
                Choice Project
              </button>
              <div className="block md:hidden right-10 top-[2.2rem]  cursor-pointer">
                <div
                  onClick={() => router("/attedance-list")}
                  className="flex items-center text-zinc-700 gap-1 lg:gap-2 px-4 py-2 border rounded"
                >
                  <p className="lg:text-xl">
                    <MdOutlineFormatListBulleted />
                  </p>
                  <p className="lg:text-base text-sm">List</p>
                </div>
              </div>
            </div>
            <p className=" py-3 lg:py-2 px-3 lg:px-8 text-sm lg:text-base bg-zinc-200 rounded font-semibold">
              {project?.id !== null ? project.name : "Select project"}
            </p>
          </div>
        )}
      </div>
      <div className="absolute hidden md:block right-10 top-[2.2rem]  cursor-pointer">
        <div
          onClick={() => router("/attedance-list")}
          className="flex items-center text-zinc-500 gap-2 px-4 py-2 border rounded"
        >
          <p className="text-xl">
            <MdOutlineFormatListBulleted />
          </p>
          <p>List</p>
        </div>
      </div>
    </div>
  );
}
