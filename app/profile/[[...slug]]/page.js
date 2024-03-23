"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import AnimationWrapper from "../../AnimationWrapper";
import Link from "next/link";
import logout from "../../../public/images/logout.png";
import manage from "../../../public/images/manage.png";
import edit from "../../../public/images/edit.png";
import notification from "../../../public/images/notification.png";
import profile from "../../../public/images/profile.png";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import Profile from "@/app/profile/_components/Profile";
import { useState } from "react";
import ManagePosts from "../_components/ManagePosts";
import Password from "../_components/Password";

function MyComponent({params}) {
  const { data: session, status } = useSession();
  const pageRoute = params?.slug
  
  return (
    <AnimationWrapper>
      <div className="w-[80%] m-auto flex items-start gap-7 mb-16">
        <Toaster />
        <aside className="w-[300px] h-full border-r-4 border-gray-100">
          <h1 className="font-semibold text-3xl text-gray-500 border-b-[3px] border-gray-100 pb-4 px-2">
            Dashboard 
          </h1>
          <div className="my-6 text-gray-500">
            <Link
              href="/profile"
              className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer hover:ml-5"
            >
              <Image
                src={profile}
                alt="image"
                className="w-[24px] opacity-50"
              />
              <p className=" cursor-pointer">Profile</p>
            </Link>
            <Link
              href="/profile/manage"
              className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer hover:ml-5"
            >
              <Image src={edit} alt="image" className="w-[24px] opacity-50" />
              <p className=" cursor-pointer">Posts</p>
            </Link>
            <Link
              href="/profile"
              className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer hover:ml-5"
            >
              <Image
                src={notification}
                alt="image"
                className="w-[24px] opacity-50"
              />
              <p className=" cursor-pointer">Notifications</p>
            </Link>
          </div>
          <h1 className="font-semibold text-3xl text-gray-500 border-b-[3px] border-gray-100 pb-4 px-2">
            Profile
          </h1>
          <div className="my-6 text-gray-500">
            <Link
              href="/profile/edit"
              className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer hover:ml-5"
            >
              <Image
                src={profile}
                alt="image"
                className="w-[24px] opacity-50"
              />
              <p className=" cursor-pointer">Edit Profile</p>
            </Link>
            <Link
              href="/profile/password"
              className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer hover:ml-5"
            >
              <Image src={manage} alt="image" className="w-[24px] opacity-50" />
              <p className=" cursor-pointer">Change Password</p>
            </Link>
            <div
              onClick={signOut}
              className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer"
            >
              <Image src={logout} alt="image" className="w-[24px] opacity-50" />
              <p className=" pointer-events-none">Logout</p>
            </div>
          </div>
        </aside>
          <AnimationWrapper>
            <main className="ml-5 text-gray-600 flex items-start gap-7 w-[1150px] ">
              {pageRoute && pageRoute[0] == "edit" && <Profile/>}
              {pageRoute && pageRoute[0] == "manage" && <ManagePosts/>}
              {pageRoute && pageRoute[0] == "password" && <Password/>}
            </main>
          </AnimationWrapper>
      </div>
    </AnimationWrapper>
  );
}

export default MyComponent;
