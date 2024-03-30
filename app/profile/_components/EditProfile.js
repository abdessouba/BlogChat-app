"use client";
import { useEffect, useRef, useState } from "react";
import caution from "../../../public/images/caution.png";
import userIcon from "../../../public/images/user-icon-input.png";
import arroba from "../../../public/images/arroba.png";
import mail from "../../../public/images/mail.png";
import github_img from "../../../public/images/github.png";
import link_img from "../../../public/images/link.png";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";

const EditProfile = () => {
  const imageRef = useRef("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [github, setGithub] = useState("");
  const [number, setNumber] = useState(300);
  const [authUser, setAuthUser] = useState(300);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/authUser").then((res) => {
      const user = res.data.authUser;
      if (user) {
        setLoading(false);
      }
      setAuthUser(user);
      setName(user.name);
      setEmail(user.email);
      setUsername(user.username);
      setBio(user.bio);
      setWebsite(user.website);
      setGithub(user.github);
    });
  }, []);

  const inputTrigger = () => {
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

  const handleTextArea = (value) => {
    const maxNumber = 300;
    setNumber((prev) => {
      if (prev >= 300) return;
      return maxNumber - value.length;
    });
    setBio((prev) => {
      if (prev.length >= 300) {
        return prev;
      }
      return value;
    });
  };

  const handleFormSubmit = () => {
    const avatar = uploadedImage;
    axios
      .post("/api/update", {
        name,
        username,
        email,
        bio,
        website,
        github,
        avatar,
      })
      .then((res) => {
        if (res.data.ok) {
          toast.success(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {loading && <div>loading...</div>}
      {!loading && (
        <>
          <section className="m-auto">
            {/* <h1 className="text-lg">Editing Profile:</h1> */}
            <div
              onClick={inputTrigger}
              className="group relative w-fit rounded-full"
            >
              <Image
                alt=""
                src={
                  uploadedImage ? uploadedImage : `/avatars/${authUser?.avatar}`
                }
                width={156}
                height={156}
                className="rounded-full my-3 hover:opacity-55 ease-in-out duration-200 cursor-pointer"
              />
              <p className="text-sm font-semibold text-nowrap absolute text-gray-800 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:block hidden transition delay-200 pointer-events-none">
                change image
              </p>
            </div>
            <button
              onClick={inputTrigger}
              className="w-full py-3 px-10 bg-gray-100 rounded-full hover:bg-gray-200 transition cursor-pointer"
            >
              Upload
            </button>
            <p className="text-[12px] text-gray-400 max-w-[150px] mt-1 m-auto text-center">
              <Image alt="" src={caution} className="inline" /> changing the
              image <span className="ml-4">requires re-login.</span>
            </p>
            <input
              type="file"
              onChange={handleImageUpload}
              hidden
              ref={imageRef}
            />
          </section>
          <section className="text-lg flex flex-col gap-5">
            <div className="flex items-center gap-5 justify-center">
              <div className="relative">
                <input
                  type="text"
                  className="w-[300px] rounded-md bg-gray-100 py-4 px-8"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Image
                  alt=""
                  src={userIcon}
                  width={16}
                  height={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  className="w-[300px] rounded-md bg-gray-100 py-4 px-8"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Image
                  alt=""
                  src={mail}
                  width={16}
                  height={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                />
              </div>
            </div>
            <div className="relative">
              <p className="text-sm mb-2">
                username will be used for search and shown in your posts.
              </p>
              <input
                type="text"
                className="w-full rounded-md bg-gray-100 py-4 px-8"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Image
                alt=""
                src={arroba}
                width={16}
                height={16}
                className="absolute left-3 top-[52px]"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Bio..."
                className="w-full h-[200px] rounded-md bg-gray-100 py-4 px-6"
                value={bio}
                onChange={(e) => handleTextArea(e.target.value)}
              ></textarea>
              <p className="text-sm">{number} Characters Left</p>
            </div>
            <div>
              <p className="text-lg mb-2">Social Media:</p>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    className="w-[300px] rounded-md bg-gray-100 py-3 px-8"
                    value={github || "http://"}
                    onChange={(e) => setGithub(e.target.value)}
                  />
                  <Image
                    alt=""
                    src={github_img}
                    width={16}
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    className="w-[300px] rounded-md bg-gray-100 py-3 px-9"
                    value={website || "http://"}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <Image
                    alt=""
                    src={link_img}
                    width={16}
                    height={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
            </div>
            <button
              onClick={handleFormSubmit}
              className="bg-gray-900 py-2 px-6 rounded-full text-gray-50 w-fit hover:bg-gray-800 transition cursor-pointer active:scale-95"
            >
              update
            </button>
          </section>
        </>
      )}
    </>
  );
};

export default EditProfile;
