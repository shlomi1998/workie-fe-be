import * as React from "react";
import { useState, useContext } from "react";
import { createContext } from "react";

interface userValue {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  cellphoneNumber: string;
  setCellphoneNumber: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  gender: string;
  setGender: React.Dispatch<React.SetStateAction<string>>;
  DateOfBirth: string;
  setDateOfBirth: React.Dispatch<React.SetStateAction<string>>;
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  ImageSource: string;
  setImageSource: React.Dispatch<React.SetStateAction<string>>;
  status: string;
  setStatus: React.Dispatch<React.SetStateAction<string>>;
  isAdmin: boolean;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  jobType:string;
  setJobType :React.Dispatch<React.SetStateAction<string>>;
  employerDetails:string;
  setEmployerDetails :React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

export const AppContext = createContext<null | userValue>(null);

const AppContextt = () => {
  return <></>;
};

export default AppContextt;

type Props = {
  children: React.ReactNode;
};

export const AppContextProvider = ({ children }: Props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [cellphoneNumber, setCellphoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [DateOfBirth, setDateOfBirth] = useState("");
  const [location, setLocation] = useState("");
  const [ImageSource, setImageSource] = useState("");
  const [status, setStatus] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [ employerDetails,setEmployerDetails]=useState("");
  const [ jobType,setJobType]=useState("");
  const [activeTab,setActiveTab ]=useState("MainScreen");
  
  return (
    <AppContext.Provider
      value={{
        firstName,
        setFirstName,
        lastName,
        setLastName,
        email,
        setEmail,
        cellphoneNumber,
        setCellphoneNumber,
        password,
        setPassword,
        gender,
        setGender,
        DateOfBirth,
        setDateOfBirth,
        location,
        setLocation,
        ImageSource,
        setImageSource,
        status,
        setStatus,
        isAdmin, 
        setIsAdmin,
        jobType,
        setJobType,
        employerDetails,
        setEmployerDetails,
        activeTab,
        setActiveTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// // interface UserValue {
//   // firstName: string;
//   // lastName: string;
//   // email: string;
//   // cellphoneNumber: string;
//   // password: string;

//   // gender: any;
//   // DateOfBirth: any;
//   // location: any;
// //   ImageSource: any
// //   setImageSource:any
// //   status: any
// //   setStatus:any

// // }

// const AppProvider = (props:any) => {
//   return (
//     <AppContext.Provider
//       value={"bbbbbb"}>

//     </AppContext.Provider>
//   );
// };

// export default AppProvider;

// // import{AddingProfile,Enrollment, Home,LoginPage,PersonalInformation} from '../pages/index'

// // export const AppContext = React.createContext<UserValue | null>(null) as React.Context<UserValue>;

// // export const AppContext = createContext<UserValue|null>(null!)

// export interface CurrentUserContextType {
//   username: string;
// }

// export const CurrentUserContext = createContext<CurrentUserContextType | null>(null);
