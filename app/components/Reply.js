"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Reply = ({commentId, setComments}) => {
  const { data: session, status } = useSession();
  const [reply, setReply] = useState("");
  const [showReply, setShowReply] = useState(false);

  const handleReply = () => {
    axios
      .post("/api/reply", {
        reply: reply,
        commentId: commentId,
        userId: session?.user._id,
      })
      .then((res) => {
        if (res.data.ok) {
          // setComments((prev)=>{
          //   prev.map((comment, index)=>{
          //     if(comment._id === res.data.replies._id){
          //       prev[index].replies = res.data.replies.replies
          //       console.log(res.data.replies.replies)
          //       console.log(prev[index].replies)
          //       return prev
          //     }
          //   })
          // })
          setReply("")
          setShowReply(false)
          toast.success(res.data.message);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="ml-2 w-full">
      <Toaster/>
      {showReply && (
        <div>
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            className="pl-1 pt-1 outline-none border-b-2 border-gray-300 h-[60px] w-[180px]"
          ></textarea>
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => {
                setShowReply(false);
              }}
              className="text-sm px-2 rounded-full bg-black text-white p-1 block mt-1"
            >
              cancel
            </button>
            <button
              onClick={handleReply}
              className="text-sm px-2 rounded-full bg-black text-white p-1 block mt-2"
            >
              reply
            </button>
          </div>
        </div>
      )}
      {!showReply && (
        <button
          onClick={() => {
            setShowReply(true);
          }}
          className="text-sm px-2 rounded-full ml-auto block mt-1"
        >
          reply
        </button>
      )}
    </div>
  );
};

export default Reply;
