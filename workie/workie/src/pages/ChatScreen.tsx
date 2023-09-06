import React, { useEffect, useState } from "react";
import { Sidebar } from "../components/sidebar/index";
import axios from "axios";
import { getConversations } from "../features/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import { FaWhatsapp } from "react-icons/fa";
import { ChatContainer, WhatsappHome } from "../components/sidebar/conversations/Chat";
import { setUser } from "../features/userSlice";

export default function ChatScreen() {
  const [userToken, setUserToken]: any = useState();
 
  const dispatch: any = useDispatch();
  const {user}= useSelector((state:any)=>state.user)
  const { activeConversation } = useSelector((state: any) => state.chat);
  console.log("activeConversation",activeConversation)

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
      console.log(responseToken.data);

      const { data } = await axios.get("/api/v1/auth/getUser");
      console.log(data);

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

  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      <div className="container min-h-screen flex">
        <Sidebar />
        {activeConversation._id ? <ChatContainer/> : <WhatsappHome />}
      </div>
    </div>
  );
}
