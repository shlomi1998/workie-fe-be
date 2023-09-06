import React, { useState } from "react";
import EmojiPicker from "./EmojiPicker";
import Attachments from "./Attachments";
import Input from "./Input";
import { SendIcon } from "../../../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../../../features/chatSlice";
import { setMaxIdleHTTPParsers } from "http";
import { ClipLoader } from "react-spinners";

const ChatActions: React.FC = () => {
  const dispatch = useDispatch();
  const { activeConversation, status } = useSelector(
    (state: any) => state.chat
  );
  const { user } = useSelector((state: any) => state.user);
  const { token } = user;
  const [message, setMessage]: any = useState("");

  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token,
  };

  const sendMessageHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await dispatch(sendMessage(values));

    setMessage("");
  };

  return (
    <form
      onSubmit={sendMessageHandler}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 px-4 py-2 select-none"
    >
      <div className="w-full flex items-center gap-x-2 ">
        <ul className="list-none flex">
          <Attachments />
          <EmojiPicker />
          <Input message={message} setMessage={setMessage} />
          <button type="submit" className="btn dark:bg-dark_bg_2 border-0">
            {status == "loading" ? (
              <ClipLoader color="#E9EDEF" size={25} />
            ) : (
              <SendIcon className="dark:fill-dark_svg_1 relative left-2" />
            )}
          </button>
        </ul>
      </div>
    </form>
  );
};

export default ChatActions;
