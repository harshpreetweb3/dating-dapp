import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import { Principal } from "@dfinity/principal";
import TinderCard from "react-tinder-card";
import SidebarComponent from "./SidebarComponent";
import ProfileModal2 from "./ProfileModal2";


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "./Loader";

const ProfileViewer = ({ setFinalMatch, finalMatch }) => {
  const { senderId } = useParams(); // assuming the sender's ID is passed as a URL parameter

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);
  const [somebodyLiked, setSomebodyLiked] = useState(false);

  console.log("senderId is this______", senderId);


  const swipe = async (dir) => {
    console.log("Attempting to swipe:", dir);

    if (dir == "right") {
      console.log("like button hoya clicked##");
      setSomebodyLiked(true);
      console.log(
        "aha profile jehre array chh pai rhi hai",
        profile.id.toText()
      );

      setFinalMatch((currentMatches) => [...currentMatches, profile.id]);
    } else {
      console.log("Dislike button ho clicked##");
    }
  };

  console.log("these are final matched principals...", finalMatch);

  console.log("profile jehre fetch hoe aa from senderID", profile);

  // Define styles directly within the component
  const profileStyle = {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
  };

  const loadingStyle = {
    fontSize: "20px",
  };

  useEffect(() => {
    const fetchProfile = async () => {
      console.log("fetchProfile is being called!!@@@");
      try {
        setLoading(true);
        // Convert the senderId to Principal inside useEffect
        const principal = Principal.fromText(senderId);

        console.log("jehre get principal de vich jau ge", principal);
        const profileData = await DDate_backend.get_profile(principal);

        console.log("jehre backend ton aae aa profile", profileData);

        setProfile(profileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (senderId) {
      fetchProfile();
    }
  }, [senderId]);

 
  if (error) {
    return (
      <div style={profileStyle}>
        <div>Error fetching profile: {error}</div>
      </div>
    );
  }

 

  const handleCloseModal = () => {
    setSomebodyLiked(false);
    //setMatchedProfile(null);
  };

  console.log("profile which will be viewed!!!", profile);

  const getWindowWidth = () => {
    const { innerWidth: width } = window;
    return width;
  };

  const [windowWidth, setWindowWidth] = useState(getWindowWidth());

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(getWindowWidth());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Function to determine the card's width based on the window width
  const getCardWidth = () => {
    if (windowWidth > 1200) {
      // Large screens
      return "450px";
    } else if (windowWidth > 768) {
      // Medium screens
      return "300px";
    } else {
      // Small screens
      return "100%"; // Full width on small screens
    }
  };


  return (

    <>
      <SidebarComponent />

      {loading ? (
        <div className="sm:ml-64">
          <div className="container flex justify-center">
            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white  h-screen ">
              <div className="h-screen">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="sm:ml-64">
          <div className="container flex justify-center px-4">
            <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-xl shadow-2xl shadow-slate-100 h-screen overflow-hidden">
              <div>
                <div className="h-screen my-10">
                  {/* <div className=" pl-2 pb-2 pt-4">
                      <img src={logo} alt="swapLogo" />
                    </div> */}

                  <div className="object-fit md:absolute relative">
                    <img
                      alt="img"
                      src={profile.images[0]}
                      className="h-screen object-cover rounded-xl relative md:top-0 top-[-83px] "
                      // style={{ height: "83vh"}}
                    />
                  </div>
                  {/* <div
                      className="bg-black h-48 w-full z-10 bottom-0"
                      style={{
                        background:
                          "linear-gradient(to top, rgb(0, 0, 0) 64%, rgba(255, 255, 255, 0) 100%)",
                        position: "fixed",
                      }}
                    ></div> */}

                  <div
                    className="pl-4 md:relative absolute top-0 md:top-6 z-21"
                    // style={{ marginBottom: "-7px", lineHeight: "4px" }}
                  >
                    <h2 className="text-4xl font-bold text-white  z-30  relative">
                      {profile.name}
                    </h2>
                    <p className="text-lg text-gray-500 z-30 font-bold  relative">
                      {profile.location}
                    </p>
                    {/* {console.log(profile.id)}
                      {console.log(profile.id.toText())}
                      {console.log(profile.location)}
                      {console.log(profile.images[0])} */}
                    <p className="mt-2 z-30 relative font-bold text-white">
                      {profile.introduction}
                    </p>
                    <div
                      className=" flex absolute gap-4 "
                      // style={{ paddingTop: "65px" }}
                    >
                      <button
                        className="rounded-full  h-12 w-12 bg-transparent shadow-md text-3xl border border-pink-700 font-bold text-gray-800"
                        onClick={() => swipe("left")}
                      >
                        <FontAwesomeIcon
                          icon={faClose}
                          style={{ color: "#fd5068" }}
                        />
                      </button>
                      <button
                        className="rounded-full  h-12 w-12 bg-transparent shadow-md text-3xl border border-green-700 font-bold text-gray-800"
                        onClick={() => swipe("right")}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          style={{ color: "#1be4a1" }}
                        />
                      </button>
                    </div>
                  </div>
                  {somebodyLiked && (
                    <>
                      {console.log("somebodyLiked", somebodyLiked)}
                      <ProfileModal2
                        profile={profile}
                        onClose={handleCloseModal}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileViewer;
