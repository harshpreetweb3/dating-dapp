import React, { useEffect, useState } from 'react'
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
const Form3 = ({ index, setIndex, updateFormData, AllformData }) => {
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
    const [formData, setFormData] = useState({
        selectedsmoking: "",
        selecteddrink: "",
        selectedhobbies: "",
        selectedsports: "",
    });
    useEffect(() => {
        setFormData({
            selectedsmoking: AllformData.selectedsmoking || "",
            selecteddrink: AllformData.selecteddrink || "",
            selectedhobbies: AllformData.selectedhobbies || "",
            selectedsports: AllformData.selectedsports || "",
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

    const handleSubmit = (e) => {
        e.preventDefault();
        updateFormData(formData);
        setIndex(index + 1);
    };
    const [showAllSports, setShowAllSports] = useState(false);
    const [showhobbies, setshowhobbies] = useState(false);
    return (
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
                            className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedsmoking === smoking
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
                            className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selecteddrink === drink
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
                                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedhobbies.includes(hobbies)
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
                            see less <SlArrowUp size={12} className="bold-icon ml-[5px]" />
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
                                className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.selectedsports.includes(sports)
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
                            see less  <SlArrowUp size={12} className="bold-icon ml-[5px]" />
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

export default Form3