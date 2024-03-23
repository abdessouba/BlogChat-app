import mongoose, { Schema, models } from "mongoose";

const commentSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    post: {type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true},
    comment: {type: String, required: true}
}, {timestamps: true})

const Comment = models.Comment || mongoose.model("Comment", commentSchema)

export default Comment;