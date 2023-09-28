import "./Enrollment.scss";
import TitleAnt from "../components/TitleAnt";
import * as React from "react";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Enrollment() {
  const userContext = useContext(AppContext);
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [CheckData, setCheckData]: any = useState({
    CheckUserInformation: true,
    CheckRegex: true,
  });

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [regex, setRegex]: any = useState({
    regexfirstName: true,
    regexlastName: true,
    cellphoneNumberRegex: true,
    emailRegex: true,
    passwordRegex: true,
    EqualPassword: true,
  });

  const [onSubmit, setonSubmit] = useState(false);

  const [person, setPerson]: any = useState({
    firstName: "",
    lastName: "",
    cellphoneNumber: "",
    email: "",
    password: "",
  });

  const handlefirstNameChange = (event: any) => {
    event.preventDefault();
    setPerson({ firstName: event.target.value });
    const regexfirstName = /^[a-zA-Zא-ת]+$/u.test(person.firstName);
    setRegex({ regexfirstName: regexfirstName });
    if (regexfirstName === true) {
      event.currentTarget.classList.remove("wrongWriting");
      event.currentTarget.classList.add("GoodWriting");
    } else {
      event.currentTarget.classList.remove("GoodWriting");
      event.currentTarget.classList.add("wrongWriting");
    }
    userContext?.setFirstName(event.target.value);

    return regexfirstName;
  };

  const handleLastNameChange = (event: any) => {
    event.preventDefault();
    setPerson({ lastName: event.target.value });
    const regexlastName = /^[a-zA-Zא-ת]+$/u.test(person.lastName);
    setRegex({ regexlastName: regexlastName });
    if (regexlastName === true) {
      event.currentTarget.classList.remove("wrongWriting");
      event.currentTarget.classList.add("GoodWriting");
    } else {
      event.currentTarget.classList.remove("GoodWriting");
      event.currentTarget.classList.add("wrongWriting");
    }
    userContext?.setLastName(event.target.value);
    return regexlastName;
  };
  const handleEmailChange = (event: any) => {
    event.preventDefault();
    setPerson({ email: event.target.value });
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(person.email);
    setRegex({ emailRegex: emailRegex });

    if (emailRegex === true) {
      event.currentTarget.classList.remove("wrongWriting");
      event.currentTarget.classList.add("GoodWriting");
    } else {
      event.currentTarget.classList.remove("GoodWriting");
      event.currentTarget.classList.add("wrongWriting");
    }
    userContext?.setEmail(event.target.value);
    return emailRegex;
  };
  const handleCellphoneNumberChange = (event: any) => {
    event.preventDefault();
    setPerson({ cellphoneNumber: event.target.value });
    const cellphoneNumberRegex = /^05\d([-]{0,1})\d{6}$/.test(
      person.cellphoneNumber
    );
    setRegex({ cellphoneNumberRegex: cellphoneNumberRegex });

    if (cellphoneNumberRegex === true) {
      event.currentTarget.classList.remove("wrongWriting");
      event.currentTarget.classList.add("GoodWriting");
    } else {
      event.currentTarget.classList.remove("GoodWriting");
      event.currentTarget.classList.add("wrongWriting");
    }
    userContext?.setCellphoneNumber(event.target.value);
    return cellphoneNumberRegex;
  };

  // const handlePasswordChange = (event: any) => {
  //   event.preventDefault()
  //   setPerson({ password: event.target.value });
  //   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/.test(
  //     person.password
  //   );

  //   setRegex({passwordRegex:passwordRegex})
  //   if(passwordRegex===true ){
  //     event.currentTarget.classList.remove('wrongWriting');
  //     event.currentTarget.classList.add('GoodWriting');
  //   }else{
  //     event.currentTarget.classList.remove('GoodWriting');
  //     event.currentTarget.classList.add('wrongWriting');
  //   }

  //   return passwordRegex;
  // };

  const handlePassword = (event: any) => {
    event.preventDefault();
    setPerson({ password: event.target.value });
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{7,}$/.test(
      person.password
    );

    setRegex({ passwordRegex: passwordRegex });
    if (passwordRegex === true) {
      event.currentTarget.classList.remove("wrongWriting");
      event.currentTarget.classList.add("GoodWriting");
    } else {
      event.currentTarget.classList.remove("GoodWriting");
      event.currentTarget.classList.add("wrongWriting");
    }
    userContext?.setPassword(event.target.value);
    return passwordRegex;
  };

  const PageTransitionTest = (e: any) => {
    // shlomiazn@gmail.com
    e.preventDefault();
    Object.values(person).forEach((value) => {
      if (value !== "") {
        setCheckData({ CheckUserInformation: false });
        console.log(CheckData);
      }
    });

    Object.values(regex).forEach((value) => {
      if (!value) {
        setCheckData({ CheckRegex: false });
        console.log(CheckData);
      }
    });

    navigate(
      CheckData.CheckUserInformation || CheckData.CheckRegex === false
        ? "/enrollment"
        : "/PersonalInformation "
    );

    console.log(userContext);
  };

  const handleClick = (event: any) => {
    event.preventDefault();
    setonSubmit(!onSubmit);
    console.log("blanbjhbjnhb");
  };

  // const areStringsEqual = () => {

  //   const EqualPassword = /^(.+)\1$/.test(person.password +person. passwordAuthenticatio);
  //   setRegex({EqualPassword:EqualPassword})
  //   return EqualPassword;
  // };

  return (
    <>
      <TitleAnt />
      <div className="wraps">
        <div className="RegistrationEnvelope">
          <h1 className="enrollment">registration</h1>
          <p className="enrollment_p">
            Register so that we can find <br /> a job for you soon{" "}
          </p>

          <form
            className="fromWraps"
            onSubmit={handleClick}
            defaultValue={"DEFAULT"}
          >
            <input
              required
              type="text"
              placeholder="First name*"
              className="defult"
              onChange={handlefirstNameChange}
              maxLength={8}
              
            />
            <input
              required
              type="text"
              placeholder="Last Name*"
              className="defult"
              name="LastName"
              onChange={handleLastNameChange}
              maxLength={8}
             
            />
            <input
              required
              type="email"
              placeholder="email*"
              className="defult"
              onChange={handleEmailChange}
            />

            <input
              required
              type="number"
              placeholder="cellphoneNumber*"
              className="defult"
              onChange={handleCellphoneNumberChange}
            />

            <div className="passwordIconWrapper">
              <input
                required
                type={isVisible ? "text" : "password"}
                placeholder="Password*"
                className="defult"
                onChange={handlePassword}
              />
              <span
                className={
                  isVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                }
                onClick={toggleVisibility}
              />
            </div>

            <button
              className="PersonalInformation__butoon"
              onClick={PageTransitionTest}
              type="submit"
            >
              enrollment
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Enrollment;
