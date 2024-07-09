import { connectToMongodb } from "@/app/lib/mongodb";
import Post from "@/app/models/postModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import Comment from "@/app/models/commentModel";
import User from "@/app/models/model";
import axios from "axios";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const authUser = session?.user
  if(!session){return NextResponse.json({message: "not logged in!", ok: false})}
  const { postId, comment: receivedComment } = await req.json();
  try {
    connectToMongodb();
    const { _id } = await Comment.create({
      user: authUser._id,
      post: postId,
      comment: receivedComment,
    });
    const userOfPost = await User.findOneAndUpdate(
      { _id: authUser._id },
      { $push: { comments: _id } },
      { new: true }
    );

    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: _id } },
      { new: true }
    );
    // save notification
    const notice = {
      actor: authUser._id,
      notice: {
        type: "comment",
        id: _id,
      },
      relatedToId: post._id,
    }
    const user = await User.findById(post.userId);
    user.notifications = [
      ...user.notifications,
      notice,
    ];
    
    const message = `@${userOfPost.username} commented to your post ${post.title}`
    Promise.all([
      await user.save(),
      await axios.post("http://localhost:5000/notice", {sentMessage:{receiverId: user._id, notification: {content: message, relationId: post._id, type:"comment"}}})
    ]);

    return NextResponse.json({ message: "comment added.", ok: true });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message });
  }
}
