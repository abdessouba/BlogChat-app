import mongoose, { Schema, models } from "mongoose";


const postSchema = new Schema({
    title: {
        type: String,
        required:true
    },
    image: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    content:{
        type: String,
        required:true
    },
    themes: {
        type: Array,
        required:true
    },
    userId: {type: Schema.Types.ObjectId, required: true, ref: "User"},
    comments: [{type: Schema.Types.ObjectId, ref:"Comment"}],
    like: [{type: Schema.Types.ObjectId, ref: "User"}],
    views: {type: Number, default: 0},
}, {timestamps: true})

const Post = models.Post || mongoose.model("Post", postSchema)

export default Post;
