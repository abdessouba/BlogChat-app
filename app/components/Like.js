"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import heart from "../../public/images/heart.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Like = ({ likes, postId, alreadyLikedPost, setAlreadyLikedPost }) => {
  const [number, setNumber] = useState(likes);
  const [show, setShow] = useState(false)
  useEffect(()=>{
    setShow(alreadyLikedPost)
  },[])
  const handleLike = () => {
    axios
      .post("/api/like", { postId })
      .then((res) => {
        if (res.data.ok) {
          toast.success(res.data.message);
          setNumber(res.data.likes);
          setShow(true)
        } else {
          toast.error(res.data.message);
          if(res.data.likes != undefined){
            setNumber(res.data.likes)
          }
          setShow(false)
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="flex items-center gap-1">
      <Toaster />
      {!show && <Image alt="asd" onClick={handleLike} src={heart} className={` w-[30px] hover:bg-gray-200 hover:opacity-100 opacity-60 p-1 rounded-full cursor-pointer`}/>}
      {show && <Image alt="asd" onClick={handleLike} src={heart} className={` w-[30px] bg-gray-200 hover:opacity-100 opacity-100 p-1 rounded-full cursor-pointer`}/>}
      <button>{number} <span className="max-sm:hidden">likes</span></button>
    </div>
  );
};

export default Like;
