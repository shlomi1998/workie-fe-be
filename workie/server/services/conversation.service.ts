import createHttpError from "http-errors";
import { Document } from "mongoose";
import { ConversationModel, UserModel } from "../models/index";

interface IUser extends Document {
  name: string;
  email: string;
  picture: string;
  status: string;
  password?: string;
}

interface IMessage {
  sender: IUser;
}

interface IConversation extends Document {
  isGroup: boolean;
  users: IUser[];
  admin: IUser;
  latestMessage: IMessage;
}

export const doesConversationExist = async (
  sender_id: any,
  receiver_id: any
): Promise<IConversation | null> => {
  let convos: any = await ConversationModel.find({
    isGroup: false,
    $and: [
      { users: { $elemMatch: { $eq: sender_id } } },
      { users: { $elemMatch: { $eq: receiver_id } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  if (!convos)
    throw createHttpError.BadRequest("Oops...Something went wrong !");

  convos = await UserModel.populate(convos, {
    path: "latestMessage.sender",
    select: "name email picture status",
  });

  return convos[0];

  // let convo: any = await ConversationModel.findById(isGroup)
  //   .populate("users admin", "-password")
  //   .populate("latestMessage");

  // if (!convo) throw createHttpError.BadRequest("Oops...Something went wrong !");

  // convo = await UserModel.populate(convo, {
  //   path: "latestMessage.sender",
  //   select: "name email picture status",
  // });

  // return convo;
};

export const createConversation = async (
  data: Partial<IConversation>
): Promise<IConversation> => {
  const newConvo: any = await ConversationModel.create(data);
  if (!newConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return newConvo;
};

export const populateConversation = async (
  id: any,
  fieldToPopulate: any,
  fieldsToRemove: any
) => {
  const populatedConvo = await ConversationModel.findOne({ _id: id }).populate(
    fieldToPopulate,
    fieldsToRemove
  );
  if (!populatedConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return populatedConvo;
};
export const getUserConversations = async (
  user_id: string
): Promise<IConversation[]> => {
  let conversations: any[] = [];
  await ConversationModel.find({
    users: { $elemMatch: { $eq: user_id } },
  })
    .populate("users", "-password")
    .populate("admin", "-password")
    .populate("latestMessage")
    .sort({ updatedAt: -1 })
    .then(async (results: any[]) => {
      results = await UserModel.populate(results, {
        path: "latestMessage.sender",
        select: "firstName lastName email ImageSource status",
      });
      conversations = results;
    })
    .catch((err) => {
      throw createHttpError.BadRequest("Oops...Something went wrong !");
    });
  return conversations;
};

export const updateLatestMessage = async (
  convo_id: string,
  msg: IMessage
): Promise<IConversation> => {
  const updatedConvo: any = await ConversationModel.findByIdAndUpdate(
    convo_id,
    {
      latestMessage: msg,
    }
  );
  if (!updatedConvo)
    throw createHttpError.BadRequest("Oops...Something went wrong !");
  return updatedConvo;
};
