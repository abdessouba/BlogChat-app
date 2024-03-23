import { NextResponse } from "next/server";
import { connectToMongodb } from "../../lib/mongodb.js";
import User from "@/app/models/model.js";
import bcrypt from "bcryptjs";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    await connectToMongodb();
    const { name, username, bio, email, password, avatar } = await req.json();

    if (!avatar) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    const date = Date.now();
    const filename = `${date}_avatar.png`;
    const hashPass = await bcrypt.hash(password, 10);
    await User.create({ name, username, email, bio, password: hashPass, avatar: filename });

    const base64Data = avatar.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    await writeFile(
      path.join(process.cwd(), "public/avatars/" + filename),
      buffer
    );

    return NextResponse.json(
      { message: "User registered.", ok: true },
      { status: 201 }
    );
  } catch (error) {
    
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}
