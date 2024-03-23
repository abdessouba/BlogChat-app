import { connectToMongodb } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/models/model";
import Post from "@/app/models/postModel";

export async function POST(req) {
  const { postId } = await req.json();
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({
      message: "you have to login first!",
      ok: false,
    });
  }
  const { user: authUser } = session;
  const userId = authUser._id;
  try {
    connectToMongodb();
    const { userId: userPostId } = await Post.findById(postId);
    const posterUser = await User.findById(userPostId);
    const followers = posterUser["followers"];
    const alreadyFollowed = followers.find((follow) => follow._id == userId);
    if (alreadyFollowed) {
      return NextResponse.json({
        message: "already follower!",
        ok: false,
      });
    }

    posterUser["followers"].push(userId);
    await posterUser.save();
    return NextResponse.json({ message: "your are now a follower", ok: true });
  } catch (error) {
    return NextResponse.json({ message: error.message, ok: false });
  }
}
