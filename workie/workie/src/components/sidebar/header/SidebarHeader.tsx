import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CommunityIcon, DotsIcon } from "../../../svg";
import { StoryIcon } from "../../../svg";
import { ChatIcon } from "../../../svg";
import Menu from "./Menu";

export default function SidebarHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const PathImagesFolder = "../../../server/build/images/";
  const navigate = useNavigate();
  const [user, setUser]: any = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellphoneNumber: "",
    password: "",
    gender: "",
    DateOfBirth: "",
    location: "",
    ImageSource: "",
    status: "",
  });

  const getUser = async () => {
    try {
      const response = await axios.get("/api/v1/auth/getUser");

      const {
        firstName,
        lastName,
        email,
        cellphoneNumber,
        password,
        gender,
        DateOfBirth,
        location,
        ImageSource,
        status,
      }: any = response.data;

      setUser({
        firstName: firstName,
        lastName: lastName,
        email: email,
        cellphoneNumber: cellphoneNumber,
        password: password,
        gender: gender,
        DateOfBirth: DateOfBirth,
        location: location,
        ImageSource: ImageSource,
        status: status,
      });
    } catch (error) {
      console.log(error);
    }
  };

  getUser();

  return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center p16 sticky top-[7px]">
      <div className="w-full flex items-center justify-between">
        <button className="btn ">
          <img
            className="btn"
            src={
              user.ImageSource
                ? `../images/${user.ImageSource}`
                : `../images/ProfileImg.jpg`
            }
            alt={`${user.firstName} ${" "} ${user.lastName}`}
          />
        </button>
        <ul className="flex items-center gap-x-2 5 list-none relative left-5">
          <li>
            <button className="dark:bg-dark_bg_2 border-0 btn">
              <CommunityIcon className={"dark:fill-dark_svg_1"} />
            </button>
          </li>
          <li>
            <button className="dark:bg-dark_bg_2 border-0 btn">
              <StoryIcon
                className={"dark:fill-dark_svg_1"}
                active={undefined}
              />
            </button>
          </li>
          <li>
            <button className=" dark:bg-dark_bg_2 border-0 btn">
              <ChatIcon className={"dark:fill-dark_svg_1"} />
            </button>
          </li>
          <li className="cursor-pointer relative " onClick={()=>setShowMenu((prev) => !prev)}>
            <button className={` dark:bg-dark_bg_2 border-0 btn  ${showMenu ? "bg-dark_hover_1":""}`}>
              <DotsIcon className={" dark:fill-dark_svg_1"} />{" "}
            </button>
            {showMenu ? <Menu /> : null}
          </li>
        </ul>
      </div>
    </div>
  );
}
