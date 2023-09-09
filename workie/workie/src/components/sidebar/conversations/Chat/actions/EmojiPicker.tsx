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
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const EmojiPickerApp: React.FC<EmojiPickerAppProps> = ({
  textRef,
  message,
  setMessage,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();

  const handleEmoji = (emojiData: any, e: any) => {
    const { emoji } = emojiData;
    // const ref = textRef.current;
    // ref.focus();
    // const start = message.substring(0, ref.selectionStart);
    // const end = message.substring(ref.selectionStart);
    // const newText = start + emoji + end;
    // // console.log(newText)
    setMessage(emoji);
    // setCursorPosition(start.length + emoji.length);
    // console.log(start.length + emoji.length)
    // console.log(newText)
  };

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  return (
    <li className="w-full">
      <button
        className="btn dark:bg-dark_bg_2 border-0 absolute left-4"
        type="button"
        onClick={() => setShowPicker((prev: any) => !prev)}
      >
        {showPicker ? (
          <CloseIcon className="dark:fill-dark_svg_1 bg-gray-700 " />
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
