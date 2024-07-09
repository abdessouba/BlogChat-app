import { connectToMongodb } from "@/app/lib/mongodb";
import Post from "@/app/models/postModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions)
  
  const postId = req.url.slice(req.url.lastIndexOf("/") + 1);
  if(!postId){
    return NextResponse.json({ message: "postId required" });
  }
  try {
    connectToMongodb();
    const post = await Post.findById(postId)
      .populate({ path: "userId", select: "_id email createdAt avatar name username followers like" })
    if (post) {
      let alreadyLiked;
      let alreadyFollower = false
      if(session){
        alreadyLiked = post.like.includes(session.user._id);
        alreadyFollower= post.userId.followers.includes(session.user._id);
        post.userId.followers.map((follow)=>{
          if(follow._id == session.user._id){
            alreadyFollower = true
          }
        })
      }
      return NextResponse.json({post, alreadyFollower, alreadyLiked});
    } else {
      return NextResponse.json({ message: "no such post" });
    }
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ error: error.message });
  }
}
