import { FaUserCircle } from "react-icons/fa";
import { MdOutlineReadMore } from "react-icons/md";
import OnRouter from "../Common/onRouter";
import UseLink from "../Common/useLink";

type Typedata = { name: string, Estimation: string, status: string, id: number, position:any }

export function CardProjects({bool, data} : {bool : boolean, data: Array<Typedata> }) {

const {router} = OnRouter()
  return (
    <section className="w-full border rounded-md ">
      <div className="flex pt-2 px-8 bg-zinc-50 items-center justify-end">
        <p className="text-3xl cursor-pointer text-black"
        onClick={() => router('/project')}
        ><MdOutlineReadMore/></p>
      </div>
      
      <div className="bg-zinc-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
        
      {bool ?
      Array(3).fill(null).map((_,i) => (
        <div className="w-full h-24 block bg-zinc-300 rounded animate-pulse" key={i}>
        </div>
      ))
      : 
        data?.map((v: Typedata, index: number) => (
            <div className="relative z-10" key={index}
            onClick={() => router(`/project/${v.id}`)}
            >
              <div className="card-svg -z-[1]" />
              <div className=" hover:bg-zinc-50 transition-all ease-in-out cursor-pointer rounded-sm hover:ring-primary/20 hover:shadow-md group  p-3 ring-1 ring-slate-200 shadow-sm">
                <dl className="relative grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                  <div>
                    <dt className="sr-only">Title</dt>
                    <dd className=" font-semibold text-slate-900">
                      {v.name}
                    </dd>
                 
                  </div>
                  {index == 0 && (
                    <div className="absolute top-0 right-0">
                    <dt className="sr-only">Title</dt>
                    <dd className=" bg-primary rounded text-sm  font-medium py-[1px] px-4 text-white">
                     New
                    </dd>
                 
                  </div>
                  )}
                  <div className="flex items-center gap-2">
                    <dt className="sr-only">Category</dt>
                    <dd className="text-zinc-500">{v.status}</dd>
                    <dd className="text-zinc-800 text-md">{v.position.length} Person</dd>
    
                  </div>
                  <div className="col-start-2 row-start-1 row-end-3 sm:mt-4 lg:mt-0 xl:mt-4">
                    <dt className="sr-only">Users</dt>
                    <dd className="flex justify-end sm:justify-start lg:justify-end xl:justify-start -space-x-1.5">

                      {Array(v.position.length == 0 ? 1 : v.position.length)
                        .fill(null)
                        .map((_, _index: number) => (
                          
                          <div className={`block text-2xl ${v.position.length == 0 ? 'text-zinc-300' : 'text-primary'}`}>
                            
                            <FaUserCircle />
                            
                          </div>
                        ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          ))
      }
        <UseLink path="/project-add">
          <div className="hover:border-primary h-full hover:border-solid hover:bg-white hover:text-primary group w-full flex flex-col items-center justify-center cursor-pointer rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
            <svg
              className="group-hover:text-primary mb-1 text-slate-400"
              width="20"
              height="20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
            </svg>
            New project
          </div>
        </UseLink>
      </div>
    </section>
  );
}
