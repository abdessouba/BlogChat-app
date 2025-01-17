import { NextResponse } from "next/server";
import { connectToMongodb } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/models/model";
import { writeFile } from "fs/promises";
import path from "path";
import Post from "@/app/models/postModel";
import axios from "axios";

export async function POST(req) {
  const { user } = await getServerSession(authOptions);
  const { title, image, textArea, themes, content } = await req.json();
  
  if (!image || !title || !image || !textArea || themes.length == 0 || !content) {
    return NextResponse.json({ message: "all fields required!", ok: false });
  }
  const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const date = Date.now();
  const filename = `${date}_post.png`;
  await writeFile(
    path.join(process.cwd(), "public/storage/" + filename),
    buffer
  );
  try {
    await connectToMongodb();
    const post = {
      title: title,
      image: filename,
      description: textArea,
      content: content,
      themes: themes,
      userId: user._id
    };
    const createdPost = await Post.create(post);
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $push: { posts: createdPost._id } },
      { new: true }
    );
    const followers = updatedUser.followers
    const updateUsersNotification = followers?.map((follow)=>{
      const notice = {
        actor: user._id,
        notice: {
          type: "post", // post
          id: createdPost._id,
        },
        relatedToId: createdPost._id,
      }
      
      axios.post("http://localhost:5000/notice", {sentMessage:{receiverId: follow._id, notification: {content: `${user.username} posted new article`, relationId: "", type:"post"}}})
      return User.findOneAndUpdate(
        { _id: follow._id },// _id is the user id
        { $push: { notifications: notice } },
        { new: true }
      );
    })

    await Promise.all(updateUsersNotification);

    return NextResponse.json({ message: "post created.",ok: true });
  } catch (error) {
    return NextResponse.json({ message: error.message,ok: false });
  }
}

// get posts
export async function GET(req) {
  const url = await req.nextUrl.searchParams
  const page = url.get("page") || 1
  const theme = url.get("theme") || ""
  const filter = theme ? {themes: theme} : {}
  try {
    await connectToMongodb();
    const posts = await Post.find(filter).skip((page-1)*6).limit(6).populate({path: "userId", select:"email username name avatar -_id"}).exec();
    const postDocumentsCount = await Post.countDocuments();
    return NextResponse.json({ data: posts, ok: true, totalPages: Math.ceil(postDocumentsCount/6) });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error", ok: false });
  }
}

