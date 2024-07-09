"use client";
import React from "react";
import Post from "../components/post";
import Tag from "../components/tag";
import FilterBar from "../components/FilterBar";
import AnimationWrapper from "../AnimationWrapper";
import axios from "axios";
import { useEffect, useState } from "react";
import LoadingPage from "../components/loading";
import Image from "next/image";
import arrow from "../../public/images/left-arrow.png";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Trend from "../components/Trend";


const Page = () => {
  const [data, setData] = useState([]);
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const [totalPages, setTotalPages] = useState("");

  let next = page >= totalPages ? false : true;
  let prev = page <= 1 ? false : true;

  const theme = searchParams.get("theme") || "";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/api/post?page=${page}&search=search&theme=${theme}`)
      .then((res) => {
        setData(res.data.data);
        setTotalPages(res.data.totalPages);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page, theme]);

  return (
    <AnimationWrapper>
      <main className="w-[90%] m-auto">
        <div className=" flex justify-center">
          <div className="flex flex-col gap-3 items-start">
            <FilterBar trends={trends} setData={setData}/>
            <div className="flex items-start gap-7 justify-center">
              <section className="flex flex-col gap-10 min-h-[450px] max-w-[850px]">
                {loading && <div className="w-[850px] relative"><LoadingPage /></div>}
                {!loading &&
                  data.map((post) => {
                    return <Post key={post._id} post={post} />;
                  })}
                {!loading && data.length === 0 && (
                  <p className="w-full bg-gray-300 text-gray-700 text-center py-2 my-5 rounded-md font-semibold">
                    no post about <span className="text-gray-500">{theme}</span>{" "}
                    yet.
                  </p>
                )}
                <div className="mb-4 flex items-center gap-1 justify-end">
                  {!loading && prev && (
                    <Link
                      href={`/posts?page=${+page - 1}`}
                      className={`px-2 rounded-l-sm h-[35px] text-sm border-2 border-gray-500 flex items-center justify-center gap-1 hover:bg-gray-500 hover:text-gray-200 hover:border-2 hover:border-gray-500 font-semibold transition cursor-pointer`}
                    >
                      <Image src={arrow} className="w-[16px]" />
                      <p>prev</p>
                    </Link>
                  )}
                  {!loading && <p className="w-[35px] h-[35px] text-sm border-2 border-gray-500 flex items-center justify-center">
                    {page}
                  </p>}
                  {!loading && next && (
                    <Link
                      href={`/posts?page=${+page + 1}`}
                      className={`px-2 rounded-r-sm h-[35px] text-sm border-2 border-gray-500 flex items-center justify-center gap-1 hover:bg-gray-500 hover:text-gray-200 hover:border-2 hover:border-gray-500 font-semibold transition cursor-pointer`}
                    >
                      <p>next</p>
                      <Image src={arrow} className="w-[16px] rotate-180" />
                    </Link>
                  )}
                </div>
              </section>
              <div className="flex flex-col items-start gap-3 max-[1300px]:hidden sticky top-5">
                <section className="w-[350px] min-h-[200px] py-4 px-6 rounded-lg">
                  <h1 className="text-xl font-semibold mb-3">
                    Select Your Interest:
                  </h1>
                  <div className="flex gap-2 flex-wrap">
                    <Tag tag="java" />
                    <Tag tag="mysql" />
                    <Tag tag="php" />
                    <Tag tag="laravel" />
                    <Tag tag="react" />
                    <Tag tag="python" />
                    <Tag tag="c++" />
                  </div>
                </section>
                <Trend trends={trends} setTrends={setTrends}/>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AnimationWrapper>
  );
};

export default Page;
