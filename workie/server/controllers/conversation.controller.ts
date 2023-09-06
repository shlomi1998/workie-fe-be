import createHttpError from "http-errors";
import logger from "../configs/logger.config";
import { findUser } from "../services/user.service";
import {
  createConversation,
  doesConversationExist,
  getUserConversations,
  populateConversation,
} from "../services/conversation.service";
import jwt from "jsonwebtoken";
const JWT_SECRET: any = process.env.JWT_SECRET;
export const create_open_conversation = async (req: any, res: any) => {
  try {
    const sender_id = req.user.userId;
    console.log(sender_id);
    const { receiver_id } = req.body;
    // console.log(receiver_id, "kkjk");

    if (!receiver_id) {
      logger.error(
        "please provide the user id you wanna start a conversation whit !"
      );
      return res
        .status(400)
        .send(
          "Please provide the user id you want to start a conversation with!"
        );
    }

    const existed_conversation = await doesConversationExist(
      sender_id,
      receiver_id
    );
    if (existed_conversation) {
      return res.json(existed_conversation);
    }

    let receiver_user: any = await findUser(receiver_id);
    let convoData = {
      name: `${receiver_user.firstName} ${receiver_user.lastName}`,
      picture:receiver_user.ImageSource,
      isGroup: false,
      users: [sender_id, receiver_id],
    };
    const newConvo = await createConversation(convoData);
    const populateConvo = await populateConversation(
      newConvo._id,
      "users",
      "-password"
    );
    return res.status(200).json(populateConvo);
  } catch (error) {
    console.error("Error in create_open_conversation:", error);
    return res.status(500).send("Internal Server Error");
  }
};
export const getConversations = async (req: any, res: any, next: any) => {
  try {
    const user_id = req.user.userId;
    if (user_id) {
      console.log(req.user.userId);
    }
    const conversations = await getUserConversations(user_id);
    res.status(200).json(conversations);
  } catch (error) {
    next(error);
  }
};
