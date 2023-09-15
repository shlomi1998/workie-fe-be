import React, { useState } from "react";
import { AttachmentIcon } from "../../../../../../svg";
import Menu from "./Menu";

// Define the prop types for the Attachments component
interface AttachmentsProps {
  showAttachments: boolean;
  setShowAttachments: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

const Attachments: React.FC<AttachmentsProps> = ({ showAttachments, setShowAttachments,setShowPicker }) => {

  return (
    <li className="relative">
      <button
        onClick={() => {
          setShowPicker(false);
          setShowAttachments(prev => !prev)
        }}
        type="button"
        className="btn dark:bg-dark_bg_2 border-0 relative left-2"
      >
        <AttachmentIcon className="dark:fill-dark_svg_1 " />
      </button>
      {showAttachments ? <Menu /> : null}
    </li>
  );
};

export default Attachments;
