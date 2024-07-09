import { connectToMongodb } from "@/app/lib/mongodb";
import User from "@/app/models/model";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "not Authorized", ok: false });
  }

  const id = req.url.slice(req.url.lastIndexOf("/") + 1);
  if(!id){
    return NextResponse.json({ message: "no id provided", ok: false });
  }
  try {
    connectToMongodb()
    const user = await User.findOne({_id: id}, {avatar: true, name:true})
    if(!user){
        return NextResponse.json({ message: "not such user.", ok: false });
    }
    return NextResponse.json({ user: user, ok: false });
  } catch (error) {
    
  }
}
