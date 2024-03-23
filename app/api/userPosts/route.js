import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectToMongodb } from "../../lib/mongodb";
import User from "../../models/model";

export async function GET(){
    const session = await getServerSession(authOptions)
    if(!session){
        return NextResponse.json({message: "you must be logged in.", ok: false})
    }
    const {_id} = session.user
    try {
        connectToMongodb()
        const {posts} = await User.findById(_id).populate({path: "posts"}).exec()
        return NextResponse.json({posts, ok: true})
    } catch (error) {
        return NextResponse.json({message: error.message, ok: false})
    }
}