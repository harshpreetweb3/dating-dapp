import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";

const CreateAccount4 = () => {
  const navigate = useNavigate();

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

  useEffect(() => {
    const savedData = localStorage.getItem("form4");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value, checked } = e.target;
    if (
      name === "selectedArt" ||
      name === "selectedMovies" ||
      name === "selectedTravel" ||
      name === "selectedActivities"||
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
        if (updatedData[name].length > 2) {
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
  return (
    <div className="flex w-full h-screen md:flex-row font-num">
      {/* Image container for larger screens */}
      <div
        className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${createAccountImage})` }}
      >
        <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
          <div className="w-full max-w-xl mx-auto text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-num mx-auto" >
              Create Your
            </h1>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center">
            Allow us to know you
          </h2>
          <div className="border-t-2 border-solid md:border-black border-white w-full mt-4 mb-4 ml-6"></div>

          <form
            className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
          >
            {/* art Selection */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Art & Culture (select any 2)
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2  rounded-3xl">
                {[
                  "Drawing",
                  "Visiting Museum",
                  "Art Gallery",
                  "Craft",
                  "Decorative",
                  "Music concert",
                ].map((art) => (
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
                General Habbits
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
                {["Early rise", "lazy", "Night owl", "Activ"].map((habbits) => (
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
              ))}
            </div>
          </fieldset>


            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Outdoor Activities(select any 2)
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {[
                  "Hiking",
                  "Trekking",
                  "Fishing",
                  "Skiing",
                  "Rafting",
                  "Biking",
                  "Camping",
                  "Hunting",
                ].map((activities) => (
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
              </div>
            </fieldset>

            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Movies(select any 2)
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 rounded-3xl">
                {[
                  "Animated",
                  "Action",
                  "Comedy",
                  "Crime",
                  "Romantic",
                  "Horror",
                  "Thriller",
                  "Documentary",
                  "War",
                  "Film noir",
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
                Travel(select any 2)
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2  rounded-3xl">
                {[
                  "Mountains",
                  "Beach",
                  "Adventure",
                  "Wonderlust",
                  "Exploring cuisines",
                ].map((travel) => (
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

            {/* Form Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-transparent text-white md:text-black font-semibold py-2 px-4 rounded  hover:bg-yellow-500 hover:text-white  hover:border-white border border-white md:border-black"
                onClick={backpageHandler}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600"
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
