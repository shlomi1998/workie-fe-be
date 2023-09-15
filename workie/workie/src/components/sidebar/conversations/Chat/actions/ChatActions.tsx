import React, { useRef, useState } from "react";
import { Attachments } from "./attachments/index";
import Input from "./Input";
import { SendIcon } from "../../../../../svg";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../../../../features/chatSlice";
import { setMaxIdleHTTPParsers } from "http";
import { ClipLoader } from "react-spinners";
import EmojiPickerApp from "./EmojiPicker";
import SocketContext from "../../../../../context/SocketContext";

interface ChatActionsProps {
  socket: any;
}

const ChatActions: React.FC<ChatActionsProps> = ({ socket }) => {
  const dispatch = useDispatch();
  const [showEmojis, setShowEmojis] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  
  const [loading,setLoading]=useState(false)
  const { activeConversation, status } = useSelector(
    (state: any) => state.chat
  );
  const { user } = useSelector((state: any) => state.user);
  const { token } = user;
  const [message, setMessage]: any = useState("");
  const textRef = useRef();

  const values = {
    message,
    convo_id: activeConversation._id,
    files: [],
    token,
  };

  const sendMessageHandler = async (event:any) => {
    event.preventDefault();
    setLoading(true)
    let newMsg=await dispatch(sendMessage(values));
    console.log("newMsg",)
    socket.emit("send message",newMsg.payload)
    setMessage("");
    setLoading(false)
  };

  return (
    <form
      onSubmit={(e: any) => sendMessageHandler(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 px-4 py-2 select-none"
    >
      <div className="w-[60vw] flex items-center gap-x-2 ">
        <ul className="list-none flex">
          <EmojiPickerApp
            message={message}
            setMessage={setMessage}
            textRef={textRef}
            showPicker={showPicker}
            setShowPicker={setShowPicker}
            setShowAttachments={setShowAttachments}
          />
          <Attachments
            setShowPicker={setShowPicker}
            showAttachments={showAttachments}
            setShowAttachments={setShowAttachments}
          />
        </ul>
        <Input message={message} setMessage={setMessage} textRef={textRef} />
        <button type="submit" className="btn dark:bg-dark_bg_2 border-0">
          {status == "loading" ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <SendIcon className="dark:fill-dark_svg_1 relative left-2" />
          )}
        </button>
      </div>
    </form>
  );
};

const ChatActionsWithSocket = (props: any) => (
  <SocketContext.Consumer>
    {(socket: any) => <ChatActions {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default ChatActionsWithSocket;
