import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WalletModal from '../WalletModal';
import { useEffect } from 'react';
import LogoutModal from '../LogoutModal';
import createPageImage from '../../../assets/Images/CreateAccount/createPageImage.png'

const HeroRight = () => {

  const navigate = useNavigate();

  const [isWalletModalOpen, setWalletModalOpen] = useState(false);
  const [isLogoutModal, setLogoutModal] = useState(false);

  const isUserLoggedIn = localStorage.getItem('id') !== null;

  const id =localStorage.getItem('id')
  console.log(id)

  const createAccountHandler = () => {
    navigate('/CreateAccount1');
  };

  // const uploadHandler = () => {
  //   navigate("/Upload");
  // };

  const toggleWalletModal = () => {
    setWalletModalOpen(!isWalletModalOpen);
  };

  const toggleLogoutModal = () => {
    setLogoutModal(!isLogoutModal);
  };

  useEffect(() => {
    // Adjust body overflow based on modal states
    const body = document.body;
    const originalOverflow = body.style.overflow;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    if (isWalletModalOpen || isLogoutModal) {
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = '0';
    }

    return () => {
      body.style.overflow = originalOverflow;
      body.style.paddingRight = '0';
    };
  }, [isWalletModalOpen, isLogoutModal]);


 

  return (
    <div className="relative w-full lg:w-1/2 h-auto flex flex-col justify-center items-center p-4 lg:p-8">
      {isUserLoggedIn && (
        <img 
          src={createPageImage} 
          alt="Logout" 
          onClick={toggleLogoutModal}
          className="rounded-full h-12 w-12 flex items-center justify-center text-black cursor-pointer absolute right-5 top-5"
        />
      )}
        <div className="text-center mx-auto mt-4 md:mt-10">
        <h1 className="font-custom-weight text-3xl md:text-5xl font-black mb-2">
          Find Your Perfect
        </h1>
        <h1 className="font-custom-weight text-3xl md:text-5xl font-black mb-4">
          Match
        </h1>
        <p className="font-custom font-thin mb-1">
          Connecting Blocks, Connecting Hearts: Where{" "}
        </p>
        <p className="font-custom font-thin mb-20">
          Blockchain Meets Relationships
        </p>
        <button 
          onClick={toggleWalletModal} 
          disabled={isUserLoggedIn} 
          className={`font-custom font-thin text-base py-2 px-8 md:px-14 mt-10 rounded-full mr-4 mb-4 
                      ${isUserLoggedIn ? 'bg-gray-400 text-gray-500 cursor-not-allowed' : 'bg-yellow-400 hover:bg-black text-black hover:text-white'}`}
        >
          Connect Wallet
        </button>
        <button onClick={createAccountHandler} className="font-custom font-thin text-base bg-green-400 hover:bg-black text-black hover:text-white py-2 px-8 md:px-14 mt-10 rounded-full mr-4 mb-4">
          create account
        </button> 
         {/* <button onClick={uploadHandler}>upload</button> */}
      </div>
      <WalletModal isOpen={isWalletModalOpen} onClose={toggleWalletModal} />
      <LogoutModal isOpen={isLogoutModal} onClose={toggleLogoutModal}/>
    </div>
  );
};

export default HeroRight;
