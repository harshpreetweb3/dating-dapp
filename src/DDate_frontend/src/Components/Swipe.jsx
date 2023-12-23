import React, { useState, useMemo, useRef, useEffect } from "react";
import ProfileModal from "./ProfileModal";
import TinderCard from "react-tinder-card";
import SidebarComponent from "./SidebarComponent"; // Importing SidebarComponent
import "./Swipe.css";
import { Principal } from "@dfinity/principal";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import SwipeBottomBar from "./SwipeBottomBar";
import Loader from "./Loader";
import logo from "../../assets/Images/SwapImage/swapLogo.svg"
// const principalString = localStorage.getItem("id");

function Swipe() {
  const principalString =
    "lqfrt-gz5bh-7z76h-3hb7a-jh2hq-be7jp-equjq-b7wrw-u2xub-tnk3x-qqe";

  // const principalString = localStorage.getItem("id");

  console.log("this is principal strinng", principalString);

  const [matchedProfiles, setMatchedProfiles] = useState([]); //principals
  const [db, setSwipeProfiles] = useState([]); // profiles
  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [indexxx, setIndexxx] = useState();
  const [match, setMatch] = useState(false);
  const [startLoader, setStartLoader] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [noMatch, setNoMatch] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  console.log("profiles are being returned overhere!", matchedProfiles);
  console.log("aha array aa jehra profiles sambhi betha", db);

  const handleDislike = () => {
    console.log("Dislike button is clicked");
    // setCurrentIndex(prevIndex => (prevIndex + 1) % swipeProfiles.length);
  };

  const handleLike = () => {
    console.log("Like button is clicked");
    // setCurrentIndex(prevIndex => (prevIndex + 1) % swipeProfiles.length);
  };

  // const [currentIndex, setCurrentIndex] = useState(0);
  // const currentProfile = swipeProfiles[currentIndex];

  // if (swipeProfiles.length === 0) {
  //   return <div>No profiles available.</div>;
  // }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  function convertStringToPrincipal(principalString) {
    console.log("conversion principal is being called");
    try {
      const principal = Principal.fromText(principalString);
      console.log("Converted Principal: ", principal.toText());
      return principal;
    } catch (error) {
      console.error("Error converting string to Principal: ", error);
      return null;
    }
  }

  const principal = convertStringToPrincipal(principalString); //principal

  console.log("pri =>", principal);

  // DDate_backend.find_match_for_me(principal);

  const findMatchesForMe = async (principal) => {
    try {
      await DDate_backend.find_matches_for_me(principal);
      console.log("find_matches_for_me called successfully");

      getMatchedProfiles(principal);
      // Additional code to handle after calling the function
    } catch (error) {
      console.error("Error calling find_matches_for_me:", error);
    }
  };

  // const handleFindMatches = () => {
  //   // Assuming you have the principal available
  //   findMatchesForMe(principal);
  // };

  useEffect(() => {
    console.log("outside useEffect!!!");
    if (principal) {
      setStartLoader(true);
      findMatchesForMe(principal);
      console.log("useEffect is getting called");
    }
  }, []);

  const fetchUserProfile = async (principal) => {
    try {
      const userProfile = await DDate_backend.get_profile(principal);
      return userProfile;
    } catch (error) {
      console.error(
        "Error fetching user profile for principal:",
        principal,
        error
      );
      return null; // or you can return a default user profile structure
    }
  };

  const fetchAllUserProfiles = async (principals) => {
    try {
      const profilesPromises = principals.map((principal) =>
        fetchUserProfile(principal)
      );
      const profiles = await Promise.all(profilesPromises);
      //setMatchedProfiles(profiles.filter(profile => profile !== null)); // Update state with non-null profiles

      setSwipeProfiles(profiles.filter((profile) => profile !== null));
      setStartLoader(false);
    } catch (error) {
      console.error("Error fetching all user profiles:", error);
    }
  };

  useEffect(() => {
    if (matchedProfiles.length > 0) {
      fetchAllUserProfiles(matchedProfiles);
    }
  }, [matchedProfiles]);

  // console.log("find_match_for_me will find match for you");

  // DDate_backend.get_matched_profiles(principal);

  function closeKrna() {
    setNoMatch(false);
  }

  const getMatchedProfiles = async (principal) => {
    try {
      const matchedProfiles = await DDate_backend.get_matched_profiles(
        principal
      );
      if (matchedProfiles.length === 0) {
        console.log("No matches found.");
        setNoMatch(true);
      } else {
        console.log("Matched Profiles:", matchedProfiles);
        setMatchedProfiles(matchedProfiles); //array
        // You can set the matched profiles to a state or use them as needed
      }
    } catch (error) {
      console.error("Error fetching matched profiles:", error);
    }
  };

  useEffect(() => {
    setCurrentIndex(db.length - 1);
  }, [db]);

  console.log("length of data base", db.length);
  const currentIndexRef = useRef(currentIndex);

  // const childRefs = useMemo(
  //   () =>
  //     Array(db.length)
  //       .fill(0)
  //       .map((i) => React.createRef()),
  //   []
  // );

  const childRefs = useMemo(() => {
    return Array(db.length)
      .fill(0)
      .map(() => React.createRef());
  }, [db.length]);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;
  console.log("selected idd dekhde aa ke milda", selectedId);

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setSelectedId(db[index].id);

    setIndexxx(index);

    console.log("Swipedddd is called !!!!!!!!!!!!!!!!!!!!");

    // likeAndItsAMatch();
    // console.log("Like button is clicked");
    // console.log("principal jehra pas kna ", principal);

    // console.log("Selected id ", selectedId);

    // const isMatch = DDate_backend.check_user_match(principal, selectedId);

    // console.log("isMatch", isMatch)
    // if (isMatch) {
    //   console.log('Its a match');
    // } else {
    //   console.log('You have liked the profile but match could not be made');
    // }

    setLastDirection(direction);

    updateCurrentIndex(index - 1);
  };

  // Define the checkMatch function
  const checkMatch = async (id) => {
    console.log("Checking match for selected ID:", id);

    // Assuming DDate_backend.check_user_match is an async function
    try {
      const isMatch = await DDate_backend.check_user_match(principal, id);
      if (isMatch) {
        console.log("It's a match response from backend!!!! !!!! !!!! !!!!");
        setMatch(true);
      } else {
        console.log(
          "You have liked the profile, but a match could not be made! ! !"
        );
      }
    } catch (error) {
      console.error("Error in checking match:", error);
    }
  };

  useEffect(() => {
    if (selectedId !== null) {
      checkMatch(selectedId);
      // You can now perform actions that depend on the updated value of selectedId
      // Example:
      // const isMatch = await DDate_backend.check_user_match(principal, selectedId);
      // if (isMatch) {
      //   console.log('Its a match');
      // } else {
      //   console.log('You have liked the profile but match could not be made');
      // }
    }
  }, [selectedId]);

  console.log("swiped profile has this principal", selectedId);

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  };

  // const swipe = async (dir) => {
  //   {console.log("Swipe is clicked", dir)}
  //   {console.log("canSwipe",canSwipe)}
  //     {console.log("currentIndex"+currentIndex)}
  //   if (canSwipe && currentIndex < db.length) {
  //     {console.log("canSwipe",canSwipe)}
  //     {console.log("currentIndex"+currentIndex)}
  //     {console.log("currentIndex"+currentIndex)}
  //     await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
  //   }
  // };
  // const swipe = async (dir) => {
  //   if (canSwipe && currentIndex >= 0 && currentIndex < db.length) {
  //     const cardRef = childRefs[currentIndex];
  //     if (cardRef && cardRef.current) {
  //       await cardRef.current.swipe(dir); // Swipe the card!
  //     } else {
  //       console.error("Invalid card reference:", currentIndex);
  //     }
  //   }
  // };

  const swipe = async (dir) => {
    console.log("Attempting to swipe:", dir);
    console.log("Current index:", currentIndex);
    console.log("DB length:", db.length);
    console.log("ChildRefs length:", childRefs.length);

    if (canSwipe && currentIndex >= 0 && currentIndex < db.length) {
      const cardRef = childRefs[currentIndex];
      if (cardRef && cardRef.current) {
        console.log("Swiping card with index:", currentIndex);
        await cardRef.current.swipe(dir); // Swipe the card!
      } else {
        console.error("Invalid card reference at index:", currentIndex);
      }
    } else {
      console.error("Cannot swipe. Index or db length issue.");
    }

    if (dir == "right") {
    }
  };

  // {console.log("Princiapl to like state" +pToLike)}
  const handleCloseModal = () => {
    setMatch(false);
    //setMatchedProfile(null);
  };

  const mobileBackgroundStyle = {
    background:
      "radial-gradient(84.33% 84.32% at 51.71% 43.22%, #2F2F2F 0%, #000 100%)",
  };

  return (
    <div
      className={`h-screen grid grid-cols-12 ${
        isMobile ? "md:col-span-9" : ""
      }`}
      style={isMobile ? mobileBackgroundStyle : {}}
    >
      {!isMobile && (
        <div className="col-span-3">
          <SidebarComponent />
        </div>
      )}

      {
      startLoader ? (
        <Loader />
      ) : (
      <div className="h-screen flex flex-col box-border">
        <div className="col-span-12 md:col-span-8 flex flex-col justify-center align-items rounded-md  h-4/5">
          {/* <div className=" shadow-xs rounded-fully h-screen w-98 flex justify-center items-center mx-auto relative"> */}
          {db.map((character, index) => (
            <TinderCard
              ref={childRefs[index]}
              className="swipe"
              key={character.name}
              onSwipe={(dir) => swiped(dir, character.name, index)}
              onCardLeftScreen={() => outOfFrame(character.name, index)}
            >
              <div className="h-4/5">
                <div className="p-6 relative"style={{marginBottom:"17px", top:"111px"}}>
                  <img src={logo} alt="swapLogo"/>
                </div>
                <div className="object-fit relative top-20">
                  <img
                    alt="img"
                    src={character.images[0]}
                    className="h-full object-cover pl-1 pr-1 rounded-md"
                    style={{ height: "66vh" }}
                  />
                </div>
                <div
                  className="bg-black h-32 w-full"
                  style={{
                    background:
                      "linear-gradient(to top, rgb(0, 0, 0) 0%, rgba(255, 255, 255, 0) 100%)",
                  }}
                ></div>

                {/* <div className="mt-4 ml-4 absolute bottom-16 left-0 text-white"> */}
                {/* <img src={character.images[0]}></img> */}

                <div
                  className="pl-4 bottom-20 absolute"
                  style={{ marginBottom: "-7px", lineHeight: "4px" }}
                >
                  <h2 className="text-4xl font-bold text-gradient-to-b from-[#DB7D11] to-[#6B3018] z-10 relative">
                    {character.name}
                  </h2>
                  <p className="text-lg text-gray-700 font-bold z-10 relative">
                    {character.location}
                  </p>
                  {/* <h4>{character.id}</h4> */}
                  {console.log(character.id)}
                  {console.log(character.location)}
                  {console.log(character.images[0])}
                  <p className="mt-2 z-10 relative font-bold text-white mb-6">
                    {character.introduction}
                  </p>
                  {/* {setPToLike(character.id)} */}
                  {/* </div> */}
                  {match && (
                    <ProfileModal
                      profile={db[indexxx]}
                      indexxx={indexxx}
                      onClose={handleCloseModal}
                    />
                  )}
                </div>
                <div
                  className="px-0 bg-black flex bottom-1 relative gap-4 pl-4 py-6 m-0"
                  style={{ paddingTop: "65px" }}
                >
                  <button onClick={() => swipe("left")}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 63 63"
                      fill="none"
                    >
                      <circle
                        cx="31.275"
                        cy="31.275"
                        r="31.275"
                        fill="#E13131"
                      />
                      <path
                        d="m15.44 12 4.768 4.708c1.056.977 1.056 2.441 0 3.499-.813 1.057-2.438 1.057-3.413 0L12 15.52l-4.713 4.605c-.975 1.058-2.438 1.058-3.495 0-1.056-.813-1.056-2.44 0-3.417L8.47 12 3.874 7.271c-1.138-.976-1.138-2.44 0-3.417a1.973 1.973 0 0 1 3.25 0L12 8.421l4.713-4.567c.975-1.139 2.438-1.139 3.413 0 1.057.814 1.057 2.44 0 3.417L15.44 12Z"
                        fill="var(--fill--background-nope, none)"
                      />
                    </svg>
                  </button>
                  <button onClick={() => swipe("right")}>
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 63 63"
                      fill="none"
                    >
                      <circle
                        cx="31.7242"
                        cy="31.275"
                        r="31.275"
                        fill="#3FB844"
                      />
                      <path
                        d="M26.7715 44.7888L14.3496 32.3433L17.4551 29.2319L26.7715 38.566L46.7664 18.5332L49.8718 21.6446L26.7715 44.7888Z"
                        fill="#ECECEC"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </TinderCard>
          ))}
          <div className="h-1/5">{isMobile && <SwipeBottomBar />}</div>
        </div>
      </div>
     )}
    </div>
  );
}

export default Swipe;
