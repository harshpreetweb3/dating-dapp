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
    "tc7cw-ilo2x-rwqep-gohde-puqog-soeyv-szxvv-ybcgw-lbrkl-sm7ab-wae";

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isMobile = windowWidth <= 480;
  const isTablet = windowWidth > 480 && windowWidth <= 768;
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

  // State to store the window width

  // Effect hook to update the width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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

  let imgCount = 0
  const cloudUrl = 'https://djjjk9bjm164h.cloudfront.net/'
  const data = [
    { img: `${cloudUrl}tender01.jpg`, name: 'Korean Fried', price: '20', distance: '2' },
    { img: `${cloudUrl}tender02.jpg`, name: 'Grilled', price: '23', distance: '5' },
    { img: `${cloudUrl}tender03.jpg`, name: 'Fried', price: '25', distance: '11' },
    { img: `${cloudUrl}tender04.jpg`, name: 'Deep Fried', price: '23', distance: '6' }
  ]
  const frame = document.body.querySelector('.frame')
  data.forEach(_data => appendCard(_data))

  let current = frame.querySelector('.card:last-child')
  let likeText = current.children[0]
  let startX = 0, startY = 0, moveX = 0, moveY = 0
  initCard(current)

  document.querySelector('#like').onclick = () => {
    moveX = 1
    moveY = 0
    complete()
  }
  document.querySelector('#hate').onclick = () => {
    moveX = -1
    moveY = 0
    complete()
  }

  function appendCard(data) {
    const firstCard = frame.children[0]
    const newCard = document.createElement('div')
    newCard.className = 'card'
    newCard.style.backgroundImage = `url(${data.img})`
    newCard.innerHTML = `
          <div class="is-like">LIKE</div>
          <div class="bottom">
            <div class="title">
              <span>${data.name}</span>
              <span><b>$</b>${data.price}</span>
            </div>
            <div class="info">
              ${data.distance} miles away
            </div>
          </div>
        `
    if (firstCard) frame.insertBefore(newCard, firstCard)
    else frame.appendChild(newCard)
    imgCount++
  }

  function initCard(card) {
    card.addEventListener('pointerdown', onPointerDown)
  }

  function setTransform(x, y, deg, duration) {
    current.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${deg}deg)`
    likeText.style.opacity = Math.abs((x / innerWidth * 2.1))
    likeText.className = `is-like ${x > 0 ? 'like' : 'nope'}`
    if (duration) current.style.transition = `transform ${duration}ms`
  }

  function onPointerDown({ clientX, clientY }) {
    startX = clientX
    startY = clientY
    current.addEventListener('pointermove', onPointerMove)
    current.addEventListener('pointerup', onPointerUp)
    current.addEventListener('pointerleave', onPointerUp)
  }

  function onPointerMove({ clientX, clientY }) {
    moveX = clientX - startX
    moveY = clientY - startY
    setTransform(moveX, moveY, moveX / innerWidth * 50)
  }

  function onPointerUp() {
    current.removeEventListener('pointermove', onPointerMove)
    current.removeEventListener('pointerup', onPointerUp)
    current.removeEventListener('pointerleave', onPointerUp)
    if (Math.abs(moveX) > frame.clientWidth / 2) {
      current.removeEventListener('pointerdown', onPointerDown)
      complete()
    } else cancel()
  }

  function complete() {
    const flyX = (Math.abs(moveX) / moveX) * innerWidth * 1.3
    const flyY = (moveY / moveX) * flyX
    setTransform(flyX, flyY, flyX / innerWidth * 50, innerWidth)

    const prev = current
    const next = current.previousElementSibling
    if (next) initCard(next)
    current = next
    likeText = current.children[0]
    appendCard(data[imgCount % 4])
    setTimeout(() => frame.removeChild(prev), innerWidth)
  }

  function cancel() {
    setTransform(0, 0, 0, 100)
    setTimeout(() => current.style.transition = '', 100)
  }

  return (
    <>
      <SidebarComponent />




      <div className="p-4 sm:ml-64">
        <div className="container flex justify-center px-4">
          <div className="max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex justify-center">
              <div class="frame"></div>
              <div class="icons">
                <svg id="hate" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.07 127.89">
                  <path class="a" d="M128.07,64.07c-.5,36.31-28,63.57-64,63.82S-.17,99.33,0,63.29C.17,28.25,29.23-.3,64.43,0A63.88,63.88,0,0,1,128.07,64.07ZM45.32,38.54c-2.44.36-4.63,1.12-6,3.68a6.39,6.39,0,0,0,.94,7.83A143,143,0,0,0,50.42,60.36c2.73,2.48,3.44,4.31.2,7a98.44,98.44,0,0,0-9.52,9.53c-3.62,4-3.66,7.48-.47,10.59,2.82,2.76,7.12,2.54,10.7-.79,3.05-2.83,5.91-5.86,8.85-8.8,2.58-2.57,5.16-2.53,7.73,0,2.83,2.81,5.62,5.67,8.52,8.42,3.87,3.68,8.08,4.08,11,1.15,3.23-3.21,3-6.85-.83-11C83.57,73.21,80.44,70,77.1,67c-2.37-2.13-2.71-3.65-.13-5.91,3.24-2.85,6.15-6.08,9.2-9.15,4.17-4.2,4.66-8,1.45-11.34-2.93-3-7.58-2.61-11.49,1.19-3.34,3.25-6.66,6.52-9.85,9.91-1.64,1.74-2.85,1.73-4.49,0-3.32-3.5-6.84-6.81-10.21-10.26A9,9,0,0,0,45.32,38.54Z" />
                  <path d="M45.32,38.54a9,9,0,0,1,6.26,2.87c3.37,3.45,6.89,6.76,10.21,10.26,1.64,1.73,2.85,1.74,4.49,0,3.19-3.39,6.51-6.66,9.85-9.91C80,38,84.69,37.52,87.62,40.57c3.21,3.34,2.72,7.14-1.45,11.34-3,3.07-6,6.3-9.2,9.15-2.58,2.26-2.24,3.78.13,5.91,3.34,3,6.47,6.24,9.53,9.52,3.87,4.16,4.06,7.8.83,11-2.95,2.93-7.16,2.53-11-1.15-2.9-2.75-5.69-5.61-8.52-8.42-2.57-2.54-5.15-2.58-7.73,0-2.94,2.94-5.8,6-8.85,8.8-3.58,3.33-7.88,3.55-10.7.79-3.19-3.11-3.15-6.6.47-10.59a98.44,98.44,0,0,1,9.52-9.53c3.24-2.72,2.53-4.55-.2-7A143,143,0,0,1,40.28,50.05a6.39,6.39,0,0,1-.94-7.83C40.69,39.66,42.88,38.9,45.32,38.54Z" />
                </svg>
                <svg id="like" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.06 127.99">
                  <path class="a" d="M128.06,63.83a63.65,63.65,0,0,1-64,64.16A63.57,63.57,0,0,1,0,64a64,64,0,0,1,128.06-.13ZM96,56.53c0-5.82-3.9-13.3-10.19-16.05-6.9-3-13.67-2.67-19.37,2.82-2,1.9-3.16,1.41-4.93-.17-2.34-2.08-4.86-3.89-8.25-4.24-9.13-.92-15.31,2.3-19.11,10.25-3.89,8.11-2.42,17.27,4,23.34,7.5,7,15.22,13.88,22.77,20.89,2.06,1.92,3.76,2.27,6,.21C74.36,86.7,82,80,89.39,73.09,93.57,69.21,96.06,64.45,96,56.53Z" />
                  <path d="M96,56.53c.08,7.92-2.41,12.68-6.59,16.56C82,80,74.36,86.7,66.93,93.58c-2.23,2.06-3.93,1.71-6-.21-7.55-7-15.27-13.84-22.77-20.89-6.46-6.07-7.93-15.23-4-23.34,3.8-8,10-11.17,19.11-10.25,3.39.35,5.91,2.16,8.25,4.24,1.77,1.58,2.95,2.07,4.93.17,5.7-5.49,12.47-5.84,19.37-2.82C92.08,43.23,96,50.71,96,56.53Z" />
                </svg>
              </div>
              {db.map((character, index) => (
                <TinderCard
                  ref={childRefs[index]}
                  className="swipe"
                  key={character.name}
                  onSwipe={(dir) => swiped(dir, character.name, index)}
                  onCardLeftScreen={() => outOfFrame(character.name, index)}
                >
                  <div>
                    <div className="p-6 relative" style={{ marginBottom: "17px", top: "111px" }}>
                      <img src={logo} alt="swapLogo" />
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
                        position: 'relative',
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
            </div>
          </div>
        </div>
      </div>


      {/* <div className="h-screen flex flex-col box-border">
          <div className="col-span-12 md:col-span-8 flex flex-col justify-center align-items rounded-md  h-4/5">
            {/* <div className=" shadow-xs rounded-fully h-screen w-98 flex justify-center items-center mx-auto relative"> */}
      {/* {db.map((character, index) => (
                    <TinderCard
                      ref={childRefs[index]}
                      className="swipe"
                      key={character.name}
                      onSwipe={(dir) => swiped(dir, character.name, index)}
                      onCardLeftScreen={() => outOfFrame(character.name, index)}
                    >
                      <div className="h-4/5">
                        <div className="p-6 relative" style={{ marginBottom: "17px", top: "111px" }}>
                          <img src={logo} alt="swapLogo" />
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
                            position: 'relative',
                          }}
                        ></div>

                        {/* <div className="mt-4 ml-4 absolute bottom-16 left-0 text-white"> */}
      {/* <img src={character.images[0]}></img> 

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
                          {/* <h4>{character.id}</h4> 
                          {console.log(character.id)}
                          {console.log(character.location)}
                          {console.log(character.images[0])}
                          <p className="mt-2 z-10 relative font-bold text-white mb-6">
                            {character.introduction}
                          </p>
                          {/* {setPToLike(character.id)}
                          {/* </div> 
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
        </div> */}






    </>
  );
}

export default Swipe;
