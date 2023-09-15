import React, { useEffect, useState } from "react";
import moment from "moment";
import { dateHandler } from "../../../utils/date";
import { open_create_conversation } from "../../../features/chatSlice";
import { useActionData } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useEnhancedEffect from "@mui/material/utils/useEnhancedEffect";

import axios from "axios";
import { getConversationId } from "../../../utils/chat";
import { stat } from "fs/promises";
import { capitalize } from "../../../utils/string";
import { Socket } from "socket.io-client";
import SocketContext from "../../../context/SocketContext";
interface ConversationProps {
  convo: any;
  key: string;
  socket: any;
  online: any;
}

const Conversation: React.FC<ConversationProps> = ({
  convo,
  socket,
  online,
}) => {
  const dispatch: any = useDispatch();
  const user: any = useSelector((state: any) => state.user);
  const { activeConversation } = useSelector((state: any) => state.chat);

  console.log(user);
  let values: any = {};

  if (user && user.user) {
    const { token } = user.user;
    // console.log(token);
    if (token) {
      values = {
        receiver_id: getConversationId(user, convo.users),
        token: token,
      };
    }
  }

  //  /* Vector */

  // console.log(values.receiver_id)
  // console.log(values)

  const openConversation = async () => {
    let newConvo = await dispatch(open_create_conversation(values));
    socket.emit("join conversation", newConvo.payload._id);
  };
  //צריך תיקון
  // console.log(moment(convo.latestMessage?.createdAt).fromNow(true))ן
  // if(convo){
  //   console.log(`../images/${getConversationName(user, convo.users)}`);
  // }
  // console.log("user", user);
  // console.log("users", convo.users);
  // console.log(getConversationPicture(user, convo.users));
  // console.log(capitalize(getConversationName(user, convo.users)));
  let id: any;
  useEffect(() => {
    const getUserDetails = async () => {
      const { data } = await axios.get("/api/v1/auth/getUser");
      id = data._id;
      console.log(id);
    };
    getUserDetails();
  }, []);

  const getConversationName = (user: any, users: any): any => {
    console.log("user:", user, "convoUser:", users);
    if (!user || !user.user || !users  || users.length < 2) return "";
    const userId:any = user.user.id;
    // console.log(userId);
    // console.log(users[0]._id)
    // console.log(users[1].firstName)
    // console.log(users[0].firstName)
    
    return users[0]._id === userId? users[1].firstName : users[0].firstName;
  };

  const getConversationPicture = (user: any, users: any): any => {
    if (!user || !user.user || !users   || users.length < 2) return "";
    const userId:any = user.user.id;
   
    return users[0]._id === userId
      ? users[1].ImageSource
      : users[0].ImageSource;
  };

 
  return (
    
    <li
      onClick={() => openConversation()}
      className={`relative top-4 list-none h-[72px] w-full mt-[px] z-30 dark:bg-dark_bg_1 hover:${
        convo._id !== activeConversation._id ? "dark:bg-dark_bg_2" : ""
      } cursor-pointer dark:text-dark_text_1 px-[10px] ${
        convo._id === activeConversation._id ? "dark:bg-dark_hover_1" : ""
      }`}
    >
      <div className="relative -top-3 w-full flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center gap-4 rounded-full ${
              online ? "online" : ""
            }`}
          >
            <img
              src={`../images/${getConversationPicture(user, convo.users)}`}
              alt=""
              className="w-12 h-12 object-cover rounded-full"
            />
          </div>
          <div className="relative right-2 top-4 w-full flex flex-col ">
            <p className="font-bold flex items-center gap-x-2 ml-2">
              {user || user.user
                ? capitalize(getConversationName(user, convo.users))
                : "Loading..."}
            </p>
            <div>
              <div className="  flex items-center gap-x-1 dark:text-dark_text_2 ">
                <div className="relative left-2 bottom-6 flex-1 items-center gap-x-1 dark:text-dark_text_2 ">
                  <p className="font-mono font-bold flex items-center gap-x-2 ">
                    {convo.latestMessage?.message.length > 25
                      ? `${convo.latestMessage?.message.substring(0, 25)}...`
                      : convo.latestMessage?.message}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative right-5  flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2 ">
            {convo.latestMessage?.createdAt
              ? dateHandler(convo.latestMessage?.createdAt)
              : ""}
          </span>
        </div>
      </div>

      <div className="ml-[53px] h-[0.5px] bg-[#56cea6] relative -top-7 "></div>
    </li>
  );
};

const ConversationWithContext = (props: any) => (
  <SocketContext.Consumer>
    {(socket) => <Conversation {...props} socket={socket} />}
  </SocketContext.Consumer>
);

export default ConversationWithContext;
