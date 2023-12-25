import React from "react";
import "./Loader.css"; 
import logo from "../../assets/Images/CreateAccount/logo.png"
function Loader() {
  return (
    <div className="load">
      <img className="img" src={logo} alt="logo"/>
    </div>
  );
}

export default Loader;
