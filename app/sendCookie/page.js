"use client";
import React from "react";
import axios from "axios";
const page = () => {
  const sendDataToExpress = async () => {
    // axios.defaults.withCredentials = true
    axios
      .post("http://localhost:3000/api/test2")
      .then((res) => {});
  };
  return (
    <div>
      <button onClick={sendDataToExpress}>Click me</button>
    </div>
  );
};

export default page;
