import { connectToMongodb } from "@/app/lib/mongodb"
import Post from "@/app/models/postModel"
import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "../auth/[...nextauth]/route"

export async function POST(req){
    const {postId} = await req.json()
    
    try {
        connectToMongodb()
        const post = await Post.findById(postId)
        post.views += 1
        await post.save()
        return NextResponse.json({message: post})

    } catch (error) {
        console.log(error.message)
    }
}