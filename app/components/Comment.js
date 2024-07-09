"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AnimationWrapper from "../AnimationWrapper";
import defaultImage from "../../public/images/user.png";
import arrow from "../../public/images/next.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Reply from "./Reply";
import ShowReplies from "./ShowReplies";
import { ioContext } from "../context/SocketServerContext";

const Comment = ({ postId, setShowComment }) => {
  const { data: session, status } = useSession();
  const [textarea, setTextarea] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);

  const { notice } = useContext(ioContext);

  const user = session?.user;

  const handleComment = () => {
    axios
      .post("/api/comment", { comment: textarea, postId })
      .then((res) => {
        if (res.data.ok) {
          toast.success(res.data.message);
          setTextarea("");
          setRefresh(true);
        }
        if (!res.data.ok) {
          toast.error(res.data.message);
          setTextarea("");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    axios
      .get(`/api/comment/${postId}`)
      .then((res) => {
        setComments(res.data.comments);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId, notice, refresh]);

  return (
    <div className="pb-24 w-[370px] max-sm:w-[300px] overflow-x-hidden bg-white shadow-lg fixed top-0 right-0 z-20 bottom-0">
      <Image
        onClick={() => setShowComment(false)}
        src={arrow}
        className="fixed top-1/2 -translate-y-1/2 right-[340px] max-sm:right-[275px] z-20 opacity-20 hover:opacity-100 shadow-sm p-1 rounded-full transition cursor-pointer"
      />
      <Toaster />
      <div className="fixed bottom-0 bg-white w-[340px] max-sm:w-[280px] right-5 mt-5 flex items-start gap-3 p-2">
        <Image
          alt=""
          src={user ? `/avatars/${user?.avatar}` : defaultImage}
          width={50}
          height={50}
          className="shadow-sm rounded-full"
        />
        <textarea
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          type="text"
          className=" border border-gray-300 h-[100px] px-3 py-3 w-full"
        ></textarea>
        {textarea && (
          <button
            onClick={handleComment}
            className="absolute bottom-[13px] right-[13px] border border-gray-800 hover:bg-gray-800 hover:text-white text-gray-800 hover:font-semibold text-sm py-2 px-3 rounded-md"
          >
            comment
          </button>
        )}
      </div>
      <section className="my-6">
        <h1 className="text-2xl ml-5 font-semibold mt-10 mb-4">Comments:</h1>
        {loading && (
          <div className="w-full mt-[250px]">
            <div role="status" className="text-center">
              <svg
                aria-hidden="true"
                class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {!loading &&
          comments?.map((comment) => {
            const date = new Date(comment.createdAt)
            const createdAt = date.toISOString().slice(0, 10);
            return (
              <div
                key={comment._id}
                className="ml-3 my-10 flex items-start gap-2"
              >
                <Image
                  alt=""
                  src={`/avatars/${comment.user.avatar}`}
                  width={60}
                  height={60}
                  className=" rounded-full"
                />
                <div className="w-full mr-7">
                  <p className="text-md flex items-center">
                    @
                    <p className="underline hover:text-black/60 cursor-pointer">
                      {comment.user.username}
                    </p>
                    <span className="ml-2 text-sm text-gray-400">
                      {createdAt}
                    </span>
                  </p>
                  <p className="max-w-[230px] text-wrap text-sm">
                    {comment.comment}
                  </p>
                  <Reply setRefresh={setRefresh} commentId={comment._id} setComments={setComments}/>
                  {comment.replies.length !== 0 && <ShowReplies replies={comment.replies}/>}
                </div>
              </div>
            );
          })}
          {!loading && comments?.length == 0 && <p className="w-full text-center text-sm font-semibold text-gray-500">no comments yet.</p>}
      </section>
    </div>
  );
};

export default Comment;
