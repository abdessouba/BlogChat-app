"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import AnimationWrapper from "../../AnimationWrapper";
import Link from "next/link";
import logout from "../../../public/images/logout.png";
import manage from "../../../public/images/manage.png";
import edit from "../../../public/images/edit.png";
import notification from "../../../public/images/notification.png";
import menu from "../../../public/images/menu.png";
import remove from "../../../public/images/aside_remove.png";
import profile from "../../../public/images/profile.png";
import edit_profile from "../../../public/images/edit_profile.png";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import EditProfile from "@/app/profile/_components/EditProfile";
import { useEffect, useState } from "react";
import ManagePosts from "../_components/ManagePosts";
import Password from "../_components/Password";
import Profile from "../_components/Profile";
import Editor from "@/app/components/Editor";
import Notifications from "@/app/components/Notifications";

function MyComponent({ params }) {
  const { data: session, status } = useSession();
  const [aside, setAdide] = useState(true);
  const pageRoute = params?.slug;

  useEffect(() => {
    if(window){
      const handleResize = () => {
        if(window.innerWidth <= 400){
          setAdide(false);
        }
        if(window.innerWidth > 400){
          setAdide(true);
        }
      };
      handleResize()
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Remove event listener when component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  return (
    <AnimationWrapper>
      <div className="m-auto flex items-start justify-center h-full">
        <Toaster />
        {/* burger menu */}
        <button className="bg-white p-2 shadow-md rounded-md fixed left-1 bottom-5 z-20 min-[400px]:hidden">
          <Image src={menu} alt="image" className="w-[27px] opacity-50 " onClick={()=>setAdide(true)}/>
        </button>
        {aside && (
          <aside className=" min-w-[280px] max-xl:min-w-[230px] max-[1280px]:min-w-[100px] px-4 h-full sm:border-r-4 border-gray-100 sticky top-10 max-[400px]:h-screen max-[400px]:fixed max-[400px]:left-0 max-[400px]:top-0 max-[400px]:bottom-0 max-[400px]:bg-white max-[400px]:top-0 max-[400px]:pt-16 max-[400px]:shadow-md z-20">
            <h1 className="font-semibold text-3xl text-gray-500 border-b-[3px] border-gray-100 pb-4 px-2 max-[1280px]:hidden">
              Dashboard
            </h1>
            <div className="my-6 text-gray-500">
              <button className="min-[400px]:hidden px-2 mb-7" onClick={()=>setAdide(false)}>
                <Image
                  src={remove}
                  alt="image"
                  className="w-[32px] opacity-80 hover:opacity-100"
                />
              </button>
              <Link
                href="/profile/show"
                className={`${
                  pageRoute && pageRoute[0] === "show"
                    ? "sm:ml-5 max-sm:bg-gray-100 opacity-95 max-sm:w-fit max-sm:px-3"
                    : ""
                } text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer sm:hover:ml-5`}
              >
                <Image
                  src={profile}
                  alt="image"
                  className="w-[24px] opacity-50"
                />
                <p className=" cursor-pointer max-[1280px]:hidden">Profile</p>
              </Link>
              <Link
                href="/profile/manage"
                className={`${
                  pageRoute && pageRoute[0] === "manage"
                    ? "sm:ml-5 max-sm:bg-gray-100 opacity-95 max-sm:w-fit max-sm:px-3"
                    : ""
                } text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer sm:hover:ml-5`}
              >
                <Image src={edit} alt="image" className="w-[24px] opacity-50" />
                <p className=" cursor-pointer max-[1280px]:hidden">Posts</p>
              </Link>
              <Link
                href="/profile/notifications"
                className={`${
                  pageRoute && pageRoute[0] === "notifications"
                    ? "sm:ml-5 max-sm:bg-gray-100 opacity-95 max-sm:w-fit max-sm:px-3"
                    : ""
                } text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer sm:hover:ml-5`}
              >
                <Image
                  src={notification}
                  alt="image"
                  className="w-[24px] opacity-50"
                />
                <p className=" cursor-pointer max-[1280px]:hidden">
                  Notifications
                </p>
              </Link>
            </div>
            <h1 className="font-semibold text-3xl text-gray-500 border-b-[3px] border-gray-100 pb-4 px-2 max-[1280px]:hidden">
              Profile
            </h1>
            <div className="my-6 text-gray-500">
              <Link
                href="/profile/edit"
                className={`${
                  pageRoute && pageRoute[0] === "edit"
                    ? "sm:ml-5 max-sm:bg-gray-100 opacity-95 max-sm:w-fit max-sm:px-3"
                    : ""
                } text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer sm:hover:ml-5`}
              >
                <Image
                  src={edit_profile}
                  alt="image"
                  className="w-[24px] opacity-50"
                />
                <p className=" cursor-pointer max-[1280px]:hidden">
                  Edit Profile
                </p>
              </Link>
              <Link
                href="/profile/password"
                className={`${
                  pageRoute && pageRoute[0] === "password"
                    ? "sm:ml-5 max-sm:bg-gray-100 opacity-95 max-sm:w-fit max-sm:px-3"
                    : ""
                } text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer sm:hover:ml-5`}
              >
                <Image
                  src={manage}
                  alt="image"
                  className="w-[24px] opacity-50"
                />
                <p className=" cursor-pointer max-[1280px]:hidden">
                  Change Password
                </p>
              </Link>
              <div
                onClick={signOut}
                className="text-xl flex items-center gap-1 mb-2 hover:bg-gray-50 py-4 px-3 rounded-xl transition-all duration-200 cursor-pointer"
              >
                <Image
                  src={logout}
                  alt="image"
                  className="w-[24px] opacity-50"
                />
                <p className=" pointer-events-none max-[1280px]:hidden">
                  Logout
                </p>
              </div>
            </div>
          </aside>
        )}

        <AnimationWrapper>
          <main className="text-gray-600 max-w-[900px] flex items-center justify-center">
            {pageRoute && pageRoute[0] == "show" && <Profile />}
            {pageRoute && pageRoute[0] == "edit" && <EditProfile />}
            {pageRoute && pageRoute[0] == "notifications" && <Notifications />}
            {pageRoute && pageRoute[0] == "manage" && <ManagePosts />}
            {/* {pageRoute && pageRoute[0] == "manage" && pageRoute[1] && <Editor/>} */}
            {pageRoute && pageRoute[0] == "password" && <Password />}
          </main>
        </AnimationWrapper>
      </div>
    </AnimationWrapper>
  );
}

export default MyComponent;
