"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import edit from "../../../public/images/edit-text.png";
import views from "../../../public/images/views.png";
import comments from "../../../public/images/comments.png";
import likes from "../../../public/images/likes.png";
import AnimationWrapper from "@/app/AnimationWrapper";
import Link from "next/link";

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/userPosts").then((res) => {
      if (res.data.posts) {
        setPosts(res.data.posts);
        setLoading(false);
      }
    });
  }, []);
  return (
    <div className="relative flex flex-col gap-5 justify-start px-7 max-sm:px-4">
      {loading && <div className="text-center max-lg:max-w-[400px] w-[700px]">Loading...</div>}
      {!loading && (
        <>
          {posts.length == 0 && (
            <p className="text-gray-300 font-semibold m-auto mt-10">
              no posts available.
            </p>
          )}
          {posts.map((p) => (
            <AnimationWrapper key={p._id}>
              <div className="relative flex items-center max-sm:gap-1 gap-3 shadow-md rounded-sm transition cursor-pointer max-lg:flex-col max-lg:items-start max-lg:max-w-[400px] ">
                <Image
                  alt=""
                  src={`/storage/${p.image}`}
                  width={340}
                  height={200}
                  className="w-auto "
                />
                <Link href={{pathname:`/write`, query:{id: p._id}}}>
                  <Image
                    alt=""
                    src={edit}
                    className="absolute right-1 bottom-1 w-[43px] p-2 rounded-md hover:bg-gray-200/40 transition"
                  />
                </Link>
                <div className="flex flex-col gap-2 my-2">
                  <h1 className="text-3xl max-sm:text-2xl font-semibold first-letter:uppercase">
                    {p.title}.
                  </h1>
                  <p className="text-sm max-h-[100px] overflow-y-auto">
                    {p.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">About: </p>
                    {p.themes.map((theme) => (
                      <p key={theme} className="text-gray-500 underline">
                        {theme}
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Image alt="" src={views} className="w-[20px]" />
                      <p className="font-semibold">{p.views || 0}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image alt="" src={likes} className="w-[16px]" />
                      <p className="font-semibold">{p.like.length}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Image alt="" src={comments} className="w-[16px]" />
                      <p className="font-semibold">{p.comments.length}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          ))}
        </>
      )}
    </div>
  );
};

export default ManagePosts;
