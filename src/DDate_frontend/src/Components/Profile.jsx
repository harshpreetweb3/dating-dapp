import React, { useState } from "react";
// import p1 from "../../assets/Images/UserProfiles/p1.png";
import SidebarComponent from "./SidebarComponent";
import { Principal } from "@dfinity/principal";
import back from "../../assets/Images/CreateAccount/back.svg";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [formData, setFormData] = useState({
    gender: "",
    email: "",
    username: "",
    mobile: "",
    intro: "",
    profileImage: null,
  });

  const navigate = useNavigate();

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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      profileImage: file,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const userData = {
    gender: "man",
    email: "xyzabc123@gmail.com",
    name: "gibriel",
    mobile: "1234567890",
    DOB: "10th Dec 2020",
    pronouns: "he/his",
    jobTitle: "Artist",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
  };

  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-3">
        <SidebarComponent />
      </div>
      <div className="col-span-9 flex flex-col justify-center">
        <div className="flex items-center mt-10 ml-10 gap-2 mb-4">
          <img
            src={back}
            alt="back"
            onClick={() => navigate("/")}
            className="w-4 h-4 cursor-pointer"
          />
          <div className="ml-2 text-lg font-medium">Edit Your Profile</div>
        </div>
        <div className="relative flex justify-center items-center w-full mb-16">
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
        <div className="h-auto w-auto flex items-center justify-center flex-col">
          <div className="mb-4 relative">
            <input
              id="profileImage"
              type="file"
              name="profileImage"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="profileImage"
              className="h-32 w-32 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(transparent, transparent), radial-gradient(circle at center, #cccccc, #cccccc)",
                backgroundBlendMode: "multiply",
              }}
            >
              {formData.profileImage ? (
                <img
                  src={URL.createObjectURL(formData.profileImage)}
                  alt="Profile"
                  className="rounded-full w-full h-full object-cover"
                  style={{ marginTop: "-10px" }}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                ></svg>
              )}
            </label>
          </div>

          <div className="mb-4 text-center flex flex-row">
            <h2 className="text-2xl font-bold text-black">{userData.name}</h2>
            <p className="text-lg text-gray-700 font-bold">
              ({userData.pronouns})
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center">
              <label htmlFor="gender" className="text-lg font-medium">
                Gender
              </label>
            </div>
            <div>
              <input
                id="gender"
                type="text"
                name="gender"
                value={userData.gender}
                className="form-input w-full px-2 py-1.5 rounded-3xl"
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="email" className="text-lg font-medium">
                Email
              </label>
            </div>
            <div>
              <input
                id="email"
                type="email"
                name="email"
                value={userData.email}
                className="form-input w-full px-2 py-1.5 rounded-3xl"
              />
            </div>

            <div className="flex items-center">
              <label htmlFor="mobile" className="text-lg font-medium">
                Mobile
              </label>
            </div>
            <div>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={userData.mobile}
                className="form-input w-full px-2 py-1.5 rounded-3xl"
              />
            </div>

            <div className="flex items-center mb-4">
              <label htmlFor="intro" className="text-lg font-medium">
                My Intro
              </label>
            </div>
            <div className="col-auto">
              <textarea
                id="intro"
                name="intro"
                value={userData.bio}
                onChange={handleFormChange}
                rows="4"
                className="form-input w-full px-2 py-1.5 rounded-3xl bg-gray-200"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-yellow-500 rounded-full font-sm py-2 px-8 mb-10  text-black hover:bg-yellow-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
