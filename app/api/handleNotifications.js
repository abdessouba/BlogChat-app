import axios from "axios";
import { connectToMongodb } from "../lib/mongodb";
import User from "../models/model";

export async function handleNotifications(
  postId,
  actionReceiverUser,
  authUserId,
  noticeId,
  type
) {
  try {
    connectToMongodb();
    const user = await User.findById(actionReceiverUser);
    const notice = user.notifications = [
      ...user.notifications,
      {
        actor: authUserId,
        notice: {
          type: type,
          id: noticeId,
        },
        relatedToId: postId,
      },
    ];
    
    Promise.all([
      await user.save(),
      await axios.post("http://localhost:5000/notice", {sentMessage:{receiverId: user._id, notification: notice}})
    ]);

  } catch (error) {
    console.log(error.message);
  }
}
