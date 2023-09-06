import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from "./AppContext";

const UserContext = () => {
  const appContext = useContext(AppContext);
  const [token, setToken] = useState("");

  useEffect(() => {
    const createUser = async () => {
      try {
        const userData = {
          firstName: appContext?.firstName,
          lastName: appContext?.lastName,
          email: appContext?.email,
          cellphoneNumber: appContext?.cellphoneNumber,
          password: appContext?.password,
          gender: appContext?.gender,
          DateOfBirth: appContext?.DateOfBirth,
          location: appContext?.location,
          ImageSource: appContext?.ImageSource,
          status: appContext?.status,
        };

        const response = await axios.post("/api/v1/auth/signUp", userData, {
          withCredentials: true,
        });

        const { token } = response.data;
        setToken(token);
      } catch (error) {
        console.log(error);
      }
    };

    if (
      appContext?.firstName &&
      appContext?.lastName &&
      appContext?.email &&
      appContext?.cellphoneNumber &&
      appContext?.password &&
      appContext?.gender &&
      appContext?.DateOfBirth &&
      appContext?.location &&
      appContext?.ImageSource &&
      appContext?.status
    ) {
      createUser();
    }
  }, [
    appContext?.firstName,
    appContext?.lastName,
    appContext?.email,
    appContext?.cellphoneNumber,
    appContext?.password,
    appContext?.gender,
    appContext?.DateOfBirth,
    appContext?.location,
    appContext?.ImageSource,
    appContext?.status,
  ]);

  // השתמש במשתנה token עבור הפעולות שלך הבאות בקומפוננטה

  return <div>{/* התוכן שלך כאן */}</div>;
};

export default UserContext;
