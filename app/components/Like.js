"use client"
import Image from "next/image";
import React, { useState } from "react";
import heart from "../../public/images/heart.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";


const Like = ({ likes, postId }) => {
    const [number, setNumber] = useState(likes) 
    const handleLike = ()=>{
        axios.post("/api/like", {postId}).then((res)=>{
            if(!res.data.ok){
                toast.error(res.data.message)
                
            }else{
                setNumber((prev)=>prev+1)
                toast.success(res.data.message)
            }
        }).catch((err)=>{
            console.error(err)
        })
    }
  return (
    <div className="flex items-center gap-1">
        <Toaster/>
      <Image
        onClick={handleLike}
        src={heart}
        className=" w-[32px] opacity-35 hover:bg-gray-200 hover:opacity-90 p-1 rounded-full cursor-pointer"
      />
      <button>{number} likes</button>
    </div>
  );
};

export default Like;
