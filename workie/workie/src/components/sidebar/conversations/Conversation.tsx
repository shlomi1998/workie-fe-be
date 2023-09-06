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
interface ConversationProps {
  convo: any;
  key: string;
}

const Conversation: React.FC<ConversationProps> = ({ convo }) => {
  const dispatch: any = useDispatch();
  const user: any = useSelector((state: any) => state.user);

  let values: any = {};

  if (user && user.user) {
    const { token } = user.user;
    console.log(token);
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

  const openConversation = () => {
    dispatch(open_create_conversation(values));
  };

  // console.log(moment(convo.latestMessage?.createdAt).fromNow(true));
  return (
    <li
      onClick={openConversation}
      className="list-none h-[72px]  hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1"
    >
      <div className="relative w-full flex items-center justify-between ">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src={`../images/${convo.picture}`}
              alt={convo.name}
              className="w-12 h-12 object-cover rounded-full"
            />
          </div>
          <div className="relative right-2 top-4 w-full flex flex-col ">
            <p className="font-bold flex items-center gap-x-2 ml-2">
              {capitalize(convo.name)}
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
        <div className="relative right-3  flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2 ">
            {convo.latestMessage?.createdAt
              ? dateHandler(convo.latestMessage?.createdAt)
              : ""}
          </span>
        </div>
      </div>

      <div className="ml-[53px] h-[0.5px] bg-slate-800 "></div>
    </li>
  );
};

export default Conversation;
