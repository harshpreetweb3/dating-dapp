
import React, { useState, useEffect } from "react";
import SidebarComponent from "./SidebarComponent";
import { Principal } from "@dfinity/principal";
import back from "../../assets/Images/CreateAccount/back.svg";
import addProfile from "../../assets/Images/UserProfiles/profileAdd.svg";
import uploadProfile from "../../assets/Images/UserProfiles/upload.svg";
import Ellipse from "../../assets/Images/UserProfiles/Ellipse.svg";
import { useNavigate } from "react-router-dom";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import Loader from "./Loader";
import "./Swipe.css";
import CompressImage from "./ImageCompressFolder/CompressImage";

const Profile = () => {

  const [loader, setLoader] = useState(false);
  const [progress, setProgress] = useState(60);
  const [formData, setFormData] = useState({
    gender: "",
    email: "",
    name: "",
    mobile_number: "",
    introduction: "",
    images: [],
    gender_pronouns: "",
  });


  const [principal, setPrincipal] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageError, setImageError] = useState(false);
  const [tempProfileImage, setTempProfileImage] = useState("");

  const navigate = useNavigate();

 
  useEffect(() => {
    setLoader(true);

    const principalString = localStorage.getItem("id");

    // const principalString = "tc7cw-ilo2x-rwqep-gohde-puqog-soeyv-szxvv-ybcgw-lbrkl-sm7ab-wae";
    console.log(principalString);

    if (principalString) {
      const newPrincipal = convertStringToPrincipal(principalString);
      setPrincipal(newPrincipal);

      const fetchUserProfile = async () => {
        try {
          const userProfileData = await DDate_backend.get_profile(newPrincipal);
          console.log("userProfileData ==>>>> ", userProfileData);
          setFormData({
            gender: userProfileData.gender || "",
            email: userProfileData.email || "",
            name: userProfileData.name || "",
            mobile_number: userProfileData.mobile_number || "",
            introduction: userProfileData.introduction || "",
            images: userProfileData.images || [],
            gender_pronouns: userProfileData.gender_pronouns || "",
          });
          setLoader(false);
        } catch (error) {
          console.error("Error fetching user profile: ", error);
          setLoader(false);
        }
      };

      fetchUserProfile();
      setLoader(false);

    } else {
      console.warn("Principal string is null or empty.");
    }
  }, []);
  

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

  // bs data dekhne k lie
  useEffect(() => {
    if (userProfile) {
      console.log("User Profile: ", userProfile);
    }
  }, [userProfile]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedFile = await CompressImage(file);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          const newImageBase64 = reader.result;
          setTempProfileImage(newImageBase64); // Set the first image as temporary profile image
          setFormData((prevData) => ({
            ...prevData,
            images: [newImageBase64, ...prevData.images.slice(1)],
          }));
        };
      } catch (error) {
        console.error('Error compressing the image:', error);
      }
    }
  };

  const [isLoading, setIsLoading] = useState({});

  const handleAdditionalImageChange = (index) => async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading((prevLoading) => ({ ...prevLoading, [index]: true })); 
      try {
        const compressedFile = await CompressImage(file);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          setFormData((prevData) => {
            const newImages = [...prevData.images];
            newImages[index] = reader.result; 
            return { ...prevData, images: newImages };
          });
          setIsLoading((prevLoading) => ({ ...prevLoading, [index]: false })); 
        };
      } catch (error) {
        console.error('Error compressing the image:', error);
        setIsLoading((prevLoading) => ({ ...prevLoading, [index]: false })); 
      }
    }
  };

  
  


  const handleImageClick = () => {
    document.getElementById('images').click();
  };


  // Function to handle file input change
  const handleImageChangeProfile = (event) => {
    // Handle file change event
    // For example, you can set the file to state or upload it
    console.log(event.target.files[0]);
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageError(false);

    // Check if the image is provided
    if (formData.images.length === 0) {
      setImageError(true);
      return;
    }

    const finalImagesArray = tempProfileImage 
    ? [tempProfileImage, ...formData.images.slice(1)] 
    : formData.images;

    // Construct updated profile data with original data as fallback
    const updatedProfileData = {
      id: principal,
      new_name:
        formData.name !== userProfile?.name
          ? [formData.name]
          : [userProfile?.name],
      new_gender:
        formData.gender !== userProfile?.gender
          ? [formData.gender]
          : [userProfile?.gender],
      new_email:
        formData.email !== userProfile?.email
          ? [formData.email]
          : [userProfile?.email],
      new_mobile_number:
        formData.mobile_number.toString() !== userProfile?.mobile_number
          ? [formData.mobile_number.toString()]
          : [userProfile?.mobile_number],
      new_gender_pronouns:
        formData.gender_pronouns !== userProfile?.gender_pronouns
          ? [formData.gender_pronouns]
          : [userProfile?.gender_pronouns],
      new_introduction:
        formData.introduction !== userProfile?.introduction
          ? [formData.introduction]
          : [userProfile?.introduction],
      images: [formData.images] || [userProfile?.images],
      new_dob: userProfile?.dob || [],
      new_religion: userProfile?.religion || [],
      new_height: userProfile?.height || [],
      new_zodiac: userProfile?.zodiac || [],
      new_diet: userProfile?.diet || [],
      new_occupation: userProfile?.occupation || [],
      new_looking_for: userProfile?.looking_for || [],
      new_smoking: userProfile?.smoking || [],
      new_drinking: userProfile?.drinking || [],
      new_hobbies: userProfile?.hobbies || [],
      new_sports: userProfile?.sports || [],
      new_art_and_culture: userProfile?.art_and_culture || [],
      new_pets: userProfile?.pets || [],
      new_general_habits: userProfile?.general_habits || [],
      new_outdoor_activities: userProfile?.outdoor_activities || [],
      new_travel: userProfile?.travel || [],
      new_movies: userProfile?.movies || [],
      new_interests_in: userProfile?.interests_in || [],
      new_age: userProfile?.age || [],
      new_location: userProfile?.location || [],
      new_min_preferred_age: userProfile?.min_preferred_age || [],
      new_max_preferred_age: userProfile?.max_preferred_age || [],
      new_preferred_gender: userProfile?.preferred_gender || [],
      new_preferred_location: userProfile?.preferred_location || [],
      new_matched: userProfile?.matched || [],
    };

    console.log("updatedProfileData =>", updatedProfileData);
    try {
      await DDate_backend.update_profile(updatedProfileData);
      navigate("/Swipe");
     

    } catch (error) {
      console.error("Error sending data to the backend:", error);
    }
  };

  const calculateProgressOffset = (progress) => {
    const radius = 47; 
    const circumference = 2 * Math.PI * radius;
    return circumference - (progress / 100) * circumference;
  };


  return (
    <>
    { principal &&  <SidebarComponent />}
      {loader ? (
      
      <div className="sm:ml-64">
      <div className="container flex justify-center">
        <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white  h-screen ">
                <div className="h-screen">
               <Loader/>
          </div>
        </div>
      </div>
    </div>
          
      ) : (
        <div className="h-screen grid grid-cols-12">
          <div className="md:col-span-2"></div>
          <div className="col-span-12 lg:col-span-6 xl:col-span-6 px-6 lg:px-10 xl:px-12">
            <div className="flex items-center md:mt-10 ml-12 gap-2 mb-4">
              <img
                src={back}
                alt="back"
                onClick={() => navigate("/Swipe")}
                className="w-4 h-4 cursor-pointer"
              />
              <div className="ml-2 text-lg font-medium">Edit Your Profile</div>
            </div>
            <div className="px-6 sm:p-4 md:px-8 lg:px-10 xl:px-12 overflow-y-auto">
              <div className="relative flex justify-center items-center w-full mb-16 mt-2">
                <p className="border-t border-black w-full md:w-3/4 lg:w-2/3"></p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 20 19"
                  fill="none"
                  className="absolute text-black z-10"
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
                    id="images"
                    type="file"
                    name="images"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="h-32 w-32 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(transparent, transparent), radial-gradient(circle at center, #cccccc, #cccccc)",
                      backgroundBlendMode: "multiply",
                    }}
                  >
                    
                   {formData.images.length > 0 ? (
                      <div className="relative w-full h-full" style={{ top: '0.45rem ', left: '-0.15rem' }}>
                        <svg className="absolute inset-0 w-32 h-32 -top-2 z-10" viewBox="0 0 100 100">
                          <circle
                            className="text-gray-300"
                            strokeWidth="5"
                            stroke="#A7A1A1"
                            fill="transparent"
                            r="47"
                            cx="50"
                            cy="50"
                          />
                          <circle
                            className="bg-yellow-400"
                            strokeWidth="5"
                            strokeDasharray="295.31"
                            strokeDashoffset={calculateProgressOffset(progress)}
                            strokeLinecap="round"
                            stroke="#FFC107"
                            fill="transparent"
                            r="47"
                            cx="50"
                            cy="50"
                          />
                        </svg>

                        <img
                          src={tempProfileImage || formData.images[0] || "default-placeholder.jpg"}             
                          alt="Profile"
                          className="rounded-full w-full h-full object-cover absolute"
                          style={{ marginTop: "-8px", marginLeft: "2px" }}
                        />

                        <img
                          src={Ellipse}
                          alt="back"
                          className="w-9 h-9 bg-yellow-400 rounded-full absolute top-24 z-20"
                          style={{ left: '3.10rem' }}
                        />
                        <div className=" text-white font-bold text-xs absolute z-30" style={{ top: '6.6rem', left: '3.4rem' }} >{progress} %</div>
                      </div>
                    ) : <svg className="w-full h-full p-4 text-gray-200 dark:text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>}
                  </label>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-md mx-auto p-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div className="flex items-center">
                      <label
                        htmlFor="gender"
                        className="text-lg"
                        style={{ fontWeight: 600 }}
                      >
                        Gender
                      </label>
                    </div>
                    <div>
                      <input
                        id="gender"
                        type="text"
                        name="gender"
                        value={formData.gender}
                        onChange={handleFormChange}
                        className="form-input w-full px-2 py-1.5 rounded-3xl"
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        htmlFor="email"
                        className="text-lg"
                        style={{ fontWeight: 600 }}
                      >
                        Email
                      </label>
                    </div>
                    <div>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        className="form-input w-full px-2 py-1.5 rounded-3xl"
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        htmlFor="name"
                        className="text-lg"
                        style={{ fontWeight: 600 }}
                      >
                        Username
                      </label>
                    </div>
                    <div>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        className="form-input w-full px-2 py-1.5 rounded-3xl"
                      />
                    </div>

                    <div className="flex items-center">
                      <label
                        htmlFor="mobile_number"
                        className="text-lg"
                        style={{ fontWeight: 600 }}
                      >
                        Mobile No.
                      </label>
                    </div>
                    <div>
                      <input
                        id="mobile_number"
                        type="tel"
                        name="mobile_number"
                        value={formData.mobile_number.toString()}
                        onChange={handleFormChange}
                        className="form-input w-full px-2 py-1.5 rounded-3xl"
                      />
                    </div>

                    <div className="flex items-center mb-4">
                      <label
                        htmlFor="introduction"
                        className="text-lg"
                        style={{ fontWeight: 600 }}
                      >
                        My Introduction
                      </label>
                    </div>
                    <div className="col-auto">
                      <textarea
                        id="introduction"
                        name="introduction"
                        value={formData.introduction}
                        onChange={handleFormChange}
                        rows="4"
                        className="form-input w-full px-2 py-1.5 rounded-3xl bg-gray-200"
                      ></textarea>
                    </div>
                  </div>

                 
                </form>
              </div>
            </div>
          </div>
          <div className="col-span-12 lg:col-span-4 xl:col-span-4 px-4 lg:px-8 xl:px-10">
            <div className="flex items-center md:mt-10 ml-6 gap-2 mb-6">
              <img
                src={addProfile}
                alt="addProfile"
                className="w-4 h-4 cursor-pointer"
              />
              <div className="ml-2 text-lg font-medium">Your Photos</div>
            </div>
            <div className="relative flex justify-center items-center w-full mb-2 mt-2">
            <p className="border-t border-black w-2/3 px-2 md:w-3/4 lg:w-2/3"></p>
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
            <div className="border-gray-300">
              <div className="flex items-center justify-center p-4 bg-white mb-2">
                <div className=" text-black text-opacity-50 font-normal text-sm">
                  Add maximum 2 photos for better reach
                </div>
              </div>
             
              <div className="bg-white">
  <div className="flex items-center flex-wrap p-3 md:p-4 justify-center cursor-pointer gap-4">
    {/* First input field for additional photos */}
    <div className="w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] bg-zinc-200 flex justify-center items-center">
  <label htmlFor={`additional-image-1`}>
    {isLoading[1] ? (
      <div className="flex items-center justify-center w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] bg-zinc-200" key="1">
       <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
      </div>
    ) : formData.images[1] ? (
      <img
        src={formData.images[1]}
        alt={`Additional Image 1`}
        className="w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] cursor-pointer"
      />
    ) : (
      <img
        src={uploadProfile}
        alt="uploadProfile"
        className=" rounded-[15px] cursor-pointer"
      />
    )}
    <input
      id={`additional-image-1`}
      type="file"
      onChange={handleAdditionalImageChange(1)}
      className="hidden"
    />
  </label>
</div>

    {Object.entries(isLoading).map(([key, value]) => (console.log(value)))}
    {/* Second input field for additional photos */}
    <div className="w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] bg-zinc-200  flex justify-center items-center">
      <label htmlFor={`additional-image-2`}>
      {isLoading[2] ? (
      <div className="flex items-center justify-center w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] bg-zinc-200" key="1">
       <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
        </svg>
      </div>
    ) :
    formData.images[2] ? (
          <img
            src={formData.images[2]}
            alt={`Additional Image 2`}
            className="w-40 h-[180px] md:w-36 md:h-[196px] rounded-[15px] cursor-pointer"
          />
        ) : (
          <img
            src={uploadProfile}
            alt="uploadProfile"
            className="rounded-[15px] cursor-pointer"
          />
        )}
        <input
          id={`additional-image-2`}
          type="file"
          onChange={handleAdditionalImageChange(2)}
          className="hidden"
        />
      </label>
    </div>
  </div>
</div>
<div className="flex justify-center mt-6">
                    <button
                      type="submit"
                      className="bg-yellow-500 rounded-full font-sm py-2 px-8 mb-10 text-black hover:bg-yellow-600"
                    >
                      Save Changes
                    </button>
                  </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
