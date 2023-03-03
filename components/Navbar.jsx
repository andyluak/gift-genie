import Link from "next/link";
import React from "react";
import Logo from "../public/logo.svg";

const Navbar = () => {
  return (
    <header className="flex flex-row justify-between items-center p-full">
      <Logo className="w-32 md:w-auto"/>
      <nav className="text-lg space-x-5">
        <Link href="/"> Home </Link>
        <Link href="/dashboard"> Dashboard </Link>
      </nav>
    </header>
  );
};

export default Navbar;
