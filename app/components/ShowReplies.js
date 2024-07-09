import Image from "next/image";
import React, { useState } from "react";
import arrow_down from "../../public/images/arrow-down.png";

const ShowReplies = ({ replies }) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="">
      <div
        onClick={() => setShowReplies((prev) => !prev)}
        className="w-fit flex items-center gap-1 hover:bg-gray-200 rounded-full py-1 px-2 cursor-pointer"
      >
        {!showReplies && <Image src={arrow_down} className="w-[12px]" />}
        {showReplies && (
          <Image src={arrow_down} className="w-[12px] rotate-180" />
        )}
        <span className=" text-sm font-semibold">
          ({replies.length}) replies
        </span>
      </div>
      {showReplies && replies.map((reply) => {
        return (
          <>
            <div className="flex items-start gap-2 mt-2">
              <Image
                src={"/avatars/" + reply.user.avatar}
                width={35}
                height={35}
                className="rounded-full"
              />
              <div>
                <p className="underline">@{reply.user.username}</p>
                <p className="max-w-[230px] text-wrap text-sm">{reply.reply}</p>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default ShowReplies;
