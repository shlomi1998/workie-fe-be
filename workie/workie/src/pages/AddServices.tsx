import React from 'react'
import "./AddJob.scss";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;


const AddServices = () => {
    const navigate = useNavigate();
    const [newJob, setNewJob]: any = useState({
      jobType: "",
      date: "",
      workHours: "",
      exactLocation: "",
      HourlyWage: "",
      AgeRestriction: "",
      jobDescription: "",
      createdBy: "",
    });
  
    const handleChange = (event: any) => {
      setNewJob({
        ...newJob,
        [event.target.id]: event.target.value,
      });
    };
  
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      try {
        const response = await axios.post("/api/v1/services/create-job", newJob, {
          withCredentials: true,
        });
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
  
      navigate("/ServiceProvider");
    };
  
  
  return (
    <div>
    <div className="navBarAddJob">
      <span className="navBarAddJob__Titel"> create new service</span>
    </div>
    <div className="wrapsAddJob">
      <form onSubmit={handleSubmit} className="wrapsAddJob__from">
        <label className="wrapsAddJob__from__label">
          The details of the shift{" "}
        </label>
        <input
          required
          className="wrapsAddJob__from__jobType"
          type="text"
          id="jobType"
          placeholder=" service type"
          value={newJob.jobType}
          onChange={handleChange}
        />
        <input
          required
          className="wrapsAddJob__from__date"
          type="date"
          id="date"
          placeholder="date"
          value={newJob.date}
          onChange={handleChange}
        />
        <input
          required
          className="wrapsAddJob__from__workHours"
          type="text"
          id="workHours"
          placeholder=" work Hours"
          value={newJob.workHours}
          onChange={handleChange}
        />
        <input
          required
          className="wrapsAddJob__from__exactLocation"
          id="exactLocation"
          placeholder=" exact Location"
          value={newJob.exactLocation}
          onChange={handleChange}
        />
        <input
          className="wrapsAddJob__from__HourlyWage"
          type="number"
          required
          id="HourlyWage"
          placeholder=" Hourly Wage"
          value={newJob.HourlyWage}
          onChange={handleChange}
        />
        <input
          className="wrapsAddJob__from__AgeRestriction"
          type="text"
          id="AgeRestriction"
          placeholder=" AgeRestriction (if exists)"
          value={newJob.AgeRestriction}
          onChange={handleChange}
        />
        <textarea
          id="jobDescription"
          required
          placeholder=" service Description"
          className="wrapsAddJob__from__jobDescription"
          rows={7}
          cols={40}
          value={newJob.jobDescription}
          onChange={handleChange}
        />
        <button className="wrapsAddJob__from__submit" type="submit">
          Post a service <i className="fa-solid fa-arrow-left icon"></i>
        </button>
      </form>
    </div>
  </div>
  )
}

export default AddServices
