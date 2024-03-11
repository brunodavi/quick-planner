import Link from "next/link";
import { IoIosHelpCircle } from "react-icons/io";

export default function Help() {
  return (
    <Link target="_blank" href="https://github.com/brunodavi/quick-planner" className="flex cursor-pointer text-white items-center justify-between bg-transparent">
      <IoIosHelpCircle className="mx-1" size="100%" />
      <span className="hidden lg:block">Help</span>
    </Link>
  )
}
