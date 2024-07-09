import { connectToMongodb } from "@/app/lib/mongodb";
import Comment from "@/app/models/commentModel";
import User from "@/app/models/model";
import Post from "@/app/models/postModel";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import axios from "axios";

export async function GET(req) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({ req});
  console.log("JSON Web Token ", token);
  // try {
  //   const data = await axios.get("http://localhost:5000/test");
  //   console.log(data);
  // } catch (error) {
  //   console.log(error.message);
  // }
  return NextResponse.json({ message: "message sent" });
}
export async function POST(req) {
  const token = req.cookies.getAll()[2].value;
  console.log("JSON Web Token ", token);
  // try {
  //   const data = await axios.get("http://localhost:5000/test");
  //   console.log(data);
  // } catch (error) {
  //   console.log(error.message);
  // }
  return NextResponse.json({ message: "message sent" });
}
