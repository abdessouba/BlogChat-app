import { connectToMongodb } from "@/app/lib/mongodb";
import Comment from "@/app/models/commentModel";
import Post from "@/app/models/postModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const postId = req.url.slice(req.url.lastIndexOf("/") + 1);
  try {
    connectToMongodb();
    const { comments } = await Post.findById(postId)
      .populate({ path: "comments", populate: {path: "user"} })
      .exec();
    return NextResponse.json({ comments });
  } catch (error) {}
}
