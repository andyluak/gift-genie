import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="flex flex-row justify-between items-center p-full">
      <Image  
      src="/logo.png" alt="Logo" width={100} height={50}/>
      <nav className="text-lg space-x-5">
        <Link href="/"> Home </Link>
        <Link href="/dashboard"> Dashboard </Link>
      </nav>
    </header>
  );
};

export default Navbar;
