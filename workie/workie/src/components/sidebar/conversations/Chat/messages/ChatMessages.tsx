import React from "react";
import { useSelector } from "react-redux";
import Message from "./Message";
import { TraingleIcon } from "../../../../../svg";

export default function ChatMessages() {
  const { messages } = useSelector((state: any) => state.chat);
  const { user } = useSelector((state: any) => state.user);
 
  return (
    <div
      className="mb-[60px] bg-[url('https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg')]
    bg-cover bg-no-repeat
    "
    >
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {messages &&
          messages.map((message: any) => (
            <Message
              message={message}
              key={message._id}
              me={user.id === message.sender._id}
            />
          ))}
          
      </div>
    </div>
  );
}
