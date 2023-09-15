import React, { useEffect, useState } from "react";
import { EmojiIcon, CloseIcon } from "../../../../../svg";

import EmojiPicker from "emoji-picker-react";

enum Theme {
  LIGHT = "light",
  DARK = "dark",
}
interface EmojiPickerAppProps {
  textRef: any;
  message: any;
  showPicker: any;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAttachments: React.Dispatch<React.SetStateAction<boolean>>;
}

const EmojiPickerApp: React.FC<EmojiPickerAppProps> = ({
  textRef,
  message,
  setMessage,
  setShowPicker,
  showPicker,
  setShowAttachments,
}) => {
  const [cursorPosition, setCursorPosition] = useState();



  const handleEmoji = (emojiData: any) => {
    const { emoji } = emojiData;
    const ref = textRef.current;
    ref.focus();
    
    let currentPos = ref.selectionStart;
    let nextSpace = message.indexOf(' ', currentPos);
    if (nextSpace === -1) nextSpace = message.length;  // If it's the last word
    
    const start = message.substring(0, nextSpace);
    const end = message.substring(nextSpace);
    
    const newText = start + emoji + end;

    setMessage(newText);

    const newCursorPosition = start.length + emoji.length;
    ref.selectionStart = newCursorPosition;
    ref.selectionEnd = newCursorPosition;
};

  // const handleEmoji = (emojiData: any, e: any) => {
  //   const { emoji } = emojiData;
  //   const ref = textRef.current;
  //   ref.focus();
  //   const start = message.substring(0, ref.selectionStart);
  //   const end = message.substring(ref.selectionStart);
  //   const newText = start + emoji + end;
  //   setMessage(newText);
  //   setCursorPosition(start.length + emoji.length);
  // };

  // useEffect(() => {
  //   textRef.current.selectionEnd = cursorPosition;
  // }, [cursorPosition]);
  
  return (
    <li className="w-full">
      <button
        className="btn dark:bg-dark_bg_2 border-0 absolute left-4"
        type="button"
        onClick={() => {
          setShowAttachments(false);
          setShowPicker((prev: any) => !prev);
        }}
      >
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1 bg-gray-400 " />
        ) : (
          <EmojiIcon className="dark:fill-dark_svg_1 bg-gray-700 " />
        )}
      </button>

      {showPicker ? (
        <div className="openEmojiAnimation absolute bottom-[70px] left-[6px] w-full ">
          <EmojiPicker theme={Theme.DARK} onEmojiClick={handleEmoji} />
        </div>
      ) : null}
    </li>
  );
};
export default EmojiPickerApp;
