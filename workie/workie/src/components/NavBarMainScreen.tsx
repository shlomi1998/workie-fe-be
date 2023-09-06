import React from "react";
import styled from "styled-components";
import "./NavBarMainScreen.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSliders } from 'react-icons/bs';

const NavBarMainScreen = () => {
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
  navigate('/Employer')
 }
 const  navigateoTheChatScreen = ()=>{
  navigate('/ChatScreen')
 }

  return (
    <div className="wrapsNavBar">
      <i onClick={navigateoTheChatScreen} className="fa-regular fa-comments messageIcon"></i>

      <div onClick={handleEmployeeEmployerChange} className={"employeeEmployer"}>
        employee
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
          employee
        </span>
        <span
        onClick={NavEmployerPage}
          className={
            checkEmployerEmployee
              ? "employeeEmployerW__employer"
              : "ShowEmployeeEmployer"
          }
        >
          employer
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

  
  );
};

export default NavBarMainScreen;




// import * as React from "react";
// import Box from "@mui/material/Box";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";

// import BuildIcon from "@mui/icons-material/Build";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import DvrIcon from "@mui/icons-material/Dvr";
// import { useNavigate } from "react-router-dom";

// const iconStyles = {
//   fontSize: 40,
//   // גודל האייקונים
// };

// export default function BottomNavBarMainScreen() {
//   const [value, setValue] = React.useState(0);
//   const navigate = useNavigate();

//   const navigateToMainScreen = () => {
//     setTimeout(() => {
//       navigate("/MainScreen");
//     }, 1000); // מתנה 300 מילישניות לצובע להשתנות
//   };

//   const navigateToServices = () => {
//     setTimeout(() => {
//       navigate("/Services");
//     }, 1000); // מתנה 300 מילישניות לצובע להשתנות
//   };

//   const navigateToMyProfile = () => {
//     setTimeout(() => {
//       navigate("/MyProfile");
//     }, 1000); // מתנה 300 מילישניות לצובע להשתנות
//   };

//   return (
//     <Box
//       sx={{
//         width: "100%",
//         position: "absolute",
//         bottom: 0,
//         zIndex: 1,
//         display: "flow",
//       }}
//     >
//       <BottomNavigation
//         showLabels
//         value={value}
//         onChange={(event, newValue) => {
//           setValue(newValue);
//         }}
//         sx={{
//           height: 80,
//           backgroundColor: "whitesmoke",

//           // גובה התפריט ניווט
//         }}
//       >
//         <BottomNavigationAction

//           label="my profile"
//           icon={<AccountCircleIcon style={iconStyles} />}
//           sx={{
//             position: "relative",
//             left: -55,
//             "&.Mui-selected": {
//               color: "#51c69f",
//             },
//           }}
//           onClick={navigateToMyProfile}
//         />
//         <BottomNavigationAction

//           label="Services"
//           icon={<BuildIcon style={iconStyles} />}
//           sx={{
//             "&.Mui-selected": {
//               color: "#51c69f",
//             },
//           }}
//           // כאן צריך לקרוא את הפונקציה
//           onClick={navigateToServices}
//         />
//         <BottomNavigationAction

//           label="jobs"
//           icon={<DvrIcon style={iconStyles} />}
//           sx={{
//             position: "relative",
//             right: -65,
//             "&.Mui-selected": {
//               color: "#51c69f",
//             },
//           }}
//           onClick={navigateToMainScreen}
//         />
//       </BottomNavigation>
//     </Box>
//   );
// }

// color: "#5ce3b6"
