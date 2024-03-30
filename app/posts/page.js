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
import trend from "../../public/images/trend.png"

const page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("/api/post")
      .then((res) => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AnimationWrapper>
      <main className="w-[80%] m-auto">
        <div className=" flex justify-center">
          <div className="flex flex-col gap-3 items-start">
            <FilterBar />
            <div className="flex items-start gap-7 justify-center">
              <section className="flex flex-col gap-10 w-[820px]">
                {loading && <LoadingPage />}
                {!loading &&
                  data.map((post) => {
                    return <Post post={post} />;
                  })}
              </section>
              <div className="flex flex-col items-start gap-3">
                <section className="w-[350px] min-h-[200px] py-4 px-6 rounded-lg">
                  <h1 className="text-xl font-semibold mb-3">Select Your Interest:</h1>
                  <ul className="flex gap-2 flex-wrap">
                    <Tag tag="java" />
                    <Tag tag="mysql" />
                    <Tag tag="php" />
                    <Tag tag="laravel" />
                    <Tag tag="react" />
                    <Tag tag="express js" />
                    <Tag tag="c++" />
                  </ul>
                </section>
                <section className="w-[350px] min-h-[200px] bg-gray-100 py-4 px-6 rounded-lg">
                  <h1 className="text-xl font-semibold">Trends <Image src={trend} className="inline"/></h1>
                </section>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AnimationWrapper>
  );
};

export default page;
