import React from "react";
import one from "../../assets/Images/UserProfiles/one.png";
<<<<<<< HEAD
import p1 from '../../assets/Images/UserProfiles/p1.png';
import p2 from '../../assets/Images/UserProfiles/p2.png';
import p3 from '../../assets/Images/UserProfiles/p3.png';
import p4 from '../../assets/Images/UserProfiles/p4.png';
import p5 from '../../assets/Images/UserProfiles/p5.png';
import SidebarComponent from './SidebarComponent';
import { DDate_backend } from '../../../declarations/DDate_backend/index';
=======
import p1 from "../../assets/Images/UserProfiles/p1.png";
import p2 from "../../assets/Images/UserProfiles/p2.png";
import p3 from "../../assets/Images/UserProfiles/p3.png";
import p4 from "../../assets/Images/UserProfiles/p4.png";
import p5 from "../../assets/Images/UserProfiles/p5.png";
import SidebarComponent from "./SidebarComponent";
import { Principal } from "@dfinity/principal";
import { useState } from "react";
>>>>>>> b713c506053e495e11f97c29a7ae3234381e84b4

// import { DDate_backend } from "../../../declarations/DDate_backend/index";

const Swipe = () => {
  const principalString = localStorage.getItem("id");

  const principal = convertStringToPrincipal(principalString);

  function convertStringToPrincipal(principalString) {
    try {
      const principal = Principal.fromText(principalString);
      console.log("Converted Principal: ", principal.toText());
      return principal;
    } catch (error) {
      console.error("Error converting string to Principal: ", error);
      return null;
    }
  }

  console.log("pri =>", principal);

  const [formData, setFormData] = useState({
    selectedintrests: "",
    selectedpreferAge: "",
    selectedLocation: "",
    selectedPrefferedLocation: "",
    selectedIntro: "",
  });

  
  // const getData=DDate_backend.get_profile(principal)

  const userData = {
    name: "Elena Gilbert",
    pronouns: "she/her",
    jobTitle: "Artist",
    joinDate: "10th Dec 2020",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  };

  const photos = [p1, p2, p3, p4, p5];

  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-3">
        <SidebarComponent />
      </div>
      <div className="col-span-9 flex flex-col justify-center items-center">
        <div className="bg-white shadow-lg rounded-fully h-screen w-98 flex justify-center items-center  mx-auto relative">
          <img
            src={one}
            alt="Profile"
            className="rounded-lg object-cover h-full w-full"
          /> 
          <div className="flex justify-center flex-start mt-4 gap-4 absolute ml-4 cursor-pointer bottom-1 left-1">
      

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 63 63"
              fill="none"
            >
              <circle cx="31.275" cy="31.275" r="31.275" fill="#E13131" />
              <path
                d="M41.6356 44.7888L30.897 34.0402L20.1584 44.7888L17.7607 42.3927L28.5162 31.661L17.7607 20.9293L20.1584 18.5332L30.897 29.2818L41.6356 18.5501L44.0163 20.9293L33.2777 31.661L44.0163 42.3927L41.6356 44.7888Z"
                fill="black"
              />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 63 63"
              fill="none"
            >
              <circle cx="31.7242" cy="31.275" r="31.275" fill="#3FB844" />
              <path
                d="M26.7715 44.7888L14.3496 32.3433L17.4551 29.2319L26.7715 38.566L46.7664 18.5332L49.8718 21.6446L26.7715 44.7888Z"
                fill="#ECECEC"
              />
            </svg>
          </div> 
        <div className="mt-4 ml-4 absolute bottom-16 left-0 text-white"> 
          <h2 className="text-4xl font-bold text-gray-400">
            {userData.name} 
          </h2>
          <p className="text-lg text-gray-700 font-bold "> 
             {userData.jobTitle} - Since {userData.joinDate}
          </p>
          <p className="mt-2 font-bold">{userData.bio}</p>
        </div>
        </div>
      
      </div>
    </div>
  );
};


export default Swipe;
