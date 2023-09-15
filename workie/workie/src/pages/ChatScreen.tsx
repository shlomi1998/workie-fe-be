import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar/index";
import axios from "axios";
import { getConversations, updateMessagesAndConversations } from "../features/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { FaWhatsapp } from "react-icons/fa";
import {
  ChatContainer,
  WhatsappHome,
} from "../components/sidebar/conversations/Chat";
import { setUser } from "../features/userSlice";
import SocketContext from "../context/SocketContext";
import Message from "../components/sidebar/conversations/Chat/messages/Message";
import { io } from "socket.io-client";
interface ChatScreenProps {
  socket: any;
}

interface ChatScreenProps {
  socket: any;
}

function ChatScreen({ socket }: ChatScreenProps) {
  // console.log(socket);
  const [userToken, setUserToken]: any = useState();

  const dispatch: any = useDispatch();
  const { user } = useSelector((state: any) => state.user);
  const { activeConversation } = useSelector((state: any) => state.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  // console.log("activeConversation", activeConversation);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get("/api/v1/auth/getToken");
        const token = response.data;
        setUserToken(userToken);

        dispatch(getConversations(response.data));
        setUserToken(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    const getUserDetails = async () => {
      const responseToken = await axios.get("/api/v1/auth/getToken");
      // console.log(responseToken.data);

      const { data } = await axios.get("/api/v1/auth/getUser");
      // console.log(data);

      const initialUserData = {
        id: `${data._id}`,
        name: `${data.firstName} ${data.lastName}`,
        email: `${data.email}`,
        picture: `${data.ImageSource}`,
        status: `${data.status}`,
        token: `${responseToken.data}`,
      };
      dispatch(setUser(initialUserData));
    };
    getUserDetails();
  }, []);

  useEffect(() => {
    if (user) {
      socket.emit("join", user.id);
    }
  }, [user]);

  useEffect(() => {
    socket.on("receive message", (message: any) => {
      dispatch( updateMessagesAndConversations(message))
      console.log("message-->",message)
    });
    

   

    // Cleanup function
    return () => {
        socket.off("receive message");
    };
  }, []);

  return (
    <div className="relative top[15vh] h-[100vh] dark:bg-dark_bg_1 flex items-center justify-center overflow-hidden">
      {/*container*/}
      <div className="container h-screen flex py-[19px]">
        <Sidebar />
        {activeConversation._id ? <ChatContainer /> : <WhatsappHome />}
      </div>
    </div>
  );
}

const ChatScreenWithSocket = (props: any) => (
  <SocketContext.Consumer>
    {(socket: any) => <ChatScreen {...props} socket={socket} />}
  </SocketContext.Consumer>
);
export default ChatScreenWithSocket;
