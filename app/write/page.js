"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import initImage from "../../public/images/uimage.png";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import _image from "../../public/images/_image.png";
import "react-quill/dist/quill.snow.css";
import JoditEditor from "jodit-react";
import config from "../dependencies/config";
import { useSearchParams } from "next/navigation";

const Page = () => {
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
  const [view, setView] = useState(false);

  // update
  const query = useSearchParams();
  const id = query.get("id");
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/api/post/${id}`)
      .then((res) => {
        const post = res.data.post;
        setContent(post.content);
        setThemes(post.themes);
        setUploadedImage(`/storage/${post.image}`);
        setTitle(post.title);
        setTextArea(post.description);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }, [id]);

  const handleUpdate = () => {
    axios
      .post("/api/updateUserPost", {
        postId: id,
        content,
        title,
        uploadedImage,
        textArea,
        themes,
      })
      .then((res) => {
        if (res.data.ok) {
          toast.success(res.data.message);
        }
        if (!res.data.ok) {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const editor = useRef(null);
  const [content, setContent] = useState("");

  // upload button
  const [show, setShow] = useState(false);
  const [link, setLink] = useState("");
  const file = useRef(null);

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
      content,
    };
    axios.post("/api/post", post).then((res) => {
      if (res.data.ok) {
        toast.success("post created.");
        setImage("");
        setTextArea("");
        setTitle("");
        setThemes([]);
        setUploadedImage();
        setContent("");
      }
      if(!res.data.ok){
        toast.error(res.data.message)
      }
    });

    handleUpload();
  };

  const handleOpenImage = () => {
    file.current.click();
  };

  const joditUploader = () => {
    const formData = new FormData();
    formData.append("image", file.current.files[0]);
    axios
      .post("http://localhost:3000/api/upload", formData)
      .then((res) => {
        setLink(`http://localhost:3000/storage/${res.data.image}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="max-w-[1000px] max-lg:w-[80%] max-sm:w-[90%] m-auto flex flex-col gap-5 items-center">
      <Toaster />
      {!uploadedImage && (
        <section className="flex flex-col gap-1 justify-center items-center border-4 border-gray-200 w-full h-[600px] max-md:h-[300px] cursor-pointer hover:bg-gray-50 transition duration-150">
          <Image alt="" src={initImage} className="w-[20%] opacity-75" />
          <p className="text-sm font-semibold text-gray-400">
            Upload your image here.
          </p>
          <button
            onClick={handleUploadClick}
            className="bg-slate-400 text-lg py-2 w-[200px] px-6 rounded-lg text-white hover:bg-blue-300 transition mt-2"
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
        <section className="group relative border-4 max-sm:border-none border-gray-100 p-[3px]">
          <Image alt="" src={uploadedImage} width={1200} height={600} />
          <button
            onClick={handleUploadClick}
            className="group-hover:block hidden absolute bg-white/45 py-2 px-3 rounded-full top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-2xl text-white transition duration-150 cursor-pointer hover:bg-white/55 active:scale-90"
          >
            Change Image
          </button>
        </section>
      )}
      <section className="w-full flex flex-col items-center justify-center gap-5">
        {/* Title */}
        <input
          type="text"
          placeholder="Title of Post..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-b-4 border-gray-200 text-2xl py-2 outline-none focus:border-gray-400 capitalize"
        />
        <div className="w-full flex flex-col gap-3 mt-2 text-gray-500">
          <label className="font-semibold text-3xl italic max-sm:text-2xl">
            Short description about your article:
          </label>
          <textarea
            ref={textareaRef}
            onClick={handleClick}
            onChange={(e) => {
              calcChars(), setTextArea(e.target.value);
            }}
            value={textArea}
            className="w-full min-h-[130px] py-3 px-4 text-xl border-2 border-gray-200"
          ></textarea>
          <p className="text-gray-600 font-semibold text-sm ml-1">
            {initChars} left
          </p>
        </div>
        <div className="w-full flex flex-col gap-3 mt-2 text-gray-500">
          <label className="font-semibold text-3xl italic">
            Article Main Content:
          </label>
          <div className="w-full">
            <JoditEditor
              className="editor"
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              // onChange={newContent => {setContent(newContent)}}
            />
            <div className="flex items-center gap-4">
              <button
                onClick={handleOpenImage}
                className="border-2 border-blue-300 font-semibold py-3 px-6 rounded-md mt-1"
              >
                upload
              </button>
              {link && (
                <input
                  onClick={(e) => e.target.select()}
                  type="text"
                  readOnly
                  value={link}
                  className="w-full py-3 outline-none border-b-2 border-gray-300"
                />
              )}
              <input type="file" onChange={joditUploader} hidden ref={file} />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full z-10">
        <h1 className="italic font-semibold text-2xl text-gray-500 mb-3">
          Themes
        </h1>
        <div className="relative bg-gray-100 p-5 w-full min-h-[130px]">
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
                  key={index}
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
      {!id && (
        <input
          type="submit"
          value="Submit"
          onClick={handleSubmit}
          className="bg-gray-800 py-3 px-6 text-white rounded-md text-lg cursor-pointer active:scale-95 transition-all duration-300 mb-10"
        />
      )}
      {id && (
        <input
          type="submit"
          value="Update"
          onClick={handleUpdate}
          className="bg-gray-800 py-3 px-6 text-white rounded-md text-lg cursor-pointer active:scale-95 transition-all duration-300 mb-10"
        />
      )}
    </div>
  );
};

export default Page;
