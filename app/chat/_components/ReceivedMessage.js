import React, { useEffect, useState } from "react";
import Image from "next/image";
import AnimationWrapper from "@/app/AnimationWrapper";

const ReceivedMessage = ({ message, user }) => {
  const [date, setDate] = useState("");
  const [ampm, setAmpm] = useState("");

  useEffect(() => {
    const createdAt = new Date(message.createdAt);
    const dt = `${createdAt.getUTCHours()}:${createdAt.getUTCMinutes()}`
    setDate(dt)
    setAmpm(createdAt.getUTCHours()>=12?"PM" : "AM")
    // var hours = createdAt.getHours();
    // var minutes = createdAt.getMinutes();
    // var ampm = hours >= 12 ? "PM" : "AM";
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    // minutes = minutes < 10 ? "0" + minutes : minutes;
    // setDate(hours + ":" + minutes + " " + ampm);
  }, [message]);
  return (
    <AnimationWrapper>
      <div className="w-full h-[40px] mt-5 flex items-center justify-end gap-2 text-sm">
        <div>
          <p className="bg-gray-600 text-white py-2 px-3 rounded-xl rounded-br-none max-w-[400px] max-md:max-w-[200px] text-wrap truncate">
            {message.message}
          </p>
          <p className="text-sm">{date} {ampm}</p>
        </div>
        <Image
          src={"/avatars/" + user?.avatar}
          width={50}
          height={50}
          className="w-[45px] h-[45px] rounded-full bg-orange-100"
        />
      </div>
    </AnimationWrapper>
  );
};

export default ReceivedMessage;

