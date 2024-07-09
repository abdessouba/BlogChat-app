"use client";
import React, { useEffect, useRef, useState } from "react";
import AnimationWrapper from "../AnimationWrapper";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useContext } from "react";
import { ioContext } from "../context/SocketServerContext.js";
import SendMessage from "./_components/SendMessage";
import ReceivedMessage from "./_components/ReceivedMessage";
import searchIcon from "../../public/images/search.png";
import Loading from "../loading";
import InputEmojiWithRef from "react-input-emoji";
import "./page.css"

const page = () => {
  const { onlineUsers, socket, authenticatedUser, setNotice } = useContext(ioContext);

  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [chatWith, setChatWith] = useState(null);
  useEffect(()=>{
    setChatWith(id)
  }, [id])

  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState([]);
  const [selectedFriendState, setSelectedFriendState] = useState(false);
  const [search, setSearch] = useState("");

  // message sound
  const sendRef = useRef(null);
  const receiveRef = useRef(null);
  
  // Scroll to bottom
  const chatContainer = useRef(null);
  useEffect(() => {
    if (chatContainer.current) {
      chatContainer.current.scrollTop = chatContainer.current.scrollHeight;
    }
  }, [conversation]);

  const handleSendMessage = () => {
    if (chatWith) {
      if (!message) return;
      axios
        .post(`/api/message/${chatWith}`, { message })
        .then((res) => {
          if (res.data.ok) {
            setConversation((prev) => [...prev, res.data.sentMessage]);
            sendRef?.current?.play();
            setMessage("");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleEnterClick = (e) => {
    if (e.keyCode === 13) {
      handleSendMessage();
    }
  };

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (newMessage.senderId == chatWith) {
        setConversation((prev) => {
          console.log([...prev, newMessage])
          return [...prev, newMessage]
        });
      }else{
        console.log("another user sent you message"+newMessage.senderId)
      }
      receiveRef?.current?.play();
    });
  }, [socket]);

  useEffect(() => {
    if (chatWith) {
      axios
        .get(`/api/message/${chatWith}`)
        .then((res) => {
          if (res.data.ok) {
            setConversation(res.data.messages);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [chatWith]);

  useEffect(() => {
    axios.get("/api/friends").then((res) => {
      setFriends(res.data.friends);
    });
  }, [onlineUsers]);

  useEffect(() => {
    if (chatWith && friends) {
      const selectedFriendData = friends.find((f) => f._id === chatWith); // get selected friend data
      if (selectedFriendData) {
        setSelectedFriend(selectedFriendData);
        setSelectedFriendState(onlineUsers?.includes(selectedFriendData._id));
      }
    }
  }, [chatWith, friends]);

  return (
    <>
      {friends.length < 1 && <Loading className="mt-10" />}
      {friends.length > 0 && (
        <AnimationWrapper>
          <div className="w-[60%] max-[1400px]:w-[90%] max-md:w-[95%] m-auto h-[650px] mt-10">
            <div className="flex gap-7 max-sm:gap-3 h-full">
              <aside className="py-7 flex flex-col gap-2 px-5 bg-gray-50 h-full w-[400px] rounded-md shadow-md max-[880px]:w-[100px]">
                <div className="relative">
                  <input
                    type="text"
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    placeholder="search..."
                    className="py-3 px-4 border border-gray-500 rounded-full w-full min-w-[56px] min-h-[56px] max-md:placeholder:text-white max-md:m-auto"
                  />
                  <Image
                    src={searchIcon}
                    className="w-[24px] absolute right-4 top-1/2 -translate-y-1/2"
                  />
                </div>
                <div className="mt-7">
                  {friends.filter((f)=>f.username.startsWith(search.trim())).map((f) => {
                    return (
                      <Link
                        href={"/chat?id=" + f._id}
                        className={`relative mb-3 flex gap-2 items-center ${
                          chatWith === f._id ? "bg-gray-200" : ""
                        } p-2 hover:bg-gray-200 transition duration-200 rounded-full`}
                      >
                        <div className=" relative">
                          <Image
                            src={"/avatars/" + f.avatar}
                            width={45}
                            height={45}
                            className="rounded-full max-h-[45px] max-w-[45px]"
                          />
                          {onlineUsers?.find((userId) => userId === f._id) && (
                            <p className="aboslute bottom-1 left-1 bg-green-400 w-[7px] h-[7px] rounded-full "></p>
                          )}
                        </div>
                        <h1 className="text-lg max-[880px]:hidden">
                          @{f.username}
                        </h1>
                      </Link>
                    );
                  })}
                </div>
              </aside>
              {chatWith && (
                <main className="relative p-3 bg-gray-50 h-full w-full rounded-md shadow-md">
                  <header className="w-full px-6 py-5 flex items-start gap-3">
                    <div className="border-2 border-slate-900 p-[2px] rounded-full">
                      {!selectedFriend?.avatar && (
                        <p className="w-[65px] h-[65px] rounded-full bg-gray-100" />
                      )}
                      {selectedFriend?.avatar && (
                        <Image
                          src={"/avatars/" + selectedFriend?.avatar}
                          width={65}
                          height={65}
                          className="w-[65px] h-[65px] rounded-full bg-orange-100"
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-lg">
                        {selectedFriend?.name}
                      </p>
                      <Link
                        href={`/users/${selectedFriend?.username}`}
                        className="underline hover:text-gray-400 transition cursor-pointer"
                      >
                        @{selectedFriend?.username}
                      </Link>
                      {!selectedFriendState && (
                        <p className="text-red-500 text-sm font-semibold">
                          offline
                        </p>
                      )}
                      {selectedFriendState && (
                        <p className="text-green-500 text-sm font-semibold">
                          online
                        </p>
                      )}
                    </div>
                  </header>
                  <hr className="w-[90%] m-auto" />
                  <section
                    ref={chatContainer}
                    className="px-5 py-2 mt-3 flex flex-col max-h-[430px] overflow-y-auto overflow-x-hidden"
                  >
                    {conversation?.map((message) => {
                      if (message.senderId === authenticatedUser?._id) {
                        return (
                          <SendMessage
                            user={authenticatedUser}
                            message={message}
                          />
                        );
                      } else {
                        return (
                          <ReceivedMessage
                            user={selectedFriend}
                            message={message}
                          />
                        );
                      }
                    })}
                  </section>
                  <footer className="absolute bottom-5 left-10 right-10 flex items-center ">
                    <InputEmojiWithRef
                      inputClass="my-1"
                      borderRadius={10}
                      value={message}
                      onChange={setMessage}
                      keepOpened={true}
                      onKeyDown={handleEnterClick}
                      cleanOnEnter
                      placeholder="Type a message"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-gray-700 text-gray-100 font-semibold border border-gray-900 py-3 ml-1 px-5"
                    >
                      Send
                    </button>
                  </footer>
                </main>
              )}
              {!chatWith && (
                <main className="w-full h-full flex pt-44 justify-center m-auto font-bold text-lg text-gray-400 bg-gray-50 text-center shadow-md">
                  <div>
                    <Image
                      src={"/avatars/" + authenticatedUser?.avatar}
                      width={120}
                      height={120}
                      className="m-auto max-w-[120px] max-h-[120px] rounded-full shadow-sm"
                    />
                    <div className="mt-2">
                      <p>
                        WELCOME BACK
                        <span className=" uppercase text-gray-500 ml-1">
                          {authenticatedUser?.name}
                        </span>
                      </p>
                      <p>SELECT A FRIEND AND START YOUR CONVERSATION.</p>
                    </div>
                  </div>
                </main>
              )}
            </div>
            {/* audio for receive */}
            <audio
              controls
              src={`/sounds/receive_sound.mp3`}
              hidden
              ref={receiveRef}
            >
              Your browser does not support the
              <code>audio</code> element.
            </audio>
            {/* audio for sending */}
            <audio controls src={`/sounds/sent_sound.mp3`} hidden ref={sendRef}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          </div>
        </AnimationWrapper>
      )}
    </>
  );
};

export default page;
///////////

