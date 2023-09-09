import React from "react";
import { useSelector } from "react-redux";
import Conversation from "./Conversation";
import { setActiveConversation } from "../../../features/chatSlice";

interface ConversationType {
  _id: string;
}

interface ChatState {
  chat: {
    conversations: ConversationType[];
  };
}

const Conversations: React.FC = () => {
  const { conversations, activeConversation }: any = useSelector(
    (state: ChatState) => state.chat
  );
  // console.log(conversations)
  return (
    <div className="  convos scrollbar">
      <ul className="relative w-full left-[-38px] top-[-30px]">
        {conversations &&
          conversations
            .filter(
              (c: any) => c.latestMessage || c._id === activeConversation._id
            )
            .map((convo: any) => (
              <Conversation convo={convo} key={convo._id} />
            ))}
      </ul>
    </div>
  );
};

export default Conversations;
