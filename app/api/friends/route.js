import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectToMongodb } from "@/app/lib/mongodb";
import User from "@/app/models/model";

export async function GET(){
    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({message: "Not Authorized", ok: false})
    }
    try {
        connectToMongodb()
        const friends = await User.find({_id:{$ne: session.user._id}}, {avatar:true, username:true, name:true})
        return NextResponse.json({friends, ok: true})
    } catch (error) {
        console.log(error.message)
    }
}