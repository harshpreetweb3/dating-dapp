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
  
  const nextPageHandler = () => {
    navigate("/CreateAccount2");
  
  }

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
  const backHandler = () => {
    navigate("/");

  }

  return (
    <div className="flex w-full h-screen overflow-hidden md:flex-row font-num">
      {/* Image container for larger screens */}
      <div
        className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0 text-center"
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
                type="submit"
                className=" text-yellow-500 font-semibold py-2 px-2"
              //  onClick={nextPageHandler}
              >
                
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

export default CreateAccount1;
