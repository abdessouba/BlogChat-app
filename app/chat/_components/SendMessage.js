import AnimationWrapper from "@/app/AnimationWrapper";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const SendMessage = ({ message, user }) => {
  const [date, setDate] = useState("");
  const [ampm, setAmpm] = useState("");

  useEffect(() => {
    const createdAt = new Date(message.createdAt);
    const dt = `${createdAt.getUTCHours()}:${createdAt.getUTCMinutes()}`;
    setDate(dt);
    setAmpm(createdAt.getUTCHours() >= 12 ? "PM" : "AM");
  }, [message]);

  return (
    <AnimationWrapper>
      <div className="w-full h-[40px] flex items-end gap-2 text-sm mt-5">
        <Image
          src={"/avatars/" + user?.avatar}
          width={45}
          height={45}
          className="w-[50px] h-[50px] rounded-full bg-orange-100"
        />
        <div>
          <p className="bg-blue-600 text-white py-2 px-3 rounded-xl rounded-bl-none max-w-[300px] whitespace-wrap truncate text-wrap max-md:max-w-[200px]">
            {message.message}
          </p>
          <p className="text-sm">
            {date} {ampm}
          </p>
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default SendMessage;
