"use client"

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname()
  const isPhotoPage = pathname === "/photo";

  const onClickPhoto = () => {
    router.push("/photo");
  }

  return (
    <header className="w-full h-24 mt-10">
      <div className="w-full h-full px-20 text-black flex justify-between items-center flex-col gap-4">
        <Link href="/">
          <h1 className={`text-4xl cursor-pointer font-UhBeeSe line-through tracking-widest text-stone-800 ${isPhotoPage ? "opacity-45" : ""
            } `}>JULOG</h1>
        </Link>
        <p className={`text-2xl cursor-pointer ${isPhotoPage ? "opacity-100 font-bold" : "opacity-60  "
          }`} onClick={onClickPhoto}>写.真</p>
      </div>
    </header >
  )

}

export default Header;