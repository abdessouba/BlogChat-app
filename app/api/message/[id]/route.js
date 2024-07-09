import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connectToMongodb } from "@/app/lib/mongodb";
import Message from "@/app/models/messageModel";
import Conversation from "@/app/models/conversationModel";
import axios from "axios";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "not Authorized", ok: false });
  }

  const senderId = session.user._id;
  const receiverId = req.url.slice(req.url.lastIndexOf("/") + 1);
  const { message } = await req.json();

  if (!message) {
    return NextResponse.json({ message: "no message provided", ok: false });
  }
  
  try {
    connectToMongodb();

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }
    const sentMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });
    conversation.messages.push(sentMessage._id);
    await conversation.save();
    await Promise.all([
      axios.post("http://localhost:5000/test", { sentMessage }),
      axios.post("http://localhost:5000/notice", { sentMessage })
    ]);
    return NextResponse.json({ sentMessage: sentMessage, ok: true });
  } catch (error) {
    console.log(error.message);
  }
}

// GET MESSAGES
export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "not Authorized", ok: false });
  }
  const senderId = session.user._id;
  const receiverId = req.url.slice(req.url.lastIndexOf("/") + 1);
  try {
    connectToMongodb();
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })
      .populate({ path: "messages", model: Message })
      .exec();
    if (!conversation) {
      return NextResponse.json({ messages: "no conversation yes", ok: false });
    }
    return NextResponse.json({ messages: conversation.messages, ok: true });
  } catch (error) {
    console.log(error.message);
  }
}
