"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import heart from "../../public/images/heart.png";
import add from "../../public/images/add-friend.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Follow = ({ follows, postId, isFollower }) => {
  const [number, setNumber] = useState(follows);

  const [show, setShow] = useState(false)
  useEffect(()=>{
    setShow(isFollower)
  },[])

  const handleFollow = () => {
    axios
      .post("/api/follow", { postId })
      .then((res) => {
        if (res.data.ok) {
          toast.success(res.data.message);
          setNumber(res.data.follows);
          setShow(true)
        } else {
          toast.error(res.data.message);
          if(res.data.follows != undefined){
            setNumber(res.data.follows);
          }
          setShow(false)
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="flex items-center gap-1 ml-2">
      <Toaster />
      { !show && <Image alt="sa" onClick={handleFollow} src={add} className={`w-[32px] opacity-60 rounded-full hover:bg-gray-200 hover:opacity-100 p-1 cursor-pointer`}/>}
      { show && <Image alt="sa" onClick={handleFollow} src={add} className={`w-[32px] opacity-100 rounded-full bg-gray-200 hover:opacity-100 p-1 cursor-pointer`}/>}
      
      <p className="text-sm text-gray-600">{number} <span className="max-sm:hidden">followers</span></p>
    </div>
  );
};

export default Follow;
