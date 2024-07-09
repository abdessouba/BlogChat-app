import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export const POST = async (req, res) => {
  const formData = await req.formData();
  const file = formData.get("image");
  if (!file) {
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }
  const buffer = Buffer.from(await file.arrayBuffer());
  const date = Date.now()
  const filename = `${date}_${file.name.replaceAll(" ", "_")}`;
  try {
    await writeFile(
        // cwd : current working directory
      path.join(process.cwd(), "public/storage/" + filename),
      buffer
    );
    return NextResponse.json({ image: filename, status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Failed", status: 500 });
  }
};
