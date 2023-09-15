import React, { useContext, useEffect, useState } from "react";
import "./EmployerDetails.scss";
import { Link, useNavigate } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { TbFlag } from "react-icons/tb";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { IoLogoWhatsapp } from "react-icons/io";
import { JobDescription, Reviews } from "../components/index";
const EmployerDetails = () => {
  const navigate = useNavigate();
  const userContext = useContext(AppContext);
  const [userPhoto, setUserPhoto] = useState("");
  const [imageSrc, setImageSrc] = useState("./images/ProfileImg.jpg");
  const [selectedButton, setSelectedButton] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isTrue, setIsTrue]: any = useState(false);

  const [userDetails, setUserDetails]: any = useState({
    firstName: "",
    lastName: "",
    cellphoneNumber: "",
    email: "",
  });
  useEffect(() => {
    const getUser = async () => {
      // if(userContext?.jobType!==""){
      try {
        const userResponse = await axios.post("/api/v1/auth/getUserDetails", {
          userId: userContext?.employerDetails,
        });

        const { ImageSource, firstName, lastName, cellphoneNumber, email } =
          userResponse.data;
        setUserPhoto(ImageSource);
        setUserDetails({
          firstName: firstName,
          lastName: lastName,
          cellphoneNumber: cellphoneNumber,
          email: email,
        });
        setPhoneNumber(cellphoneNumber.substring(1));
        // console.log(userPhoto)
        // console.log(ImageSource)

        // if (cellphoneNumber === "") {
        //   navigate("/");
        // }

        
      } catch (error) {
        console.log(error);
      }
      // }
     
    };
    getUser();
    // userDetails.firstName
  }, []);

  const handleButtonClick = (buttonIndex: any) => {
    setSelectedButton(buttonIndex);
  };

  const handleWhatsAppClick = () => {
    // const countryCode = '+972';
    // const fullPhoneNumber = `${countryCode}${phoneNumber}`;
    // console.log(fullPhoneNumber)
    const fullPhoneNumber = encodeURIComponent(`972${phoneNumber}`);
    window.location.href = `https://api.whatsapp.com/send?phone=${fullPhoneNumber}`;
  };

  const handleClick = () => {
    setIsTrue(!isTrue);
    console.log(isTrue);
  };



  return (
    <div className="EmployerProfile">
      <nav className="EmployerProfile__nav">
        <span className="EmployerProfile__nav__JobOffer">employer profile</span>
        {/* <TbFlag
          className="EmployerProfile__nav__report"
          onClick={handleClick}
        /> */}
        {/* <TbMessageCircle2 className=" EmployerProfile__nav__sendMessage" /> */}
        {/* <i className="fa-regular fa-comments EmployerProfile__nav__message"></i> */}
      </nav>

      <div className="EmployerProfile__details">
        <img
          className="EmployerProfile__details__profilePicture"
          src={userPhoto === "" ? imageSrc : `./images/${userPhoto}`}
          alt="NOT GOOD BROO"
        />
        <p className="EmployerProfile__details__companyName">
          {userDetails.firstName} {userDetails.lastName}
        </p>
        <div className="EmployerProfile__details__w">
          <p className="EmployerProfile__details__w__rating">0</p>
          <AiFillStar className="EmployerProfile__details__w__iconStar">
            {" "}
          </AiFillStar>
        </div>
      </div>

      <div className="EmployerProfile__iconWhatsapp">
        <IoLogoWhatsapp onClick={handleWhatsAppClick} />
      </div>
      <br />
      <br />

      <button
        onClick={() => handleButtonClick(1)}
        className={`EmployerProfile__jobDescription ${
          selectedButton === 1
            ? "EmployerProfile__jobDescriptionC"
            : "EmployerProfile__jobDescription"
        }`}
      >
        reviews
      </button>
      <button
        onClick={() => handleButtonClick(2)}
        className={`EmployerProfile__jobDetails ${
          selectedButton === 1
            ? "EmployerProfile__jobDetailsC"
            : "EmployerProfile__jobDetails"
        }`}
      >
        Employer details
      </button>
      <br />


      {selectedButton === 1 ? (
        <Reviews />
      ) : (
        <div className="EmployerProfile__JobDetailsForRegistration">
          <span className="EmployerProfile__JobDetailsForRegistration__left">
            cell phone :
          </span>
          <span className="EmployerProfile__JobDetailsForRegistration__center">
            {userDetails.cellphoneNumber}
          </span>
          <hr className="hr" color="#5ce3b6"></hr>
          <span className="EmployerProfile__JobDetailsForRegistration__left">
            email :
          </span>
          <span className="EmployerProfile__JobDetailsForRegistration__center">
            {userDetails.email}
          </span>
          <hr className="hr" color="#5ce3b6"></hr>
        </div>
      )}

      
    </div>
  );
};

export default EmployerDetails;
