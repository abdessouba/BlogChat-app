"use client";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import image from "../../public/images/image.png";
import Image from "next/image";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUserName] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const router = useRouter();
  const imageRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bio = ""
    axios
      .post("api/register", { name, username, email, bio, password, avatar: uploadedImage })
      .then((res) => {
        if (res.data.ok) {
          toast.success("user created");
          router.push("/");
        }
      })
      .catch((err) => {
        console.log(err)
        toast.error("error creating user try again.")
      });
  };

  const handleImageClick = () => {
    imageRef.current.click();
  };
  const handleImageUpload = () => {
    const file = imageRef.current.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setUploadedImage(dataURL);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
      <input
        type="file"
        accept="image/*"
        hidden
        ref={imageRef}
        onChange={handleImageUpload}
      />
      <div className="flex items-center gap-5 w-full">
          <div
            className="relative group flex items-center justify-center cursor-pointer"
            onClick={handleImageClick}
          >
            <Image
            alt=""
              src={uploadedImage || image}
              width={130}
              height={140}
              className="rounded-md"
            />
            <p className="absolute text-nowrap top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:block hidden bg-white/70 py-2 px-4 text-sm font-semibold rounded-full">
              change image.
            </p>
          </div>
        <div>
          <div className="w-full">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600 "
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[250px] p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Jhon"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-600 "
            >
              Username
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-[250px] p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Smith"
              required
            />
          </div>
        </div>
      </div>
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-600 "
        >
          Your email
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-600 "
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-600 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full text-gray-700 border-2 border-gray-500 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Sign up
      </button>
      <p className="text-sm font-light text-gray-700 dark:text-gray-400">
        Don’t have an account yet?{" "}
        <Link
          href="/login"
          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
};

export default Form;
