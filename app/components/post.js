import React, { Suspense } from "react";
import Image from "next/image.js";
import heart from "../../public/images/heart.png";
import follow from "../../public/images/follow.png";
import chat from "../../public/images/chat.png";
import AnimationWrapper from "../AnimationWrapper.js";
import Link from "next/link.js";

const post = ({ post }) => {
  const dateString = post?.createdAt
  const dateObject = new Date(dateString);
  const publishedOn = dateObject.toISOString().split("T")[0];
  return (
    <AnimationWrapper>
      <a href={`getPost/${post?._id}`}>
        <div className="flex justify-between w-[800px] transition-all duration-200">
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Image src={`/avatars/${post?.userId.avatar}`} width={32} height={32} className="rounded-full border border-gray-800"/>
              <p className="text-sm">posted by @<span className=" text-gray-600 underline">{post?.userId.username}</span></p>
            </div>
            <div>
              <h1 className="font-bold text-2xl mb-2">{post?.title}</h1>
              <p className="max-h-[50px] max-w-[500px] truncate ">{post?.description}</p>
              <div className="text-sm mt-2 flex items-center gap-1">
                <p>{publishedOn}</p>
                <span className="font-bold">.</span>
                <p className="flex items-center gap-1">
                  {post?.themes.map((t)=><p className="bg-gray-100 py-1 px-2 rounded-full">{t}</p>)}
                </p>
              </div>
            </div>
          </section>
          <section>
            <Image src={`/storage/${post?.image}`} width={250} height={250}/>
          </section>
        </div>
      </a>
    </AnimationWrapper>
  );
};

export default post;
