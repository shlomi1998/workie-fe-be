import React from 'react'
import './Services.scss'
import { useContext, useEffect, useState } from "react";
import { NavBarServiceScreen, BottomNavBarMainScreen } from "../components/index";
import UserContext from "../context/UserContext";
import { AppContext } from "../context/AppContext";
import "./MainScreen.scss";
import { useNavigate } from 'react-router-dom';


import axios from "axios";
axios.defaults.withCredentials = true;

// services

const Services = () => {
  const userContext = useContext(AppContext);
  const navigate = useNavigate();
  const isAdmin = useContext(AppContext);
  const [arrayDiv, setArrayDiv]: any = useState([]);
  const [arrayUserId, setArrayUserId]: any = useState([]);
  const ArrayUserId: any = [];
  const [jobId, setJobId] = useState("");
  const [isTrue, setIsTrue]: any = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  let i: any = 0;

  useEffect(() => {
    const fetchData = async () => {
      let i: any;
      try {
        const ArrayDiv: any = [];

        const response = await axios.get("/api/v1/services/get-all-Jobs");

        // const isAdmin:any=response.data;

        // console.log(response.data.getAllJobs[0]._id);
        // const ImageSource = response.data.getImgProfile.ImageSource;

        const { getAllJobs }: any = response.data;
        const { Users }: any = response.data;
       
        Users.reverse();

        for (let i in getAllJobs.reverse()) {
          // console.log(Users[i]._id)
          // console.log(getAllJobs[i].createdBy);
          // console.log(getAllJobs[i]);
          ArrayUserId[i] = getAllJobs[i].createdBy[0];
          const { _id } = getAllJobs[i];

          // פיצול התאריך לחלקים
          const parts = getAllJobs[i].date.split("-");
          // בניית התאריך בפורמט רגיל
          const formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
          ArrayDiv.push(
            <div className="all-Jobs__wrapper" id= {Users[i]._id} key={i} >
              <div className="all-Jobs__wrapper__wrapperUserName">
                <img
                  className="all-Jobs__wrapper__wrapperUserName__userPhoto"
                  src={`./images/${Users[i].createdBy.ImageSource}`}
                  alt="my picture"
                  onClick={() => navigateToEmployerProfile(Users[i]._id,getAllJobs[i].createdBy)}
                />

                <span className="all-Jobs__wrapper__wrapperUserName__userName">
                  {Users[i].createdBy.firstName} {Users[i].createdBy.lastName}
                </span>
              </div>

              <p className="all-Jobs__wrapper__typeWork">
                {getAllJobs[i].jobType}
              </p>
              <div className="all-Jobs__wrapper__jobDescription">
                <span className="span">{getAllJobs[i].jobDescription}</span>
              </div>
              <span
                id={_id}
                onClick={handleApproval}
                className={
                  isAdmin?.isAdmin
                    ? "fa-solid fa-trash all-Jobs__wrapper__iconTrash"
                    : "fa-solid fa-trash all-Jobs__wrapper__iconTrashHide"
                }
              ></span>
             
              <p className="all-Jobs__wrapper__location__services">
                {getAllJobs[i].exactLocation}{" "}
                <span className="fa-solid fa-location-dot iconLocation "></span>
              </p>
              <p className="all-Jobs__wrapper__rating__services">
                {3.5}{" "}
                <span className="fa-solid fa-star iconStar "></span>
                
              </p>

              {/* <p className="all-Jobs__wrapper__date">{formattedDate}</p>
              <p className="all-Jobs__wrapper__workHours">
                {getAllJobs[i].workHours}
              </p>
              <p className="all-Jobs__wrapper__hourlyWage">
                {getAllJobs[i].HourlyWage}
                <i className="fa-solid fa-shekel-sign"></i>
                <br />
                {"per hour"}
              </p> */}
            </div>
          );

          // getUserImage(ArrayUserId[i])
        }
        setArrayDiv(ArrayDiv);
        setArrayUserId(ArrayUserId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refreshPage]);

  const handleApproval = (event: any) => {
    setIsTrue(!isTrue);
    setJobId(event.target.id);

    if (isTrue) {
      const fetchJob = async () => {
        try {
          const response = await axios.delete(`/api/v1/services/${jobId}`);
          console.log(response.data);
          if (response.data) {
            setRefreshPage(!refreshPage)
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchJob();
    }
  };

  const handleClick = () => {
    setIsTrue(!isTrue);
    console.log(isTrue);
    if (isTrue) {
      console.log("dddd");
    }
  };


  const navigateToEmployerProfile = (jobType:any,userInformation:any) => {
    userContext?.setJobType(jobType);
    userContext?.setEmployerDetails(userInformation);
    if(userContext?.employerDetails!==""){
      // console.log('employerDetails:',userContext?.employerDetails)
      // console.log('userInformation:',userContext?.employerDetails)

    }
    navigate('/ServicesProfile');
  };




  return (
    <div className='servicesWraps'>
      <NavBarServiceScreen />
      <UserContext />
      <div className="jobs">
        <div className="all-Jobs">
          <div>{arrayDiv}</div>
        </div>

        <BottomNavBarMainScreen />
      </div>

      <div className={isTrue ? "deleteJob" : "deleteJob__hide"}>
        <span className="deleteJob__title"> Are you sure?</span>
        <button onClick={handleClick} className="deleteJob__buttonCancelation">
          cancelation
        </button>
        <button onClick={handleApproval} className="deleteJob__buttonApproval">
          approval
        </button>
      </div>
    </div>
  )
}

export default Services
