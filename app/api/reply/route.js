import { connectToMongodb } from "@/app/lib/mongodb";
import Comment from "@/app/models/commentModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/models/model";
import axios from "axios"

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const authUser = session?.user
  if(!session){return NextResponse.json({message: "not logged in!", ok: false})}
  
  const { reply, commentId, userId } = await req.json();

  if (!reply) {
    return NextResponse.json({ message: "reply empty!", ok: false });
  }
  try {
    connectToMongodb();
    const newReply = await Comment.findOneAndUpdate(
      { _id: commentId },
      {
        $push: {
          replies: {
            user: userId,
            comment: commentId,
            reply: reply,
          },
        },
      },
      { new: true }
    );
    const comment = await Comment.findById(commentId)
   console.log(newReply)
    // save notification
    const notice = {
      actor: authUser._id, // the one that comment or replied or followed
      notice: {
        type: "reply",
        id: newReply._id, // this id have relation to the type {if post : postID, if reply: replyId}
      },
      relatedToId: comment.post, // user or post. if i want to visit the notice
    };
    
    const user = await User.findById(comment.user);
    user.notifications = [
      ...user.notifications,
      notice,
    ];

    const message = `@${authUser.username} replied to your comment ${comment.comment}`;
    Promise.all([
      await user.save(),
      await axios.post("http://localhost:5000/notice", {
        sentMessage: {
          receiverId: comment.user,
          notification: {
            content: message,
            relationId: comment._id,
            type: "reply",
          },
        },
      }),
    ]);

    return NextResponse.json({ message: "reply added.",replies:newReply, ok: true });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ error: error.message, ok: false });
  }
}
