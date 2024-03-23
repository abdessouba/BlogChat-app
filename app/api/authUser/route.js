import { NextResponse } from "next/server";
import { connectToMongodb } from "@/app/lib/mongodb";
import User from "@/app/models/model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "not Authorized", ok: false });
  }
  const {user} = session
  try {
    await connectToMongodb();
    const authUser = await User.findById(user._id);
    return NextResponse.json({
      authUser,
      ok: true
    });
  } catch (error) {
    return NextResponse.json({ message: error });
  }
}
