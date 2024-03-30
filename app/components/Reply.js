"use client"
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Reply = () => {
  const [reply, setReply] = useState("");
  const handleReply = ()=>{
    axios.post("/api/reply", {"reply": reply, "commentId": "6606c76add71abf90c3af3b4", userId: "65fda267b1d0bed5d1ae9d82"}).then((res)=>{
        if(res.data.ok){
            toast.success(res.data.message)
        }else{
            toast.error(res.data.message)
        }
    }).catch((err)=>{
        console.log(err)
    })
  }
  return (
    <div className="ml-2 w-full">
      <textarea value={reply} onChange={(e)=>setReply(e.target.value)} className="pl-1 outline-none border-b-2 border-gray-300 h-[30px] w-full"></textarea>
      <button onClick={handleReply} className="text-sm bg-gray-200 px-2 py-1 rounded-full ml-auto block mt-1">reply</button>
    </div>
  );
};

export default Reply;
