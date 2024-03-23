"use client";
import { signOut } from "next-auth/react";
import React from "react";
import logout from "../../public/images/logout.png";
import Image from "next/image";
const SignOutButton = () => {
  return (
    <div className="text-xl hover:bg-gray-100 py-2 px-2">
      <button
        onClick={() => signOut()}
        href="/profile"
        className=" flex items-center gap-1"
      >
        <Image src={logout} alt="image" className="w-[24px]" />
        Logout
      </button>
    </div>
  );
};

export default SignOutButton;
