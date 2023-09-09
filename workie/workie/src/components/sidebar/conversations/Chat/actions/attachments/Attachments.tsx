import React, { useState } from "react";
import { AttachmentIcon } from "../../../../../../svg";
import Menu from "./Menu";

const Attachments = () => {
  const [show, setShow] = useState(false);
  return (
    <li className="relative">
      <button
        onClick={() => setShow(prev => !prev)}
        type="button"
        className="btn  dark:bg-dark_bg_2 border-0 relative left-2  "
      >
        <AttachmentIcon className="dark:fill-dark_svg_1 " />
      </button>
      {show ? <Menu /> : null}
    </li>
  );
};

export default Attachments;
