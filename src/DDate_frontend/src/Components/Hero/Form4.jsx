import React, { useEffect, useState } from 'react'
import { SlArrowUp,SlArrowDown } from "react-icons/sl";
const Form4 = ({index, setIndex, updateFormData, AllformData}) => {

    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [showArt, setShowArt] = useState(false); 
    const [showActivities, setshowActivities] = useState(false);
    const [showTravel, setshowTravel] = useState(false);

    const [formData, setFormData] = useState({
        selectedArt: "",
        selectedPets: "",
        selectedHabbits: "",
        selectedActivities: "",
        selectedMovies: "",
        selectedTravel: "",
      });

    useEffect(() => {
        setFormData({
            selectedArt: AllformData.selectedArt || "",
            selectedPets: AllformData.selectedPets || "",
            selectedHabbits: AllformData.selectedHabbits || "",
            selectedActivities: AllformData.selectedActivities || "",
            selectedMovies: AllformData.selectedMovies || "",
            selectedTravel: AllformData.selectedTravel || "",
        });
        const handleResize = () => {
          setIsDesktop(window.innerWidth >= 768);
    
        };
        window.addEventListener("resize", handleResize);
    
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
        updateFormData(formData);
        setIndex(index+1);
      };
     
    
    const nextPageHandler=()=>{
        setIndex(index+1);
    }


    return (
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
                                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedArt.includes(art)
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
                            see less <SlArrowUp size={12} className="bold-icon ml-[5px] " />
                        </button>
                    )}
                    <button
                        onClick={() => setShowArt(!showArt)}
                        className="text-black text-[12px] md:text-[14px] flex items-center font-semibold"
                        type="button"
                    >
                        {showArt ? "" : <p className="flex items-center">see more <SlArrowDown size={12} className="ml-[5px] font-bold" /></p>}
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
                            className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedPets === pets
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
                                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedHabbits.includes(habbits)
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
                                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedActivities.includes(activities)
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
                            see less  <SlArrowUp size={12} className="bold-icon ml-[5px] " />
                        </button>
                    )}
                    <button
                        onClick={() => setshowActivities(!showActivities)}
                        className="text-black text-[12px] md:text-[14px] font-semibold"
                        type="button"
                    >
                        {showActivities ? "" : <p className="flex items-center">see more <SlArrowDown size={12} className="ml-[5px] font-bold " /></p>}
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
                            className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedMovies.includes(movies)
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
                                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedTravel.includes(travel)
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

            <div className="flex justify-between mt-6">
                <button
                    type="submit"
                    className={`font-semibold py-2 px-2 ${isDesktop ? "text-black" : "text-yellow-500"
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
    )
}

export default Form4