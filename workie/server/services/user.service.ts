import createHttpError from "http-errors";
import { UserModel } from "../models/index";

export const findUser = async (userId: any) => {
  // console.log(userId,"fgfgf")
  const user = await UserModel.findById(userId);
  if (!user) throw createHttpError.BadRequest("Please fill all fields.");
  return user;
};

export const searchUsers = async (keyword: string, userId: any) => {
  // console.log("keyword:",keyword,"userId:",userId)
  const users: any = await UserModel.find({
    $or: [
      { firstName: { $regex: keyword, $options: "i" } },
      { lastName: { $regex: keyword, $options: "i" } },
      { email: { $regex: keyword, $options: "i" } },
    ],
  }).find({
    _id: { $ne: userId },
  });
  return users;
};
