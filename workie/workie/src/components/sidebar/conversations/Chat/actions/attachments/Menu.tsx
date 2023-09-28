import React, { useState } from "react";
import {
  ContactIcon,
  DocumentIcon,
  PhotoIcon,
  PollIcon,
  StickerIcon,
} from "../../../../../../svg";

export default function Menu() {
  const [show, setShow] = useState(false);
  return (
    <ul className="list-none absolute bottom-14 openEmojiAnimation  -left-12">
      <li>
        <button type="button" className="rounded-full bg-[#02A698] border-0">
          <PollIcon />
        </button>
      </li>
      <li>
        <button type="button" className="bg-[#0EABF4] rounded-full border-0">
          <ContactIcon />
        </button>
      </li>
      <li>
        <button type="button" className=" bg-[#5F66Cd] rounded-full border-0">
          <DocumentIcon />
        </button>
      </li>
      <li>
        <button type="button" className="rounded-full bg-[#D3396D] border-0">
          <ContactIcon />
        </button>
      </li>
      <li>
        <button type="button"  className="rounded-full bg-[#0063CB] border-0">
          <StickerIcon />
        </button>
      </li>
      <li>
        <button type="button" className=" rounded-full bg-[#BF59CF] border-0 ">
          <PhotoIcon />
        </button>
      </li>
    </ul>
  );
}
