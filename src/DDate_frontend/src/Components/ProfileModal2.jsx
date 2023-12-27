

import React from "react";

function ProfileModal2({ profile, onClose }) {
  // Inline styles for the modal and backdrop
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    zIndex: 1000,
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    width: '30%',
    height: '100%'
  };

  const imgg = {
    maxWidth: '100%',
    height: 'auto'
  }

  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
  };

  const buttonStyle = {
    marginTop: '20px',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  };

  const handleCloseModal = () => {
    setMatch(false);
    //setMatchedProfile(null);
  };

  return (

    <div style={backdropStyle}>
      <div style={modalStyle}>
        {console.log("I have got this profile at my end!!! 2Says", profile)}
        {/* {console.log("chlo bhai index dekhde aa ", indexxx)} */}


        <img src={profile.images[0]} style={imgg}></img>
        <h2>It's a Match</h2>
        <p>Congratulations, you've been matched with {profile.name}!</p>
        <button onClick={onClose} style={buttonStyle}>Close</button>
      </div>
    </div>
  );
}

export default ProfileModal2;