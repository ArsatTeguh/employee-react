import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [valid, setValid] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMesage] = useState<string>("");

  const onHidden = () => setIsHidden((hidden) => !hidden);

  const onEmail = (email: string) => setEmail(() => email);
  const onPassword = (password: string) => setPassword(() => password);

  const Onsubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setValid(true);
    setMesage("");
    try {
      const res = await axios.post(
        "/auth/login",
        { email, password },
        {
          withCredentials: true,
        }
      );
      const data = res.data;
      Cookies.set("token", data.data, { expires: 1 });
      const lastPath = localStorage.getItem("path");
      if (lastPath == "") {
        window.location.reload();
      } else {
        window.location.href = lastPath ?? "";
      }
    } catch (error: any) {
      setValid(false);
      const err =
        error.response?.data?.message || "Somethings Wrong, Pleases try Again";
      setMesage(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" w-full login z-0 relative h-full bg-black">
      <div className="z-10 text-white w-full h-full flex lg:px-20 px-4 items-center">
        <div className="flex flex-col ">
          <div className="flex flex-col lg:gap-2 pb-10">
            <p className="text-xl lg:text-2xl font-semibold ">PT LOREM</p>
            <p className="text-3xl lg:text-4xl font-semibold">
              Login Your Account
            </p>
            <p className="lg:pt-2 pt-3 text-md lg:text-base">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Provident, ad.
            </p>
          </div>
          <div
            className={`transition-all  ease-in-out bg-red-600  rounded-sm   ${
              valid ? "h-0 " : "h-auto  py-2 px-4 "
            }`}
          >
            {!valid && (
              <p className="text-zinc-100 text-md lg:text-base">{message}</p>
            )}
          </div>
          <div className="flex flex-col border gap-2 bg-primary/30 relative px-4 py-2 text-sm rounded-md ">
            <div className="z-[1] border-b pb-2">
              <p className="font-medium">HR</p>
              <p>Email : arsatteguh@gmail.com</p>
              <p>Password : 12345678</p>
            </div>
            <div className="z-[1]">
              <p className="font-medium">Employee</p>
              <p>Email : konsta@gmail.com</p>
              <p>Password : 12345678</p>
            </div>

          </div>
          <form className="flex flex-col gap-6 pt-4" onSubmit={Onsubmit}>
            <div className="relative flex flex-col gap-2 w-full h-full">
              <label htmlFor="email" className="text-md lg:text-base">
                Email
              </label>
              <input
                onChange={(e) => onEmail(e.target.value)}
                type="email"
                className="rounded  py-2  pl-12 text-blue-950"
              />
              <span className="absolute top-[1rem] flex justify-center h-full lg:text-2xl text-xl  items-center ml-3 text-blue-950">
                <MdEmail />
              </span>
            </div>

            <div className="relative flex flex-col gap-2 w-full h-full ">
              <label htmlFor="password" className="text-md lg:text-base">
                Password
              </label>
              <input
                onChange={(e) => onPassword(e.target.value)}
                type={isHidden ? "text" : "password"}
                className="rounded  py-2 pl-12 text-blue-950"
              />
              <span className="absolute flex justify-center h-full lg:text-xl top-[1rem] items-center ml-3 text-blue-950">
                <FaLock />
              </span>
              <span
                onClick={onHidden}
                className="absolute  h-full lg:text-xl top-[1rem]  right-3 flex items-center hover:text-blue-500 cursor-pointer  text-blue-950"
              >
                {isHidden ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
            <button
              disabled={
                password.trim() == "" || email.trim() == "" || loading
                  ? true
                  : false
              }
              className={`flex justify-center font-medium items-center gap-2 bg-blue-900 rounded py-2 text-base hover:bg-blue-950 transition-all ease-in-out disabled:bg-zinc-600 disabled:text-zinc-200 `}
            >
              {loading && <span className="block loader" />}
              {loading ? "Loading" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
