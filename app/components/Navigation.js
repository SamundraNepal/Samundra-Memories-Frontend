import Link from "next/link";
import { PiImagesSquareThin } from "react-icons/pi";
import { LiaVideoSolid } from "react-icons/lia";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Navigation() {
  return (
    <ul className="flex flex-col gap-16 text-lg  underline underline-offset-4 p-5 mt-12">
      <li className="hover:bg-slate-400 rounded w-24 transition-all flex items-center gap-1 text-xl">
        <PiImagesSquareThin />
        <Link className="flex" href="/">
          Home
        </Link>
      </li>

      <li className="hover:bg-slate-400 rounded w-24 transition-all flex items-center gap-1 text-xl">
        <PiImagesSquareThin />
        <Link className="flex" href="/Image">
          Photos
        </Link>
      </li>

      <li className="hover:bg-slate-400 rounded w-24 transition-all flex items-center gap-1 text-xl">
        <LiaVideoSolid />
        <Link href="/Videos">Videos</Link>
      </li>

      <li className="hover:bg-slate-400 rounded w-24 transition-all flex items-center gap-1 text-xl">
        <FaRegTrashAlt />
        <Link href="/Trash">Trash</Link>
      </li>
    </ul>
  );
}
