import React, { useState } from "react";
import { BottomNavBarMainScreen } from "./index";
import "./MyProfile.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";





const MyProfile = () => {
  const PathImagesFolder = "../../../server/build/images/";
 const navigate = useNavigate();
  const [user, setUser]: any = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellphoneNumber: "",
    password: "",
    gender: "",
    DateOfBirth: "",
    location: "",
    ImageSource: "",
    status: "",
  });

  const getUser = async () => {
    try {
      const response = await axios.get("/api/v1/auth/getUser");

      const {
        firstName,
        lastName,
        email,
        cellphoneNumber,
        password,
        gender,
        DateOfBirth,
        location,
        ImageSource,
        status,
      }: any = response.data;

      setUser({ 
        firstName:firstName,
        lastName: lastName,
        email:email,
        cellphoneNumber: cellphoneNumber,
        password:password,
        gender:gender,
        DateOfBirth:DateOfBirth,
        location:location,
        ImageSource:ImageSource,
        status:status,
      });

    } catch (error) {
      console.log(error);
    }
  };

  getUser();


  const editProfilePage= () => {
    navigate("/EditProfile")
  }

  return (
    <div className="WrapsProfilePage">
      <nav className="WrapsProfilePage__navBar">
        <span onClick={editProfilePage} className="fa-regular fa-pen-to-square WrapsProfilePage__iconPan"></span>
        <span className="fa-solid fa-gear WrapsProfilePage__iconSettings"></span>
        <span className="WrapsProfilePage__title ">my account</span>
      </nav>

      
      <img
        className="WrapsProfilePage__profileImag"
        src={user.ImageSource?`../images/${user.ImageSource}`:`../images/ProfileImg.jpg`}
        alt="imgProfile"
      />
      <p className="WrapsProfilePage__MyName">{user.firstName} {" "} {user.lastName}</p>
      <p className="WrapsProfilePage__MyPhoneNumber">{user.cellphoneNumber}</p>
      <p className="WrapsProfilePage__MyEmail">{user.email}</p>
      <p className="WrapsProfilePage__WhoAmI">Bio</p>

      <div className="WrapsProfilePage__status">
        <p className="WrapsProfilePage__status__P">
        {user.status}
        </p>
      </div>
      <BottomNavBarMainScreen/>
    </div>
  );
};

export default MyProfile;

// console.log(
//   firstName,
//   lastName,
//   email,
//   cellphoneNumber,
//   password,

//   gender,
//   DateOfBirth,
//   location,

//   ImageSource,
//   status,
//   lastName,
//   email,
//   cellphoneNumber,
//   password,

//   gender,
//   DateOfBirth,
//   location,

//   ImageSource,
//   status
// );
