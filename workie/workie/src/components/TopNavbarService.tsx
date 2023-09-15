import React from 'react'
import "./TopNavbarEmployer.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


const TopNavbarService = () => {
    const [checkEmployerEmployee, setCheckEmployerEmployee] = useState(true);
    const [SelectSort, setSelectSort] = useState(true);
    const navigate = useNavigate();
  
    const handleEmployeeEmployerChange = (event: any) => {
      setCheckEmployerEmployee(!checkEmployerEmployee);
    };
    const handleSelectSort = (event: any) => {
      setSelectSort(!SelectSort);
    };
  
    const NavEmployerPage = (event: any) => {
      navigate("/Services")
    };
  return (
    <div className="wrapsNavBarEmployer">
    <h1 className="wrapsNavBarEmployer__title">my services</h1>

    <div
      onClick={handleEmployeeEmployerChange}
      className={"employeeEmployer"}
    >
       provider
      <br></br>
      <i
        onClick={handleEmployeeEmployerChange}
        className="fa-solid fa-chevron-down "
      ></i>
    </div>

    <div
      className={
        checkEmployerEmployee ? "employeeEmployerW" : "ShowEmployeeEmployerW"
      }
    >
      <span
        onClick={handleEmployeeEmployerChange}
        className={
          checkEmployerEmployee
            ? "employeeEmployerW__employer"
            : "ShowEmployeeEmployer"
        }
      >
        provider
      </span>
      <span
        onClick={NavEmployerPage}
        className={
          checkEmployerEmployee
            ? "employeeEmployerW__employee"
            : "ShowEmployeeEmployee"
        }
      >
       customer
      </span>
    </div>
  </div>
  )
}

export default TopNavbarService

