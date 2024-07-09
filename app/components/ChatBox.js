"use client";
import React, { useState } from "react";
import Image from "next/image";
import arrow_down from "../../public/images/arrow-down.png";
import send from "../../public/images/send.png";
import ReceivedMessage from "../chat/_components/ReceivedMessage";
import SendMessage from "../chat/_components/SendMessage";

export const ChatBox = () => {
  const [showBox, setShowBox] = useState(false);
  return (
    <div className="fixed bottom-1 left-1 w-[300px] min-h-[37px] bg-[#419bc4b7] rounded-md shadow-lg">
      <div
        onClick={() => setShowBox((prev) => !prev)}
        className="flex items-center justify-between cursor-pointer px-2 py-2"
      >
        <div className="flex items-center gap-1">
          <p className="bg-green-500 w-[10px] h-[10px] rounded-full"></p>
          <p className="font-semibold first-letter:uppercase text-white">
            abdessamad
          </p>
        </div>
        <Image
          src={arrow_down}
          width={14}
          height={14}
          className={showBox ? "" : "rotate-180"}
        />
      </div>
      {showBox && (
        <div className="relative h-[330px] bg-white p-3">
            <div className="py-2 flex flex-col gap-2">
                <SendMessage message={"test message"}/>
                <ReceivedMessage message={"test message"}/>
            </div>
          <div className="absolute bottom-1 right-2 left-2 ">
            <input type="text" placeholder="message..." className="p-2 pr-8 rounded-md w-full outline-none border-2 border-gray-300 focus:border-gray-800"/>
            <Image src={send} width={17} className="absolute right-3 top-1/2 -translate-y-1/2 w-[17px] cursor-pointer active:scale-90 transition-all duration-150"/>
          </div>
        </div>
      )}
    </div>
  );
};
