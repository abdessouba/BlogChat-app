import { connectToMongodb } from "@/app/lib/mongodb";
import User from "@/app/models/model";
import Post from "@/app/models/postModel";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        connectToMongodb()
        const trending = await Post.find({}).populate({path: "userId", model: User, select:"_id username name avatar"}).sort({"views": 'desc'}).limit(5)
        return NextResponse.json({data: trending, ok:true})
    } catch (error) {
        console.log(error.message)
        return NextResponse.json({ok:false})
    }
}