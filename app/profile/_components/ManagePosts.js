"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import edit from "../../../public/images/edit-text.png"
import views from "../../../public/images/views.png"
import comments from "../../../public/images/comments.png"
import likes from "../../../public/images/likes.png"

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios.get("/api/userPosts").then((res) => {
      if(res.data.posts){
        setPosts(res.data.posts);
      }
    });
  }, []);
  return (
    <div className=" w-full flex flex-col gap-5 justify-start">
      {posts.length == 0 && (
          <p className="text-gray-300 font-semibold m-auto mt-10">no posts available.</p>
      )}
      {posts.map((p) => (
        <div className="relative  flex items-center gap-5 w-full h-[300px] shadow-md rounded-sm transition cursor-pointer">
          <Image
            src={`/storage/${p.image}`}
            width={440}
            height={250}
            className="h-full max-w-[440px]"
          />
          <Image src={edit} className="absolute right-1 bottom-1 w-[43px] p-2 rounded-md hover:bg-gray-200/40 transition"/>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold">{p.title}.</h1>
            <p>{p.description}</p>
            <div className="flex items-center gap-2">
              <p className="font-semibold">about: </p>
              {p.themes.map((theme)=><p className="text-gray-500 underline">{theme}</p>)}
            </div>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <Image src={views} className="w-[20px]"/>
                  <p className="font-semibold">{p.views || 0}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Image src={likes} className="w-[16px]"/>
                  <p className="font-semibold">{p.like.length}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Image src={comments} className="w-[16px]"/>
                  <p className="font-semibold">{p.comments.length}</p>
                </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManagePosts;
