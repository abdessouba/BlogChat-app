"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import github from "../../../public/images/github2.png";
import website from "../../../public/images/global.png";
import Link from "next/link";
import send from "../../../public/images/send.png";
import remove from "../../../public/images/remove.png";
import { useSession } from "next-auth/react";
import AnimationWrapper from "@/app/AnimationWrapper";

const Page = ({ params }) => {
  const { data: session, status } = useSession();
  const [user, setUser] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(true);

  useEffect(() => {
    if(!loading && window){
      const handleResize = () => {
        if(window.innerWidth < 768){
          setShowProfile(false);
        }
        if(window.innerWidth > 768){
          setShowProfile(true);
        }
      };
      handleResize()
      // Add event listener for window resize
      window.addEventListener('resize', handleResize);
  
      // Remove event listener when component unmounts
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [loading]);
  useEffect(() => {
    // console.log('#'+Math.floor(Math.random()*16777215).toString(16))
    axios
      .get(`/api/users/${params.user}`)
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.user]);

  
  return (
    <>
      {loading && (
        <div className="w-full text-center">
          <div role="status" className="text-center">
            <svg
              aria-hidden="true"
              class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {!loading && (
        <div className="relative w-[60%] max-[1400px]:w-[75%] max-[1740px]:w-[70%] max-md:w-[95%] max-lg:w-[90%] m-auto flex items-start justify-center">
          {user && (
            <>
              <section className="w-full relative">
                <h1 className="text-5xl max-2xl:text-4xl italic font-semibold border-b-4 border-gray-200 py-3 px-2">
                  User Posts:
                </h1>
                <AnimationWrapper>
                  <div className="h-[600px] py-6 flex flex-col gap-10 px-2">
                    {user.posts.map((post) => {
                      const publishedOn = post.createdAt.slice(0, post.createdAt.indexOf('T'))
                      return (
                        <a
                          key={post?._id}
                          href={`/getPost/${post._id}`}
                          className="border-l-4 pl-4 hover:border-gray-500 transition duration-150"
                        >
                          <div className="flex justify-between gap-3 max-[1150px]:flex-col transition-all duration-200">
                            <section>
                              <div>
                                <h1
                                  className={`first-letter:uppercase font-bold text-3xl mb-2`}
                                >
                                  {post.title}
                                </h1>
                                <p className="max-h-[50px] max-w-[500px] overflow-y-hidden my-2">
                                  {post.description}
                                </p>
                                <div className="text-sm mt-2 flex items-center gap-1">
                                  <p>{publishedOn}</p>
                                  <span className="font-bold">.</span>
                                  <p className="flex items-center gap-1">
                                    {post.themes.map((theme) => (
                                      <span
                                        key={theme}
                                        className="bg-gray-100 py-1 px-2 rounded-full"
                                      >
                                        {theme}
                                      </span>
                                    ))}
                                  </p>
                                </div>
                              </div>
                            </section>
                            <section>
                              <Image
                                alt=""
                                src={`/storage/${post.image}`}
                                width={250}
                                height={250}
                                layout="responsive"
                                className="min-[1150px]:max-w-[250px] min-w-[250px] max-w-[550px]"
                              />
                            </section>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </AnimationWrapper>
              </section>
              {/* avatar */}
              <div className="absolute right-0 top-3 md:hidden cursor-pointer" onClick={()=>setShowProfile(true)}>
                <Image
                  alt=""
                  src={`/avatars/${user.avatar}`}
                  width={46}
                  height={46}
                  className="rounded-full w-[46px] h-[46px] "
                />
              </div>
              {showProfile && (
                <section className="relative w-[350px] border-l-4 border-gray-200 flex flex-col gap-2 p-8 py-2 max-md: max-md:absolute max-md:w-[350px] max-[400px]:left-0 max-[400px]:w-full max-md:bg-gray-100 max-md:right-0 max-md:border-none max-md:items-center max-md:py-7 max-md:shadow-lg max-md:rounded-xl max-md:">
                {/* to hide the user info in medium screen size */}
                <div className="font-semibold text-2xl md:hidden absolute z-20 right-4 top-3 cursor-pointer" onClick={()=>setShowProfile(false)}>
                  <Image src={remove} className=" active:scale-95 transition"/>
                </div>
                <Image
                  alt=""
                  src={`/avatars/${user.avatar}`}
                  width={120}
                  height={120}
                  className="rounded-full w-[120px] h-[120px] "
                />
                <p className="text-2xl font-semibold">@{user.username}</p>
                <p className=" first-letter:uppercase text-lg">{user.name}</p>
                <p className="text-md text-gray-500">{user.email}</p>
                <div className="flex gap-2">
                  <p className="text-sm text-gray-500">
                    {user.posts.length} Posts
                  </p>
                  <p className=" font-semibold"> - </p>
                  <p className="text-sm text-gray-500">
                    {user.posts.reduce((total, post) => total + +post.views, 0)}{" "}
                    Reads
                  </p>
                </div>
                {session && session.user._id === user._id && (
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
                {user?.github && user?.website && (
                  <>
                    <p className="font-semibold text-md">Active in:</p>
                    <div className="flex items-center gap-2 ">
                      {user.github && (
                        <a href={`${user.github || ""}`} target="_blank">
                          <Image
                            alt=""
                            src={github}
                            className="w-[24px] cursor-pointer"
                          />
                        </a>
                      )}
                      {user.website && (
                        <a href={`${user.website || ""}`} target="_blank">
                          <Image
                            alt=""
                            src={website}
                            className="w-[24px] cursor-pointer"
                          />
                        </a>
                      )}
                    </div>
                  </>
                )}
                <p className="mt-3 text-md text-gray-500">
                  Joined on {user.createdAt.slice(0, user.createdAt.indexOf("T"))}
                </p>
                {session && session.user._id !== user._id && (
                  <Link
                    href={{ pathname: "/chat", query: { id: user._id } }}
                    className="mt-2 flex items-center gap-2 bg-gray-200 w-fit rounded-full py-3 px-4  active:scale-95 transition duration-150 cursor-pointer"
                  >
                    <Image alt="" src={send} width={20} className="w-[20px]" />
                    <p className="font-semibold cursor-pointer">Contact</p>
                  </Link>
                )}
                {showContact && (
                  <div className="absolute left-1/2 -translate-x-1/2 w-[400px] bg-gray-100 shadow-md px-4 py-6 rounded-md flex flex-col justify-center">
                    <input
                      type="text"
                      value={session.user.name}
                      className=" first-letter:uppercase w-full py-3 px-4"
                      readOnly
                    />
                    <label className="mt-3 mb-1">Your Message:</label>
                    <textarea className="w-full min-h-[200px] shadow-inner p-3">
                      Hello,{" "}
                    </textarea>
                    <button className="bg-black text-semibold text-lg w-full py-2 mt-3 text-white">
                      Send
                    </button>
                  </div>
                )}
              </section>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
