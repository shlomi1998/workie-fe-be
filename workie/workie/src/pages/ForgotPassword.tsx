import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.scss";
import axios from "axios";
axios.defaults.withCredentials = true;

const ForgotPassword = () => {
  const [time, setTime] = useState(600);
  const [isCountdownStarted, setIsCountdownStarted] = useState(false);
  const [shouldResetTime, setShouldResetTime] = useState(false);
  const [email, setEmail]: any = useState("");

  const handleEmail = async (event: any) => {
    event.preventDefault();
    // const userEmail=event.target.elements.email.value
    console.log(email);
    event.target.elements.email.value=''
    if (email) {
      try {
        const response = await axios.post(
          '/api/v1/auth/forgotPassword',
          { userEmail: email },
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setEmail("");
       
      } catch (error) {
        console.error("Failed to send email:", error);
      }
     
      handleButtonClick();
      setShouldResetTime(true);
    }
  };

  useEffect(() => {
    let interval: any;

    if (isCountdownStarted) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (shouldResetTime) {
            setShouldResetTime(false);
            return 600;
          } else if (prevTime > 0) {
            return prevTime - 1;
          } else {
            setIsCountdownStarted(false);
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isCountdownStarted, shouldResetTime]);

  const formatTime = (totalSeconds: any) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleButtonClick = () => {
    setIsCountdownStarted(true);
    setShouldResetTime(true);
  };

  return (
    <div className="wraps">
      <div className="wrapsLogin">
        <img className="imgTitile" src="images/ant-white.png" alt="not exist" />
        <h1 className="title">Workie</h1>
      </div>

      <div className="wrapsTemporaryPassword">
        <h2 className="wrapsTemporaryPassword__title">Forgot password ?</h2>
        <p className="wrapsTemporaryPassword__paragraph">
          Enter an email to receive a temporary password
        </p>

        <form className="wrapsTemporaryPassword__from" onSubmit={handleEmail}>
          <input
            name="email"
            className="wrapsTemporaryPassword__from__sendEmail"
            type="text"
            placeholder="  Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="wrapsTemporaryPassword__from__sendButton"
          >
            Send
          </button>
        </form>

        <div className="wrapsTemporaryPassword__timer">
          {time === 0 ? (
            <span className="wrapsTemporaryPassword__timer__msg">
              This password is no longer valid!!
            </span>
          ) : (
            <span className="wrapsTemporaryPassword__timer__msg">
              The time you have left is :
            </span>
          )}
          <span className="wrapsTemporaryPassword__timer__timer">
            {formatTime(time)}
          </span>
        </div>

        <Link className="wrapsTemporaryPassword__returnToLogin" to="/LoginPage">
          Return to login
        </Link>
      </div>
      <img
        className="imgForgotPassword"
        src="images/imgLogin.jpg"
        alt="not exist"
      />
    </div>
  );
};

export default ForgotPassword;
