import * as React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import "./App.css";
import WhoWeAre from "./pages/WhoWeAre";
import {
  AddingProfile,
  Enrollment,
  Home,
  LoginPage,
  PersonalInformation,
  MainScreen,
  MyProfile,
  Services,
  Employer,
  AddJob,
  EditProfile,
  ForgotPassword,
  EmployerProfile,
  EmployerDetails,
  SignedUpForWork,
  ServiceProvider,
  AddServices,
  ServicesProfile,
  SignedUpForServices,
  ChatScreen,
  Error,
} from "./pages/index";
import UserContext from "./context/UserContext";
import { AppContextProvider } from "./context/AppContext";
// import { AppContext  } from './context/AppContext';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendMessage } from "./features/chatSlice";
import SocketContext from "./context/SocketContext";

const socket = io(process.env.REACT_APP_API_SERVER as string);

function App() {
  // const sendMessager=()=>{
  //   socket.emit('sendMessage',"hello how are you")
  // }

  // useEffect(()=>{
  // socket.on("receiveMessage",(msg:any)=>{
  //   console.log(msg)
  // })
  // },[])
  // <button onClick={()=>sendMessager()}>send message</button>
  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/WhoWeAre" element={<WhoWeAre />} />
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="/enrollment" element={<Enrollment />} />
              <Route
                path="/PersonalInformation"
                element={<PersonalInformation />}
              />
              <Route path="/AddingProfile" element={<AddingProfile />} />
              <Route path="/MainScreen" element={<MainScreen />} />
              <Route path="/MyProfile" element={<MyProfile />} />
              <Route path="/Services" element={<Services />} />
              <Route path="/Employer" element={<Employer />} />
              <Route path="/AddJob" element={<AddJob />} />
              <Route path="/EditProfile" element={<EditProfile />} />
              <Route path="/ForgotPassword" element={<ForgotPassword />} />
              <Route path="/EmployerProfile" element={<EmployerProfile />} />
              <Route path="/EmployerDetails" element={<EmployerDetails />} />
              <Route path="/SignedUpForWork" element={<SignedUpForWork />} />
              <Route path="/ServiceProvider" element={<ServiceProvider />} />
              <Route path="/AddServices" element={<AddServices />} />
              <Route path="/ServicesProfile" element={<ServicesProfile />} />
              <Route
                path="/SignedUpForServices"
                element={<SignedUpForServices />}
              />
              <Route path="/ChatScreen" element={<ChatScreen socket={socket}/>} />
              <Route path="*" element={<Error />} />
            </Routes>
          </BrowserRouter>
        </AppContextProvider>
      </SocketContext.Provider>
    </div>
  );
}
export default App;
