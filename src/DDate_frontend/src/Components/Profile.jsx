// import React, { useState, useEffect } from "react";
// import SidebarComponent from "./SidebarComponent";
// import { Principal } from "@dfinity/principal";
// import back from "../../assets/Images/CreateAccount/back.svg";
// import { useNavigate } from "react-router-dom";
// import { DDate_backend } from "../../../declarations/DDate_backend/index";

// const Profile = () => {

//   const [formData, setFormData] = useState({
//     gender: "",
//     email: "",
//     name: "",
//     mobile_number: "",
//     introduction: "",
//     images: null,
//     gender_pronouns: "",
//   });

//   const [principal, setPrincipal] = useState(null);
//   const [userProfile, setUserProfile] = useState(null);
//   const [imageFiles, setImageFiles] = useState([]);
//   const [imageError, setImageError] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {

//     const principalString = localStorage.getItem("id");
//     // const principalString = "tc7cw-ilo2x-rwqep-gohde-puqog-soeyv-szxvv-ybcgw-lbrkl-sm7ab-wae";
//     console.log(principalString);

//     if (principalString) {
//       const newPrincipal = convertStringToPrincipal(principalString);
//       setPrincipal(newPrincipal);

//       const fetchUserProfile = async () => {
//         try {
//           const userProfileData = await DDate_backend.get_profile(newPrincipal);
//           console.log("userProfileData ==>>>> ", userProfileData)
//           setFormData({
//             gender: userProfileData.gender || "",
//             email: userProfileData.email || "",
//             name: userProfileData.name || "",
//             mobile_number: userProfileData.mobile_number || "",
//             introduction: userProfileData.introduction || "",
//             images: userProfileData.images || null,
//             gender_pronouns: userProfileData.gender_pronouns || "",
//           });

//         } catch (error) {
//           console.error("Error fetching user profile: ", error);
//         }
//       };

//       fetchUserProfile();
//     } else {
//       console.warn("Principal string is null or empty.");
//     }
//   }, []);

//   function convertStringToPrincipal(principalString) {
//     try {
//       const principal = Principal.fromText(principalString);
//       console.log("Converted Principal: ", principal.toText());
//       return principal;
//     } catch (error) {
//       console.error("Error converting string to Principal: ", error);
//       return null;
//     }
//   }

//   // bs data dekhne k lie
//   useEffect(() => {
//     if (userProfile) {
//       console.log("User Profile: ", userProfile);
//     }
//   }, [userProfile]);

//   const handleFormChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const newImageBase64 = reader.result;
//         setFormData(prevData => ({
//           ...prevData,
//           images: newImageBase64
//         }));
//       };
//     }

//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setImageError(false);

//     // Check if the image is provided
//     if (!formData.images && !userProfile?.images) {
//       setImageError(true);
//       return;
//     }

//     // Construct updated profile data with original data as fallback
//     const updatedProfileData = {
//       id: principal,
//       new_name: formData.name !== userProfile?.name ? [formData.name] : [userProfile?.name],
//       new_gender: formData.gender !== userProfile?.gender ? [formData.gender] : [userProfile?.gender],
//       new_email: formData.email !== userProfile?.email ? [formData.email] : [userProfile?.email],
//       new_mobile_number: formData.mobile_number.toString() !== userProfile?.mobile_number ? [formData.mobile_number.toString()] : [userProfile?.mobile_number],
//       new_gender_pronouns: formData.gender_pronouns !== userProfile?.gender_pronouns ? [formData.gender_pronouns] : [userProfile?.gender_pronouns],
//       new_introduction: formData.introduction !== userProfile?.introduction ? [formData.introduction] : [userProfile?.introduction],
//       images: [[formData.images]] || [[userProfile?.images]],
//       new_dob: userProfile?.dob || [],
//       new_religion: userProfile?.religion || [],
//       new_height: userProfile?.height || [],
//       new_zodiac: userProfile?.zodiac || [],
//       new_diet: userProfile?.diet || [],
//       new_occupation: userProfile?.occupation || [],
//       new_looking_for: userProfile?.looking_for || [],
//       new_smoking: userProfile?.smoking || [],
//       new_drinking: userProfile?.drinking || [],
//       new_hobbies: userProfile?.hobbies || [],
//       new_sports: userProfile?.sports || [],
//       new_art_and_culture: userProfile?.art_and_culture || [],
//       new_pets: userProfile?.pets || [],
//       new_general_habits: userProfile?.general_habits || [],
//       new_outdoor_activities: userProfile?.outdoor_activities || [],
//       new_travel: userProfile?.travel || [],
//       new_movies: userProfile?.movies || [],
//       new_interests_in: userProfile?.interests_in || [],
//       new_age: userProfile?.age || [],
//       new_location: userProfile?.location || [],
//       new_min_preferred_age: userProfile?.min_preferred_age || [],
//       new_max_preferred_age: userProfile?.max_preferred_age || [],
//       new_preferred_gender: userProfile?.preferred_gender || [],
//       new_preferred_location: userProfile?.preferred_location || [],
//       new_matched: userProfile?.matched || []
//     };

//     console.log("updatedProfileData =>", updatedProfileData)
//     try {
//       await DDate_backend.update_profile(updatedProfileData);
//       navigate("/Swipe");
//     } catch (error) {
//       console.error("Error sending data to the backend:", error);
//     }
//   };

//   return (
//     <div className="h-screen grid grid-cols-12">
//       <div className="col-span-3">
//         <SidebarComponent />
//       </div>
//       <div className="col-span-9 flex flex-col justify-center">
//         <div className="flex items-center mt-10 ml-10 gap-2 mb-4">
//           <img
//             src={back}
//             alt="back"
//             onClick={() => navigate("/Swipe")}
//             className="w-4 h-4 cursor-pointer"
//             style={{marginLeft: "-50px"}}
//           />
//           <div className="ml-2 text-lg" style={{fontWeight: 600 }}>Edit Your Profile</div>
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
//         <div className="h-auto w-auto flex items-center justify-center flex-col">
//           <div className="mb-4 relative">
//             <input
//               id="images"
//               type="file"
//               name="images"
//               onChange={handleImageChange}
//               className="hidden imageee"
//             />
//             <label
//               htmlFor="images"
//               className="h-32 w-32 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center"
//               style={{
//                 background:
//                   "linear-gradient(transparent, transparent), radial-gradient(circle at center, #cccccc, #cccccc)",
//                 backgroundBlendMode: "multiply",
//               }}
//             >
//               {formData.images ? (
//                 <img src={formData.images || 'https://via.placeholder.com/150'} alt="Profile"
//                   className="rounded-full w-full h-full object-cover"
//                   style={{ marginTop: "0px" }}
//                 />
//               ) : (
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-12 w-12 text-gray-400"
//                   viewBox="0 0 20 20"
//                   fill="currentColor"
//                 ></svg>
//               )}
//             </label>
//           </div>

//           <div className="mb-4 text-center flex flex-row">
//             <h2 className="text-2xl font-bold text-black">{formData.name}</h2>

//             <p className="text-lg text-gray-700 font-bold" style={{
//               marginTop: "4px",
//               marginLeft: "7px"
//             }}>
//               ({formData.gender_pronouns})
//             </p>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className="w-full max-w-lg font-num">
//           <div className="grid grid-cols-2 gap-2">
//             <div className="flex items-center">
//               <label htmlFor="gender" className="text-lg" style={{fontWeight: 600}}>
//                 Gender
//               </label>
//             </div>
//             <div>
//               <input
//                 id="gender"
//                 type="text"
//                 name="gender"
//                 value={formData.gender}
//                 onChange={handleFormChange}
//                 className="form-input w-full px-2 py-1.5 rounded-3xl"
//               />
//             </div>

//             <div className="flex items-center">
//               <label htmlFor="email" className="text-lg" style={{fontWeight: 600}}>
//                 Email
//               </label>
//             </div>
//             <div>
//               <input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleFormChange}
//                 className="form-input w-full px-2 py-1.5 rounded-3xl"
//               />
//             </div>

//             <div className="flex items-center">
//               <label htmlFor="name" className="text-lg" style={{fontWeight: 600}}>
//                 Username
//               </label>
//             </div>
//             <div>
//               <input
//                 id="name"
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleFormChange}
//                 className="form-input w-full px-2 py-1.5 rounded-3xl"
//               />
//             </div>

//             <div className="flex items-center">
//               <label htmlFor="mobile_number" className="text-lg" style={{fontWeight: 600}}>
//                 Mobile No.
//               </label>
//             </div>
//             <div>
//               <input
//                 id="mobile_number"
//                 type="tel"
//                 name="mobile_number"
//                 value={formData.mobile_number.toString()}
//                 onChange={handleFormChange}
//                 className="form-input w-full px-2 py-1.5 rounded-3xl"
//               />
//             </div>

//             <div className="flex items-center mb-4">
//               <label htmlFor="introduction" className="text-lg" style={{fontWeight: 600}}>
//                 My Introduction
//               </label>
//             </div>
//             <div className="col-auto">
//               <textarea
//                 id="introduction"
//                 name="introduction"
//                 value={formData.introduction}
//                 onChange={handleFormChange}
//                 rows="4"
//                 className="form-input w-full px-2 py-1.5 rounded-3xl bg-gray-200"
//               ></textarea>
//             </div>
//           </div>

//           <div className="flex justify-end mt-6">
//             <button
//               type="submit"
//               className="bg-yellow-500 rounded-full font-sm py-2 px-8 mb-10 text-black hover:bg-yellow-600"
//             >
//               Save Changes
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import SidebarComponent from "./SidebarComponent";
import { Principal } from "@dfinity/principal";
import back from "../../assets/Images/CreateAccount/back.svg";
import { useNavigate } from "react-router-dom";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import Loader from "./Loader";
import "./Swipe.css";

const Profile = () => {
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    gender: "",
    email: "",
    name: "",
    mobile_number: "",
    introduction: "",
    images: null,
    gender_pronouns: "",
  });

  const [principal, setPrincipal] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageError, setImageError] = useState(false);

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
            images: userProfileData.images || null,
            gender_pronouns: userProfileData.gender_pronouns || "",
          });
          setLoader(false);
        } catch (error) {
          console.error("Error fetching user profile: ", error);
          setLoader(false);
        }
      };

      fetchUserProfile();
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const newImageBase64 = reader.result;
        setFormData((prevData) => ({
          ...prevData,
          images: newImageBase64,
        }));
      };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setImageError(false);

    // Check if the image is provided
    if (!formData.images && !userProfile?.images) {
      setImageError(true);
      return;
    }

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
      images: [[formData.images]] || [[userProfile?.images]],
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

  return (
    <div className="h-screen grid grid-cols-12">
      <div className="col-span-3">
        <SidebarComponent />
      </div>

      {loader ? (
        <Loader />
      ) : (
        <div className="col-span-9 flex flex-col justify-center">
          <div className="flex items-center mt-10 ml-10 gap-2 mb-4">
            <img
              src={back}
              alt="back"
              onClick={() => navigate("/Swipe")}
              className="w-4 h-4 cursor-pointer"
              style={{ marginLeft: "-50px" }}
            />
            <div className="ml-2 text-lg" style={{ fontWeight: 600 }}>
              Edit Your Profile
            </div>
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
                id="images"
                type="file"
                name="images"
                onChange={handleImageChange}
                className="hidden imageee"
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
                {formData.images ? (
                  <img
                    src={formData.images || "https://via.placeholder.com/150"}
                    alt="Profile"
                    className="rounded-full w-full h-full object-cover"
                    style={{ marginTop: "0px" }}
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
              <h2 className="text-2xl font-bold text-black">{formData.name}</h2>

              <p
                className="text-lg text-gray-700 font-bold"
                style={{
                  marginTop: "4px",
                  marginLeft: "7px",
                }}
              >
                ({formData.gender_pronouns})
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg font-num"
            style={{ marginLeft: "203px" }}
          >
            <div className="grid grid-cols-2 gap-2">
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

            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="bg-yellow-500 rounded-full font-sm py-2 px-8 mb-10 text-black hover:bg-yellow-600"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
