import mongoose, { Schema, models } from "mongoose";

const followSchema = new Schema(
  {
    follower: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

const notificationSchema = new Schema(
  {
    notice: {
      type: {
        type: String,
        enum: ["like", "follow", "comment", "reply", "mention", "post"],
        required: true,
      },
      id: {type: mongoose.Schema.Types.ObjectId,required: true}, // noticeId of reply comment ...
    },
    actor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    relatedToId: {type: mongoose.Schema.Types.ObjectId, required: true,} // post or user
  },
  { timestamps: true }
);


const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    followers: [followSchema],
    github: { type: String },
    website: { type: String },
    notifications: [notificationSchema],
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendsRequests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        createdAt: () => new Date().toISOString(),// init with iso date like createdAt of mongoDb
      },
    ], 
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
