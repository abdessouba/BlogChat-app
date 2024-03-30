import AnimationWrapper from "@/app/AnimationWrapper";
import axios from "axios";
import Image from "next/image";
import React from "react";
import share from "../../../public/images/share.png";
import chat from "../../../public/images/chat.png";
import Comment from "@/app/components/Comment";
import Like from "@/app/components/Like";
import Follow from "@/app/components/Follow";

const page = async (props) => {
  let res;
  let data;
  const postId = props.params.postId;
  try {
    //add view to post
    await axios.post("/api/views", { postId });
  } catch ({ message }) {
    console.log(message);
  }
  try {
    res = await axios.get(`api/post/${postId}`);
    data = await res.data.data;
  } catch ({ message }) {
    console.log(message);
  }

  // const handleLike = async () => {
  //   "use server";
  //   console.log("click");
  //   try {
  //     const response = await axios.post("/api/like");
  //     const result = response.data.ok;
  //   } catch (error) {}
  // };

  const dateString = data?.createdAt;
  const dateObject = new Date(dateString);
  const publishedOn = dateObject.toISOString().split("T")[0];
  return (
    <AnimationWrapper>
      <div className="text-gray-800 w-[50%] max-sm:w-[90%] m-auto my-10">
        <Image alt="" src={`/storage/${data?.image}`} className="" />
        <h1 className="font-bold max-sm:text-lg text-5xl first-letter:uppercase mt-3 leading-[60px] italic mx-2">
          {data?.title}.
        </h1>
        <div className="my-7 flex items-center justify-between">
          <div className="flex gap-3">
            <Image
              alt=""
              src={`/avatars/${data?.userId.avatar}`}
              className="w-[64px] h-[64px] rounded-full border-gray-400"
            />
            <div className="mt-1">
              <div>
                <span>@</span>
                <p className="inline first-letter:uppercase underline">
                  {data?.userId.name}
                </p>
              </div>
              <p className="mt-1 text-gray-500">Memeber Since 2020</p>
            </div>
          </div>
          <div className="text-sm italic text-gray-400 text-">
            Published on {publishedOn}
          </div>
        </div>
        <hr />
        <div className="flex items-center justify-between my-3 px-4">
          <div className="flex items-center gap-2">
            <Like likes={data?.like.length} postId={data?._id} />
            <div className="flex items-center gap-1 ml-2">
              <Image
                alt=""
                src={chat}
                className=" w-[32px] opacity-35 hover:bg-gray-200 hover:opacity-90 p-1 rounded-full cursor-pointer"
              />
              <p className="text-sm text-gray-600">
                {data?.comments.length} comments
              </p>
            </div>
            <Follow
              follows={data?.userId?.followers.length}
              postId={data?._id}
            />
          </div>
          <div>
            <Image
              alt=""
              src={share}
              className="w-[24px] opacity-60 hover:opacity-100 transition cursor-pointer"
            />
          </div>
        </div>
        <hr />
        <p className="px-4 text-2xl my-5">{data?.description}</p>
        <hr />
        <Comment postId={postId} />
      </div>
    </AnimationWrapper>
  );
};

export default page;
