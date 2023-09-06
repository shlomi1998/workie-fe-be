import React from "react";
import Cookies from "js-cookie";
import { assert } from "console";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function Menu() {
  const navigate = useNavigate();

  const removeToken = async () => {
    try {
      console.log("bnnn");
      const response = await axios.post(
        "/api/v1/auth/deleteToken",
        {},
        {
          withCredentials: true, // אופציה זו גורמת לשליחת העוגיות בבקשה
        }
      );
      
    
    } catch (error) {
      console.error("Error while deleting cookie:", error);
    }
    navigate("/");
}

  return (
    <div className="absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
      <ul className="relative left-[-40px] list-none w-52">
        <li className="flex items-center hover:bg-dark_bg_3 py-3 pl-5 cursor-pointer">
          <span className="font-sans flex-grow">New group</span>
        </li>
        <li className="flex items-center hover:bg-dark_bg_3 py-3 pl-5 cursor-pointer">
          <span className="font-sans flex-grow">New community</span>
        </li>
        <li className="flex items-center hover:bg-dark_bg_3 py-3 pl-5 cursor-pointer">
          <span className="font-sans flex-grow">Settings</span>
        </li>
        <li
          onClick={removeToken}
          className="flex items-center hover:bg-dark_bg_3 py-3 pl-5 cursor-pointer"
        >
          <span className="font-sans flex-grow">logout</span>
        </li>
      </ul>
    </div>
  );
}
