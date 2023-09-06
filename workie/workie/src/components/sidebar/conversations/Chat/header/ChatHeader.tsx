import React from "react";
import { useSelector } from "react-redux";
import { DotsIcon, SearchLargeIcon } from "../../../../../svg";
import { capitalize } from "../../../../../utils/string";

export default function ChatHeader() {
  const { activeConversation } = useSelector((state: any) => state.chat);
  const { name, picture } = activeConversation;
  console.log(picture);
  console.log(activeConversation);
  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center p16 select-none">
      <div className=" w-full flex items-center justify-between ">
        <div className="flex items-center gap-x-4 ">
          <button className="btn ">
            <img
              src={`../images/${picture}`}
              alt={`${name} picture`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>

          <div className="flex flex-col">
            <p className="dark:text-white font-mono font-bold text-xl fond-bold ">
              {capitalize(name.split(" ")[0])}
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
