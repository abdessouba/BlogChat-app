import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { ioContext } from "../context/SocketServerContext";
import Link from "next/link";

const Notifications = () => {
  const { notice } = useContext(ioContext);
  const [notifications, setNotifications] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  useEffect(() => {
    axios
      .get("/api/notifications")
      .then((res) => {
        setNotifications(res.data.notifications);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [notice]);
  return (
    <div className="ml-10 max-xl:mx-4 max-sm:mx-2">
      <h1 className="text-3xl font-bold mb-4">Notifications:</h1>
      <div className="w-full ">
        <menu className="flex items-center gap-3 max-sm:flex-col max-sm:items-start">
          <h1 className="font-bold text-xl">Filter By:</h1>
          <ul className="flex items-center gap-3 text-sm">
            <li
              onClick={() => setFilterBy("")}
              className={`${
                filterBy == "" ? "bg-gray-700 text-white" : ""
              } font-semibold bg-gray-100 rounded-md py-1 px-2 cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200`}
            >
              All
            </li>
            <li
              onClick={() => setFilterBy("comment")}
              className={`${
                filterBy == "comment" ? "bg-gray-700 text-white" : ""
              } font-semibold bg-gray-100 rounded-md py-1 px-2 cursor-pointer hover:bg-gray-700 hover:text-white transition-all duration-200`}
            >
              comments
            </li>
            <li
              onClick={() => setFilterBy("follow")}
              className={`${
                filterBy == "follow" ? "bg-gray-700 text-white" : ""
              } font-semibold bg-gray-100 rounded-md py-1 px-2 cursor-pointer hover:bg-gray-800 hover:text-white`}
            >
              follows
            </li>
            <li
              onClick={() => setFilterBy("reply")}
              className={`${
                filterBy == "reply" ? "bg-gray-700 text-white" : ""
              } font-semibold bg-gray-100 rounded-md py-1 px-2 cursor-pointer hover:bg-gray-800 hover:text-white`}
            >
              replies
            </li>
          </ul>
        </menu>
        <div className="w-fit mt-7 p-7 max-sm:p-3 max-h-[500px] bg-gray-50 shadow-md m-auto rounded-md overflow-y-auto overflow-x-hidden">
          {notifications.length <= 0 && <p className="text-center text-sm px-6 text-gray-600 font-semibold">no notifications yet</p>}
          {notifications?.map((notification) => {
            if (filterBy != "" && notification.notice.type != filterBy) return;
            if (notification.notice.type == "post") {
              return (
                <Link href={`/getPost/${notification.relatedToId._id}`} className="relative flex items-start gap-1 bg-purple-300 p-2 rounded-lg my-4 hover:shadow-md transition duration-150 cursor-pointer">
                  <Image
                    width={40}
                    height={40}
                    src={"/avatars/" + notification.actor.avatar}
                    className="w-[35px] h-[35px] rounded-full bg-gray-300"
                  />
                  <p className="w-full max-w-[300px] text-wrap text-sm ">
                    <span className="font-semibold text-gray-100 mr-1">
                      @{notification.actor.username}
                    </span>
                    <span>
                      posted new article "{notification.relatedToId.title}"
                    </span>
                  </p>
                </Link>
              );
            }
            if (notification.notice.type == "comment") {
              const createdAt = notification.createdAt.slice(
                0,
                notification.createdAt.indexOf("T")
              );
              return (
                <div className="relative flex items-start gap-1 bg-orange-200 p-2 rounded-lg my-4 hover:shadow-md transition duration-150 cursor-pointer">
                  <Image
                    width={40}
                    height={40}
                    src={"/avatars/" + notification.actor.avatar}
                    className="w-[35px] h-[35px] rounded-full bg-gray-300"
                  />
                  <p className="w-full max-w-[300px] text-wrap text-sm ">
                    <span className="font-semibold text-gray-400 mr-1">
                      @{notification.actor.username}
                    </span>
                    <span>
                      commented to your post {notification.relatedToId.title}
                    </span>
                    <span className="gray-400 font-semibold">
                      . "{notification.notice.id.comment}"
                    </span>
                  </p>
                </div>
              );
            } else if (notification.notice.type == "reply") {
              return (
                <div className="w-full flex items-start gap-1 bg-green-400 p-2 rounded-lg my-4 hover:shadow-md transition duration-150 cursor-pointer">
                  <Image
                    width={40}
                    height={40}
                    src={"/avatars/" + notification.actor.avatar}
                    className="w-[35px] h-[35px] rounded-full bg-gray-300"
                  />
                  <h1 className=" max-w-[300px] text-sm">
                    <span className="font-semibold mr-1 text-white underline underline-offset-2">
                      @{notification.actor.username}
                    </span>
                    <span>
                      replied to your comment "
                      <span className="font-semibold">
                        {notification.notice.id.comment}
                      </span>
                      " in post{" "}
                      <span className="font-semibold">
                        {notification.relatedToId.title}
                      </span>{" "}
                      <span className="font-semibold"></span>
                    </span>
                  </h1>
                </div>
              );
            } else if (notification.notice.type == "follow") {
              return (
                <Link
                  href={`/users/${notification.actor.username}`}
                  className="w-full flex items-center gap-1 bg-sky-200 p-2 rounded-lg my-4 hover:shadow-md transition duration-150 cursor-pointer"
                >
                  <Image
                    width={40}
                    height={40}
                    src={"/avatars/" + notification.actor.avatar}
                    className="w-[35px] h-[35px] rounded-full bg-gray-300"
                  />
                  <h1 className="min-w-[300px] flex gap-1 items-center text-sm">
                    <span className="font-semibold mx-1 text-white underline underline-offset-2">
                      @{notification.actor.username}
                    </span>
                    <p>
                      start <span className="font-semibold">following</span> you
                    </p>
                  </h1>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Notifications;

/////

// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   useEffect(() => {
//     axios
//       .get("/api/notifications")
//       .then((res) => {
//         setNotifications(res.data.notifications);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }, []);
//   return (
//     <div className="ml-10 max-xl:mx-4">
//       <h1 className="text-3xl font-bold mb-4">Notifications:</h1>
//       <div className="w-full ">
//         <menu className="flex items-center gap-3 max-sm:flex-col max-sm:items-start">
//           <h1 className="font-bold text-xl">Filter By:</h1>
//           <ul className="flex items-center gap-3 text-sm">
//             <li className="font-semibold bg-gray-100 rounded-md py-1 px-2 hover:bg-gray-200 cursor-pointer ">
//               comments
//             </li>
//             <li className="font-semibold bg-gray-100 rounded-md py-1 px-2 hover:bg-gray-200 cursor-pointer ">
//               follows
//             </li>
//             <li className="font-semibold bg-gray-100 rounded-md py-1 px-2 hover:bg-gray-200 cursor-pointer ">
//               replies
//             </li>
//           </ul>
//         </menu>
//         <div className="w-fit mt-7 p-7 max-sm:p-3 max-h-[500px] bg-gray-50 shadow-md m-auto rounded-md overflow-y-auto">
//           {notifications?.map((notification) => {
//             if (notification.notice.type == "comment") {
//               return (
//                 <div className="relative flex items-start gap-1 bg-orange-200 p-2 rounded-lg my-4 hover:shadow-md transition duration-150 cursor-pointer">
//                   {/* <p className=" absolute -top-1 -left-1 w-[13px] h-[13px] rounded-full bg-red-500 border-white"></p> */}
//                   <Image
//                     width={40}
//                     height={40}
//                     src={"/avatars/" + notification.actor.avatar}
//                     className="w-[35px] h-[35px] rounded-full bg-gray-300"
//                   />
//                   <p className=" max-sm:max-w-[150px] w-[300px] text-wrap text-sm truncate">
//                     <span className="font-semibold text-gray-400 mr-1">
//                       @{notification.actor.username}
//                     </span>
//                     <span>
//                       commented to your post {notification.relatedToId.title}
//                     </span>
//                     <span className="gray-400 font-semibold">
//                       . "{notification.notice.id.comment}"
//                     </span>
//                   </p>
//                 </div>
//               );
//             } else if (notification.notice.type == "reply") {
//               return (
//                 <div className="w-fit flex items-start gap-1 bg-green-400 p-2 rounded-lg my-4 hover:shadow-md transition duration-150 cursor-pointer">
//                   <Image
//                     width={40}
//                     height={40}
//                     src={"/avatars/" + notification.actor.avatar}
//                     className="w-[35px] h-[35px] rounded-full bg-gray-300"
//                   />
//                   <h1 className=" max-sm:max-w-[150px] w-[300px] text-sm">
//                     <span className="font-semibold mr-1 text-white underline underline-offset-2">
//                       @{notification.actor.username}
//                     </span>
//                     <span>
//                       replied to your comment "
//                       <span className="font-semibold">
//                         {notification.notice.id.comment}
//                       </span>
//                       " in post{" "}
//                       <span className="font-semibold">
//                         {notification.relatedToId.title}
//                       </span>{" "}
//                       <span className="font-semibold"></span>
//                     </span>
//                   </h1>
//                 </div>
//               );
//             } else if (notification.notice.type == "follow") {
//               return (
//                 <div className="w-fit flex items-center gap-1 bg-sky-200 p-2 rounded-lg my-4 hover:shadow-md transition duration-150 cursor-pointer">
//                   <Image
//                     width={40}
//                     height={40}
//                     src={"/avatars/" + notification.actor.avatar}
//                     className="w-[35px] h-[35px] rounded-full bg-gray-300"
//                   />
//                   <h1 className=" max-sm:max-w-[150px] w-[300px] text-sm">
//                     <span className="font-semibold mr-1 text-white underline underline-offset-2">
//                       @{notification.actor.username}
//                     </span>
//                     <span>start following you</span>
//                   </h1>
//                 </div>
//               );
//             }
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Notifications;
