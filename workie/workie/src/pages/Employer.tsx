import React, { useContext } from "react";
import { TopNavbarEmployer, BottomNavBarMainScreen } from "../components/index";
import "./Employer.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {AppContext} from "../context/AppContext";
axios.defaults.withCredentials = true;

function Employer() {
  const userContext = useContext(AppContext);
  const navigate = useNavigate();
  const [refreshPage,setRefreshPage]=useState(false);
  const [jobId, setJobId] = useState("");
  const [isTrue, setIsTrue]:any = useState(false);
  const [arrayDiv, setArrayDiv]: any = useState([]);
  const [person, setPerson]: any = useState({
    firstName: "",
    lastName: "",
    cellphoneNumber: "",
    email: "",
    password: "",
  });
  const AddAJobPage = (event: any) => {
    event.preventDefault();
    navigate("/AddJob");
  };


  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const ArrayDiv: any = [];
        const response = await axios.get("/api/v1/jobs/getJobs");
        const ImageSource = response.data.getImgProfile.ImageSource;

        const { getJobs }: any = response.data;
        getJobs.reverse();

        console.log(getJobs)
        // getJobs.forEach((element) => console.log(element));
        for (let i in getJobs) {
          console.log(getJobs[i]);
          const {_id}=getJobs[i];
          // פיצול התאריך לחלקים
          const parts = getJobs[i].date.split("-");
          // בניית התאריך בפורמט רגיל
          const formattedDate = parts[2] + "/" + parts[1] + "/" + parts[0];
          ArrayDiv.push(
            <div className="addingWork__myWork__div" key={i}>
              <img
                className="addingWork__myWork__div__userPhoto"
                src={`./images/${ImageSource}`}
                alt="my picture"
                onClick={() => navigateToEmployerProfile(getJobs[i]._id)}
              />
              <p className="addingWork__myWork__div__typeWork">
                {getJobs[i].jobType}
              </p>
              <div className="addingWork__myWork__div__jobDescription">
                <span className="span">{getJobs[i].jobDescription}</span>
              </div>
              <span id={_id} onClick={handleApproval} className="fa-solid fa-trash addingWork__myWork__div__iconTrash"></span>
              <p className="addingWork__myWork__div__location">
                {getJobs[i].exactLocation}{" "}
                <span className="fa-solid fa-location-dot"></span>
              </p>
              <p className="addingWork__myWork__div__date">{formattedDate}</p>
              <p className="addingWork__myWork__div__workHours">
                {getJobs[i].workHours}
              </p>
              <p className="addingWork__myWork__div__hourlyWage">
                {getJobs[i].HourlyWage}
                <i className="fa-solid fa-shekel-sign"></i>
              </p>
            </div>
          );
        }
        setArrayDiv(ArrayDiv);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const handleApproval= (event:any) => {
    setIsTrue(!isTrue);
    setJobId(event.target.id);

   if(isTrue){
    const fetchJob = async () => {
      try {
        const response = await axios.delete(`/api/v1/jobs/${jobId}`);
       console.log(response.data)
       if(response.data){
        window.location.reload();
       }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJob()
  }
  



    };
 

  const handleClick= () => {
    setIsTrue(!isTrue);
    console.log(isTrue)
    if(isTrue){
      console.log("dddd")
    }
    };

    const navigateToEmployerProfile = (jobId:any) => {
      userContext?.setJobType(jobId);
      console.log(jobId)
      if(userContext?.jobType!==""){
        // console.log('employerDetails:',userContext?.employerDetails)
        // console.log('userInformation:',userContext?.employerDetails)
  
      }
      navigate('/SignedUpForWork');
    };

 
  return (
    <div className="coversAnEmployer">
      <TopNavbarEmployer />
      <div className="addingWork">
        <div className="addingWork__myWork">
          <div>{arrayDiv}</div>
        </div>

        <div className="addingWork__button" onClick={AddAJobPage}>
          <span className="fa-solid fa-plus iconPlus"></span>
        </div>

        <div className={isTrue?"addingWork__deleteJob":"addingWork__deleteJobHide"}>
        <span className="addingWork__deleteJob__title"> Are you sure?</span>
        <span className="fa-solid fa-trash addingWork__deleteJob__iconTrash"></span>
          <button onClick={handleClick} className="addingWork__deleteJob__buttonCancelation">Cancelation</button>
          <button onClick={handleApproval} className="addingWork__deleteJob__buttonApproval">Approval</button>
        </div>
        <BottomNavBarMainScreen />
      </div>
     
    </div>
  );
}

export default Employer;
