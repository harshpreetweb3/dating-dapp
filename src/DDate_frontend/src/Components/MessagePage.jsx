import React from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarComponent from './SidebarComponent'; 
import p1 from "../../assets/Images/UserProfiles/p1.png";
import p2 from "../../assets/Images/UserProfiles/p2.png";
import p3 from "../../assets/Images/UserProfiles/p3.png";
import p4 from "../../assets/Images/UserProfiles/p4.png";
import p5 from "../../assets/Images/UserProfiles/p5.png";
import back from "../../assets/Images/CreateAccount/back.svg";

// Import your images
import logo from '../../assets/Images/CreateAccount/logo.png';

const MessagePage = () => {
  const navigate = useNavigate();

  // Dummy data for message list
  const messages = [
    { id: 1, name: 'alyxstar', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', avatar:p1 },
    { id: 2, name: 'Voilet Myers', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', avatar:p2},
    { id: 3, name: 'Mia Malkova', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', avatar:p3 },
    { id: 4, name: 'Natasha Nice', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', avatar:p4 },
    { id: 5, name: 'Lena Paul', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...', avatar:p5 },

  ];


  return (
    <div className="h-screen grid grid-cols-12">
      {/* Sidebar */}
      <div className="col-span-3">
        <SidebarComponent />
      </div>

      {/* Message list */}
      <div className="col-span-3">
      <div className="flex items-center mt-10 ml-6 gap-2 mb-4">
          <img
            src={back}
            alt="back"
            onClick={() => navigate("/")}
            className="w-4 h-4 cursor-pointer"
          />
          <div className="ml-2 text-lg font-medium">Your Messages</div>
        </div>
        <div className="relative flex justify-center items-center w-full mb-2">
          <p className="border-t border-black w-full md:w-3/4 lg:w-2/3"></p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 20 19"
            fill="none"
            className="absolute text-black"
          >
            <path
              d="M10 18.35L8.55 17.03C3.4 12.36 0 9.27 0 5.5C0 2.41 2.42 0 5.5 0C7.24 0 8.91 0.81 10 2.08C11.09 0.81 12.76 0 14.5 0C17.58 0 20 2.41 20 5.5C20 9.27 16.6 12.36 11.45 17.03L10 18.35Z"
              fill="currentColor"
            />
          </svg>
        </div>
        
        <div className="border-b border-gray-300">
          {/* Search or title bar */}
          <div className="flex items-center p-4 bg-white">
            <input
              className="flex-grow py-2 px-4  border  bg-gray-200 rounded-full"
              type="text"
              placeholder="Search by name"
            />
          </div>
          {/* List of messages */}
          <div className="bg-white">
            {messages.map((message) => (
              <div key={message.id} className="flex items-center p-4 hover:bg-gray-100 cursor-pointer">
                <img src={message.avatar} alt={message.name} className="w-10 h-10 rounded-full mr-4" />
                <div className="flex flex-col">
                  <span className="font-medium">{message.name}</span>
                  <span className="text-gray-600 text-sm">{message.message}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Logo area */}
      <div className="col-span-6 flex items-center justify-center bg-gray-200">
        <img src={logo} alt="Logo" className="w-12 h-12" />
      </div>
    </div>
  );
};

export default MessagePage;
