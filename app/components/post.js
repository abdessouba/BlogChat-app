import React from "react";
import Image from "next/image.js";
import AnimationWrapper from "../AnimationWrapper.js";
import Link from "next/link.js";

const post = ({ post }) => {
  const dateString = post?.createdAt
  const dateObject = new Date(dateString);
  const publishedOn = dateObject.toISOString().split("T")[0];
  return (
    <AnimationWrapper>
      <a href={`getPost/${post?._id}`} className="mb-10">
        <div className="flex justify-between w-full transition-all duration-200 max-[880px]:flex-col max-[880px]:gap-3">
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Image alt="as" src={`/avatars/${post?.userId.avatar}`} width={32} height={32} className="rounded-full border border-gray-800 max-w-[32px] max-h-[32px]"/>
              <p className="text-sm">posted by @<Link href={`/users/${post?.userId.username}`} className=" text-gray-600 underline">{post?.userId.username}</Link></p>
            </div>
            <div>
              <h1 className="font-bold text-2xl mb-2 first-letter:uppercase">{post?.title}</h1>
              <p className="max-h-[50px] max-w-[500px] max-[880px]:max-w-[200px] truncate font-light">{post?.description}</p>
              <div className="text-sm mt-2 flex items-center gap-1">
                <p>{publishedOn}</p>
                <span className="font-bold">.</span>
                <p className="flex items-center gap-1">
                  {post?.themes.map((t)=><span key={t._id} className="bg-gray-100 py-1 px-2 rounded-full">{t}</span>)}
                </p>
              </div>
            </div>
          </section>
          <section>
            <Image alt="as" src={`/storage/${post?.image}`} layout="responsive" width={250} height={250} className="min-w-[250px]"/>
          </section>
        </div>
      </a>
    </AnimationWrapper>
  );
};

export default post;
