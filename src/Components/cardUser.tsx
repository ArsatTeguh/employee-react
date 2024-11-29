import { FaUserGear } from "react-icons/fa6";

type TypeEmployee = {
    name : string,
    status: string,
    picture: string
    email: string
}

function CardUser({bool, data} : {bool : Boolean, data : Array<TypeEmployee>}) {
    return (
        <div className="flex lg:flex-row flex-col  gap-8 text-zinc-800">
            <div className="p-4  text-black border shadow-sm rounded-md w-full bg-zinc-50">
              <div className="flex items-center gap-2 pb-4">
              <p className='text-lg font-semibold'>Employees</p>

              </div>
                <div className="flex flex-col overflow-auto max-h-52  ">
                    {bool ? 
                    Array(3).fill(null).map((_, i) => (
                        <div className="flex items-center gap-4 pb-5 animate-pulse" key={i}>
                     
                        <span className="w-12 h-10 block rounded-full bg-zinc-300"/>
                       
                     <div className="flex w-full flex-col gap-2">
                     <span className="w-1/2 rounded-full block h-3 bg-zinc-300"/>
                     <span className="w-1/3 rounded-full block h-3 bg-zinc-300"/>
                     </div>
                    </div>
                    ))
                    : data?.map((v : TypeEmployee, index: number) => (
                        <div className={`flex items-center gap-4 cursor-pointer hover:bg-primary/10 transition-all ease-in-out p-2 ${index === 3 ? 'border-none' : 'border-b'}`}>
                            {v.picture == "" || v.picture == null ? (
                                <div className="w-10 h-10  cursor-pointer rounded-full relative bg-zinc-200" >
                                  <div className="flex justify-center items-center  h-full">
                                  <p className="capitalize text-zinc-600">{v.email[0]}</p>
                                  <p className="capitalize text-zinc-600">{v.email[1]}</p>
                                  </div>
                                  </div>
                            ) : (
                                <img className="w-10 h-10 object-cover rounded-full bg-slate-100 ring-2 ring-white" loading="lazy" src={`http://localhost:8000/${v.picture}`} />
                            ) }
                            <div className="">
                                <p className='font-medium capitalize'>{v.name}</p>
                                <p className='text-zinc-500 capitalize'>{v.status}</p>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            <div className="w-full flex border flex-col gap-4 bg-zinc-50 px-10 py-6 rounded-sm">
                <div className="flex items-center gap-4 pb-8 ">
                    <p className="font-semibold text-4xl ">User Master</p>
                    <p className="text-2xl text-primary">
                    <FaUserGear />
                    </p>
                </div>
                <a href="/new" className="hover:border-primary hover:border-solid hover:bg-white hover:text-primary group  flex flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
                    <svg className="group-hover:text-primary mb-1 text-slate-400" width="20" height="20" fill="currentColor" aria-hidden="true">
                        <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                    </svg>
                    New user
                </a>
            </div>
        </div>
    )
}

export default CardUser;