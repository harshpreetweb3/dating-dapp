import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";
import { SlArrowUp,SlArrowDown } from "react-icons/sl";

const CreateAccount4 = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  const [showArt, setShowArt] = useState(false); 
  const [showActivities, setshowActivities] = useState(false);
  const [showTravel, setshowTravel] = useState(false);
  const [showBussiness, setShowBussiness] = useState(false); 


  // const [formData, setFormData] = useState({
  //   selectedArt: "",
  //   selectedPets: "",
  //   selectedHabbits: [],
  //   selectedActivities: "",
  //   selectedMovies: "",
  //   selectedsports: "",
  //   selectedBussiness: "",
  //   selectedTravel: "",
  // });

  const [formData, setFormData] = useState({
    selectedArt: "",
    selectedPets: "",
    selectedHabbits: "",
    selectedActivities: "",
    selectedMovies: "",
    selectedTravel: "",
  });

  const backpageHandler = () => {
    navigate("/CreateAccount3");
  };

  // useEffect(() => {
  //   const savedData = localStorage.getItem("form4");
  //   if (savedData) {
  //     let data = JSON.parse(savedData);
  //     data.selectedBussiness = [];
  //     setFormData(data);
  //   }
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);

    };

    window.addEventListener("resize", handleResize);

    // Load data from local storage
    const savedData = localStorage.getItem("form4");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); 

  const handleFormChange = (e) => {
    const { name, value, checked } = e.target;

    const maxSelections = {
      selectedArt: 6,
      selectedMovies: 19,
      selectedTravel: 14,
      selectedActivities: 8,
      selectedHabbits: 4,
    };
    if (
      name === "selectedArt" ||
      name === "selectedMovies" ||
      name === "selectedTravel" ||
      name === "selectedActivities" ||
      name === "selectedHabbits"
    ) {
      setFormData((prevData) => {
        let updatedData;
        if (checked) {
          // If the user checks a new option, add it to the selection (up to 2)
          updatedData = {
            ...prevData,
            [name]: [...prevData[name], value],
          };
        } else {
          // If the user unchecks an option, remove it from the selection
          updatedData = {
            ...prevData,
            [name]: prevData[name].filter((item) => item !== value),
          };
        }
        // Limit the selection to 2 items
        if (updatedData[name].length > maxSelections[name]) {
          updatedData[name].shift(); // Remove the first item
        }
        return updatedData;
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("form4", JSON.stringify(formData));
    console.log(formData);
    navigate("/CreateAccount5");
  };
  const nextPageHandler = () => {
    navigate("/CreateAccount5");
  }
  const backHandler = () => {
    navigate("/CreateAccount3");

  }

  return (
    <div className="flex w-full h-screen md:flex-row font-num">
      {/* Image container for larger screens */}
      <div
        className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${createAccountImage})` }}
      >
        <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
          <div className="w-full max-w-xl mx-auto text-left ">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-viga mx-auto">
              Create Your
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-white font-viga mb-2">
              account here
            </h2>
            <p className="text-white font-[600] mt-[30px] font-viga md:text-2xl">Welcome ..</p>
            <p className="text-white font-[600] font-viga md:text-xl">
              Complete Your Profile Here.
            </p>
            <p className="text-white font-[600] w-2/3 font-viga md:text-md">
              Tell us about yourself and let us help you finding the perfect
              match
            </p>
            <p className="text-[#FFC107] font-[600] mt-[15px] md:text-lg">Good Luck!</p>
          </div>
        </div>

        {/* Image Overlay for smaller screens */}
        <div className="w-full h-full bg-black opacity-50 md:opacity-0"></div>
      </div>

      {/* Form container */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-start px-4 md:px-12 z-10 overflow-y-auto">
        <div className="w-full max-w-md my-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center ">
        <div className="flex items-center">
  <svg className="flex-shrink-0 ml-5 cursor-pointer" onClick={backHandler} width="20" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.28501 0.285909L0.285013 5.28591C0.193973 5.38101 0.122608 5.49316 0.0750132 5.61591C-0.0250048 5.85937 -0.0250048 6.13245 0.0750133 6.37591C0.122608 6.49866 0.193973 6.6108 0.285013 6.70591L5.28501 11.7059C5.37825 11.7991 5.48894 11.8731 5.61076 11.9236C5.73259 11.974 5.86315 12 5.99501 12C6.26132 12 6.51671 11.8942 6.70501 11.7059C6.89332 11.5176 6.9991 11.2622 6.9991 10.9959C6.9991 10.7296 6.89332 10.4742 6.70501 10.2859L3.40501 6.99591L10.995 6.99591C11.2602 6.99591 11.5146 6.89055 11.7021 6.70301C11.8897 6.51548 11.995 6.26112 11.995 5.99591C11.995 5.73069 11.8897 5.47634 11.7021 5.2888C11.5146 5.10126 11.2602 4.99591 10.995 4.99591L3.40501 4.99591L6.70501 1.70591C6.79874 1.61294 6.87314 1.50234 6.9239 1.38049C6.97467 1.25863 7.00081 1.12792 7.00081 0.995908C7.00081 0.863897 6.97467 0.733191 6.9239 0.611332C6.87314 0.489472 6.79874 0.378873 6.70501 0.285909C6.61205 0.192181 6.50145 0.117785 6.37959 0.0670163C6.25773 0.0162475 6.12703 -0.00988987 5.99501 -0.00988986C5.863 -0.00988986 5.7323 0.0162475 5.61044 0.0670164C5.48858 0.117785 5.37798 0.192181 5.28501 0.285909Z" fill="black" id="svg-path"/>
  </svg>

  <span className="flex-grow text-center md:text-2xl text-xl">Allow Us to Know You</span>
</div>

<style jsx>{`
  @media (max-width: 768px) {
    #svg-path {
      fill: yellow;
    }
  }
`}</style>

</h2>
          <div className="border-t-2 border-solid md:border-black border-white w-full mt-4 mb-4 md:ml-6"></div>

          <form
            className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
          >
            {/* art Selection */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Art and Culture <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>

              <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2  rounded-3xl">
                {[
                  "Museum",
                  "Drawing",
                  "Theaters",
                  "Craft",
                  "Art Galleries ",
                  "Live music",
                  "Night Life",
                  "Cosplay",
                  "Exhibitions",
                  "Folk music",
                  "Playwriting",
                  "Hip-hop music",
                  "Cultural festivals",
                  "Others"
                ].slice(0, showArt ? undefined : 9)
                .map((art) => (
                  <label
                    key={art}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedArt.includes(art)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedArt"
                      value={art}
                      onChange={handleFormChange}
                      checked={formData.selectedArt.includes(art)}
                      style={{ display: "none" }}
                    />

                    {art}
                  </label>
                ))}
                {showArt && ( // Render the "See Less" button if showAllSports is true
                <button
                  onClick={() => setShowArt(false)}
                  className="text-black items-center flex text-[12px] md:text-[14px] font-semibold "
                  type="button"
                >
                  see less <SlArrowUp size={12} className="bold-icon ml-[5px] "  />
                </button>
              )}
              <button
                onClick={() => setShowArt(!showArt)}
                className="text-black text-[12px] md:text-[14px] flex items-center font-semibold"
                type="button"
              >
                {showArt ? "" : <p className="flex items-center">see more <SlArrowDown size={12} className="ml-[5px] font-bold"  /></p>} 
              </button>
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Pets
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {["Dogs", "Cats", "Birds", "Others"].map((pets) => (
                  <label
                    key={pets}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedPets === pets
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedPets"
                      value={pets}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {pets}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
                General Habits
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
                {["Early rise", "Night owl", "lazy", "Active"].map(
                  (habbits) => (
                    <label
                      key={habbits}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                        formData.selectedHabbits.includes(habbits)
                          ? "bg-yellow-500 text-black"
                          : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                      }`}
                    >
                      <input
                        type="checkbox"
                        name="selectedHabbits"
                        value={habbits}
                        onChange={handleFormChange}
                        checked={formData.selectedHabbits.includes(habbits)}
                        style={{ display: "none" }}
                      />

                      {habbits}
                    </label>
                  )
                )}
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Outdoor Activities  <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {[
                  "Hiking",
                  "Trekking",
                  "Fishing",
                  "Skiing",
                  "Motor Sports",
                  "Diving",
                  "Surfing",
                  "Sailing",
                  "Paddle Boarding",
                  "Kayaking",
                  "Trail running",
                  "cycling",
                  "Tennis",
                  "Others"
                ].slice(0, showActivities ? undefined : 10)
                .map((activities) => (
                  <label
                    key={activities}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedActivities.includes(activities)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedActivities"
                      value={activities}
                      onChange={handleFormChange}
                      checked={formData.selectedActivities.includes(activities)}
                      style={{ display: "none" }}
                    />

                    {activities}
                  </label>
                ))}
                {showActivities && ( // Render the "See Less" button if showAllSports is true
                <button
                  onClick={() => setshowActivities(false)}
                  className="text-black items-center flex text-[12px] md:text-[14px] font-semibold"
                  type="button"
                >
                  see less  <SlArrowUp size={12} className="bold-icon ml-[5px] "  />
                </button>
              )}
              <button
                onClick={() => setshowActivities(!showActivities)}
                className="text-black text-[12px] md:text-[14px] font-semibold"
                type="button"
              >
                {showActivities ? "" :<p className="flex items-center">see more <SlArrowDown size={12} className="ml-[5px] font-bold "/></p>}
              </button>
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Movies  <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
                {[
                  "Animated",
                  "Action",
                  "Comedy",
                  "Crime",
                  "Romantic",
                  "Rom-com",
                  "Sci-fi",
                  "Thriller",
                  // "Documentary",
                  // "War",
                  // "Film noir",
                  // "Fantasy",
                  // "Bollywood",
                  // "K-drama",
                  // "Sports",
                  // "Historical",
                  // "Superhero",
                  // "Biography",
                  // "Adventure",
                  // "Mystery",
                ].map((movies) => (
                  <label
                    key={movies}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedMovies.includes(movies)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedMovies"
                      value={movies}
                      onChange={handleFormChange}
                      checked={formData.selectedMovies.includes(movies)}
                      style={{ display: "none" }}
                    />

                    {movies}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Travel  <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {[
                  "Mountains",
                  "Beach",
                  "Adventure",
                  "Wonderlust",
                  "Exploring cuisines",
                  "Road Trips",
                  "Historical Sites",
                  "Wildlife Safari",
                  "Eco-Tourism",
                  "Spa Weekends",
                  "Urban Exploration",
                  "staycations",
                  "Camping",
                  "Backpacking",
                ]
                .slice(0, showTravel ? undefined : 8)
                .map((travel) => (
                  <label
                    key={travel}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedTravel.includes(travel)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedTravel"
                      value={travel}
                      onChange={handleFormChange}
                      checked={formData.selectedTravel.includes(travel)}
                      style={{ display: "none" }}
                    />

                    {travel}
                  </label>
                ))}
              </div>
            </fieldset>
            
            {/* <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
              Business And Growth 
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
                {[
                  "Investment",
                  "Networking",
                  "Self Development",
                  "Environmentalism",
                  "Metaverse",
                  "Trading",
                  "DAO’s",
                  "NFT’s",
                  "Crypto",
                  "Service-based Business ",
                  "Franchise ",
                  " Freelancing",
                  "IT Development",
                  "Others",
                ]
                .slice(0, showBussiness ? undefined : 8)
                .map((bussniss) => (
                  <label
                    key={bussniss}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.  selectedBussiness.includes(bussniss)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedBussiness"
                      value={bussniss}
                      onChange={handleFormChange}
                      checked={formData.selectedBussiness.includes(bussniss)}
                      style={{ display: "none" }}
                    />
                    {bussniss}
                  </label>
                ))}
                {showBussiness && ( // Render the "See Less" button if showAllSports is true
                <button
                  onClick={() => setShowBussiness(false)}
                  className="text-black items-center flex text-[12px] md:text-[14px] font-semibold"
                  type="button"
                >
                  see less <SlArrowUp size={12} className="bold-icon ml-[5px]"  />
                </button>
              )}
              <button
                onClick={() => setShowBussiness(!showBussiness)}
                className="text-black text-[12px] md:text-[14px] font-samibold ml-[10px] font-semibold "
                type="button"
              >
                {showBussiness ? "" : <p className="flex items-center">see more <SlArrowDown size={12} className="ml-[5px] font-bold"  /></p>}
              </button>
              </div>
              
            </fieldset> */}

            {/* Form Buttons */}
            <div className="flex justify-between mt-6">
            <button
      type="submit"
      className={`font-semibold py-2 px-2 ${
        isDesktop ? "text-black" : "text-yellow-500"
      }`}
      onClick={nextPageHandler}
    >
      SKIP
    </button>

    <button
  type="submit"
  className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black"
>
  Next
</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount4;
