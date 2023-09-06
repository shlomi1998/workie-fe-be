import * as React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
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

function App() {
  return (
    <div className="dark">
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
          <Route path="/ChatScreen" element={<ChatScreen />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AppContextProvider>
    </div>
  );
}
export default App;
