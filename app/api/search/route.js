import { connectToMongodb } from "@/app/lib/mongodb"
import User from "@/app/models/model"
import Post from "@/app/models/postModel"
import { NextResponse } from "next/server"

export async function GET(req){
    const query = await req.nextUrl.searchParams
    const search = query.get('s')
    try {
        connectToMongodb()
        if(search.startsWith('@')){
            const user = await User.find({username: {$regex: search.slice(1), $options:'i'}}, {username: true, avatar: true, bio: true, createdAt:true})
            return NextResponse.json({data: user, filterBy: "users"})
        }else{
            const post = await Post.find({title: {$regex: search, $options:'i'}}, {title: true, description: true})
            return NextResponse.json({data: post, filterBy: "posts"})
        }
    } catch (error) {
        console.log(error.message)
    }
}