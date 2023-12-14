import React from 'react';
import one from "../../assets/Images/UserProfiles/one.png";
import p1 from '../../assets/Images/UserProfiles/p1.png';
import p2 from '../../assets/Images/UserProfiles/p2.png';
import p3 from '../../assets/Images/UserProfiles/p3.png';
import p4 from '../../assets/Images/UserProfiles/p4.png';
import p5 from '../../assets/Images/UserProfiles/p5.png';
import SidebarComponent from './SidebarComponent';
import { DDate_backend } from '../../../declarations/DDate_backend/index';


const Swipe = () => {
  // Dummy data - replace with actual data as needed
  const userData = {
    name: "Elena Gilbert",
    pronouns: "she/her",
    jobTitle: "Artist",
    joinDate: "10th Dec 2020",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  };

//   const photos = [
//     '../../assets/Images/UserProfiles/p1.png', // Replace with actual paths to images
//     '../../assets/Images/UserProfiles/p2.png',
//     '../../assets/Images/UserProfiles/p3.png',
//     '../../assets/Images/UserProfiles/p4.png',
//     '../../assets/Images/UserProfiles/p5.png'
//   ];

const photos = [
    p1, p2, p3, p4, p5
  ];

  return (
    <div className="flex">
        <SidebarComponent />
    <div className="bg-white rounded-lg shadow-lg p-6 flex">
      <div className="flex-1">
        <div className="rounded-lg bg-yellow-300 h-96 w-72 flex justify-center items-center">
          <img
            //src="/path/to/main-photo.jpg" // Replace with the actual path to the main image
            //src="../../assets/Images/UserProfiles/one.png"
            src={one}   
            alt="Profile"
            className="rounded-lg object-cover h-full w-full"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-semibold">{userData.name} ({userData.pronouns})</h2>
          <p className="text-sm text-gray-600">{userData.jobTitle} - Since {userData.joinDate}</p>
          <p className="text-gray-700 mt-2">{userData.bio}</p>
          <div className="flex mt-4">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full mr-2">
              X
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full">
              ✓
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-end">
          <div className="flex flex-col items-end">
            <h3 className="text-lg font-semibold mb-2">Available Photos</h3>
            <div className="grid grid-cols-2 gap-2">
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={photo}
                  alt={`Profile ${index}`}
                  className="object-cover h-24 w-24 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Swipe;
