import React from "react";
import { AttachmentIcon } from "../../../../../svg";

const Attachments = () => {
  return (
    <li className="relative">
      <button className="btn  dark:bg-dark_bg_2 border-0 relative left-2  ">
       <AttachmentIcon className="dark:fill-dark_svg_1 "/> 
      </button>
    </li>
  );
};

export default Attachments;
