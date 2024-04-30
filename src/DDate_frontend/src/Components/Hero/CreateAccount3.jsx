import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";
import { SlArrowUp,SlArrowDown } from "react-icons/sl";

const CreateAccount3 = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selectedsmoking: "",
    selecteddrink: "",
    selectedhobbies: "",
    selectedsports: "",
  });

  const backpageHandler = () => {
    navigate("/CreateAccount2");
  };
  const nextPageHandler = () => {
    navigate("/CreateAccount4");
  }

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);

    };

    window.addEventListener("resize", handleResize);

    // Load data from local storage
    const savedData = localStorage.getItem("form3");
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
      selectedhobbies: 10,
      selectedsports: 26,
    };

    if (name === "selectedhobbies" || name === "selectedsports") {
      setFormData((prevData) => {
        let updatedData;
        if (checked) {
          // Adding the selection
          updatedData = {
            ...prevData,
            [name]: [...prevData[name], value],
          };
        } else {
          // Removing the selection
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
  const backHandler = () => {
    navigate("/CreateAccount2");

  }

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("form3", JSON.stringify(formData));
    console.log(formData);
    navigate("/CreateAccount4");
  };
  const [showAllSports, setShowAllSports] = useState(false); 
  const [showhobbies , setshowhobbies] = useState(false);
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
            {/* smoking Selection */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Smoking
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2  rounded-3xl">
                {["Regular", "Sometimes", "Never"].map((smoking) => (
                  <label
                    key={smoking}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedsmoking === smoking
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="selectedsmoking"
                      value={smoking}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {smoking}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Alcohol/Drink 
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {["Regular", "Socially", "Special Occasions", "Never"].map((drink) => (
                  <label
                    key={drink}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selecteddrink === drink
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="selecteddrink"
                      value={drink}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {drink}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Hobbies (select any 2) */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-2 text-white md:text-black">
                Hobbies <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {[
                  "Reading",
                  "Dancing",
                  "Astronomy",
                  "DIY",
                  "Gaming",
                  "Numerology",
                  "Amateur Cook",
                  "Formula One",
                  "Painting",
                  "Pottery",
                  "Camping",
                  "Singing",
                  "Photography",
                  "Others"
                ].slice(0, showhobbies ? undefined : 8)
                .map((hobbies) => (
                  <label
                    key={hobbies}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedhobbies.includes(hobbies)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedhobbies"
                      value={hobbies}
                      onChange={handleFormChange}
                      checked={formData.selectedhobbies.includes(hobbies)}
                      style={{ display: "none" }}
                    />

                    {hobbies}
                  </label>
                ))}
                {showhobbies && ( // Render the "See Less" button if showAllSports is true
                <button

                  onClick={() => setshowhobbies(false)}
                  className="text-black text-[12px] md:text-[14px] font-semibold flex items-center"
                  type="button"
                >
                  see less <SlArrowUp size={12} className="bold-icon ml-[5px]"  />
                </button>
              )}
              <button
                onClick={() => setshowhobbies(!showhobbies)}
                className="text-black text-[12px] md:text-[14px] font-semibold"
                type="button"
              >
                {showhobbies ? "" : <p className="flex items-center ">see more <SlArrowDown size={12} className="ml-[5px]" /></p>}
              
              </button>
              </div>
            </fieldset>

            {/* Sports (select any 2) */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Sports <span className="text-gray-400 text-sm">(select any 2)</span>
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
                {[
                  "Cricket",
                  "Football",
                  "Basketball",
                  "Tennis",
                  "Badminton",
                  "Boxing",
                  "Gym",
                  "Yoga",
                  "Volleyball",
                  "Chess",
                  "Carrom",
                  "Golf",
                  "Table-Tennis",
                  "Weightlifting",
                  "Polo",
                  "Rugby",
                  "Cycling",
                  "Wrestling",
                  "Swimming",
                  "Snooker",
                  "Sumo Wrestling",
                  "Aerobics",
                  "Skydiving",
                  "Karate",
                  "Judo",
                  "Others",
                ]
                .slice(0, showAllSports ? undefined : 10)
                .map((sports) => (
                  <label
                    key={sports}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.selectedsports.includes(sports)
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="checkbox"
                      name="selectedsports"
                      value={sports}
                      onChange={handleFormChange}
                      checked={formData.selectedsports.includes(sports)}
                      style={{ display: "none" }}
                    />
                    {sports}
                  </label>
                ))}
                {showAllSports && ( // Render the "See Less" button if showAllSports is true
                <button
                  onClick={() => setShowAllSports(false)}
                  className="text-black text-[12px] md:text-[14px] font-semibold flex items-center"
                  type="button" 
                >
                  see less  <SlArrowUp size={12} className="bold-icon ml-[5px]"  /> 
                </button>
              )}
              <button
                onClick={() => setShowAllSports(!showAllSports)}
                className="text-black text-[12px] md:text-[14px] font-semibold "
                type="button"
              >
                {showAllSports ? "" : <p className="flex items-center ml-[6px]">see more <SlArrowDown size={12} className="ml-[5px]" /></p>}
              </button>
              </div>
              
            </fieldset>

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

export default CreateAccount3;
