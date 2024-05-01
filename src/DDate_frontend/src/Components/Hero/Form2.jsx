import React, { useEffect, useState } from 'react'

const Form2 = ({index, setIndex, updateFormData, AllformData}) => {
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
  
    useEffect(() => {
        setFormData({
            genderPronouns: AllformData.genderPronouns || "",
            selectedReligion: AllformData.selectedReligion || "",
            selectedFooding: AllformData.selectedFooding || "",
            selectedWhatYouDo: AllformData.selectedWhatYouDo || "",
            selectedlookingFor: AllformData.selectedlookingFor || "",
            selectedHeight: AllformData.selectedHeight || "Feet’inch’",
            selectedZodiac: AllformData.selectedZodiac || "",
            selectedlifePathNumber: AllformData.selectedlifePathNumber || "",
    });
      const handleResize = () => {
        setIsDesktop(window.innerWidth >= 768);
  
      };
  
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []); 

    const nextPageHandler=()=>{
        setIndex(index+1);
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        updateFormData(formData);
        setIndex(index+1);
    };
    return (
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
                    className={`font-semibold py-2 px-2 ${isDesktop ? "text-black" : "text-yellow-500"
                        }`}
                    onClick={nextPageHandler}
                >
                    SKIP
                </button>

                <button
                    type="text"
                    className="bg-yellow-500 font-semibold py-2 px-6 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black"
                >
                    Next
                </button>

            </div>
        </form>
    )
}

export default Form2