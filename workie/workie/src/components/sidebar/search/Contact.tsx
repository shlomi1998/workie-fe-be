import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { open_create_conversation } from "../../../features/chatSlice";

type ContactProps = {
  contact: {
    _id: string;
    ImageSource: string;
    firstName: string;
    lastName: string;
    status: string;
  };
  setSearchResults: (results: any[]) => any;
};

export default function Contact({ contact, setSearchResults }: ContactProps) {
  // const getToken = async (e: any) => {
  //   try {
  //     const response = await axios.get("/api/v1/auth/getToken");
  //     const token = response.data;
  //     // console.log(token);
  //     values.token = token;
  //   } catch (error: any) {
  //     console.log(error);
  //     console.log(error.response?.data?.error?.message);
  //   }
  // };

  // console.log(contact);

  const dispatch: any = useDispatch();
  const user: any = useSelector((state: any) => state.user);


  // console.log(contact)
  let values: any = {};

  if (user && user.user) {
    const { token } = user.user;
    // console.log(token);
    // console.log(contact._id)
    if (token) {
      values = {
        receiver_id:contact._id,
        token: token,
      };
    }
  }

  //  /* Vector */

  // console.log(values.receiver_id)
  // console.log(values)

  const openConversation = () => {
    console.log(values)
    dispatch(open_create_conversation(values));
  };

  return (
    <li
      onClick={openConversation}
      className="relative  right-[40px] list-none w-[100%] h-[72px] hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 "
    >
      {/*Container*/}
      <div className="flex items-center gap-x-3 py-[0px]">
        {/*Contact infos*/}
        <div className="flex items-center gap-x-3">
          {/*Conversation user picture*/}
          <div className="bottom-3 relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={`../images/${contact.ImageSource}`}
              alt={contact.firstName}
              className="relative  w-full h-full object-cover "
            />
          </div>
          {/*Conversation name and message*/}
          <div className="w-full flex flex-col">
            {/*Conversation name*/}
            <p className=" relative top-0 font-bold flex items-center gap-x-2">
              {contact.firstName}{" "}{contact.lastName}
            </p>
            {/* Conversation status */}
            <div>
              <div className="relative bottom-7 flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p>{contact.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*Border*/}
      <div className="ml-16 border-b dark:border-b-dark_border_1"></div>
    </li>
  );
}
// ... (rest of the code)

// const ContactWithContext = (props) => (
//   <SocketContext.Consumer>
//     {(socket) => <Contact {...props} socket={socket} />}
//   </SocketContext.Consumer>
// );

// export default ContactWithContext;
