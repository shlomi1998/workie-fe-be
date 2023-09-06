import React from "react";

interface InputProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const Input: React.FC<InputProps> = ({ message, setMessage }) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  console.log("message", message);

  return (
    <div className="w-full">
      <input
        type="text"
        className="placeholder-white dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-[55vw] flex-1 rounded-lg pl-10 ml-[10px] border-0"
        placeholder="Type a message"
        value={message}
        onChange={onChangeHandler}
      />
    </div>
  );
};

export default Input;
