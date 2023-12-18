// import React from "react";
// import SidebarComponent from "./SidebarComponent";
// import { useNavigate } from "react-router-dom";
// import p1 from "../../assets/Images/UserProfiles/p1.png";
// import p2 from "../../assets/Images/UserProfiles/p2.png";
// import p3 from "../../assets/Images/UserProfiles/p3.png";
// import p4 from "../../assets/Images/UserProfiles/p4.png";
// import back from "../../assets/Images/CreateAccount/back.svg";

// const Notification = () => {
//   const navigate = useNavigate();

//   const userData = {
//     p1: { image: p1, bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
//     p2: { image: p2, bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
//     p3: { image: p3, bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
//     p4: { image: p4, bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..." },
//   };

//   const handleBackClick = () => {
//     navigate("/");
//   };

//   return (
//     <div className="h-screen grid grid-cols-12">
//       <div className="col-span-3">
//         <SidebarComponent />
//       </div>
//       <div className="col-span-9 flex flex-col">
//         <div className="flex items-center mt-10 ml-10 gap-2 mb-4">
//           <img
//             src={back}
//             alt="back"
//             onClick={() => navigate("/Swipe")}
//             className="w-4 h-4 cursor-pointer"
//           />
//           <div className="ml-2 text-lg font-medium">Notification</div>
//         </div>
//         <div className="relative flex justify-center items-center w-full mb-16">
//           <p className="border-t border-black w-full md:w-3/4 lg:w-2/3"></p>
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="14"
//             height="14"
//             viewBox="0 0 20 19"
//             fill="none"
//             className="absolute text-black"
//           >
//             <path
//               d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
//               fill="currentColor"
//             />
//           </svg>
//         </div>
//         {Object.keys(userData).map((key) => (
//           <div key={key} className="h-auto w-auto flex items-center justify-start flex-row ml-12 mb-2">
//             <img src={userData[key].image} alt={key} className="w-12 h-12 mr-4 rounded-full" />
//             <p className="text-black font-lg">{userData[key].bio}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Notification;


import React, { useEffect, useState } from "react";
import SidebarComponent from "./SidebarComponent";
import { useNavigate } from "react-router-dom";
//import { getProfileComponent } from "./GetProfileComponent"; // Assume this is the component that uses get_profile
import { DDate_backend } from "../../../declarations/DDate_backend/index";
// ... other imports
import { Principal } from "@dfinity/principal";
import './Notification.css';

const Notification = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [selectedUserPrincipal, setSelectedUserPrincipal] = useState(null);

  // const principalString = "tc7cw-ilo2x-rwqep-gohde-puqog-soeyv-szxvv-ybcgw-lbrkl-sm7ab-wae";

  const principalString = localStorage.getItem("id");
  console.log("this is principal strinng", principalString);


  function convertStringToPrincipal(principalString) {
    console.log("conversion principal is being called");
    try {
      const principal = Principal.fromText(principalString);
      console.log("Converted Principal: ", principal.toText());
      return principal;
    } catch (error) {
      console.error("Error converting string to Principal: ", error);
      return null;
    }
  }

  const principal = convertStringToPrincipal(principalString); //principal


  // Replace 'currentUserId' with the actual logged-in user's ID
  // const currentUserId = '...';

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const notificationData = await DDate_backend.retrieve_notifications_for_user(principal);
        setNotifications(notificationData);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  // Handler for when a notification is clicked
  const handleNotificationClick = (senderId) => {
    setSelectedUserPrincipal(senderId);
    // You can then pass 'selectedUserPrincipal' to the getProfileComponent or navigate to a route that handles it
    navigate(`/profile/${senderId}`); // This is just an example. Replace with your actual routing logic.
  };

  // const notificationElements = notifications.map((notification, index) => (
  //   <div key={index} className="h-auto w-auto flex items-center justify-start flex-row ml-12 mb-2" onClick={() => handleNotificationClick(notification.sender_id)}>
  //     {/* <img src={/* Map notification.sender_id to image alt={`User ${notification.sender_id}`} className="w-12 h-12 mr-4 rounded-full" /> */}
  //     <p className="text-black font-lg">Someone liked your profile</p>

  //   </div>
  // ));

  const notificationElements = notifications.map((notification, index) => (
    <div key={index} className="notification-item" onClick={() => handleNotificationClick(notification.sender_id)}>
      {/* Uncomment and use an actual image source for the profile picture */}
      {/* <img src={profilePicUrl} alt={`User ${notification.sender_id}`} className="notification-profile-pic" /> */}
      <p className="notification-text">Someone liked your profile</p>
    </div>
  ));

// const handleLike = () => {
//   console.log("Like button is clicked");
//   const isMatch = DDate_backend.check_user_match(currentUserId, potentialMatchId);

//   if (isMatch) {
//     console.log('Its a match');
//   } else {
//     console.log('You have liked the profile but match could not be made');
//   }
//   // setCurrentIndex(prevIndex => (prevIndex + 1) % swipeProfiles.length);
// };

  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-3">
        <SidebarComponent />
      </div>
      <div className="col-span-9 flex flex-col notification-container">
        {notificationElements}
      </div>
    </div>
  );
};

export default Notification;
