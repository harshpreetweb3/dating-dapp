import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";

const CreateAccount1 = () => {
  const [formData, setFormData] = useState({
    usergender: "Male", // Set a default value
    email: "",
    username: "",
    mobile: "",
    dob: "",
  });

  const navigate = useNavigate();

  const homepageHandler = () => {
    navigate("/");
  };

  useEffect(() => {
    const savedData = localStorage.getItem("form1");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "usergender") {
      // Handle gender change separately
      setFormData((prevData) => ({
        ...prevData,
        usergender: value,
      }));
    } else if (name === "dob") {
      // Calculate age and update the form data
      const age = calculateAge(value);
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        age: age, // Add age to form data
      }));
    } else {
      // Handle other input changes
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const calculateAge = (dobString) => {
    const dob = new Date(dobString);
    const currentDate = new Date();

    if (dob > currentDate) {
      alert("Please enter a valid date of birth.");
      return null;
    }

    let age = currentDate.getFullYear() - dob.getFullYear();

    if (
      currentDate.getMonth() < dob.getMonth() ||
      (currentDate.getMonth() === dob.getMonth() &&
        currentDate.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Calculate age and add it to the form data
    const age = calculateAge(formData.dob);
    const formDataWithAge = {
      ...formData,
      age: age,
    };

    // Save the updated form data to local storage
    localStorage.setItem("form1", JSON.stringify(formDataWithAge));
    console.log(formDataWithAge);

    navigate("/CreateAccount2");
  };

  return (
    <div className="flex w-full h-screen overflow-hidden md:flex-row font-num">
      {/* Image container for larger screens */}
      <div
        className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0 text-center"
        style={{ backgroundImage: `url(${createAccountImage})` }}
      >
        <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
          <div className="w-full max-w-xl mx-auto px-auto text-left ">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-num mx-auto">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center ">
            Allow Us to Know You
          </h2>
          <div className="border-t-2 border-solid md:border-black border-white w-full mt-4 mb-4 ml-6"></div>

          <form
            className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
          >
            {/* Gender Selection */}
            <fieldset className="mb-3">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">
                Choose Your Gender
              </legend>
              <div className="flex flex-wrap gap-2 md:gap-2 -mb-1 py-2 px-0 rounded-3xl  ">
                {["Male", "Female", "Others"].map((gender) => (
                  <label
                    key={gender}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      formData.usergender === gender
                        ? "bg-yellow-500 text-black"
                        : "bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black"
                    }`}
                  >
                    <input
                      type="radio"
                      name="usergender"
                      value={gender}
                      className="text-sm"
                      onChange={handleFormChange}
                      style={{ display: "none" }}
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Email Input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-lg font-semibold mb-2 text-white md:text-black font-num"
              >
                Enter Your Email ID
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                className="form-input bg-transparent w-full border-2 text-sm px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black "
              />
            </div>

            {/* Username Input */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-lg font-semibold mb-2 text-white md:text-black"
              >
                Enter Your Username
              </label>
              <input
                id="username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleFormChange}
                className="form-input bg-transparent w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black text-sm"
              />
            </div>

            {/* Mobile Number Input */}
            <div className="mb-4">
              <label
                htmlFor="mobile"
                className="block text-lg font-semibold mb-2 text-white md:text-black"
              >
                Enter Your Mobile No
              </label>
              <input
                id="mobile"
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleFormChange}
                className="form-input text-sm bg-transparent w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black "
              />
            </div>

            {/* DOB Input */}
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-lg font-semibold mb-2 text-white md:text-black"
              >
                Enter Your DOB
              </label>
              <input
                id="dob"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleFormChange}
                placeholder="dd/mm/yyyy"
                className="form-input bg-transparent text-sm w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black "
              />
            </div>

            {/* Form Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                className="bg-transparent text-white md:text-black  hover:border-white hover:text-white font-semibold py-2 px-4 rounded hover:bg-yellow-500 border border-white md:border-black"
                onClick={homepageHandler}
              >
                Back
              </button>
              <button
                type="submit"
                className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600"
                // onClick={nextPageHandler}
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

export default CreateAccount1;
