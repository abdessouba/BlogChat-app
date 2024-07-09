import Post from "@/app/models/postModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  const userId = session.user._id;
  const { postId, content, title, textArea, uploadedImage, themes } =
    await req.json();
  let imageToSave;
  try {
    if (!uploadedImage.includes("storage")) {
      const base64Data = uploadedImage.replace(/^data:image\/\w+;base64,/, "");
      const buffer = Buffer.from(base64Data, "base64");
      const date = Date.now();
      const filename = `${date}_post.png`;
      await writeFile(
        path.join(process.cwd(), "public/storage/" + filename),
        buffer
      );
      imageToSave = filename;
    } else {
      imageToSave = uploadedImage.slice(uploadedImage.lastIndexOf("/") + 1);
    }

    const post = await Post.findById(postId);
    // this will delete the previus image
    if(!uploadedImage.includes("storage")){ // this condition means the image is base64 and not url
        deleteFile(post.image)
    }
    if (!post) {
      return NextResponse.json({ message: "no such post!", ok: false });
    }
    if (userId != post.userId) {
      return NextResponse.json({
        message: "you can't update this post!",
        ok: false,
      });
    }
    post.content = content;
    post.title = title;
    post.description = textArea;
    post.themes = themes;
    post.image = imageToSave;

    await post.save();
    return NextResponse.json({ message: "post updated.", ok: true });
  } catch (error) {
    console.log(error.message);
  }
  // function delete files 
  async function deleteFile(filename) {
    fs.unlink(process.cwd() + "/public/storage/" + filename, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`File ${filename} has been deleted.`);
      }
      // process.cwd() is the root directory
    });
  }
}
