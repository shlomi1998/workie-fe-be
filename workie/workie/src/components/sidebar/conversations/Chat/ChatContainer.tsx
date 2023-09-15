import React, { useEffect } from "react";
import ChatHeader from "./header/ChatHeader";
import { useDispatch, useSelector } from "react-redux";
import ChatMessages from "./messages/ChatMessages";
import { getConversationMessages } from "../../../../features/chatSlice";
import ChatActions from "./actions/ChatActions";

export default function ChatContainer() {
  // REACT_APP_DARK_BACKGROUND
  const dispatch:any = useDispatch();
  const { activeConversation,messages } = useSelector((state: any) => state.chat);
  const { user } = useSelector((state: any) => state.user);
  const { token } = user;
  
  const values = {
    token:token,
    convo_id: activeConversation?._id,
  };

  useEffect(() => {
    if (activeConversation._id) {
      dispatch(getConversationMessages(values));
    }
  }, [activeConversation]);
  // console.log("messages",messages)
  return (
    <div className=" relative w-full h-full border-l dark:border-l-dark_border_2 select-none overflow-hidden z">
      <div>
        <ChatHeader />
        <ChatMessages />
        < ChatActions/>
      </div>
    </div>
  );
}
