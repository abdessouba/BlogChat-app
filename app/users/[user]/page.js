"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import github from "../../../public/images/github2.png";
import website from "../../../public/images/global.png";
import Link from "next/link";
import send from "../../../public/images/send.png";
import { useSession } from "next-auth/react";
import AnimationWrapper from "@/app/AnimationWrapper";

const page = ({ params }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const colors = ["orange", "slate", "gray", "red", "yellow", "black", "pink"]
  useEffect(() => {
    // console.log('#'+Math.floor(Math.random()*16777215).toString(16))
    axios
      .get(`/api/users/${params.user}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  // const dateString = post?.createdAt
  // const dateObject = new Date(dateString);
  const publishedOn = "2020-22-01";
  // const publishedOn = dateObject.toISOString().split("T")[0];
  return (
    <div className="relative w-[60%] m-auto flex items-start justify-center">
      {user && (
        <>
          <section className="w-full">
            <h1 className="text-4xl italic font-semibold border-b-4 border-gray-100 py-3 px-2">
              Published Posts:
            </h1>
            <AnimationWrapper>
              <div className="h-[600px] py-6 flex flex-col gap-10 px-2">
                {user.posts.map((post) => {
                  return (
                    <a href={`getPost/${post?._id}`} className="border-l-4 pl-4 hover:border-gray-500 transition duration-150">
                      <div className="flex justify-between w-[800px] transition-all duration-200">
                        <section>
                          <div>
                            <h1 className={`first-letter:uppercase font-bold text-4xl mb-2`}>
                              {post?.title}
                            </h1>
                            <p className="max-h-[50px] max-w-[500px] overflow-y-hidden my-2">
                              {post?.description}
                            </p>
                            <div className="text-sm mt-2 flex items-center gap-1">
                              <p>{publishedOn}</p>
                              <span className="font-bold">.</span>
                              <p className="flex items-center gap-1">
                                {post?.themes.map((theme) => (
                                  <span className="bg-gray-100 py-1 px-2 rounded-full">
                                    {theme}
                                  </span>
                                ))}
                              </p>
                            </div>
                          </div>
                        </section>
                        <section>
                          <Image
                            src={`/storage/${post?.image}`}
                            width={250}
                            height={250}
                          />
                        </section>
                      </div>
                    </a>
                  );
                })}
              </div>
            </AnimationWrapper>
          </section>
          <section className="w-[350px] border-l-4 border-gray-100 flex flex-col gap-2 pl-8 py-2">
            <Image
              src={`/avatars/${user.avatar}`}
              width={120}
              height={120}
              className="rounded-full w-[120px] h-[120px] "
            />
            <p className="text-2xl font-semibold">@{user.username}</p>
            <p className=" first-letter:uppercase text-lg">{user.name}</p>
            <p className="text-md text-gray-500">{user.email}</p>
            <div className="flex gap-2">
              <p className="text-sm text-gray-500">{user.posts.length} Posts</p>
              <p className=" font-semibold"> - </p>
              <p className="text-sm text-gray-500">
                {user.posts.reduce((total, post) => total + +post.views, 0)}{" "}
                Reads
              </p>
            </div>
            {session && session.user.email === user.email && (
              <Link
                href="/profile/edit"
                className="text-center bg-gray-700 text-gray-300 py-3 px-4 rounded"
              >
                Edit Profile
              </Link>
            )}
            <div className="bg-gray-100 text-sm p-2 rounded-md">
              {user.bio || (
                <p className="text-gray-400 text-center">empty bio.</p>
              )}
            </div>
            <p className="font-semibold text-md">Active in:</p>
            <div className="flex items-center gap-2 ">
              {user.github && (
                <a href={`${user.github || ""}`} target="_blank">
                  <Image src={github} className="w-[24px] cursor-pointer" />
                </a>
              )}
              {user.website && (
                <a href={`${user.website || ""}`} target="_blank">
                  <Image src={website} className="w-[24px] cursor-pointer" />
                </a>
              )}
            </div>
            <p className="mt-3 text-md text-gray-500">
              Joined on {user.createdAt.slice(0, user.createdAt.indexOf("T"))}
            </p>
            <div onClick={()=>setShowContact(true)} className="mt-2 flex items-center gap-2 bg-gray-200 w-fit rounded-full py-3 px-4  active:scale-95 transition duration-150 cursor-pointer">
              <Image src={send} width={20} className="w-[20px]" />
              <p className="font-semibold cursor-pointer">Contact</p>
            </div>
            { showContact && (
                <div className="absolute left-1/2 -translate-x-1/2 w-[400px] bg-gray-100 shadow-md px-4 py-6 rounded-md flex flex-col justify-center">
                <input type="text" value={session.user.name} className=" first-letter:uppercase w-full py-3 px-4" readOnly/>
                <label className="mt-3 mb-1">Your Message:</label>
                <textarea className="w-full min-h-[200px] shadow-inner p-3">Hello, </textarea>
                  <button className="bg-black text-semibold text-lg w-full py-2 mt-3 text-white">
                    Send
                  </button>
                </div>
              )}
          </section>
        </>
      )}
    </div>
  );
};

export default page;
