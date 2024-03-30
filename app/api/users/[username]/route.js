import { NextResponse } from "next/server";
import { connectToMongodb } from "@/app/lib/mongodb";
import User from "@/app/models/model";
import Post from "@/app/models/postModel";

export async function GET(req) {
  const url = req.url;
  const username = url.slice(url.lastIndexOf("/") + 1);
  try {
    await connectToMongodb();
    const user = await User.findOne({username}, {_id:false, email: true, avatar: true, username: true, name: true, bio: true, github: true, website: true, createdAt: true}).populate({path:"posts", model: Post, populate:{path: "userId", model: User}}).exec();
    if(!user){
      return NextResponse.json({ message: "no such user", ok: false });
    }
    return NextResponse.json({
      user,
      ok: true,
    });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
