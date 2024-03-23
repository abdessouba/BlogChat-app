import { NextResponse } from "next/server";
import { connectToMongodb } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/models/model";
import { writeFile } from "fs/promises";
import path from "path";
import Post from "@/app/models/postModel";

export async function POST(req) {
  const { user } = await getServerSession(authOptions);
  const { title, image, textArea, themes } = await req.json();

  if (!image) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
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
      themes: themes,
      userId: user._id
    };
    const createdPost = await Post.create(post);
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id }, // Filter: Find the user by ID
      { $push: { posts: createdPost._id } }, // Update: Push the post ID to the posts array
      { new: true } // Options: Return the updated document
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json({ ok: false });
  }
}

export async function GET(req) {
  try {
    await connectToMongodb();
    const posts = await Post.find().populate({path: "userId", select:"email username name avatar -_id"}).exec();
    // console.log(posts)
    // const {email, name, avatar} = await User.findById(posts[0].userId)
    return NextResponse.json({ data: posts, ok: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error", ok: false });
  }
}
