import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../context/AppContext";
import axios from "axios";
import "./JobDescription.scss";

const JobDescription = () => {
  const userContext = useContext(AppContext);
  const [jobDescription, setJobDescription] = useState("");

  useEffect(() => {
    const getJob = async () => {
      try {
        const response = await axios.post("/api/v1/jobs/getJob", {
          jobType: userContext?.jobType,
        });

        const { jobDescription } = response.data;
        console.log(jobDescription);
        if (jobDescription !== "") {
          setJobDescription(jobDescription);
        }
      } catch (error) {
        console.log(error);
      }
      // }
    };
    getJob();
  }, []);
  return (
    <div className="jobDescriptionWraps">
      <div className="jobDescriptionWraps__allDetails">
        {jobDescription}
       
        
        
      </div>
    </div>
  );
};

export default JobDescription;
