import { connectToMongodb } from "@/app/lib/mongodb";
import Comment from "@/app/models/commentModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { reply, commentId, userId } = await req.json();
  if (!reply) {
    return NextResponse.json({ message: "reply empty!", ok: false });
  }
  try {
    connectToMongodb();
    const newReply = await Comment.findOneAndUpdate(
      { _id: commentId },
      { $push: { replies: {
        user: userId,
        comment: commentId,
        reply: reply
      } } },
      { new: true }
      );
      console.log(newReply)
  } catch (error) {
    console.log(error.message)
  }
}
