import React from "react";
import heroLeft from "../../../assets/Images/heroLeft.png";
import logo from "../../../assets/Images/CreateAccount/logo.png"

const HeroLeft = () => {
  return (
    <div className="w-full lg:w-2/5 h-full relative">
      <img src={heroLeft} alt="heroLeft" className="w-full  object-fit lg:object-contain" />
      
      {/* Add your logo image as an overlay */}
      <img 
        src={logo}
        alt="Logo" 
        className="h-16 w-16 mb-4 absolute top-11 left-11" 
      />
    </div>
  );
};

export default HeroLeft;
