import { connectToMongodb } from "@/app/lib/mongodb";
import Comment from "@/app/models/commentModel";
import User from "@/app/models/model";
import Post from "@/app/models/postModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const postId = req.url.slice(req.url.lastIndexOf("/") + 1);
  try {
    connectToMongodb();
    const { comments } = await Post.findById(postId)
      .populate({
        path: "comments",
        model: Comment,
        populate: [{
          path: "replies.user",
          model: User,
          select: "username _id avatar",
        },{path: "user", model: User, select:"username _id avatar"}],
      })
      .exec();

    return NextResponse.json({ comments });
  } catch (error) {
    console.log(error.message);
  }
}
