import { FaUserCircle } from "react-icons/fa";
import UseLink from "../Common/useLink";

type Typedata = { name: string, Estimation: string, status: string, id: number, position:any }

export function CardProjects({bool, data} : {bool : boolean, data: Array<Typedata> }) {

  return (
    <section className="w-full ">
      {/* <header className="bg-white space-y-4 p-4 sm:px-8 sm:py-6 lg:p-4 xl:px-8 xl:py-6">
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-slate-900">Projects</h2>
                    <a href="/new" className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm">
                        <svg width="20" height="20" fill="currentColor" className="mr-2" aria-hidden="true">
                            <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
                        </svg>
                        New
                    </a>
                </div>
                <form className="group relative">
                    <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500" aria-hidden="true">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" />
                    </svg>
                    <input className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm" type="text" aria-label="Filter projects" placeholder="Filter projects..." />
                </form>
            </header> */}
      <div className="bg-slate-50 p-4 sm:px-8 sm:pt-6 sm:pb-8 lg:p-4 xl:px-8 xl:pt-6 xl:pb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 text-sm leading-6">
      {bool ?
      Array(3).fill(null).map((_,i) => (
        <div className="w-full h-24 block bg-zinc-300 rounded animate-pulse" key={i}>
        </div>
      ))
      : 
        data?.map((v: Typedata, index: number) => (
            <div className="relative z-10" key={index}>
              <div className="card-svg -z-[1]" />
              <div className=" hover:bg-primary/10 transition-all ease-in-out cursor-pointer rounded-sm hover:ring-primary/20 hover:shadow-md group  p-3 ring-1 ring-slate-200 shadow-sm">
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
        <UseLink path="/project">
          <div className="hover:border-blue-500 h-full hover:border-solid hover:bg-white hover:text-blue-500 group w-full flex flex-col items-center justify-center cursor-pointer rounded-md border-2 border-dashed border-slate-300 text-sm leading-6 text-slate-900 font-medium py-3">
            <svg
              className="group-hover:text-blue-500 mb-1 text-slate-400"
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
