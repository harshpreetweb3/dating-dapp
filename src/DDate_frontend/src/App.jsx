import React, { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import { Routes, Route } from "react-router-dom";
import CreateAccount1 from "./Components/Hero/CreateAccount1";
import CreateAccount2 from "./Components/Hero/CreateAccount2";
import CreateAccount3 from "./Components/Hero/CreateAccount3";
import CreateAccount4 from "./Components/Hero/CreateAccount4";
import CreateAccount5 from "./Components/Hero/CreateAccount5";
import Swipe from "./Components/Swipe"
import Profile from "./Components/Profile";
import Notification from "./Components/Notification";
import ChattingPage from "./Components/Chatting/ChattingPage";
import ProfileViewer from './Components/ProfileViewer';
import { DDate_backend } from "../../declarations/DDate_backend/index";
import { Principal } from "@dfinity/principal";
import { useNavigate } from "react-router-dom";
import ChattingSinglePage from "./Components/Chatting/ChattingSinglePage";

const App = () => {
  const navigate = useNavigate();
  const [userCheckComplete, setUserCheckComplete] = useState(false);

  const existingUserHandler = async () => {
    const principalString = localStorage.getItem('id');
    const principal = convertStringToPrincipal(principalString);

    if (principal) {
      try {
        const userExist = await DDate_backend.get_profile(principal);
        const userPrincipalInString = userExist.id.toText();
        const principalToString = principal.toText();

        if (userPrincipalInString === principalToString) {
          navigate('/Swipe');
        }
      } catch (error) {
        console.error("Error checking user existence: ", error);
      } finally {
        setUserCheckComplete(true);
      }
    } else {
      setUserCheckComplete(true);
    }
  };

  useEffect(() => {
    existingUserHandler();
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

  return (
    <>
      {userCheckComplete && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/CreateAccount1" element={<CreateAccount1 />} />
          <Route path="/CreateAccount2" element={<CreateAccount2 />} />
          <Route path="/CreateAccount3" element={<CreateAccount3 />} />
          <Route path="/CreateAccount4" element={<CreateAccount4 />} />
          <Route path="/CreateAccount5" element={<CreateAccount5 />} />
          <Route path="/Swipe" element={<Swipe />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/ChattingPage" element={<ChattingPage />} />
          <Route path="/ChattingSinglePage" element={<ChattingSinglePage />} />

          <Route path="/profile/:senderId" element={<ProfileViewer />} />
        </Routes>
      )}
    </>
  );
};

export default App;

//lqfrt-gz5bh-7z76h-3hb7a-jh2hq-be7jp-equjq-b7wrw-u2xub-tnk3x-qqe