import React from "react";
import { useSelector } from "react-redux";
import { DotsIcon, SearchLargeIcon } from "../../../../../svg";
import { capitalize } from "../../../../../utils/string";


export default function ChatHeader() {
  const { activeConversation } = useSelector((state: any) => state.chat);
  const { name, picture } = activeConversation;
  const { user } = useSelector((state:any) => state.user);
  // console.log("user",user)
  // console.log("activeConversation",activeConversation.users)


  
//  const getConversationId = (user: any, users: any):any => {
//   if (!users || users.length < 2) return null;
//   return users[0]._id === user.id ? users[0]._id : users[1]._id;
// };

const getConversationName = (user: any, users: any):any => {
  if (!users || users.length < 2) return '';
  return users[0]._id === user.id ? users[1].firstName
  : users[0].firstName
  ;
};

 const getConversationPicture = (user: any, users: any):any => {
  if (!users || users.length < 2) return '';
  return users[0]._id === user.id ? users[1].ImageSource
  : users[0].ImageSource;
};

// export const checkOnlineStatus = (onlineUsers:any, user:any, users:any) => {
//   let convoId = getConversationId(user, users);
//   let check = onlineUsers.find((u:any) => u.userId === convoId);
//   return check ? true : false;
// };

  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none pt-[20px]">
      <div className=" w-full flex items-center justify-between ">
        <div className="flex items-center gap-x-4 ">
          <button className="btn ">
            <img
              src={`../images/${getConversationPicture(user, activeConversation.users)}`}
              alt=""
              className="w-[40px] h-[40px] rounded-full object-cover"
            />
          </button>

          <div className="flex flex-col">
            <p className="dark:text-dark_svg_2 font-mono font-bold text-xl fond-bold ">
              { getConversationName(user, activeConversation.users).split(" ")[0]}
            </p>
            <span className="text-xs relative bottom-[20.5px]  dark:text-dark_svg_2 text-white font-mono font-bold">
              online
            </span>
          </div>
        </div>
        <ul className="flex items-center gap-x-2.5 list-none">
          <li>
            <button className="btn dark:bg-dark_bg_2 border-0">
              <SearchLargeIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
          <li>
            <button className="btn  dark:bg-dark_bg_2 border-0">
              <DotsIcon className="dark:fill-dark_svg_1" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
