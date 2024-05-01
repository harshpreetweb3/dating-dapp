import React, { useEffect, useState } from 'react'

const Form1 = ({index, setIndex}) => {
    const [formData, setFormData] = useState({
        usergender: "Male", // Set a default value
        email: "",
        username: "",
        mobile: "",
        dob: "",
    });

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
    useEffect(() => {
        const savedData = localStorage.getItem("form1");
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    const handleFormChange = (e) => {
        const { name, value } = e.target;

        if (name === "usergender") {
            setFormData((prevData) => ({
                ...prevData,
                usergender: value,
            }));
        } else if (name === "dob") {
            const age = calculateAge(value);
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
                age: age,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const age = calculateAge(formData.dob);
        const formDataWithAge = {
            ...formData,
            age: age,
        };

        // Save the updated form data to local storage
        localStorage.setItem("form1", JSON.stringify(formDataWithAge));
        console.log(formDataWithAge);

        setIndex(index+1);
    };
    return (
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
                            className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${formData.usergender === gender
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
                    className="block text-lg font-semibold mb-2 text-white md:text-black font-viga"
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
    )
}

export default Form1