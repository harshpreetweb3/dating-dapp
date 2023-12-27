import * as React from "react";
import AstroXME from "../../assets/Images/WalletLogos/AstroXME.png";
import infinityWallet from "../../assets/Images/WalletLogos/infinityWallet.png";
import InternetIdentity from "../../assets/Images/WalletLogos/InternetIdentity.png";
import NFID from "../../assets/Images/WalletLogos/NFID.png";
import PlugWallet from "../../assets/Images/WalletLogos/PlugWallet.png";
import StoicWallet from "../../assets/Images/WalletLogos/StoicWallet.png";
import { AuthClient } from "@dfinity/auth-client";
import { useNavigate } from "react-router-dom";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import { Principal } from "@dfinity/principal";
import Loader from "./Loader";
import { useState } from "react";


const WalletModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();


  // const [loader, setLoader] = useState(false);

  if (!isOpen) return null;


  // const navigateWithLoader = (path) => {
  //   setLoader(false);
  //   navigate(path);
  // };

  const existingUserHandler =async ()=>{

    const principalString = localStorage.getItem("id");
    const newPrincipal = Principal.fromText(principalString);

    if (newPrincipal) {
      try {
        const userExist = await DDate_backend.get_profile(newPrincipal);
        const userPrincipalInString = userExist.id.toText();
        const principalToString = newPrincipal.toText();

        if (userPrincipalInString === principalToString) {
          navigate("/CreateAccount1");
        }
      } catch (error) {
        console.error("Error checking user existence: ", error);

      }
    } else {
      navigate("/CreateAccount1");
    }
   }
   


  const InternetIdentityHandler = async () => {
    const authClient = await AuthClient.create();
    authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        const identity = authClient.getIdentity();
        const principal = identity.getPrincipal().toString();
        localStorage.setItem("id", JSON.stringify(principal));
        // localStorage.setItem('wallet',JSON.stringify('InternetIdentity'))
        localStorage.setItem("identity", JSON.stringify(identity));
        navigate("/CreateAccount1");
        onClose();
      },
    });
  };

  const connectInfinityWallet = async () => {
    if (window?.ic?.infinityWallet) {
      // Replace with actual check for Infinity Wallet
      try {
        // Request connection to the user's Infinity Wallet
        // This is a placeholder and should be replaced with the actual method
        await window.ic.infinityWallet.requestConnect();

        const isConnected = await window.ic.infinityWallet.isConnected(); // Replace with actual method
        if (isConnected) {
          console.log("Infinity Wallet is connected!");
          // Handle successful connection here
          navigate("/CreateAccount1");
        }
      } catch (error) {
        console.error("Error connecting to Infinity Wallet:", error);
        // Handle connection error here
      }
    } else {
      alert("Infinity Wallet extension is not installed!");
    }
  };

  const connectStoicWallet = async () => {
    if (window?.ic?.stoic) {
      try {
        await window.ic.stoic.requestConnect();
        const isConnected = await window.ic.stoic.isConnected();
        if (isConnected) {
          console.log("Stoic Wallet is connected!");
          // Handle successful connection here
        }
      } catch (error) {
        console.error("Error connecting to Stoic Wallet:", error);
        // Handle connection error here
      }
    } else {
      alert("Stoic Wallet extension is not installed!");
    }
  };



  const connectPlugWallet = async () => {

    if (window?.ic?.plug) {
      try {
        await window.ic.plug.requestConnect();
        const isConnected = await window.ic.plug.isConnected();
        if (isConnected) {
          console.log("Plug Wallet is connected!");

          if (!window.ic.plug.agent) {
            await window.ic.plug.createAgent();
          }
          console.log(window.ic.plug.agent);
          let principal = await window.ic.plug.agent.getPrincipal();
          let principalText = principal.toText();
          console.log("id", principalText);
          // let limitedPrincipalText = principalText.substring(0, 15);

          localStorage.setItem("id", principalText);
          // localStorage.setItem('wallet',JSON.stringify('PlugWallet'))
         
          existingUserHandler()
          // navigate('/CreateAccount1')
          onClose();
        }
      } catch (error) {
        console.error("Error connecting to Plug Wallet:", error);
      }
    } else {
      alert("Plug Wallet extension is not installed!");
    }
  };



  const connectAstroXME = async () => {
    if (window?.ic?.astroxme) {
      // Replace with actual check for AstroX ME
      try {
        // Request connection to the user's AstroX ME
        // This is a placeholder and should be replaced with the actual method
        await window.ic.astroxme.requestConnect();

        const isConnected = await window.ic.astroxme.isConnected(); // Replace with actual method
        if (isConnected) {
          console.log("AstroX ME is connected!");
          // Handle successful connection here
          // Navigate or perform next actions
        }
      } catch (error) {
        console.error("Error connecting to AstroX ME:", error);
        // Handle connection error here
      }
    } else {
      alert("AstroX ME extension is not installed!");
    }
  };


 


  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-start z-50 pt-20"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md p-5 m-3 rounded-lg shadow-lg bg-walletColor text-white"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-lg mb-4 text-center">Connect With</h3>
        <p className="border-t border-white w-full md:w-3/4 lg:w-2/3 mx-auto mb-4"></p>

        <ul className="space-y-3">
          {/* AstroX ME */}
          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out  hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img
              src={AstroXME}
              alt="AstroXME"
              className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
            />
            <span className="text-center flex-grow" onClick={connectAstroXME}>
              AstroX ME
            </span>
          </li>

          {/* Infinity Wallet */}
          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img
              src={infinityWallet}
              alt="infinityWallet"
              className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
            />
            <span
              className="text-center flex-grow"
              onClick={connectInfinityWallet}
            >
              Infinity Wallet
            </span>
          </li>

          {/* NFID */}
          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img
              src={NFID}
              alt="NFID"
              className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
            />
            <span className="text-center flex-grow">NFID</span>
          </li>

          {/* Plug Wallet */}

         <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img
              src={PlugWallet}
              alt="PlugWallet"
              className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
            />
            <span className="text-center flex-grow" onClick={connectPlugWallet}>
              Plug Wallet
            </span>
          </li>
  
          {/* Stoic Wallet */}
          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img
              src={StoicWallet}
              alt="StoicWallet"
              className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
            />
            <span
              className="text-center flex-grow"
              onClick={connectStoicWallet}
            >
              Stoic Wallet
            </span>
          </li>

          {/* Internet Identity */}
          <li className="border border-gray-300 rounded-3xl flex items-center p-2 cursor-pointer transition-colors duration-300 ease-in-out hover:bg-yellow-900 hover:border-yellow-500 active:bg-yellow-700 active:border-yellow-600">
            <img
              src={InternetIdentity}
              alt="InternetIdentity"
              className="rounded-full h-8 w-8 flex items-center justify-center text-white mr-2"
            />
            <span
              className="text-center flex-grow"
              onClick={InternetIdentityHandler}
            >
              Internet Identity
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WalletModal;
