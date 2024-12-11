import { FaInbox } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex w-full flex-col lg:gap-4 gap-0  h-full justify-center items-center">
        <p className="md:text-4xl lg:text-2xl text-xl   py-4 lg:px-10 px-5  rounded-sm  font-semibold text-zinc-200">Opppsss, Sory Page Not Found</p>
        <p className="lg:text-9xl text-6xl text-zinc-200"><FaInbox /></p>
        <p className="lg:w-1/2 w-[90%] text-center text-zinc-300">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet modi, quidem libero aliquam harum ipsam voluptas suscipit, vel sint explicabo neque nihil itaque hic voluptatem facere temporibus animi sapiente officiis!</p>
    </div>
  )
}