import { LuServerOff } from "react-icons/lu";

export function HandleError() {
  return (
    <div className="flex w-full gap-5 lg:min-h-[740px] min-h-[510px] justify-center items-center">
        <p className="lg:text-4xl text-3xl text-zinc-400"><LuServerOff/></p>
    <p className="md:text-4xl lg:text-2xl     rounded-sm  font-semibold text-zinc-400">Opppsss, server is down !!</p>
</div>
  )
}