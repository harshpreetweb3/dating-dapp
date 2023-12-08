import React from "react";
import heroLeft from "../../../assets/Images/heroLeft.png";

const HeroLeft = () => {
  return (
    <div className="w-full lg:w-1/2 h-full">
      <img src={heroLeft} alt="heroLeft" className="w-full  object-cover lg:object-contain" />
    </div>
  );
};

export default HeroLeft;
