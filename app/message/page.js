"use client";
import React, { useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://localhost:5000");

const page = () => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("message", message);
  };
  return (
    <div>
      <button onClick={sendMessage}>Send</button>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-2 border-gray-800"
      />
    </div>
  );
};

export default page;
