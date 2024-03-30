import React from "react";
import Link from "next/link";
import logo from "../../public/images/logo.png";
import user from "../../public/images/user.png";
import write from "../../public/images/write.png";
import manage from "../../public/images/manage.png";
import notification from "../../public/images/notification.png";
import profile from "../../public/images/profile.png";
import conversation from "../../public/images/conversation.png";
import home from "../../public/images/home.png";
import article from "../../public/images/application.png";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { signOut } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import { useSelector } from "react-redux";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  const authUser = session?.user;
  return (
    <menu className="text-lg w-[80%] m-auto py-10 mb-10 semibold">
      <ul className="flex justify-between items-center">
        <li className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image alt="" src={logo} className="w-[72px]" />
            <p className="relative inline-block font-bold text-3xl mr-5">
              <span className="bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 text-transparent bg-clip-text">
                BlogChat
              </span>
            </p>
          </Link>
          <input
            type="text"
            placeholder="Search..."
            name="search"
            className="border-2 rounded-full py-2 px-4 w-[260px]"
          />
        </li>
        <li>
          <ul className="flex justify-center items-center gap-3">
            <li>
              <Link
                href="/"
                className="flex items-center w-[42px] hover:w-[84px] gap-1 group border-[2px] border-gray-300 py-2 px-2 rounded-full hover:bg-gray-200 hover:border-gray-200 cursor-pointer transition-all duration-200 active:scale-90"
              >
                <Image src={home} alt="write" className="w-[24px]" />
                <p className=" group-hover:opacity-100 text-sm opacity-0 ease-in pointer-events-none delay-75 ">
                  Home
                </p>
              </Link>
            </li>
            <li>
              <Link
                href="/posts"
                className="flex items-center w-[42px] hover:w-[84px] gap-1 group border-[2px] border-gray-300 py-2 px-2 rounded-full hover:bg-gray-200 hover:border-gray-200 cursor-pointer transition-all duration-200 active:scale-90"
              >
                <Image src={article} alt="write" className="w-[24px]" />
                <p className=" group-hover:opacity-100 text-sm opacity-0 ease-in pointer-events-none delay-75 ">
                  Posts
                </p>
              </Link>
            </li>
            {session && (
              <li>
                <Link
                  href="/write"
                  className="flex items-center w-[42px] hover:w-[84px] gap-1 group border-[2px] border-gray-300 py-2 px-2 rounded-full hover:bg-gray-200 hover:border-gray-200 cursor-pointer transition-all duration-200 active:scale-90"
                >
                  <Image src={write} alt="write" className="w-[24px]" />
                  <p className=" group-hover:opacity-100 text-sm opacity-0 ease-in pointer-events-none delay-75 ">
                    Write
                  </p>
                </Link>
              </li>
            )}
            {session && (
              <li>
                <Link
                  href="/chat"
                  className="flex items-center w-[40px] hover:w-[84px] gap-1 group border-[2px] border-gray-300 py-2 px-2 rounded-full hover:bg-gray-200 hover:border-gray-200 cursor-pointer transition-all duration-200 active:scale-90"
                >
                  <Image src={conversation} alt="write" className="w-[26px]" />
                  <p className=" group-hover:opacity-100 text-sm opacity-0 ease-in pointer-events-none delay-75 ">
                    Chat
                  </p>
                </Link>
              </li>
            )}
            <li>
              {!session && <Link href="/login" className="bg-gray-300 text-gray-50 active:ring active:ring-gray-300 transition px-4 py-2 rounded-lg font-semibold">Join us</Link>}
              {session && (
                <div>
                  <div className="group relative rounded-full cursor-pointer  transition duration-200 z-20">
                    <Image
                      src={
                        authUser?.avatar ? `/avatars/${authUser.avatar}` : user
                      }
                      width={46}
                      height={46}
                      alt="l"
                      className="w-[58px] h-[58px] rounded-full box-border border-2 border-white hover:ring hover:ring-gray-900 transition duration-500"
                    />
                    <div className="absolute h-[0px] overflow-hidden group-hover:h-[200px] group-hover:opacity-100 opacity-0 -right-32 mt-2 w-[190px] bg-white rounded-md shadow ease-in-out duration-300">
                      <Link
                        href="/profile/show"
                        className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-100 py-2 px-2 transition duration-200 cursor-pointer"
                      >
                        <Image src={profile} alt="image" className="w-[24px]" />
                        <p className=" cursor-pointer">Profile</p>
                      </Link>
                      <Link
                        href="/profile/manage"
                        className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-100 py-2 px-2"
                      >
                        <Image src={manage} alt="image" className="w-[24px]" />
                        <p className=" cursor-pointer">Posts</p>
                      </Link>
                      <Link
                        href="/profile"
                        className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-100 py-2 px-2"
                      >
                        <Image
                          src={notification}
                          alt="image"
                          className="w-[24px]"
                        />
                        <p className=" cursor-pointer">Notifications</p>
                      </Link>
                      <SignOutButton />
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </li>
      </ul>
    </menu>
  );
};

export default NavBar;
