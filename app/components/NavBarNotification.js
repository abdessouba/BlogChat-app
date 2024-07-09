"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import bell from "../../public/images/bell.png";
import { ioContext } from "../context/SocketServerContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import MessageNotification from "./assets/MessageNotification";
import comment from "../../public/images/comment.png";

export const NavBarNotification = () => {
  const { socket, notice } = useContext(ioContext);
  const [notifications, setNotifications] = useState(0)
  useEffect(() => {
    const endPoint = window.location.href.slice(
      window.location.href.lastIndexOf("/") + 1
    );
    if (notice && (!endPoint.startsWith("chat"))) {
      setNotifications((prev)=>prev+1)
      const type = notice.notification?.type;
      if (type == "post") {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-[400px] w-full bg-purple-300 shadow-lg rounded-lg pointer-events-auto flex items-start gap-1 p-3 text-white`}
            >
              <Image src={comment} width={24} />
              <p className="font-semibold text-sm max-w-md truncate">
                {notice.notification.content}
              </p>
            </div>
          ),
          { position: "bottom-right", duration: 700 }
        );
      }
      if (type == "comment") {
        toast.custom(
          (t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-[400px] w-full bg-orange-300 shadow-lg rounded-lg pointer-events-auto flex items-start gap-1 p-3 text-white`}
            >
              <Image src={comment} width={24} />
              <p className="font-semibold text-sm max-w-md truncate">
                {notice.notification.content}
              </p>
            </div>
          ),
          { position: "bottom-right", duration: 700 }
        );
      }

      if (type == undefined) {
        //this one for message notification
        axios.get(`/api/getUserById/${notice.senderId}`).then((res) => {
          toast.custom(
            (t) => <MessageNotification t={t} res={res} notice={notice} />,
            { position: "bottom-right" }
          );
        });
      }
      if (type == "reply") {
          toast.custom(
            (t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-[400px] w-full bg-green-500 shadow-lg rounded-lg pointer-events-auto flex items-start gap-1 p-3 text-white`}
              >
                <Image src={comment} width={24} />
                <p className="font-semibold text-sm max-w-md truncate">
                  {notice.notification.content}
                </p>
              </div>
            ),
            { position: "bottom-right", duration: 700 }
          );
      }
      if (type == "follow") {
          toast.custom(
            (t) => (
              <div
                className={`${
                  t.visible ? "animate-enter" : "animate-leave"
                } max-w-[400px] w-full bg-sky-300 shadow-lg rounded-lg pointer-events-auto flex items-start gap-1 p-3 text-white`}
              >
                <Image src={comment} width={24} />
                <p className="font-semibold text-sm max-w-md truncate">
                  {notice.notification.content}
                </p>
              </div>
            ),
            { position: "bottom-right", duration: 700 }
          );
      }
    }
  }, [notice]);
  return (
    <>
      <li className="">
        <Link
          href="/profile/notifications"
          className="relative flex items-center w-[42px] sm:hover:w-[90px] gap-1 group border-[2px] border-gray-300 py-2 px-2 rounded-full hover:bg-gray-200 hover:border-gray-200 cursor-pointer transition-all duration-200 active:scale-90"
        >
          <Image src={bell} alt="write" className="min-w-[24px] min-h-[24px]" />
          <p className="absolute top-[2px] left-[2px] w-[20px] h-[20px] rounded-full bg-red-600 border-2 border-white font-semibold text-xs text-white flex items-center justify-center ">
            {notifications}
          </p>
          <p className=" truncate group-hover:opacity-100 text-sm opacity-0 ease-in pointer-events-none delay-75 ">
            Notifications
          </p>
        </Link>
      </li>
    </>
  );
};
