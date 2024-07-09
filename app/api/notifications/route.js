import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectToMongodb } from "@/app/lib/mongodb";
import User from "@/app/models/model";
import Comment from "@/app/models/commentModel";
import Post from "@/app/models/postModel";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
      return NextResponse.json({ message: "not authentication", ok: false });
    }
    const authUserId = session?.user._id;

  try {
    connectToMongodb();
    const { notifications } = await User.findById(authUserId).populate([{path: "notifications.actor", select:"avatar username", model: User}, {path: "notifications.notice.id", select:"comment", model: Comment}, {path: "notifications.relatedToId", select:"title", model: Post}]);
    notifications.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return NextResponse.json({ notifications, ok: true });
  } catch (error) {
    console.log(error.message);
    return NextResponse.json({ message: error.message, ok: false });
  }
}
