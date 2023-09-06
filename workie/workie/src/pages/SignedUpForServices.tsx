import "./SignedUpForWork.scss";
import React, { useContext } from "react";
import { TopNavbarEmployer, BottomNavBarMainScreen } from "../components/index";
import "./Employer.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import SignUp from "../components/SignUp";
import { ImCheckmark } from "react-icons/im";
import { TiUserDelete} from "react-icons/ti";


const SignedUpForServices = () => {
  const userContext = useContext(AppContext);
  const navigate = useNavigate();
  const [refreshPage, setRefreshPage] = useState(false);
  const [JobId, setJobId] = useState("");
  const [UserId, setUserId] = useState("");

  const [isTrue, setIsTrue]: any = useState(false);
  const [arrayDiv, setArrayDiv]: any = useState([]);
  const [allListed, setAllListed]: any = useState([]);
  const [iconVisible, setIconVisible] = useState(true);
  //   const [userAge,setUserAge]:any=useState("")

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ArrayDiv: any = [];
        const response = await axios.post("/api/v1/services/getJob", {
          jobType: userContext?.jobType,
        });

        const { SignUp }: any = response.data;
        const { _id }: any = response.data;
        console.log(_id);
        console.log(SignUp);
        //    SignUp.reverse();

        //     console.log(getJobs)
        //     // getJobs.forEach((element) => console.log(element));

        // for (let i in SignUp) {
        //     setAllListed(SignUp[i])
        //     console.log(allListed)
        // }

        for (let i in SignUp) {
          // console.log(Users[i]._id)
          // console.log(getAllJobs[i].createdBy);
          // console.log(getAllJobs[i]);
          const responseUser = await axios.post("/api/v1/auth/getUserDetails", {
            userId: SignUp[i],
          });
          console.log(responseUser.data);
          const today = new Date();
          const birth = new Date(responseUser.data.DateOfBirth);
          console.log(responseUser.data.DateOfBirth);
          const yearsDiff = today.getFullYear() - birth.getFullYear();
          let age;
          // Check if the birthday for this year has passed or not
          if (
            today.getMonth() < birth.getMonth() ||
            (today.getMonth() === birth.getMonth() &&
              today.getDate() < birth.getDate())
          ) {
            age = yearsDiff - 1;
          } else {
            age = yearsDiff;
          }
          console.log(age);

          ArrayDiv.push(
            <div className="registeredForWork" key={SignUp[i]}>
              <div className="registeredForWork__W">
                <img
                  className="registeredForWork__W__UserPhoto"
                  src={`./images/${responseUser.data.ImageSource}`}
                  alt="לא עולה :-("
                  onClick={() =>
                    navigateToEmployerProfile(responseUser.data._id)
                  }
                />
                <span className="registeredForWork__W__firstNameLastName">
                  {responseUser.data.firstName} {responseUser.data.lastName}
                </span>
                <span className="registeredForWork__W__age">age:{age}</span>
              </div>
              {/* <span className="fa-solid fa-xmark registeredForWork__xIcon"></span> */}
              < TiUserDelete
                title="By clicking this icon, a user is deleted from the job registration"
                id={_id}
                onClick={() =>
                  handleApproval(response.data._id, responseUser.data._id)
                }
                className="fa-solid fa-xmark registeredForWork__tiUserDelete"
              />
            </div>
          );

          // getUserImage(ArrayUserId[i])
        }
        setArrayDiv(ArrayDiv);
        // setArrayUserId(ArrayUserId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refreshPage]);

  const handleMarkClick = () => {
    setIconVisible(false);
  };

  const navigateToEmployerProfile = (userInformation: any) => {
    userContext?.setEmployerDetails(userInformation);
    if (userContext?.employerDetails !== "") {
      // console.log('employerDetails:',userContext?.employerDetails)
      // console.log('userInformation:',userContext?.employerDetails)
    }
    navigate("/EmployerDetails");
  };
  const handleClick = () => {
    setIsTrue(!isTrue);
    console.log(isTrue);
    if (isTrue) {
      console.log("dddd");
    }
  };

  const handleApproval = (jobId: any, userId: any) => {
    setIsTrue(!isTrue);
    setJobId(jobId);
    setUserId(userId);
    if (jobId && userId) {
      console.log(`/api/v1/services/${jobId}/${userId}`);
      const fetchJob = async () => {
        try {
          const response = await axios.delete(
            `/api/v1/services/${jobId}/${userId}`
          );
          console.log(response.data);
          if (response.data) {
            setRefreshPage(!refreshPage);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchJob();
    }
  };

  return (
    <div className="wrapsRegisteredUsers">
      <div className="navBar">
        <span className="navBar__title">registered for services</span>
      </div>
      <div>{arrayDiv}</div>

      {/* <div className={isTrue ? "deleteJob" : "deleteJob__hide"}>
        <span className="deleteJob__title"> Are you sure?</span>
        <button onClick={handleClick} className="deleteJob__buttonCancelation">
          cancelation
        </button>
        <button
          onClick={() => handleApproval}
          className="deleteJob__buttonApproval"
        >
          approval
        </button>
      </div> */}
    </div>
  )
}

export default SignedUpForServices
