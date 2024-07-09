import { connectToMongodb } from "@/app/lib/mongodb"
import Test from "@/app/models/testModel"
import { NextResponse } from "next/server"

export async function POST(req){
    const {data} = await req.json()
    try {
        connectToMongodb()
        const {html} = await Test.create({
            html: data
        })
        return NextResponse.json({data: html})
    } catch (error) {
        console.log(error.message)
    }
}