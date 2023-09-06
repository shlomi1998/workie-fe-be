import React from 'react'
import styled from "styled-components";
import "./NavBarMainScreen.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSliders } from 'react-icons/bs';

const NavBarServiceScreen = () => {
    const [checkEmployerEmployee, setCheckEmployerEmployee] = useState(true);
    const [SelectSort, setSelectSort] = useState(true);
    const navigate = useNavigate();
  
  
    const handleEmployeeEmployerChange = (event: any) => {
      setCheckEmployerEmployee(!checkEmployerEmployee);
    };
    const handleSelectSort = (event: any) => {
      setSelectSort(!SelectSort);
    };
  
  
   const  NavEmployerPage = (event: any)=>{
    navigate('/ServiceProvider')
   }
  return (
    <div className="wrapsNavBar">
    <i className="fa-regular fa-comments messageIcon"></i>

    <div onClick={handleEmployeeEmployerChange} className={"employeeEmployer"}>
    looking service
      <br></br>
      <i
        onClick={handleEmployeeEmployerChange}
        className="fa-solid fa-chevron-down "
      ></i>
    </div>



    <div  className={
          checkEmployerEmployee
            ? "employeeEmployerW"
            : "ShowEmployeeEmployerW"
        }>
      <span
        onClick={handleEmployeeEmployerChange}
        className={
          checkEmployerEmployee
            ? "employeeEmployerW__employee"
            : "ShowEmployeeEmployee"
        }
      >
        looking service
      </span>
      <span
      onClick={NavEmployerPage}
        className={
          checkEmployerEmployee
            ? "employeeEmployerW__employer"
            : "ShowEmployeeEmployer"
        }
      >
        service provider
      </span>
    </div>

    <div onClick={handleSelectSort} className="sortBy">
      sort by: the latest {"  "}
      <span
        onClick={handleSelectSort}
        className="fa-solid fa-chevron-down "
      ></span>
      {"    "}
      <br />
    </div>

    <div className={ SelectSort?"sortByWrapper":"sortByWrapper_"}>
      <span
        className={
          SelectSort
            ? "sortByWrapper__theLatest"
            : "sortByWrapper__showTheLatest"
        }
        onClick={handleSelectSort}
      >
        the latest
      </span>
      <span
        className={
          SelectSort
            ? "sortByWrapper__theNearest"
            : "sortByWrapper__showTheNearest"
        }
      >
        the nearest
      </span>
      <span
        className={
          SelectSort ? "sortByWrapper__rating" : "sortByWrapper__showRating"
        }
      >
        rating
      </span>
    </div>

    <div className="wrapsLogo">
      <img className="imgTitil" src="images/greenAnt.png" alt="not exist" />
      <h1 className="title_">Workie</h1>
    </div>



    <div className="wrapFilter">
   <span className="wrapFilter__title">{" "}filter {" "}</span>
  < BsSliders className="wrapFilter__iconFilter" />
  </div>


  </div >
  )
}

export default NavBarServiceScreen
