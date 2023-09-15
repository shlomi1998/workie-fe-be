import moment from "moment";
import { relative } from "path";
import React from "react";
import { TraingleIcon } from "../../../../../svg";
import  {AiOutlineCaretDown} from 'react-icons/ai'

interface MessageProps {
  message: {
    _id: string;
    message: string;
    createdAt: any;
    sender: {
      _id: string;
    };
  };
  me: boolean;
}

const Message: React.FC<MessageProps> = ({ message ,me}) => {
  
  return (
    <div
      className={`w-full flex mt-2  mb-6 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      <div>
        <div
          className={`relative h-full dark:text-dark_text_1 rounded-lg
        ${me ? "bg-green_3 " : "dark:bg-dark_bg_2"}
        `}
        >
          <p className="text-right mb-2 h-fll  text-sm pl-2 pr-2 pt-2 ">
            {message.message}
          </p>
          <span className="text-xs text-dark_text_2 absolute bottom-1 right-2">
            {moment(message.createdAt).format("HH:mm")}
          </span>
          <span>
            {!me ? (
              < AiOutlineCaretDown size={30} className=" dark:fill-dark_bg_2 absolute  top-[-9px] left-[-11px] " />
            ) : null}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Message;
