import "./LoginWraps.scss";
import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import  {AppContext} from "../context/AppContext"
import { useContext } from 'react';
import axios from "axios";

function LoginWraps() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const isAdmin = useContext(AppContext);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const handleLogin = async (event: any) => {
    event.preventDefault();

    //objz
    const userLogin = {
      email: event.target.elements.checkEmail.value,
      password: event.target.elements.checkPassword.value,
    };

    try {
      const response = await axios.post("/api/v1/auth/login", userLogin);
      isAdmin?.setIsAdmin(response.data)
      console.log(isAdmin?.isAdmin)
      

      navigate("/MainScreen");
     
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="loginWarps1">
      <div className="loginWarps">
        <h2 className="loginWarps__titel">log in</h2>
        <p className="loginWarps__paragraph">Log in to view the newest jobs</p>

        <form className="from" onSubmit={handleLogin}>
          <input
            name="checkEmail"
            className="checkEmail"
            type="text"
            placeholder="   email"
          />
          <input
            required
            type={isVisible ? "text" : "password"}
            name="checkPassword"
            className="checkPassword"
            placeholder="   password"
          />

          <span
            className={isVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
            onClick={toggleVisibility}
          />

          <button type="submit" className="login__Button">
            log in
          </button>
        </form>

        <Link className="forgotPassword" to="/ForgotPassword">
          forgot password ?
        </Link>
      </div>
    </div>
  );
}

export default LoginWraps;
{
  /* <Link to="/MainScreen">
</Link> */
}
