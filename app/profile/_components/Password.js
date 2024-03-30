import React, { useState } from "react";
import settings from "../../../public/images/settings.png";
import alert from "../../../public/images/alert.png";
import invisible from "../../../public/images/invisible.png";
import visible from "../../../public/images/visible.png";
import Image from "next/image";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const Password = () => {
  const [visability, setVisability] = useState({
    currPass: false,
    newPass: false,
    confPass: false,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const data = {
      currPass: e.target.currPass.value,
      newPass: e.target.newPass.value,
      confPass: e.target.confPass.value,
    };
    axios
      .post("/api/updatePass", { data: data })
      .then((res) => {
        if (res.data.ok) {
          toast.success("password updated.");
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <form className="mt-10 m-auto" onSubmit={handleFormSubmit}>
      <Toaster />
      <div className="flex gap-1 items-center mb-5">
        <Image alt="" src={settings} width={40} />
        <h1 className="text-4xl font-bold">Change Password</h1>
      </div>
      <div className="relative flex flex-col gap-1">
        <label className="font-semibold">Current password:</label>
        <input
          type={visability.currPass ? "text" : "password"}
          className="border-2 border-gray-100 rounded-md py-3 px-4 w-[400px] mb-2"
          name="currPass"
        />
        {!visability.currPass && (
          <Image
            alt=""
            src={invisible}
            onClick={() => {
              setVisability((prev) => {
                return { ...prev, currPass: true };
              });
            }}
            className="absolute right-2 top-9 p-1 hover:bg-gray-100 rounded-full cursor-pointer transition"
          />
        )}
        {visability.currPass && (
          <Image
            alt=""
            src={visible}
            onClick={() => {
              setVisability((prev) => {
                return { ...prev, currPass: false };
              });
            }}
            className="absolute right-2 top-9 p-1 hover:bg-gray-100 rounded-full cursor-pointer transition"
          />
        )}
      </div>
      <div className="relative flex flex-col gap-1">
        <label className="font-semibold">New password:</label>
        <input
          type={visability.newPass ? "text" : "password"}
          className="border-2 border-gray-100 rounded-md py-3 px-4 w-[400px] mb-2"
          name="newPass"
        />
        {!visability.newPass && (
          <Image
            alt=""
            src={invisible}
            onClick={() => {
              setVisability((prev) => {
                return { ...prev, newPass: true };
              });
            }}
            className="absolute right-2 top-9 p-1 hover:bg-gray-100 rounded-full cursor-pointer transition"
          />
        )}
        {visability.newPass && (
          <Image
            alt=""
            src={visible}
            onClick={() => {
              setVisability((prev) => {
                return { ...prev, newPass: false };
              });
            }}
            className="absolute right-2 top-9 p-1 hover:bg-gray-100 rounded-full cursor-pointer transition"
          />
        )}
      </div>
      <div className="relative flex flex-col gap-1">
        <label className="font-semibold">Confirm password:</label>
        <input
          type={visability.confPass ? "text" : "password"}
          className="border-2 border-gray-100 rounded-md py-3 px-4 w-[400px] mb-2"
          name="confPass"
        />
        {!visability.confPass && (
          <Image
            alt=""
            src={invisible}
            onClick={() => {
              setVisability((prev) => {
                return { ...prev, confPass: true };
              });
            }}
            className="absolute right-2 top-9 p-1 hover:bg-gray-100 rounded-full cursor-pointer transition"
          />
        )}
        {visability.confPass && (
          <Image
            alt=""
            src={visible}
            onClick={() => {
              setVisability((prev) => {
                return { ...prev, confPass: false };
              });
            }}
            className="absolute right-2 top-9 p-1 hover:bg-gray-100 rounded-full cursor-pointer transition"
          />
        )}
      </div>
      <button className=" mt-2 bg-gray-800 text-white w-[400px] py-3 px-4 rounded-md cursor-pointer hover:bg-gray-900 transition">
        Confirm
      </button>
    </form>
  );
};

export default Password;
