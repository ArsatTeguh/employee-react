
import { RiQrScan2Fill,RiEmpathizeFill  } from "react-icons/ri";
import { FaFileAlt, FaMoneyCheck  } from "react-icons/fa";

const ListQuick = [
    {
      path: "Projects",
      sub: ["Checkin", "checkout"],
      icon: <RiQrScan2Fill  />
    },
    {
      path: "attedances",
      sub: ["Checkin", "checkout"],
      icon: <RiQrScan2Fill  />
    },
    {
      path: "Employees",
      sub: ["Checkin", "checkout"],
      icon: <RiEmpathizeFill />
    },
    {
      path: "leaves",
      sub: ["Proces", "add"],
      icon: < FaFileAlt />
    },
    {
      path: "payrolls",
      sub: ["Proces", "add"],
      icon : <FaMoneyCheck  />
    },
  ]

export function Quick() {
    return (
        <div className=" text-zinc-700 primary-gradient relative rounded-md ">
            <div className="items-center relative  justify-center gap-8 w-full h-full pr-10 pl-6 py-16 flex flex-col lg:flex-row rounded-md ">
                <div className='z-[1]'>
                    <p className=" text-4xl lg:text-xl font-semibold text-orange-600 ">Quick Action</p>
                    <p className="text-zinc-300 lg:w-40 text-center lg:text-start">Your can quick action only one click</p>
                </div>
                <div className="flex z-[1] flex-wrap lg:justify-start lg:flex-nowrap justify-center gap-8 lg:flex-row pb-10 lg:pb-0">
                    {ListQuick.map((v, index: number) => (
         
                           <div key={index} className=" flex flex-col justify-center capitalize  h-36 w-32 bg-white  rounded-lg cursor-pointer  gap-5 text-center items-center" > 
                              <p className={`text-6xl rotate-45 hover:rotate-0 transition-all ease-in-out hover:text-orange-600 text-orange-500/30`}>{v.icon}</p>
                           <p className="text-md font-semibold  text-primary">{v.path}</p>
                           
                        
                           
                           </div>
                    
                    ))}
                </div>

            </div>
            
        </div>
    )
}

