import mongoose, { Schema, models } from "mongoose";

const followSchema = new Schema(
  {
    follower: { type: mongoose.Schema.Types.ObjectId },
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
    github: {type: String},
    website: {type: String},
  },
  { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);
export default User;
