import "./PersonalInformation.scss";
import * as React from "react";
import { Link } from "react-router-dom";
import TitleAnt from "../components/TitleAnt";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function PersonalInformation() {
  const userContext = useContext(AppContext);
  const navigate = useNavigate();

  if (userContext?.email === "") {
    navigate("/");
  }

  const year = new Date().getFullYear();

  const handlingDetails =(e:any)=>{
    e.preventDefault();
    navigate("/AddingProfile")
    console.log(userContext)
  }
  return (
    <div className="wraps_Information">
      <TitleAnt />
      <div className="wraps__Information__child">
        <h1 className="Welcome">welcome</h1>
        <p className="Welcome__p">
          Please fill in the details below so <br /> we can know more about him{" "}
        </p>

        <form onSubmit={handlingDetails} className="fromWraps">
          <select onChange={e => userContext?.setGender(e.target.value)} name="gender" className="gender" defaultValue={"default"}>
            Gender
            <option className="gender">Gender</option>
            <option className="male" value="male" >
              male
            </option>
            <option className="female" value="female" >
              female
            </option>
            <option className="other" value="other">
              Other
            </option>
          </select>
          <input
            required
            type="date"
            name="DateOfBirth"
            id="DateOfBirth"
            min="1923-01-01"
            max={`${year - 16}-01-01`}
            onChange={e => userContext?.setDateOfBirth(e.target.value)}

          />

          <input
            required
            type="text"
            name="Hometown"
            id="Hometown"
            placeholder="Location"
            onChange={e => userContext?.setLocation(e.target.value)}
            
          />

          {/* <Link to="/AddingProfile"> */}
            <button type="submit" className="addingProfile">approval</button>
         

        </form>
      </div>
    </div>
  );
}

export default PersonalInformation;
