"use client";
import React, { useState, useRef, useMemo, useEffect } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import "./page.css";
import axios from "axios";
const Example = ({ placeholder }) => {
  const editor = useRef(null);
  const file = useRef(null);
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);
  const [link, setLink] = useState("");

  const config = {
    toolbar: true,
    readonly: false,
    placeholder: placeholder || "Start typings...",
    toolbarButtonSize: "large",
    editorClassName: "test",
    statusbar: false,
    useSplitMode: true,
    height: 400,
  };
  const handleOpenImage = () => {
    file.current.click();
  };

  const handleImageUpload = () => {
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
    <div className="relative w-[1000px] m-auto">
      <JoditEditor
        className="editor"
        ref={editor}
        value={content}
        config={config}
        tabIndex={1} // tabIndex of textarea
        onBlur={(newContent) => console.log(newContent)} // preferred to use only this option to update the content for performance reasons
        // onChange={newContent => {setContent(newContent)}}
      />
      <div className="flex items-center gap-2">
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
        <input type="file" onChange={handleImageUpload} hidden ref={file} />
      </div>
    </div>
  );
};
export default Example;
