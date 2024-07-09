"use client"
import React from "react";
import Image from "next/image";
import filter from "../../public/images/filter.png";
import trending from "../../public/images/trending.png";
import web from "../../public/images/web.png";
import invert from "../../public/images/invert.png";
import { useRouter } from 'next/navigation';

const FilterBar = ({setData, trends}) => {
  const router = useRouter()

  const handleChange = (e) => {
    const value = e.target.value
    router.push('/posts?theme='+value);
  };

  return (
    <div className="flex max-[500px]:flex-col max-[500px]:gap-0 gap-5 items-start justify-start mb-4">
      <div className="text-2xl font-semibold mb-4 flex gap-1 items-center">
        <Image alt="image" src={filter} className="w-[30px]" />
        <h1 className="text-4xl font-bold max-[880px]:text-3xl">
          Filter By:
        </h1>
      </div>
      <div className="min-[1301px]:hidden flex items-center gap-2">
        <button onClick={()=>setData(trends)}  className="flex items-center gap-1 bg-gray-100 py-2 px-3 rounded-md shadow-sm shadow-gray-200 hover:bg-gray-800 hover:text-gray-100 transition-all duration-200 cursor-pointer">
          <Image src={trending} width={20} />
          <span className="font-semibold text-xl">Trending</span>
        </button>
        <div className="relative group">
          <select onChange={handleChange} className="w-[136px] h-[44px] pl-8 bg-gray-100 px-3 font-semibold rounded-md shadow-sm shadow-gray-200 hover:bg-gray-800 hover:text-gray-100 transition-all duration-200 cursor-pointer hover:font-bold">
            <option value={""}>language</option>
            <option>java</option>
            <option>php</option>
            <option>react</option>
            <option>python</option>
          </select>
          <Image src={web} className="left-1 top-2 absolute pointer-events-none group-hover:opacity-0 opacity-100 "/>
          <Image src={invert} className="left-1 top-2 absolute pointer-events-none group-hover:opacity-100 opacity-0"/>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
