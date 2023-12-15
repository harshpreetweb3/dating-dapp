import React from "react";
import userpic from "../../assets/Images/UserProfiles/userpic.svg";
import logo from "../../assets/Images/CreateAccount/logo.png";

import { useNavigate } from "react-router-dom";

const SidebarComponent = () => {
  const navigate = useNavigate();

  const profileHandler = () => {
    navigate("/Profile");
  };

  const messageHandler=()=>{
    navigate("/MessagePage");

  }

  const notificationHandler=()=>{
    navigate("/Notification");
  }

  return (
    <aside
      className="w-80 h-screen fixed flex flex-col items-center py-4 bg-gradient-to-b from-[#DB7D11] to-[#6B3018] overflow-y-auto overflow-hidden" // aria-label="Sidebar"
    >
      <div className="mb-6">
        <img
          className="h-20 w-20 rounded-full border-2 border-white"
          src={logo}
          alt="Ddate logo"
        />
      </div>
      <ul className="w-full text-center">
        <li className="ml-4 mb-2 flex flex-row  ">
          <img
            className="h-10 w-10 rounded-full border-2 border-white"
            src={userpic}
            alt="userpic"
          />
          <button
            onClick={profileHandler}
            className="block p-2 text-white text-sm rounded hover:text-yellow-400 "
          >
            <span>My Profile</span>
          </button>
        </li>

        <li className="ml-6 mb-2 flex flex-row items-center">
          <div className="relative mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 27 23"
              fill="none"
            >
              <path
                d="M19.5268 0C17.0377 0 14.8584 1.064 13.5 2.8625C12.1416 1.064 9.96228 0 7.47321 0C5.49188 0.00221995 3.59234 0.785612 2.19132 2.17831C0.790305 3.571 0.00223321 5.45927 0 7.42883C0 15.8162 12.5104 22.6052 13.0432 22.8856C13.1836 22.9607 13.3406 23 13.5 23C13.6594 23 13.8164 22.9607 13.9568 22.8856C14.4896 22.6052 27 15.8162 27 7.42883C26.9978 5.45927 26.2097 3.571 24.8087 2.17831C23.4077 0.785612 21.5081 0.00221995 19.5268 0ZM13.5 20.9445C11.299 19.6696 1.92857 13.862 1.92857 7.42883C1.93049 5.96762 2.51527 4.5668 3.55467 3.53356C4.59408 2.50033 6.00327 1.91902 7.47321 1.91712C9.81763 1.91712 11.786 3.15845 12.608 5.15226C12.6807 5.32807 12.8043 5.47844 12.9631 5.58427C13.1219 5.69009 13.3088 5.74659 13.5 5.74659C13.6912 5.74659 13.8781 5.69009 14.0369 5.58427C14.1957 5.47844 14.3193 5.32807 14.392 5.15226C15.214 3.15486 17.1824 1.91712 19.5268 1.91712C20.9967 1.91902 22.4059 2.50033 23.4453 3.53356C24.4847 4.5668 25.0695 5.96762 25.0714 7.42883C25.0714 13.8524 15.6986 19.6684 13.5 20.9445Z"
                fill="white"
              />
            </svg>
            <span className="absolute top-0  right-0 w-2 h-2 bg-yellow-500 rounded-full"></span>
          </div>

          <button
            onClick={notificationHandler}
            className="block p-2 text-white text-sm rounded hover:text-yellow-400"
          >
            <span>Notification</span>
          </button>
        </li>

        <li className="ml-6 mb-2 flex flex-row items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 27 28"
            fill="none"
            className="mr-2"
          >
            <span className="absolute top-0 right-0 w-2 h-2 bg-yellow-500 rounded-full"></span>

            <path
              d="M1.42105 25.4104L6.52263 20.3088H22.7368C23.4906 20.3088 24.2135 20.0094 24.7465 19.4764C25.2795 18.9434 25.5789 18.2205 25.5789 17.4667V4.67722C25.5789 3.92345 25.2795 3.20055 24.7465 2.66755C24.2135 2.13455 23.4906 1.83512 22.7368 1.83512H4.26316C3.50938 1.83512 2.78648 2.13455 2.25349 2.66755C1.72049 3.20055 1.42105 3.92345 1.42105 4.67722V25.4104ZM1.42105 27.4141H0V4.67722C0 3.54656 0.449153 2.46221 1.24865 1.66271C2.04815 0.863215 3.1325 0.414063 4.26316 0.414062H22.7368C23.8675 0.414063 24.9519 0.863215 25.7514 1.66271C26.5508 2.46221 27 3.54656 27 4.67722V17.4667C27 18.5974 26.5508 19.6817 25.7514 20.4812C24.9519 21.2807 23.8675 21.7299 22.7368 21.7299H7.10526L1.42105 27.4141Z"
              fill="white"
            />
          </svg>
          <button
            onClick={messageHandler}
            className="block p-2 text-white text-sm rounded hover:text-yellow-400"
          >
            <span>Messages</span>
          </button>
        </li>

        <li className=" mb-2 flex flex-row items-center bg-yellow-500 py-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 26 29"
            fill="none"
            className="mr-2 ml-6"
          >
            <path
              d="M12.9929 3.9541L24.8418 3.9541M1.14391 24.6321L5.58727 24.6321M1.14391 3.9541L7.06838 3.9541M11.5117 24.6321L24.8418 24.6321M20.3984 14.2931L24.8418 14.2931M1.14391 14.2931L14.474 14.2931"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M7.06772 3.95401C7.06772 5.58546 8.39395 6.90801 10.03 6.90801C11.6659 6.90801 12.9922 5.58546 12.9922 3.95401C12.9922 2.32255 11.6659 1 10.03 1C8.39395 1 7.06772 2.32255 7.06772 3.95401Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M14.473 14.2929C14.473 15.9243 15.7992 17.2469 17.4352 17.2469C19.0712 17.2469 20.3975 15.9243 20.3975 14.2929C20.3975 12.6614 19.0712 11.3389 17.4352 11.3389C15.7992 11.3389 14.473 12.6614 14.473 14.2929Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M5.58725 24.6322C5.58725 26.2637 6.91349 27.5862 8.54948 27.5862C10.1855 27.5862 11.5117 26.2637 11.5117 24.6322C11.5117 23.0008 10.1855 21.6782 8.54948 21.6782C6.91349 21.6782 5.58725 23.0008 5.58725 24.6322Z"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <a href="#" className="block p-2 text-black text-sm rounded ">
            <span>Filter</span>
          </a>
        </li>
      </ul>

      <div className="flex flex-col mb-2 ml-4 text-white">
        <fieldset className="mb-1">
          <legend className="font-bold p-2  text-base rounded">
            Your interests in
          </legend>
          <div className="flex flex-wrap gap-2 md:gap-2 mb-1 py-2 px-2 rounded-3xl font-light text-sm">
            {["Men", "Women", "All"].map((interest) => (
              <label key={interest} className="flex items-center">
                <input
                  type="radio"
                  name="selectedInterest"
                  // value={interest}
                  // onChange={handleFormChange}
                  style={{ marginRight: "0.5rem" }}
                />
                {interest}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="mb-1">
          <legend className="block text-base font-bold  ml-2">
            Preferred age
          </legend>
          <div className="flex flex-wrap gap-2 md:gap-2 mb-1 py-2 px-2 rounded-3xl font-light	text-sm">
            {["18-20", "20-25", "25-30", "above 30"].map((preferAge) => (
              <label key={preferAge} className="flex items-center">
                <input
                  type="radio"
                  name="selectedPreferredAge"
                  // value={preferAge}
                  // onChange={handleFormChange}
                  style={{ marginRight: "0.5rem" }}
                />
                {preferAge}
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="mb-6">
        <label
          htmlFor="selectedLocation"
          className="block text-base  font-bold mb-1 ml-1 text-white"
        >
          Location
        </label>
        <input
          type="text"
          id="selectedLocation"
          name="selectedLocation"
          placeholder="Your Location"
          // value={formData.selectedLocation}
          // onChange={handleFormChange}
          className="w-full px-2 py-2 rounded-full border border-white bg-transparent text-white focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <div className="mb-6">
        <label
          htmlFor="selectedPreferredLocation"
          className="block text-base  font-bold mb-1 ml-1 text-white"
        >
          Preferred Location
        </label>
        <input
          type="text"
          id="selectedPreferredLocation"
          name="selectedPreferredLocation"
          placeholder="Your Preferred Location"
          // value={formData.selectedPreferredLocation}
          // onChange={handleFormChange}
          className="w-full px-2 py-2 rounded-full border border-white bg-transparent text-white focus:ring-yellow-500 focus:border-yellow-500"
        />
      </div>

      <button
        type="submit"
        className="bg-yellow-500 text-black font-light font-sm py-2 px-16 rounded-full hover:bg-yellow-600"
        // onClick={nextPageHandler}
      >
        Apply
      </button>
    </aside>
  );
};

export default SidebarComponent;