"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import AnimationWrapper from "../AnimationWrapper";
import defaultImage from "../../public/images/user.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Reply from "./Reply";

const Comment = ({ postId }) => {
  const { data: session, status } = useSession();
  const [textarea, setTextarea] = useState("");
  const [comments, setComments] = useState([]);
  const [reply, setReply] = useState("");
  const replyRef = useRef("");
  const user = session?.user;
  const handleComment = () => {
    axios
      .post("/api/comment", { comment: textarea, postId })
      .then((res) => {
        if (res.data.ok) {
          toast.success(res.data.message);
          setTextarea("");
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [postId]);
  const handleCommentReplies = (target) => {
    const targetParent = target.parentElement;
    const button = document.createElement("button");
    button.textContent = "Submit";
    targetParent.appendChild(button);
    setReply(target.value);
  };
  return (
    <div>
      <Toaster />
      <div className="mt-5 mb-2 flex items-start gap-3">
        <div className="p-[2px] border-gray-700 rounded-full w-fit">
          <Image
            alt=""
            src={user ? `/avatars/${user?.avatar}` : defaultImage}
            width={60}
            height={60}
            className=" rounded-full"
          />
        </div>
        <textarea
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
          type="text"
          placeholder="share your idea..."
          className=" border-2 border-gray-800 h-[80px] py-3 px-4 rounded-sm w-full"
        ></textarea>
      </div>
      {textarea && (
        <AnimationWrapper>
          <div className="flex gap-3 items-center justify-end ">
            <button
              onClick={() => setTextarea("")}
              className=" bg-gray-800 text-white py-2 px-3 rounded-full"
            >
              cancel
            </button>
            <button
              onClick={handleComment}
              className=" bg-gray-800 text-white py-2 px-3 rounded-full"
            >
              comment
            </button>
          </div>
        </AnimationWrapper>
      )}
      <section className="my-6">
        {comments.map((comment) => {
          return (
            <div key={comment._id} className="ml-3 mb-5 flex items-start gap-2">
              <Image
                alt=""
                src={`/avatars/${comment.user.avatar}`}
                width={60}
                height={60}
                className=" rounded-full"
              />
              <div className="w-full">
                <p className="text-md flex items-center">
                  @
                  <p className="underline hover:text-black/60 cursor-pointer">
                    {comment.user.name}{" "}
                  </p>
                  <span className="ml-2 text-sm">posted 20 days ago</span>
                </p>
                <p className=" w-[800px]">{comment.comment}</p>
                <Reply />
                {/* <div className="flex items-center gap-2">
                  <Image
                    src={`/avatars/${comment.user.avatar}`}
                    width={30}
                    height={30}
                    className=" rounded-full"
                  />
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="add reply..."
                      className=" border-b-2 border-gray-700 outline-none p-2 w-2/3"
                      onChange={(e)=>handleCommentReplies(e.target)}
                      value={reply}
                    />
                  </div>
                </div> */}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Comment;
