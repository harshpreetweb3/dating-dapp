import React from 'react';
import HeroLeft from './HeroLeft';
import HeroRight from './HeroRight';

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full h-screen">
      <HeroLeft />
      <HeroRight />
    </div>
  );
};

export default Hero;
