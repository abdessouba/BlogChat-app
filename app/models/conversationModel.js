import mongoose, { model, models, Schema } from "mongoose";

const conversationSchema = new Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
    ],
  },
  { timestamps: true }
);

const Conversation = models.Conversation || mongoose.model("Conversation", conversationSchema);
export default Conversation;
