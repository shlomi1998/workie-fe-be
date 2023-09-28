import React from 'react'
import { useContext, useEffect, useState } from "react";
import "./EmployerProfile.scss";
import { AppContext } from "../context/AppContext";
import { TbFlag } from "react-icons/tb";
import { TbMessageCircle2 } from "react-icons/tb";
import { AiFillStar } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { reverse } from "dns";
import { userInfo } from "os";
import { ServicesDescription } from "../components/index";


const ServicesProfile = () => {
    const navigate = useNavigate();
  const userContext = useContext(AppContext);
  const [userId, setUserId] = useState('');
  const [imageSrc, setImageSrc] = useState("./images/ProfileImg.jpg");
  const [selectedButton, setSelectedButton] = useState(null);
  const [isTrue, setIsTrue]: any = useState(false);
  const [jobRegistration, setJobRegistration]: any = useState(false);
  const [jobDetails, setJobDetails]: any = useState({
    jobType: "",
    date: "",
    workHours: "",
    exactLocation: "",
    HourlyWage: "",
  });

  const [userPhoto, setUserPhoto] = useState("");
  const [userDetails, setUserDetails]: any = useState({
    firstName: "",
    lastName: "",
  });

  // setPerson({ firstName: event.target.value });

  useEffect(() => {
    const getJob = async () => {
      console.log(userContext?.jobType);
      // if(userContext?.jobType!==""){

      try {
        const response = await axios.post("/api/v1/services/getJob", {
          jobType: userContext?.jobType,
        });

        const { jobType, date, workHours, exactLocation, HourlyWage } =
          response.data;
        if (
          jobType &&
          date &&
          workHours &&
          exactLocation &&
          HourlyWage !== ""
        ) {
          const parts = date.split("-");
          const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
          console.log(formattedDate);
          setJobDetails({
            jobType: jobType,
            date: formattedDate,
            workHours: workHours,
            exactLocation: exactLocation,
            HourlyWage: HourlyWage,
          });
        }

        const userResponse = await axios.post("/api/v1/auth/getUserDetails", {
          userId: userContext?.employerDetails,
        });

        const { ImageSource, firstName, lastName } = userResponse.data;
        setUserPhoto(ImageSource);
        setUserDetails({ firstName: firstName, lastName: lastName });
        // console.log(userPhoto)
        // console.log(ImageSource)
      } catch (error) {
        console.log(error);
      }
      // }
    };
    getJob();

    if (userContext?.employerDetails=="") {
      navigate('/MainScreen');
   }
  }, []);

  console.log(userContext?.jobType, userContext?.employerDetails);

  //לעשות שני משתנים 1 עבור כל כפתור בשביל הצבעים לאחר מכן להוסיף תקומפוננטה החדשה שני הקומפוננטות אמורות להתחלף במקום התפריט
  const handleButtonClick = (buttonIndex: any) => {
    setSelectedButton(buttonIndex);
  };

  const handleClick = () => {
    setIsTrue(!isTrue);
    console.log(isTrue);
  };

  const handleApproval = async (event: any) => {
    setIsTrue(!isTrue);
    try {
      const response = await axios.post(
        "/api/v1/auth/reportOnWork",
        {
          firstName: userDetails.firstName,
          lastName: userDetails.lastName,
          jobType: userContext?.jobType,
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  const handleRegistration=async()=>{
   setJobRegistration(!jobRegistration);
  //  try {
  //   const response = await axios.post(`/addUserId/${userId}`);
  //   setMessage(response.data.message);
  // } catch (error) {
  //   console.error(error);
  //   setMessage('An error occurred');
  // }
  }
  const CancellationOfRegistration =async()=>{
   setJobRegistration(!jobRegistration);
  }
  const registrationConfirmation=async()=>{
    //אם הוא אישר זה ישלח בקשה לרישום כאן חוסיף למערך את ה id שלן
    console.log(`/api/v1/services/addRegisteredUser/${userContext?.jobType}/${userContext?.employerDetails}`)
    try {
      const response = await axios.post(`/api/v1/services/addRegisteredUser/${userContext?.jobType}/${userContext?.employerDetails}`);

      console.log(response.data)
    } catch (error) {
      console.error(error);
      
    }
    // console.log(userContext?.employerDetails)
    setJobRegistration(!jobRegistration);
  }



  return (
    <div className="EmployerProfile">
      <nav className="EmployerProfile__nav">
        <span className="EmployerProfile__nav__JobOffer">services offer </span>
        <TbFlag
          className="EmployerProfile__nav__report"
          onClick={handleClick}
        />
        {/* <TbMessageCircle2 className=" EmployerProfile__nav__sendMessage" /> */}
        <i className="fa-regular fa-comments EmployerProfile__nav__message"></i>
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
          <p className="EmployerProfile__details__w__rating">4.8</p>
          <AiFillStar className="EmployerProfile__details__w__iconStar">
            {" "}
          </AiFillStar>
        </div>
      </div>

      <div className="EmployerProfile__CreatingEmployerContact ">
        <Link
          className="EmployerProfile__CreatingEmployerContact__ViewEmployerProfile"
          to={"/EmployerDetails"}
        >
          displaying an employer profile{" "}
        </Link>
      </div>

      <button
        onClick={() => handleButtonClick(1)}
        className={`EmployerProfile__jobDescription ${
          selectedButton === 1
            ? "EmployerProfile__jobDescriptionC"
            : "EmployerProfile__jobDescription"
        }`}
      >
        services description
      </button>
      <button
        onClick={() => handleButtonClick(2)}
        className={`EmployerProfile__jobDetails ${
          selectedButton === 1
            ? "EmployerProfile__jobDetailsC"
            : "EmployerProfile__jobDetails"
        }`}
      >
        services details
      </button>

      {selectedButton === 1 ? (
        <ServicesDescription />
      ) : (
        <div className="EmployerProfile__JobDetailsForRegistration">
          <span className="EmployerProfile__JobDetailsForRegistration__left">
            job type:
          </span>
          <span className="EmployerProfile__JobDetailsForRegistration__center">
            {jobDetails.jobType}
          </span>
          <hr className="hr" color="#5ce3b6"></hr>
          <span className="EmployerProfile__JobDetailsForRegistration__left">
            date:
          </span>
          <span className="EmployerProfile__JobDetailsForRegistration__center">
            {jobDetails.date}
          </span>
          <hr className="hr" color="#5ce3b6"></hr>
          <span className="EmployerProfile__JobDetailsForRegistration__left">
            work hours:
          </span>
          <span className="EmployerProfile__JobDetailsForRegistration__center">
            {jobDetails.workHours}
          </span>
          <hr className="hr" color="#5ce3b6"></hr>
          <span className="EmployerProfile__JobDetailsForRegistration__left">
            exact location:
          </span>
          <span className="EmployerProfile__JobDetailsForRegistration__center">
            {jobDetails.exactLocation}
          </span>
          <hr className="hr" color="#5ce3b6"></hr>
          <span className="EmployerProfile__JobDetailsForRegistration__left">
            Hourly wage:
          </span>
          <span className="EmployerProfile__JobDetailsForRegistration__center">
            {jobDetails.HourlyWage}
          </span>
        </div>
      )}

      <button onClick={handleRegistration} className="EmployerProfile__forRegistrationButton">
        for registration <i className="fa-solid fa-arrow-left icon"></i>
      </button>

      {isTrue ? (
        <div
          className={
            isTrue ? "EmployerProfile__report" : "EmployerProfile__reportHide"
          }
        >
          <span className="EmployerProfile__report__title">
            {" "}
            You sure want to report this services?
          </span>

          <button
            onClick={handleClick}
            className="EmployerProfile__report__buttonCancelation"
          >
            Cancelation
          </button>
          <button
            onClick={handleApproval}
            className="EmployerProfile__report__buttonApproval"
          >
            Approval
          </button>
        </div>
      ) : (
        ""
      )}


      {/* //------------------------------------------------------------------------ */ }
      {jobRegistration ? (
        <div
          className={
            jobRegistration ? "EmployerProfile__report" : "EmployerProfile__reportHide"
          }
        >
          <span className="EmployerProfile__report__title">
            {" "}
            Are you sure you would like to apply for this services?
          </span>

          <button
            onClick={CancellationOfRegistration}
            className="EmployerProfile__report__buttonCancelation"
          >
            Cancelation
          </button>
          <button
            onClick={registrationConfirmation}
            className="EmployerProfile__report__buttonApproval"
          >
            Approval
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ServicesProfile
