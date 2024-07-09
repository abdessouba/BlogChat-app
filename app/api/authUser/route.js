import { NextResponse } from "next/server";
import { connectToMongodb } from "@/app/lib/mongodb";
import User from "@/app/models/model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { model } from "mongoose";
import Post from "@/app/models/postModel";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "not Authorized", ok: false });
  }
  const {user} = session
  try {
    await connectToMongodb();
    const authUser = await User.findOne({_id:user._id}, {_id:false, name:true, username:true, email:true, bio:true, avatar:true, posts:true,followers:true,github:true, website:true}).populate({path:"posts", select:"_id views", model: Post}).exec();
    return NextResponse.json({
      authUser,
      ok: true
    });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: error });
  }
}
