"use client"

import Link from "next/link";

const Header = () => {
  return (
    <header className="w-full h-24 mt-10 border ">
      <div className="w-full h-full px-20 text-black flex justify-between items-center sm:flex-col">
        <Link href="/">
          <h1 className="text-4xl cursor-pointer font-UhBeeSe line-through tracking-widest text-stone-800">JULOG</h1>
        </Link>
        <p className="text-2xl cursor-pointer">写.真</p>
      </div>
    </header>
  )

}

export default Header;