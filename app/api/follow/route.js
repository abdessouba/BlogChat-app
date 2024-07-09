import { connectToMongodb } from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/models/model";
import Post from "@/app/models/postModel";
import { handleNotifications } from "../handleNotifications";
import axios from "axios";

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
      const alreadyFollowedIndex = posterUser.followers.indexOf(userId)
      posterUser.followers.splice(alreadyFollowedIndex, 1);
      await posterUser.save();
      return NextResponse.json({
        message: "unfollowed",
        ok: false,
        follows: followers.length
      });
    }

    posterUser["followers"].push(userId);
    await posterUser.save();
    
    // save notification
    const notice = {
      actor: authUser._id,
      notice: {
        type: "follow",
        id: authUser._id,
      },
      relatedToId: authUser._id,
    }
    const user = await User.findById(userPostId);
    user.notifications = [
      ...user.notifications,
      notice,
    ];
    
    const message = `@${session.user.username} start following you`
    Promise.all([
      await user.save(),
      await axios.post("http://localhost:5000/notice", {sentMessage:{receiverId: userPostId, notification: {content: message, relationId: userPostId, type:"follow"}}})
    ]);
    
    return NextResponse.json({ message: "your are now a follower", ok: true, follows: followers.length });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ message: error.message, ok: false });
  }
}
