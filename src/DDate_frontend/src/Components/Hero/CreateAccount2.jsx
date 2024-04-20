import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";


const CreateAccount2 = () => {
  const navigate = useNavigate();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  const [formData, setFormData] = useState({
    genderPronouns: "",
    selectedReligion: "",
    selectedFooding: "",
    selectedWhatYouDo: "",
    selectedlookingFor: "",
    selectedHeight: "Feet’inch’",
    selectedZodiac: "",
    selectedlifePathNumber: "",
  });

  const backpageHandler = () => {
    navigate("/CreateAccount1");
  };
  const nextPageHandler = () => {
    navigate("/CreateAccount3");
  }

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);

    };

    window.addEventListener("resize", handleResize);

    // Load data from local storage
    const savedData = localStorage.getItem("form2");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []); // Ensure

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("form2", JSON.stringify(formData));
    console.log(formData);
    navigate("/CreateAccount3");
  };
  const backHandler = () => {
    navigate("/CreateAccount1");

  }
  
  return (
    <div className="flex w-full h-screen md:flex-row font-num">
      {/* Image container for larger screens */}
      <div
        className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${createAccountImage})` }}
      >
        <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
          <div className="w-full max-w-xl mx-auto text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-num mx-auto">
              Create Your
            </h1>{" "}
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
              account here
            </h2>
            <p className="text-white text-bold md:text-2xl">Welcome ..</p>
            <p className="text-white font-light md:text-xl">
              Complete Your Profile Here.
            </p>
            <p className="text-white font-extralight md:text-lg">
              Tell us about yourself and let us help you finding the perfect
              match
            </p>
            <p className="italic text-yellow-700 md:text-lg">Good Luck!</p>
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
  <svg className="flex-shrink-0 ml-5" onClick={backHandler} width="20" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
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


<style jsx>{`
  @media (max-width: 768px) {
    #svg-path {
      fill: yellow;
    }
  }
`}</style>

</h2>
          {/* <div className="border-t-2 border-dotted md:border-black border-white w-full mt-4 mb-4"></div> */}
          <div className="border-t-2 border-solid md:border-black border-white w-full mt-4 mb-4 md:ml-6"></div>
          <form
            className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
          >
            {/* Gender Selection */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Gender Pronouns
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 px-0 rounded-3xl">
                {["Man", "Woman", "Nonbinary"].map((genPro) => (
                  <label
                    key={genPro}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.genderPronouns === genPro
                      ? "bg-yellow-500 text-black"
                      : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                      }`}
                  >
                    <input
                      type="radio"
                      name="genderPronouns"
                      value={genPro}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {genPro}
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
              {/* Height Input */}
              {/* <div className="flex-1 mb-4 md:mb-0">
                <label
                  htmlFor="selectedHeight"
                  className=" block text-lg font-semibold  mb-2 text-white md:text-black"
                >
                  Height
                </label>
                <input
                  type="number"
                  id="selectedHeight"
                  name="selectedHeight"
                  placeholder="Feet`inch``"
                  value={formData.selectedHeight}
                  onChange={handleFormChange}
                  className="px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500 text-center font-samibold w-48"
                />

              </div> */}
               <fieldset className="mb-2">
              <legend className="block text-lg font-semibold  mb-2 text-white md:text-black">
              Life-Path Number 
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {["1  ", "2", "3", "4", "5", "6", "7", "8", "9", "11", "22", "33"].map(
                  (lifePathNumber) => (
                    <label
                      key={lifePathNumber}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedlifePathNumber === lifePathNumber
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedlifePathNumber"
                        value={lifePathNumber}
                        onChange={handleFormChange}
                        style={{ display: "none" }}
                      />
                      {lifePathNumber}
                    </label>
                  )
                )}
              </div>
            </fieldset>

              {/* Zodiac Sign Input */}
              {/* <div className="flex-1">
                <label
                  htmlFor="selectedZodiac"
                  className="block text-lg font-semibold  mb-2 text-white md:text-black"
                >
                  Zodiac Sign
                </label>
                <input
                  type="text"
                  id="selectedZodiac"
                  name="selectedZodiac"
                  placeholder="Your zodiac sign"
                  value={formData.selectedZodiac}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2 rounded-full border border-white md:border-black bg-transparent text-white md:text-black focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div> */}
            </div>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Religion
              </legend>
              <div>
                <div className="flex flex-wrap gap-2 md:gap-2  px-0 rounded-3xl">
                  {["Hindu", "Muslim", "Sikh", "Christian"].map((religion) => (
                    <label
                      key={religion}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedReligion === religion
                          ? "bg-yellow-500 text-black"
                          : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedReligion"
                        value={religion}
                        onChange={handleFormChange}
                        style={{ display: "none" }}
                      />
                      {religion}
                    </label>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-0 rounded-3xl">
                  {["Jain", "Catholic", "Agnostic", "Jewish", "Atheist", "Buddhist", "Spiritual"].map(
                    (religion) => (
                      <label
                        key={religion}
                        className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedReligion === religion
                            ? "bg-yellow-500 text-black"
                            : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                          }`}
                      >
                        <input
                          type="radio"
                          name="selectedReligion"
                          value={religion}
                          onChange={handleFormChange}
                          style={{ display: "none" }}
                        />
                        {religion}
                      </label>
                    )
                  )}
                </div>
              </div>

            </fieldset>

            {/* Height and Zodiac Sign Selection */}
           
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold  mb-2 text-white md:text-black">
              Animal Zodiac Sign
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {["Rat", "Ox", "Tiger", "Cat", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"].map(
                  (Zodiac) => (
                    <label
                      key={Zodiac}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedZodiac === Zodiac
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedZodiac"
                        value={Zodiac}
                        onChange={handleFormChange}
                        style={{ display: "none" }}
                      />
                      {Zodiac}
                    </label>
                  )
                )}
              </div>
            </fieldset>
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold  mb-2 text-white md:text-black">
                Fooding
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {["Vegan", "vegetarian", "Omnivore", "Kosher", "Carnivore", "Halal", "Pescatarian", "Others"].map(
                  (Fooding) => (
                    <label
                      key={Fooding}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedFooding === Fooding
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedFooding"
                        value={Fooding}
                        onChange={handleFormChange}
                        style={{ display: "none" }}
                      />
                      {Fooding}
                    </label>
                  )
                )}
              </div>
            </fieldset>


            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black ">
                What You do
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-0 rounded-3xl">
                {["In School", "In College", "Employed", "Unemployed"].map(
                  (WhatYouDo) => (
                    <label
                      key={WhatYouDo}
                      className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedWhatYouDo === WhatYouDo
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                        }`}
                    >
                      <input
                        type="radio"
                        name="selectedWhatYouDo"
                        value={WhatYouDo}
                        onChange={handleFormChange}
                        style={{ display: "none" }}
                      />
                      {WhatYouDo}
                    </label>
                  )
                )}
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                What are you looking for
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-0 rounded-3xl">
                {[
                  "Long-term relationship",
                  "Short-term relationship",
                  "Friends",
                  "Just Flowing",
                  "Life Partner",
                ].map((lookingFor) => (
                  <label
                    key={lookingFor}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedlookingFor === lookingFor
                      ? "bg-yellow-500 text-black"
                      : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                      }`}
                  >
                    <input
                      type="radio"
                      name="selectedlookingFor"
                      value={lookingFor}
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {lookingFor}
                  </label>
                ))}
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
      skip
    </button>

    <button
  type="text"
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

export default CreateAccount2;
