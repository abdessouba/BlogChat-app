"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import logo from "../../public/images/chat.png";
import user from "../../public/images/user.png";
import write from "../../public/images/write.png";
import logout from "../../public/images/logout.png";
import manage from "../../public/images/manage.png";
import notification from "../../public/images/notification.png";
import profile from "../../public/images/profile.png";
import conversation from "../../public/images/conversation.png";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import AnimationWrapper from "../AnimationWrapper";
import { useDispatch, useSelector } from "react-redux";
import { initializingUser } from "../userSlice";
import { getUserData } from "../lib/getUserData";
import { getSession } from "next-auth/react";
import { authOptions } from "./app/api/auth/[...nextauth]/route";
import axios from "axios";

const NavBar = () => {
  const { data: session } = getSession(authOptions);
  const authUser = session.user;

  const user = useSelector((state) => state.user.value);
  useEffect(() => {
    axios.get("/api/authUser").then((res)=>{
      console.log(res.data)
    }).catch((err)=>{
      console.log(err.message)
    })
  }, [user]);

  // const authUser = useSelector((state) => state.user.value);
  // const dispatch = useDispatch();
  // const { data: session, status } = useSession();

  // const [open, setOpen] = useState(false);
  // const handleProfile = () => {
  //   setOpen(!open);
  // };
  // useEffect(() => {
  //   const get = async () => {
  //     const user = await getUserData();
  //     dispatch(initializingUser(user));
  //   };
  //   get();
  // }, []);
  // onClick={()=>{dispatch(initializingUser({counter:4}))}}
  return (
    <menu className="text-lg w-[80%] m-auto py-10 mb-10 semibold">
      <ul className="flex justify-between items-center">
        <li className="flex items-center gap-2">
          <Image src={logo} className="w-[32px]" />
          <p className="font-bold text-2xl mr-1">lsseafChat</p>
          <input
            type="text"
            placeholder="Search..."
            name="search"
            className="border-2 rounded-full py-2 px-4"
          />
        </li>
        <li>
          <ul className="flex justify-center items-center gap-3">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/posts">Posts</Link>
            </li>
            {session && (
              <li>
                <Link
                  href="/write"
                  className="flex items-center w-[42px] hover:w-[84px] gap-1 group border-[2px] border-green-300 py-2 px-2 rounded-full hover:bg-green-200 hover:border-green-200 cursor-pointer transition-all duration-200 active:scale-90"
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
                  className="flex items-center w-[40px] hover:w-[84px] gap-1 group border-[2px] border-green-300 py-2 px-2 rounded-full hover:bg-green-200 hover:border-green-200 cursor-pointer transition-all duration-200 active:scale-90"
                >
                  <Image src={conversation} alt="write" className="w-[26px]" />
                  <p className=" group-hover:opacity-100 text-sm opacity-0 ease-in pointer-events-none delay-75 ">
                    Chat
                  </p>
                </Link>
              </li>
            )}
            <li>
              {!session && <Link href="/login">Join us</Link>}
              {session && (
                <div>
                  <div
                    onClick={handleProfile}
                    className="group relative p-[2px] rounded-full bg-green-200 cursor-pointer  transition duration-200"
                  >
                    <Image
                      src={authUser?.avatar || user}
                      width={34}
                      height={34}
                      alt="l"
                      className="w-[48px] h-[48px] rounded-full box-border border-2 border-white"
                    />
                    <div className="absolute h-[0px] overflow-hidden group-hover:h-[180px] group-hover:opacity-100 opacity-0 -right-32 mt-2 w-[190px] bg-slate-200/70 rounded-md shadow ease-in-out duration-300">
                      <Link
                        href="/profile"
                        className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-100 pt-2 pb-1 px-2 transition duration-200 cursor-pointer"
                      >
                        <Image src={profile} alt="image" className="w-[24px]" />
                        <p className=" cursor-pointer">Profile</p>
                      </Link>
                      <li className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-100 py-1 px-2">
                        <Image src={manage} alt="image" className="w-[24px]" />
                        <p className=" cursor-pointer">Posts</p>
                      </li>
                      <li className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-100 py-1 px-2">
                        <Image
                          src={notification}
                          alt="image"
                          className="w-[24px]"
                        />
                        <p className=" cursor-pointer">Notifications</p>
                      </li>
                      <li
                        onClick={signOut}
                        className="text-xl flex items-center gap-1 hover:bg-gray-100 py-1 px-2"
                      >
                        <Image src={logout} alt="image" className="w-[24px]" />
                        <button className="mb-1  cursor-pointer">Logout</button>
                      </li>
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
