import React from "react";
import "./TopNavbarEmployer.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TopNavbarEmployer = () => {
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
    navigate("/MainScreen")
  };
  return (
    <div className="wrapsNavBarEmployer">
      <h1 className="wrapsNavBarEmployer__title">my works</h1>

      <div
        onClick={handleEmployeeEmployerChange}
        className={"employeeEmployer"}
      >
        employer
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
          employer
        </span>
        <span
          onClick={NavEmployerPage}
          className={
            checkEmployerEmployee
              ? "employeeEmployerW__employee"
              : "ShowEmployeeEmployee"
          }
        >
          employee
        </span>
      </div>
    </div>
  );
};

export default TopNavbarEmployer;
