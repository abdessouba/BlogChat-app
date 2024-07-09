import axios from "axios";
import React, { useEffect, useState } from "react";
import trend from "../../public/images/trend.png";
import Image from "next/image";
import Link from "next/link";

const Trend = ({trends, setTrends}) => {
  
  useEffect(() => {
    axios
      .get("/api/trends")
      .then((res) => {
        setTrends(res.data.data);
      })
      .catch((err) => {
        console.log("eroor");
      });
  }, []);
  return (
    <section className="w-[350px] min-h-[200px] bg-gray-100 py-4 px-6 ml-2 rounded-lg">
      <h1 className="text-xl font-semibold">
        Trends <Image alt="" src={trend} className="inline" />
      </h1>
      <div className="mt-5 flex flex-col gap-4">
        {trends.map((t, i) => {
          return (
            <div className="flex flex-col">
              <p className="text-lg font-semibold first-letter:uppercase">
                <span>{i + 1}- </span>
                <Link href={`/getPost/${t._id}`} className="hover:text-slate-500 transition-all duration-150 cursor-pointer capitalize">{t.title} .</Link>
                <Link href={`/users/${t.userId.username}`} className="ml-1 text-sm text-gray-600 underline">
                  @{t.userId.username}
                </Link>
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Trend;
