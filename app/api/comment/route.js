import { connectToMongodb } from "@/app/lib/mongodb";
import Post from "@/app/models/postModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Comment from "@/app/models/commentModel";
import User from "@/app/models/model";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const user = session?.user
  if(!session){return NextResponse.json({message: "not logged in!", ok: false})}
  const { postId, comment: receivedComment } = await req.json();
  try {
    connectToMongodb();
    const { _id } = await Comment.create({
      user: user._id,
      post: postId,
      comment: receivedComment,
    });
    await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { comments: _id } },
      { new: true }
    );

    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: _id } },
      { new: true }
    );
    return NextResponse.json({ message: "comment added.", ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
