import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
import ProfileModal from "./ProfileModal";
import TinderCard from "react-tinder-card";
import SidebarComponent from "./SidebarComponent"; // Importing SidebarComponent
import "./Swipe.css";
import { Principal } from "@dfinity/principal";
import { DDate_backend } from "../../../declarations/DDate_backend/index";
import SwipeBottomBar from "./SwipeBottomBar";
import Loader from "./Loader";
// import logo from "../../assets/Images/SwapImage/swapLogo.svg";
import logo from "../../assets/Images/SwapImage/slideLogo1.svg";
import {
  faClose,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Swipe() {
  // const principalString =
  //   "lqfrt-gz5bh-7z76h-3hb7a-jh2hq-be7jp-equjq-b7wrw-u2xub-tnk3x-qqe";

  const principalString = localStorage.getItem("id");

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [current, setCurrent] = useState(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [moveX, setMoveX] = useState(0);
  const [moveY, setMoveY] = useState(0);

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

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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
    } catch (error) {
      console.error("Error calling find_matches_for_me:", error);
    }
  };

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
    setStartLoader(true);
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

  const childRefs = useMemo(() => {
    return Array(db.length)
      .fill(0)
      .map(() => React.createRef());
  }, [db.length]);

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;

  const canSwipe = currentIndex >= 0;
  console.log("selected idd dekhde aa ke milda", selectedId);

  const swiped = (direction, nameToDelete, index) => {

    console.log("this is direction", direction)

    if (direction == 'right') {
      setSelectedId(db[index].id);
    }


    setIndexxx(index);

    console.log("Swipedddd is called !!!!!!!!!!!!!!!!!!!!");

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
        console.log("It's a match response from backend!!");
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
      console.log("swiped profile has this principal", selectedId.toText());
      checkMatch(selectedId);
    }
  }, [selectedId]);



  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = async (dir) => {
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

  const setTransform = useCallback(
    (x, y, deg, duration) => {
      if (current) {
        const card = current;
        card.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`;
        card.style.transition = duration ? `transform ${duration}ms` : "";
      }
    },
    [current]
  );

  const onPointerDown = useCallback(
    (event) => {
      setStartX(event.clientX);
      setStartY(event.clientY);
      setTransform(0, 0, 0, 0); // Reset any transition
    },
    [setTransform]
  );

  const onPointerMove = useCallback(
    (event) => {
      setMoveX(event.clientX - startX);
      setMoveY(event.clientY - startY);
      setTransform(moveX, moveY, (moveX / window.innerWidth) * 50, 0);
    },
    [startX, startY, moveX, moveY, setTransform]
  );

  const onPointerUp = useCallback(() => {
    if (Math.abs(moveX) > window.innerWidth / 2) {
      const flyX = (Math.abs(moveX) / moveX) * window.innerWidth * 1.3;
      const flyY = (moveY / moveX) * flyX;
      setTransform(
        flyX,
        flyY,
        (flyX / window.innerWidth) * 50,
        window.innerWidth
      );
      setTimeout(
        // () => setCards((prevCards) => prevCards.slice(1)),
        window.innerWidth
      );
    } else {
      setTransform(0, 0, 0, 100);
    }
  }, [moveX, moveY, setTransform]);

  // useEffect(() => {
  //   if (cards.length > 0) {
  //     setCurrent(document.querySelector(".card:last-child"));
  //   }
  // }, [cards]);

  useEffect(() => {
    if (current) {
      current.addEventListener("pointerdown", onPointerDown);
      current.addEventListener("pointermove", onPointerMove);
      current.addEventListener("pointerup", onPointerUp);
      current.addEventListener("pointerleave", onPointerUp);
    }
    return () => {
      if (current) {
        current.removeEventListener("pointerdown", onPointerDown);
        current.removeEventListener("pointermove", onPointerMove);
        current.removeEventListener("pointerup", onPointerUp);
        current.removeEventListener("pointerleave", onPointerUp);
      }
    };
  }, [current, onPointerDown, onPointerMove, onPointerUp]);

  // New function to handle left swipe
  const handleLeftSwipe = useCallback(() => {
    if (current) {
      const flyX = -window.innerWidth * 1.3;
      setTransform(flyX, 0, (flyX / window.innerWidth) * 50, window.innerWidth);
      setTimeout(
        // () => setCards((prevCards) => prevCards.slice(1)),
        window.innerWidth
      );
    }
  }, [current, setTransform]);

  // New function to handle right swipe
  const handleRightSwipe = useCallback(() => {
    if (current) {
      const flyX = window.innerWidth * 1.3;
      setTransform(flyX, 0, (flyX / window.innerWidth) * 50, window.innerWidth);
      setTimeout(
        // () => setCards((prevCards) => prevCards.slice(1)),
        window.innerWidth
      );
    }
  }, [current, setTransform]);

  const sampleProfiles = [
    {
      id: 1,
      name: "Alex Johnson",
      location: "New York, USA",
      introduction: "Love hiking and outdoor activities.",
      images: ["https://via.placeholder.com/300?text=Alex"]
    },
    {
      id: 2,
      name: "Maria Garcia",
      location: "San Francisco, USA",
      introduction: "Avid reader and coffee enthusiast.",
      images: ["https://via.placeholder.com/300?text=Maria"]
    },
    {
      id: 3,
      name: "John Doe",
      location: "Toronto, Canada",
      introduction: "Tech geek, love to code and explore new technologies.",
      images: ["https://via.placeholder.com/300?text=John"]
    },
    {
      id: 4,
      name: "Emily Smith",
      location: "London, UK",
      introduction: "Art lover and museum wanderer.",
      images: ["https://via.placeholder.com/300?text=Emily"]
    }
  ];

  useEffect(() => {
    setSwipeProfiles(sampleProfiles)
  }, []);


  return (
    <div className="md:grid grid-cols-9">
      <SidebarComponent />
      {startLoader ? (
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
        <div className="mx-auto md:col-start-5 w-[220px] ">
          {
            false
              // db.length === 0 
              ? (
                <div className="flex justify-center">
                  <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white  h-screen ">
                    <div className="h-screen">
                      <Loader />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  {db.map((character, index) => (
                    <TinderCard
                      ref={childRefs[index]}
                      className="swipe"
                      key={character.name}
                      onSwipe={(dir) => swiped(dir, character.name, index)}
                      onCardLeftScreen={() => outOfFrame(character.name, index)}
                    >
                      <div className="h-[90%] mt-[31px] object-fit top-20">
                        <img
                          alt="img"
                          src={character.images[0]}
                          className="h-full object-cover w-[256px] md:w-[291px] lg:w-[331px] rounded-xl -top-[5.5rem]"
                          style={{ height: "83vh" }}
                        />
                      </div>
                      <div
                        className="bg-black rounded-b-xl w-[256px] md:w-[291px] lg:w-[331px] md:h-[201px] h-[242px] sm:w-[236px] z-10 fixed -bottom-7"
                        style={{
                          background:
                            "linear-gradient(to top, rgb(0, 0, 0) 50%, rgba(255, 255, 255, 0) 100%)",
                        }}
                      >
                      </div>
                      <div className="pl-4 md:bottom-16 bottom-[8rem] absolute z-21">
                        <h2 className="text-4xl font-bold text-white z-30 mb-2 ">
                          {character.name}
                        </h2>
                        <p className="text-lg text-gray-700 font-bold z-30">
                          {character.location}
                        </p>

                        <p className="mt-2 z-30 font-bold text-white mb-6">
                          {character.introduction}
                        </p>

                        {match && (
                          <ProfileModal
                            profile={db[indexxx]}
                            indexxx={indexxx}
                            onClose={handleCloseModal} />
                        )}
                      </div>

                      {/* </div> */}
                    </TinderCard>
                  ))}
                </div>
              )}{" "}
          <div className="px-0 flex absolute gap-4 pl-4 pt-2 py-6 m-0 z-40 bottom-[10%]">
            <button
              className="rounded-full  h-12 w-12 bg-transparent shadow-md text-3xl border border-pink-700 hover:bg-red-300 font-bold text-gray-800"
              onClick={() => swipe("left")}
              disabled={db.length === 0}
            >
              <FontAwesomeIcon
                icon={faClose}
                style={{ color: db.length === 0 ? "#b2b2b2" : "#fd5068" }}
              />
            </button>
            <button
              className="rounded-full  h-12 w-12 bg-transparent shadow-md text-3xl border border-green-700 hover:bg-green-700 font-bold text-gray-800"
              onClick={() => swipe("right")}
              disabled={db.length === 0}
            >
              <FontAwesomeIcon
                icon={faHeart}
                style={{ color: db.length === 0 ? "#b2b2b2" : "#1be4a1" }}
              />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}

export default Swipe;
