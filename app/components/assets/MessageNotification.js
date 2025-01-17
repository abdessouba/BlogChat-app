import Image from "next/image";
import Link from "next/link";
import React from "react";

const MessageNotification = ({t, res, notice}) => {
  return (
    <div
      className={`${
        t.visible ? "animate-enter" : "animate-leave"
      } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <Image
              className="h-10 w-10 rounded-full"
              src={`/avatars/${res.data.user.avatar}`}
              width={40}
              height={40}
              alt=""
            />
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">
              {res.data.user.name}
            </p>
            <p className="mt-1 text-sm text-gray-500">{notice.message}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <Link
          href={{ pathname: "/chat", query: { id: res.data.user._id } }}
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          See
        </Link>
      </div>
    </div>
  );
};

export default MessageNotification;
