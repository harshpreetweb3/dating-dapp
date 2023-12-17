import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DDate_backend } from '../../../declarations/DDate_backend/index';

const ProfileViewer = () => {

  const { senderId } = useParams(); // assuming the sender's ID is passed as a URL parameter

  const [profile, setProfile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

//   const handleLike = () => {
//     console.log("Like button is clicked");
//     const isMatch = DDate_backend.check_user_match(currentUserId, potentialMatchId);

//     if (isMatch) {
//       console.log('Its a match');
//     } else {
//       console.log('You have liked the profile but match could not be made');
//     }
//     // setCurrentIndex(prevIndex => (prevIndex + 1) % swipeProfiles.length);
//   };


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const profileData = await DDate_backend.getProfile(senderId);
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
  }, []);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>Error fetching profile: {error}</div>;
  }

  if (!profile) {
    return <div>No profile data found.</div>;
  }

  // Render the profile data 
  // let nafees make the UI
  return (
    <div>
      <h1>Profile Viewer</h1>
      {/* Render your profile details here */}
      <p>Principal ID: {profile.sender_id}</p>
      {/* Add more profile details as needed */}
    </div>
  );
};

export default ProfileViewer;
