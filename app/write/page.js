"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import initImage from "../../public/images/image.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const page = () => {
  const textareaRef = useRef(null);
  const inputTheme = useRef(null);
  const fileRef = useRef(null);
  const [initChars, setInitChars] = useState(300);
  const [theme, setTheme] = useState();
  const [title, setTitle] = useState("");
  const [textArea, setTextArea] = useState("");
  const [themes, setThemes] = useState([]);
  const [image, setImage] = useState(null);
  const [uploadedImage, setUploadedImage] = useState();

  const handleClick = () => {
    if (textareaRef.current) {
      textareaRef.current.select();
    }
  };
  const calcChars = () => {
    if (textareaRef.current) {
      if (initChars <= 0) {
        textareaRef.current.preventDefault();
      }
      setInitChars(300);
      const num = textareaRef.current.value.length;
      setInitChars((prev) => prev - num);
    }
  };
  const handleThemeInputVal = (e) => {
    setTheme(e.target.value);
  };
  const handleEnter = (event) => {
    if (event.keyCode === 13) {
      handleTheme();
    }
  };
  const handleTheme = () => {
    if (inputTheme.current.value == "") return;
    setThemes((prev) => [...prev, theme]);
    inputTheme.current.value = "";
  };
  const removeTheme = (index) => {
    setThemes((prev) => {
      return themes.filter((e, i) => i !== index);
    });
  };
  const handleUploadClick = () => {
    fileRef.current.click();
  };
  const handleUpload = () => {
    const file = fileRef.current.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setImage(`/storage/${res.data.image}`);
      })
      .catch((error) => {
        console.log(error.data.message);
      });
  };

  const handleImageUpload = () => {
    const file = fileRef.current.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;
      setUploadedImage(dataURL);
      const bufferImage = Buffer.from(dataURL, "base64");
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    // const imageName = image?.slice(image.lastIndexOf("/") + 1);
    const post = {
      title: title,
      image: uploadedImage,
      textArea: textArea,
      themes: themes,
    };
    axios.post("/api/post", post).then((res) => {
      if (res.data.ok) {
        toast.success("post created.");
        setImage("");
        setTextArea("");
        setTitle("");
        setThemes([]);
        setUploadedImage();
      }
    });

    handleUpload();
  };

  return (
    <div className="w-[80%] m-auto flex flex-col gap-5 items-center p-5 mb-10">
      <Toaster />
      {!uploadedImage && (
        <section className="flex flex-col gap-1 justify-center items-center border-4 border-gray-200 w-[800px] h-[500px] cursor-pointer hover:bg-gray-50 transition duration-150">
          <Image src={initImage} className="w-[20%]" />
          <p className="text-sm font-semibold text-gray-400">
            Upload your image here.
          </p>
          <button
            onClick={handleUploadClick}
            className="bg-blue-400 py-3 px-6 rounded-full text-white hover:bg-blue-500 transition mt-2"
          >
            upload
          </button>
        </section>
      )}
      <input
        type="file"
        name="image"
        accept="image/*"
        hidden
        ref={fileRef}
        onChange={handleImageUpload}
      />
      {uploadedImage && (
        <section className="group relative border-4 border-gray-100 p-[3px]">
          <Image src={uploadedImage} width={800} height={400} />
          <button
            onClick={handleUploadClick}
            className="group-hover:block hidden absolute bg-white/45 py-2 px-3 rounded-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-2xl text-white transition duration-150 cursor-pointer hover:bg-white/55 active:scale-90"
          >
            Change Image
          </button>
        </section>
      )}
      <section className="flex flex-col items-center justify-center gap-5">
        {/* Title */}
        <input
          type="text"
          placeholder="Title of Post..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[590px] border-b-4 border-gray-200 text-2xl py-2 outline-none focus:border-gray-400 capitalize"
        />
        <div className="w-full flex flex-col gap-3 mt-2 text-gray-500">
          <label className="font-semibold text-2xl italic">
            Short description about your article:
          </label>
          <textarea
            ref={textareaRef}
            onClick={handleClick}
            onChange={(e) => {
              calcChars(), setTextArea(e.target.value);
            }}
            value={textArea}
            className="bg-gray-50 w-full min-h-[200px] py-3 px-4 text-xl shadow-inner border-2 border-gray-300 outline-gray-500"
          ></textarea>
          <p className="text-gray-600 font-semibold text-sm ml-1">
            {initChars} left
          </p>
        </div>
      </section>
      <section className="w-[600px]">
        <h1 className="italic font-semibold text-2xl text-gray-500 mb-3">
          Themes
        </h1>
        <div className="relative bg-gray-200 p-5 w-full min-h-[120px]">
          <input
            type="text"
            className="w-full py-3 px-4 text-xl shadow rounded-md"
            placeholder="Java"
            onChange={(e) => handleThemeInputVal(e)}
            onKeyDown={handleEnter}
            ref={inputTheme}
          />
          <button
            onClick={handleTheme}
            className="bg-blue-300 py-2 px-4 text-white rounded-sm absolute right-7 top-[26px] shadow hover:bg-blue-500 transition"
          >
            Add
          </button>
          <ul className="flex gap-2 mt-4">
            {themes.map((theme, index) => {
              return (
                <li
                  className="relative bg-gray-50 p-2 w-fit rounded-lg"
                  id={index}
                >
                  <p>
                    {theme}
                    <button
                      onClick={() => removeTheme(index)}
                      className="absolute -top-3 -right-2 w-[20px] h-[20px] flex items-center justify-center bg-gray-200 font-bold rounded-full text-sm ml-1 align-text-top cursor-pointer"
                    >
                      x
                    </button>
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <input
        type="submit"
        value="Submit"
        onClick={handleSubmit}
        className="bg-gray-800 py-3 px-6 text-white rounded-md text-lg cursor-pointer active:scale-95 transition-all duration-300"
      />
    </div>
  );
};

export default page;
