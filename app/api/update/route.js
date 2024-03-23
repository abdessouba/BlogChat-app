import { connectToMongodb } from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import User from "@/app/models/model";
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { writeFile } from "fs/promises";

export async function POST(req) {
  const { user: authUser } = await getServerSession(authOptions);
  if (!authUser) {
    return NextResponse.json({ message: "unauthorized", ok: false });
  }
  const data = await req.json();
  const userId = authUser?._id;
  try {
    connectToMongodb();
    const user = await User.findById(userId);

    Object.entries(data).forEach((array) => {
      let [name, value] = array;
      if (name !== "bio" && value === "") return;
      if (name == "avatar") {
        const oldAvatarPath = process.cwd() + "/public/avatars/" + user.avatar;
        if (user.avatar) {
          deleteFile(oldAvatarPath);
        }
        const base64Data = value.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(base64Data, "base64");
        const date = Date.now();
        const filename = `${date}_avatar.png`;
        saveImage(filename, buffer);
        user[name] = filename;
      }

      if (["email", "name", "username", "bio"].includes(name)) {
        user[name] = value;
      }

      // for social media links
      if(["github", "website"].includes(name)){
        user[name] = value;
      }
    });
    await user.save();
    return NextResponse.json({ message: "user updated.", ok: true });
  } catch (error) {
    console.log(error.message);
  }

  async function saveImage(filename, buffer) {
    await writeFile(
      path.join(process.cwd(), "public/avatars/" + filename),
      buffer
    );
  }
  async function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log(`File ${filePath} has been deleted.`);
      }
    });
  }
}
