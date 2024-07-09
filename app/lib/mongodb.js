import mongoose from "mongoose";

export async function connectToMongodb(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log(error)
    }
}
