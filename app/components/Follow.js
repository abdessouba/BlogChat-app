"use client";
import Image from "next/image";
import React, { useState } from "react";
import heart from "../../public/images/heart.png";
import add from "../../public/images/add-friend.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const Follow = ({ follows, postId }) => {
  const [number, setNumber] = useState(follows);
  const handleFollow = () => {
    axios
      .post("/api/follow", { postId })
      .then((res) => {
        if (!res.data.ok) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          setNumber((prev) => prev + 1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <div className="flex items-center gap-1 ml-2">
      <Toaster />
      <Image
        alt="sa"
        onClick={handleFollow}
        src={add}
        className=" w-[32px] opacity-35 hover:bg-gray-200 hover:opacity-90 p-1 rounded-full cursor-pointer"
      />
      <p className="text-sm text-gray-600">{number} followers</p>
    </div>
  );
};

export default Follow;
