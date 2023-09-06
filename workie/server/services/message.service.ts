import createHttpError from "http-errors";
import  MessageModel  from "../models/MessageModel";
export const createMessage = async (data:any) => {
  let newMessage = await MessageModel.create(data);
  if (!newMessage)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return newMessage;
};

export const populateMessage = async (id:any) => {
  let msg = await MessageModel.findById(id)
    .populate({
      path: "sender",
      select: "firstName lastName ImageSource",
      model: "User"
    })
    .populate({
      path: "conversation",
      select: "name picture isGroup users",
      model: "ConversationModel",
      populate: {
        path: "users",
        select: "firstName lastName email ImageSource status",
        model: "User",
      },
    });
  if (!msg) throw createHttpError.BadRequest("Oops...Something went wrong !");
  return msg;
};

export const getConvoMessages = async (convo_id:any) => {
  const messages = await MessageModel.find({ conversation: convo_id })
    .populate("sender", "firstName lastName  email ImageSource status")
    .populate("conversation");
  if (!messages) {
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  }
  return messages;
};


