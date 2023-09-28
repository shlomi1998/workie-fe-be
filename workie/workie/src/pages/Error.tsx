import React from "react";
import "./Error.scss";
import TitleAnt from "../components/TitleAnt";

const Error = () => {
  return (
    <>
      <div id="notfound">
        <div className="notfound absolute">
        <TitleAnt />
          <div className="notfound-404">
            <h1>404</h1>
            <h2>Page not found</h2>
          </div>
          <a href="/">go to Home page</a>

          
        </div>
      </div>
    </>
  );
};

export default Error;
