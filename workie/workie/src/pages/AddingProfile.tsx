
import { useContext, useEffect, useRef } from "react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddingProfile.scss";
import TitleAnt from "../components/TitleAnt";
//context

import { AppContext } from "../context/AppContext";
import axios from "axios";
import { CropperModal } from "../components";
axios.defaults.withCredentials = true;

// import { Link } from "react-router-dom";

// import AppProvider from '../context/AppContext'

function AddingProfile() {
  const userContext = useContext(AppContext);
  const navigate = useNavigate();

  if (userContext?.DateOfBirth === "") {
    navigate("/");
  }

  //save to build/images file
  const [fileData, setFileData]: any = useState();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  //save status nameImg to the contaxt
  const [status, setStatus]: any = useState();
  const [FileName, setFileName]: any = useState();

  //save and show img to the screen
  const [imageSrc, setImageSrc] = useState("./images/ProfileImg.jpg");
  const [image, setImage] = useState("");

  // image srcכוו
  const [src, setSrc] = useState<string | null>(null);

  // preview
  const [preview, setPreview] = useState<string | null>(null);

  // modal state
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // ref to control input element
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [ifSubmit ,setIfSubmit] = useState<boolean>(false);

  const handleImageUpload = (e: any) => {
    try {
      //save img data
      setFileData(e.target.files[0]);

      if (e.target.files && e.target.files[0]) {
        setSrc(URL.createObjectURL(e.target.files[0]));
        setModalOpen(true);
      }

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

  // const handleSubmit = (e:any) => {
  //   e.preventDefault();

  //   // Send the image data to the server for saving
  //   console.log('Image data:', image);
  // }

  function changeImageSrc() {
    if (image) {
      setImageSrc(image);
    }
  }

  const handlingDetails = async (e: any) => {
    e.preventDefault();
    setIfSubmit(true);
   

    try {
     
      
      userContext?.setStatus(e.target.elements.status.value);
      // userContext?.setImageSource("./build/images/ProfileImg.jpg")
      console.log(userContext);
    } catch (error) {
      console.log(error);
    }

    navigate("/MainScreen");
    
  };


  

 
  
  const handleInputClick = (e: any) => {
    e.preventDefault();
    inputRef.current?.click();
  };

  const handleImageCrop = (croppedImage: string) => {
    setCroppedImage(croppedImage);
  };
  return (
    <div className="wrapsProfile">
      <TitleAnt />
      <div className="wrapsProfile__">
        <h1 className="wrapsProfile__JustLittle">Just a little more</h1>

        <form onSubmit={handlingDetails}>
          <label htmlFor="page"></label>
          <div className="WrapsProfilePicture">
            <img
              className="profilePicture"
              src={ preview ?  preview : imageSrc}
              alt="Profile picture preview"
            />
            <input
              name="inputFile"
              className="inputFile"
              type="file"
              accept="image/*"
              id="image-upload"
              ref={inputRef}
              onChange={handleImageUpload}
            />

            <CropperModal
              modalOpen={modalOpen}
              src={src}
              setPreview={setPreview}
              setModalOpen={setModalOpen}
              ifSubmit={ifSubmit}
              setIfSubmit={setIfSubmit}
              
            />
            <a href="/" onClick={handleInputClick}>
              <span className={"fa-solid fa-pen"} />
            </a>
          </div>

          <p className="AddAprofilePicture">Add a profile picture</p>
          <textarea
            name="status"
            required
            placeholder="Tell us a little about yourself"
            className="ProfileStatus"
            rows={7}
            cols={40}
          />

          <button type="submit" className="letsStart__button">
            Let's start!
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddingProfile;
