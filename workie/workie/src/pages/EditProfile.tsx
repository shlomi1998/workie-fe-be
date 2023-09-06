import * as React from "react";
import "./EditProfile.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;

const EditProfile = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const [fileData, setFileData]: any = useState();
  //save and show img to the screen
  const [imageSrc, setImageSrc] = useState("./images/ProfileImg.jpg");
  const [image, setImage] = useState("");

  // const [updateUser, setUpdateUser]: any = useState({
  //   _id:"",
  //   firstName:"",
  //   lastName:"",
  //   cellphoneNumber:"",
  //   email:"",
  //   DateOfBirth:"",
  //   gender:"",
  //   status:"",
  //   ImageSource:""
  // });

  const handleImageUpload = (e: any) => {
    try {
      //save img data
      setFileData(e.target.files[0]);

      const file = e.target.files[0];
      const reader: any = new FileReader();

      reader.onload = () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);

      changeImageSrc();
    } catch (error) {
      console.log(" img not fond");
    }
  };

  function changeImageSrc() {
    if (image) {
      setImageSrc(image);
    }
  }

  const handlingDetails = async (e: any) => {
    e.preventDefault();
    try {
      // setUpdateUse({ firstName: event.target.value });

      const data = new FormData();
      data.append("image", fileData);

      const response = await axios.post("/single", data, {
        withCredentials: true,
      });


      


      // setUpdateUser({firstName: e.target.elements.firstName.value})
      // setUpdateUser({lastName: e.target.elements.lastName.value})
      // setUpdateUser({cellPhoneNumber:e.target.elements.CellPhoneNumber.value})
      // setUpdateUser({email:e.target.elements.email.value})
      // setUpdateUser({DateOfBirth:e.target.elements.date.value})
      // setUpdateUser({gender: e.target.elements.gender.value})
      // setUpdateUser({status:e.target.elements.status.value})
      // setUpdateUser({ImageSource:response.data.filename})
      const updateUser:any={
        firstName: e.target.elements.firstName.value,
        lastName:e.target.elements.lastName.value,
        cellphoneNumber:e.target.elements.CellPhoneNumber.value,
        email:e.target.elements.email.value,
        DateOfBirth:e.target.elements.date.value,
        gender:e.target.elements.gender.value,
        status:e.target.elements.status.value,
        ImageSource:response.data.filename,
      }
      console.log(updateUser)
     
     
        const res = await axios.patch("/api/v1/auth/update-profile",updateUser, {
          withCredentials: true,
        });
        console.log(res.data)
        
   

    

    
      // console.log(response.data.filename);
      // console.log(e.target.elements.firstName.value);
      // console.log(e.target.elements.lastName.value);
      // console.log(e.target.elements.CellPhoneNumber.value);
      // console.log(e.target.elements.email.value);
      // console.log(e.target.elements.date.value);
      // console.log(e.target.elements.gender.value);
      // console.log(e.target.elements.status.value);
    } catch (error) {
      console.log(error);
    }

    navigate("/MyProfile");
  };

  return (
    <div className="wrapsEditProfile">
      <div className="wrapsEditProfile__navBar">
        <span className="wrapsEditProfile__navBar__title">my profile</span>
      </div>

      <div className="wrapsEditProfile__newDetails">
        <form onSubmit={handlingDetails}>
          <div className="wrapsEditProfile__newDetails__upload">
            <img
              className="wrapsEditProfile__newDetails__upload__img"
              src={image ? image : imageSrc}
              alt="Profile Img"
            />

            <input
              name="inputFile"
              className="wrapsEditProfile__newDetails__upload__inputFile"
              type="file"
              accept="image/*"
              id="image-upload"
              onChange={handleImageUpload}
            />

            <span className="fa-solid fa-pen iconPen" />
          </div>

          <br />
          <input
            placeholder="first name "
            name="firstName"
            required
            className="wrapsEditProfile__newDetails__firstName"
            type="text"
          />
          <input
            placeholder="last name "
            name="lastName"
            required
            className="wrapsEditProfile__newDetails__lastName"
            type="text"
          />
          <input
            placeholder="cell phone number"
            name="CellPhoneNumber"
            required
            className="wrapsEditProfile__newDetails__cellPhoneNumber"
            type="number"
          />
          <input
            required
            className="wrapsEditProfile__newDetails__email"
            name="email"
            type="email"
            placeholder="email"
          />
          <input
            name="date"
            className="wrapsEditProfile__newDetails__date"
            required
            type="date"
            min="1923-01-01"
            max={`${year - 16}-01-01`}
          />

          <select
            required
            className="wrapsEditProfile__newDetails__gender"
            defaultValue={"default"}
            name="gender"
          >
            Gender
            <option className="gender">Gender</option>
            <option className="male" value="male">
              male
            </option>
            <option className="female" value="female">
              female
            </option>
            <option className="other" value="other">
              Other
            </option>
          </select>
          <textarea
            id="status"
            required
            name="status"
            className="wrapsEditProfile__newDetails__status"
            placeholder="Job Description"
            rows={6}
            cols={40}
          />
          <button
            className="wrapsEditProfile__newDetails__buttonSubmit"
            type="submit"
          >
            save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
