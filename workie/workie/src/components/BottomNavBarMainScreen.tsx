import React, { useContext } from "react";
import "./BottomNavBarMainScreen.scss";
import { useNavigate } from "react-router-dom";
import {AppContext} from "../context/AppContext";
import {FaNewspaper} from "react-icons/fa";
import {FaWrench} from "react-icons/fa"
import {CgProfile} from "react-icons/cg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';


const BottomNavBarMainScreen: React.FC = () => {
  const navigate = useNavigate();
  const userContext = useContext(AppContext);

  const handleClick = (tabName: string) => {
    userContext?.setActiveTab(tabName);
    navigate(`/${tabName}`);
  };

  return (
    <div className="position">
      <div
        className={ userContext?.activeTab === "MyProfile" ? "my-profile-mark" : "my-profile"}
        onClick={() => handleClick("MyProfile")}
      >
        <CgProfile className="fa-regular fa-id-badge my-profile__icon "></CgProfile>
        <span className="my-profile__text">my profile </span>
      </div>

      <div
        className={ userContext?.activeTab === "Services" ? "services-mark" : "services"}
        onClick={() => handleClick("Services")}
      >
        <FaWrench className="fa-solid fa-screwdriver-wrench services__icon "></FaWrench>
        <span className="services__text">services </span>
      </div>

      <div
        className={ userContext?.activeTab === "MainScreen" ? "jobs" : "off-job-marking"}
        onClick={() => handleClick("MainScreen")}
      >
        <FontAwesomeIcon icon={faNewspaper}  className="fa-regular fa-newspaper jobs__icon" />
        
        <span className="jobs__text">jobs</span>
      </div>
    </div>
  );
};

export default BottomNavBarMainScreen;
