import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import github from "../../../public/images/github2.png";
import website from "../../../public/images/global.png";
import share from "../../../public/images/share2.png";
import logout from "../../../public/images/logout2.png";
import home from "../../../public/images/home2.png";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Loading from "@/app/loading";

const Profile = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);
  useEffect(() => {
    axios.get("/api/authUser").then((res) => {
      setLoading(false);
      const user = res.data.authUser;
      setUser(user);
      let totalViews = user.posts.reduce(
        (total, post) => total + +post.views,
        0
      );
      setViews(totalViews);
    });
  }, []);

  return (
    <div className="mx-10 flex items-center justify-center max-[1020px]:justify-start max-[1020px]:mx-5 max-[560px]:mx-0 max-[560px]:mt-5 w-full m-auto max-[890px]:gap-5 gap-10 rounded-md mt-10">
      {loading && <Loading className="m-auto text-center w-[700px] max-lx:w-[400px] max-sm:w-[300px]"/>}
      {!loading && (
        <>
        {/* w-[600px] h-[500px] */}
          <div className="w-auto h-auto p-20 max-[712px]:p-14 max-[545px]:p-10 bg-gray-50 shadow-lg flex flex-col items-center justify-center">
            <Image
              alt=""
              src={`/avatars/${user.avatar}`}
              width={128}
              height={128}
              className="rounded-full w-[128px] h-[128px] shadow-sm"
            />
            <h1 className="font-bold text-2xl first-letter:uppercase">
              {user.name}
            </h1>
            <h2 className=" text-gray-600 text-sm">@{user.username}</h2>
            <p className="w-[400px] max-[672px]:w-[200px] font-light text-center my-2">{user.bio}.</p>
            <section className="flex gap-10 max-[522px]:gap-5 items-center justify-center mt-5 mb-7">
              <div
                href="/profile/manage"
                className="flex flex-col items-center"
              >
                <h1 className="text-5xl max-[672px]:text-3xl max-[672px]:font-bold font-semibold">
                  {user.posts?.length || 0}
                </h1>
                <p className="text-gray-400">Articles</p>
              </div>
              <div className="flex flex-col items-center px-12 max-[672px]:px-6 max-[522px]:px-3 border-r-[3px] border-l-[3px] border-gray-500">
                <h1 className="text-5xl max-[672px]:text-3xl max-[672px]:font-bold font-semibold">
                  {user.followers?.length || 0}
                </h1>
                <p className="text-gray-400">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-5xl max-[672px]:text-3xl max-[672px]:font-bold font-semibold">{views}</h1>
                <p className="text-gray-400">Views</p>
              </div>
            </section>
            <section className="min-[811px]:hidden flex items-center gap-10">
              <a href={`${user.github || ""}`} target="_blank">
                <Image
                  alt=""
                  src={github}
                  className="w-[30px] cursor-pointer"
                />
              </a>
              <a href={`${user.website || ""}`} target="_blank">
                <Image
                  alt=""
                  src={website}
                  className="w-[30px] cursor-pointer"
                />
              </a>
              <Image alt="" src={share} className="w-[30px] cursor-pointer" />
            </section>
          </div>
          <div className="flex flex-col items-center justify-between py-6 px-4 h-[500px] bg-gray-50 shadow-lg rounded-xl max-[810px]:hidden">
            <Link href="/posts">
              <Image alt="" src={home} className="w-[30px] cursor-pointer" />
            </Link>
            <div className="flex flex-col gap-10">
              <a href={`${user.github || ""}`} target="_blank">
                <Image
                  alt=""
                  src={github}
                  className="w-[30px] cursor-pointer"
                />
              </a>
              <a href={`${user.website || ""}`} target="_blank">
                <Image
                  alt=""
                  src={website}
                  className="w-[30px] cursor-pointer"
                />
              </a>
              <Image alt="" src={share} className="w-[30px] cursor-pointer" />
            </div>
            <Image
              alt=""
              onClick={signOut}
              src={logout}
              className="w-[30px] cursor-pointer ml-1"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
