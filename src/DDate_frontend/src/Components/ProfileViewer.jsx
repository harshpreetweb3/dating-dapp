// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { DDate_backend } from '../../../declarations/DDate_backend/index';
// import { Principal } from "@dfinity/principal";

// const ProfileViewer = () => {

//   const { senderId } = useParams(); // assuming the sender's ID is passed as a URL parameter

//   const [profile, setProfile] = useState(null);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

// //   const handleLike = () => {
// //     console.log("Like button is clicked");
// //     const isMatch = DDate_backend.check_user_match(currentUserId, potentialMatchId);

// //     if (isMatch) {
// //       console.log('Its a match');
// //     } else {
// //       console.log('You have liked the profile but match could not be made');
// //     }
// //     // setCurrentIndex(prevIndex => (prevIndex + 1) % swipeProfiles.length);
// //   };

// // function convertStringToPrincipal(principalString) {
// //   console.log("conversion principal is being called");
// //   try {
// //     const principal = Principal.fromText(principalString);
// //     console.log("Converted Principal: ", principal.toText());
// //     return principal;
// //   } catch (error) {
// //     console.error("Error converting string to Principal: ", error);
// //     return null;
// //   }
// // }

// // const principall = convertStringToPrincipal(senderId); //principal


//   // useEffect(() => {
//   //   const fetchProfile = async () => {

//   //     console.log("fetch profile is coming...");

//   //     try {
//   //       setLoading(true);
//   //       const profileData = await DDate_backend.get_profile(principall);
//   //       setProfile(profileData);
//   //     } catch (err) {
//   //       setError(err.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   if (senderId) {
//   //     fetchProfile();
//   //   }
//   // }, [principall]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         // Convert the senderId to Principal inside useEffect
//         const principal = Principal.fromText(senderId);
//         const profileData = await DDate_backend.get_profile(principal);
//         setProfile(profileData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (senderId) {
//       fetchProfile();
//     }
//   }, [senderId]);


//   if (loading) {
//     return <div>Loading profile...</div>;
//   }

//   if (error) {
//     return <div>Error fetching profile: {error}</div>;
//   }

//   if (!profile) {
//     return <div>No profile data found.</div>;
//   }

//   console.log("profile which will be viewed!!!", profile)

//   // Render the profile data 
//   // let nafees make the UI
//   return (
//     <div>
//       <h1>Profile Viewer</h1>
//       {/* Render your profile details here */}
//       <p>Principal ID: {profile.sender_id}</p>
//       {/* Add more profile details as needed */}
//     </div>
//   );
// };

// export default ProfileViewer;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DDate_backend } from '../../../declarations/DDate_backend/index';
import { Principal } from "@dfinity/principal";
import TinderCard from "react-tinder-card";
import SidebarComponent from './SidebarComponent';
import ProfileModal2 from './ProfileModal2';
import {
  faArrowRotateLeft,
  faClose,
  faStar,
  faHeart,
  faBolt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfileViewer = ({ setFinalMatch, finalMatch }) => {
  const { senderId } = useParams(); // assuming the sender's ID is passed as a URL parameter

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [somebodyLiked, setSomebodyLiked] = useState(false);

  console.log("senderId is this______", senderId);

  // const [finalMatch, setFinalMatch]= useState([]);

  const swipe = async (dir) => {
    console.log("Attempting to swipe:", dir);


    //if (canSwipe && currentIndex >= 0 && currentIndex < db.length) {
    // const cardRef = childRefs[currentIndex];
    // if (cardRef && cardRef.current) {
    //   console.log("Swiping card with index:", currentIndex);
    //   await cardRef.current.swipe(dir); // Swipe the card!
    // } else {
    //   console.error("Invalid card reference at index:", currentIndex);
    // }
    // } else {
    //   console.error("Cannot swipe. Index or db length issue.");
    // }





    if (dir == 'right') {
      console.log("like button hoya clicked##");
      setSomebodyLiked(true);
      console.log("aha profile jehre array chh pai rhi hai", profile.id.toText());

      setFinalMatch((currentMatches) => [...currentMatches, profile.id]);
    } else {
      console.log("Dislike button ho clicked##")
    }
  };

  console.log("these are final matched principals...", finalMatch);

  console.log("profile jehre fetch hoe aa from senderID", profile);

  // Define styles directly within the component
  const profileStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)'
  };

  const loadingStyle = {
    fontSize: '20px'
  };

  useEffect(() => {
    const fetchProfile = async () => {

      console.log("fetchProfile is being called!!@@@")
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

  // if (loading) {
  //   return (
  //     <div style={profileStyle}>
  //       <div>Loading profile...</div>
  //       <div style={loadingStyle}>Loading...</div>
  //     </div>
  //   );
  // }

  if (error) {
    return (
      <div style={profileStyle}>
        <div>Error fetching profile: {error}</div>
      </div>
    );
  }

  // if (!profile) {
  //   return (
  //     <div style={profileStyle}>
  //       <div>No profile data found.</div>
  //     </div>
  //   );
  // }

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

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to determine the card's width based on the window width
  const getCardWidth = () => {
    if (windowWidth > 1200) { // Large screens
      return '450px';
    } else if (windowWidth > 768) { // Medium screens
      return '300px';
    } else { // Small screens
      return '100%'; // Full width on small screens
    }
  };

  // Render the profile data 
  // let nafees make the UI
  //return (
  // <div style={profileStyle}>
  //   <h1>Profile Viewer</h1>
  //   {/* Render your profile details here */}
  //   <p>Principal ID: {profile.sender_id}</p>
  //   {/* Add more profile details as needed */}
  // </div>
  //setMatchedProfile(null);
  // };

  return (
    <div className="h-screen grid grid-cols-12">
      {/* Sidebar */}
      <div className="col-span-3">
        <SidebarComponent />
      </div>

      {!profile &&

        // <div style={profileStyle}>
        //   <div>{console.log("No profile found")}</div>
        // </div>
        console.log("No profile found")
      }

      {loading &&
        console.log("wait a bit.. Let us show you the profile you are looking for")
        // <div style={profileStyle}>
        //   <div>{console.log("wait a bit.. Let us show you the profile you are looking for")}</div>
        //   <div style={loadingStyle}>Loading...</div>
        // </div>
      }

      {profile ?

        //   <div className="col-span-9 flex flex-col items-center">
        //   {/* Title */}
        //   {/* <h1>React Tinder Card</h1> */}

        //   {/* Card Container */}
        //   <div className="cardContainer">
        //     {/* {db.map((profile, index) => ( */}
        //     {/* <TinderCard
        //       //ref={childRefs[index]}
        //       className="swipe"
        //       key={profile.location}
        //     // onSwipe={(dir) =>   swiped(dir, profile.name, index)}
        //     // onCardLeftScreen={() => outOfFrame(profile.name, index)}
        //     > */}

        //       <div
        //         style={{ backgroundImage: "url(" + profile.images[0] + ")" }}
        //         className="card"
        //       >


        //         {/* <img src={profile.images[0]}></img> */}
        //         <h3>{profile.name}</h3>
        //         <h4>{profile.location}</h4>
        //         {/* <h4>{profile.id}</h4> */}
        //         {console.log(profile.id)}
        //         {console.log(profile.location)}
        //         {console.log(profile.images[0])}
        //         <h5>{profile.introduction}</h5>
        //         {/* {setPToLike(profile.id)} */}




        //         <div className="buttons">
        //           <button onClick={() => swipe("left")}>X</button>
        //           <button onClick={() => swipe("right")}>✔</button>
        //         </div>
        //       </div>
        //       {
        //         somebodyLiked &&
        //         <>
        //           {console.log("somebodyLiked", somebodyLiked)}
        //           <ProfileModal2 profile={profile} onClose={handleCloseModal} />
        //         </>
        //       }

        //     {/* </TinderCard> */}

        //     {/* ))} */}
        //   </div>
        // </div>


        <div className="col-span-9 flex flex-col">
          {profile && (
            <div className="cardContainer" style={{
              display: 'flex',
              justifyContent: 'center', // Center horizontally
              alignItems: 'flex-start',
              position: 'relative',
              left: '-28%',
              width: '100%',
              top: '80px',
            }}>
              <div
                className="card"
                style={{
                  backgroundImage: `url(${profile.images[0]})`,
                  backgroundSize: 'cover',
                  width: getCardWidth(),
                  height: '100vh', // Set the height of the card
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                  margin:'20px'
                }}
              >
                {/* <h3>{profile.name}</h3>
                <h4>{profile.location}</h4>
                <h5>{profile.introduction}</h5> */}

                <div
                  className="pl-4 bottom-16 absolute z-21"
                // style={{ marginBottom: "-7px", lineHeight: "4px" }}
                >

                  <h2 className="text-4xl font-bold text-gradient-to-b from-[#DB7D11] to-[#6B3018] z-10 relative">
                    {profile.name}
                  </h2>
                  <p className="text-lg text-gray-700 font-bold z-10 relative">
                    {profile.location}
                  </p>

                </div>

                <div
                  className="px-0 flex absolute gap-4 pl-4 pt-2 py-6 m-0 z-30"
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


                {/* <div className="buttons">
                  <button 
                  className="rounded-full  h-12 w-12 bg-transparent shadow-md text-3xl border border-pink-700 font-bold text-gray-800"
                  onClick={() => swipe("left")}>
                    <FontAwesomeIcon
                      icon={faClose}
                      style={{ color: "#fd5068" }}
                    />
                  </button>
                  <button
                  className="rounded-full  h-12 w-12 bg-transparent shadow-md text-3xl border border-green-700 font-bold text-gray-800"
                  onClick={() => swipe("right")}>
                    <FontAwesomeIcon
                      icon={faHeart}
                      
                      style={{ color: "#1be4a1" }}
                    />
                  </button>
                </div> */}
              </div>
              {somebodyLiked && (
                <ProfileModal2 profile={profile} onClose={() => setSomebodyLiked(false)} />
              )}
            </div>
          )}
        </div>


        : "No profile found"
      }

      {/* Main Content */}

    </div>

  );
};

export default ProfileViewer;
