import { getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]/route"
import { NextResponse } from "next/server"
import { connectToMongodb } from "@/app/lib/mongodb"
import User from "@/app/models/model"
import bcrypt from "bcryptjs";

export async function POST(req){
    const {data} = await req.json()
    const session = await getServerSession(authOptions)

    if(!data.newPass || data.confPass){
        return NextResponse.json({message: "empty field.", ok: false})
    }
    if(data.newPass !== data.confPass){
        return NextResponse.json({message: "passwords not matched.", ok: false})
    }

    if(!session){
        return NextResponse.json({message: "not logged in!", ok: false})
    }
    const {_id} = session.user
    try {
        connectToMongodb()
        const user = await User.findById(_id)
        const passwordsMatched = await bcrypt.compare(data.currPass, user.password);
        if(!passwordsMatched){
            return NextResponse.json({message: "wrong password.", ok: false})
        }
        const hashedNewPassword = await bcrypt.hash(data.newPass,10)
        user.password = hashedNewPassword
        await user.save()
        return NextResponse.json({message: "password updated.", ok: true})
        
    } catch (error) {
        return NextResponse.json({message: error.message})
    }
}