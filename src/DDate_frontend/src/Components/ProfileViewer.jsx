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

const ProfileViewer = () => {
  const { senderId } = useParams(); // assuming the sender's ID is passed as a URL parameter

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [somebodyLiked, setSomebodyLiked]= useState(false);

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


    }else{

      console.log("Dislike button ho clicked##")
    }
  };


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
      try {
        setLoading(true);
        // Convert the senderId to Principal inside useEffect
        const principal = Principal.fromText(senderId);
        const profileData = await DDate_backend.get_profile(principal);
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

  if (loading) {
    return (
      <div style={profileStyle}>
        <div>Loading profile...</div>
        <div style={loadingStyle}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={profileStyle}>
        <div>Error fetching profile: {error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div style={profileStyle}>
        <div>No profile data found.</div>
      </div>
    );
  }

  const handleCloseModal = () => {
    setSomebodyLiked(false);
    //setMatchedProfile(null);
  };

  console.log("profile which will be viewed!!!", profile)

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

      {/* Main Content */}
      <div className="col-span-9 flex flex-col items-center">
        {/* Title */}
        {/* <h1>React Tinder Card</h1> */}

        {/* Card Container */}
        <div className="cardContainer">
          {/* {db.map((profile, index) => ( */}
          <TinderCard
            //ref={childRefs[index]}
            className="swipe"
            key={profile.name}
          // onSwipe={(dir) =>   swiped(dir, profile.name, index)}
          // onCardLeftScreen={() => outOfFrame(profile.name, index)}
          >
            <div
              style={{ backgroundImage: "url(" + profile.images[0] + ")" }}
              className="card"
            >
              {/* <img src={profile.images[0]}></img> */}
              <h3>{profile.name}</h3>
              <h4>{profile.location}</h4>
              {/* <h4>{profile.id}</h4> */}
              {console.log(profile.id)}
              {console.log(profile.location)}
              {console.log(profile.images[0])}
              <h5>{profile.introduction}</h5>
              {/* {setPToLike(profile.id)} */}




              <div className="buttons">
                <button onClick={() => swipe("left")}>X</button>
                  <button onClick={() => swipe("right")}>✔</button>
              </div>
            </div>
            {
              somebodyLiked && 
              <>
              {console.log("somebodyLiked", somebodyLiked)}
              <ProfileModal2 profile={profile} onClose={handleCloseModal}/>
              </>
            }

          </TinderCard>

          {/* ))} */}
        </div>
      </div>
    </div>

  );
};

export default ProfileViewer;
