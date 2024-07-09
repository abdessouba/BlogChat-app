"use client";
import React, { useEffect, useState } from "react";
import search_img from "../../public/images/search.png";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const handleSearchInput = (e) => {
    axios
      .get(`/api/search?s=${e.target.value}`)
      .then((res) => {
        if (res.data.filterBy == "users") {
          setUsers(res.data.data);
          setPosts([]);
        } else {
          setPosts(res.data.data);
          setUsers([]); // to avoid mapping on both user and post
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="relative group w-[250px] max-[580px]:w-[50px]">
      <div className="relative group">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleSearchInput(e)}
          className="border-2 rounded-full py-2 px-4 w-full min-[750px]:focus:w-[350px] transition-all duration-200 max-[580px]:placeholder:text-white max-[580px]:focus:absolute max-[580px]:focus:w-[200px] max-[580px]:focus:-top-6 z-30 max-[580px]:focus:text-black max-[580px]:text-white"
        />
        <Image
          src={search_img}
          className=" group-focus-within:hidden absolute right-3 top-1/2 -translate-y-1/2 w-[24px] pointer-events-none"
          alt="search"
        />
      </div>
      {users.length !== 0 && (
         <div className="group-focus-within:flex absolute sm-[580px]:w-[350px] top-12 hidden flex-col gap-2 items-start mt-1  max-h-[250px] overflow-x-hidden overflow-y-auto bg-gray-100 rounded-md shadow-md p-2 z-30 max-[450px]:-left-20 max-[450px]:-right-[200px] max-[580px]:top-7">
          {users.map((rst) => {
            return (
              <a href={`/users/${rst.username}`} className="flex gap-2 w-full hover:bg-gray-200 transition-all duration-150 cursor-pointer p-2 rounded-md">
                <Image
                  src={`/avatars/${rst.avatar}`}
                  width={45}
                  height={45}
                  className="w-[45px] h-[45px] rounded-full "
                />
                <div>
                  <p className=" pointer-events-none max-w-[260px] truncate">@{rst.username} . <span className="text-sm text-gray-600">{rst.createdAt.slice(0, rst.createdAt.indexOf("T"))}</span></p>
                  <p className="text-sm max-w-[250px] truncate pointer-events-none">
                    {rst.bio}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}
      {posts.length !== 0 && (
        <div className="group-focus-within:flex absolute top-12 hidden flex-col gap-2 items-start mt-1  max-h-[250px] overflow-x-hidden overflow-y-auto bg-gray-100 rounded-md shadow-md p-2 z-30 max-[450px]:-left-20 max-[450px]:-right-[200px] max-[580px]:top-7">
          {posts.map((rst) => {
            return (
              <a href={`/getPost/${rst._id}`} className="flex flex-col gap-1 py-2 px-3 cursor-pointer">
                <h1 className="text-lg font-semibold first-letter:uppercase max-w-[300px] truncate pointer-events-none">
                  {rst.title}
                </h1>
                <p className="text-sm max-w-[300px] truncate pointer-events-none">
                  {rst.description}
                </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
