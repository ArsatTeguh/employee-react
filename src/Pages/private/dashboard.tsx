import { useEffect } from "react";
import { AiFillProject } from "react-icons/ai";
import { TbProgress, TbProgressCheck, TbProgressDown } from "react-icons/tb";
import { UseFetch } from "../../Common/useFetch";
import CardUser from "../../Components/cardUser";
import { CardProjects, Quick } from "../../Components/index";

const lisProjectProgres = [ 
  {
    status: "Complete",
    icon : <TbProgressCheck />
  },
  {
    status: "Pending",
    icon : <TbProgress />
  },
  {
    status: "Running",
    icon : <TbProgressDown />
  }
]

export const Dashboard = () => {
  const {data, loading,onFetch} = UseFetch()

  useEffect(() => {
    onFetch({url: "/project-master", method: "GET"}).then()
  },[])

  return (
    <div className="w-full p-4 lg:p-10 flex flex-col gap-10  ">
      <section className="flex flex-col lg:flex-row gap-8">
        <div className="text-zinc-70 w-full ">
          <div className="flex items-center gap-4 pb-10 lg:pb-8 ">
            <p className="font-semibold text-4xl">Project Master</p>
            <p className="text-2xl text-primary">
              <AiFillProject />
            </p>
          </div>
          <div className="flex flex-wrap lg:flex-row  justify-center lg:justify-start  items-center gap-x-4 gap-y-10 lg:gap-8">
           {loading ? 
                Array(3).fill(0).map((_,i) => (
                  <div className="block animate-pulse  h-40 rounded-md w-32 bg-zinc-300" key={i}>
       
                </div>
              ))
           : 
           lisProjectProgres.map((v , i: number) => (
              <div className="relative  bg-zinc-50  mt-2" key={i}>
            
                <div className="project  shadow-sm border  px-4 pt-10 pb-10 rounded-md ">
                  <p className="font-semibold text-center"> {v.status}</p>
                  <span className="block h-[1px] w-24 bg-zinc-300 rounded-full " />
                  <p className="font-semibold text-black  text-2xl pt-2 text-center ">
                  {data?.status_counts?.find((e: {status :string, total_Count: number}) => e.status === v.status)?.total_count || 0}
                  </p>
                </div>
                <span className="absolute -top-6 flex justify-center w-full ">
       
                <p  className={` text-2xl p-2  bg-primary border rounded-full ${i == 0 && 'text-green-500'} ${i == 1 && 'text-orange-500'} ${i == 2 && 'text-sky-500'}`}>
                    {v.icon}
                  </p>
                </span>
              </div>
            ))
           }
              

          </div>
          
         {/* animate-spin */}
        </div>
        <CardProjects bool={loading} data={data?.projects} />
      </section>
      <div className="">
        <CardUser bool={loading} data={data?.employee} />
      </div>
      <div className="">
        <Quick />
      </div>
    </div>
  )
};
