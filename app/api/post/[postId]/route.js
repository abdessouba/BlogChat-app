import { connectToMongodb } from "@/app/lib/mongodb";
import Post from "@/app/models/postModel";
import { NextResponse } from "next/server";

export async function GET(req) {
  const postId = req.url.slice(req.url.lastIndexOf("/") + 1);
  try {
    connectToMongodb();
    const post = await Post.findById(postId)
      .populate({ path: "userId", select: "-_id email createdAt avatar name followers like" })
      .exec();

    if (post) {
      return NextResponse.json({ data: post });
    } else {
      return NextResponse.json({ message: "no such post" });
    }
  } catch (error) {
    return NextResponse.json({ error: error });
  }
}
