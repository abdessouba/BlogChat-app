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
    <div className="flex items-center justify-center w-full m-auto gap-10 rounded-md mt-10">
      {loading && <div>Loading</div>}
      {!loading && (
        <>
          <div className="w-[600px] h-[500px] bg-gray-50 shadow-lg flex flex-col items-center justify-center">
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
            <p className="w-[400px] font-light text-center my-2">{user.bio}.</p>
            <section className="flex gap-10 items-center justify-center mt-5">
              <Link
                href="/profile/manage"
                className="flex flex-col items-center"
              >
                <h1 className="text-5xl font-semibold">
                  {user.posts?.length || 0}
                </h1>
                <p className="text-gray-400">Articles</p>
              </Link>
              <div className="flex flex-col items-center px-12 border-r-[3px] border-l-[3px] border-gray-500">
                <h1 className="text-5xl font-semibold">
                  {user.followers?.length || 0}
                </h1>
                <p className="text-gray-400">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <h1 className="text-5xl font-semibold">{views}</h1>
                <p className="text-gray-400">Views</p>
              </div>
            </section>
          </div>
          <div className="flex flex-col items-center justify-between py-6 px-4 h-[500px] bg-gray-50 shadow-lg rounded-xl">
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
