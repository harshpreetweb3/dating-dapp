import React from 'react';
import HeroLeft from './HeroLeft';
import HeroRight from './HeroRight';
import Swipe from "../Swipe";
const Hero = () => {
  return (
    <div >
      {/* <nav className='h-10 bg-transparent w-full relative '></nav> */}
    <div className="flex flex-col lg:flex-row w-full h-auto ">
      {/* <HeroLeft /> */}
      {/* <HeroRight /> */}
      <Swipe />
    </div>
    </div>
  );
};

export default Hero;
