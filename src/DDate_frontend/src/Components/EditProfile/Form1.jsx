import React, { useEffect, useState } from 'react'
import CompressImage from "../ImageCompressFolder/CompressImage";

const Form1 = ({ index, setIndex, updateFormData, AllformData }) => {
    const [formData, setFormData] = useState({
        usergender: "Male", // Set a default value
        email: "",
        username: "",
        mobile: "",
        dob: "",
    });
    useEffect(() => {
        setFormData({
            usergender: AllformData.usergender || "Male",
            email: AllformData.email || "",
            username: AllformData.username || "",
            mobile: AllformData.mobile || "",
            dob: AllformData.dob || "",
            selectedIntro: AllformData.selectedIntro || "",
        });
    }, []);

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

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
          try {
            const compressedFile = await CompressImage(file);
            const reader = new FileReader();
            reader.readAsDataURL(compressedFile);
            reader.onload = () => {
              const newImageBase64 = reader.result;
              setTempProfileImage(newImageBase64); // Set the first image as temporary profile image
              setFormData((prevData) => ({
                ...prevData,
                images: [newImageBase64, ...prevData.images.slice(1)],
              }));
            };
          } catch (error) {
            console.error("Error compressing the image:", error);
          }
        }
      };
     

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
        updateFormData(formDataWithAge);
        setIndex(index + 1);
    };
    return (
        <form
            className="w-full rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
        >
            <div className="mb-4 relative">
                  <input
                    id="images"
                    type="file"
                    name="images"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="images"
                    className="h-32 w-32 rounded-full border-2 border-gray-300 cursor-pointer flex items-center justify-center"
                    style={{
                      background:
                        "linear-gradient(transparent, transparent), radial-gradient(circle at center, #cccccc, #cccccc)",
                      backgroundBlendMode: "multiply",
                    }}
                  >
                    {formData?.images?.length > 0 ? (
                      <div
                        className="relative w-full h-full"
                        style={{ top: "0.45rem ", left: "-0.15rem" }}
                      >
                        <img
                          src={
                            tempProfileImage ||
                            formData.images[0] ||
                            "default-placeholder.jpg"
                          }
                          alt="Profile"
                          className="rounded-full w-full h-full object-cover absolute"
                          style={{ marginTop: "-8px", marginLeft: "2px" }}
                        />

                     
                      </div>
                    ) : (
                      <svg
                        className="w-full h-full p-4 text-gray-200 dark:text-gray-700"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                      </svg>
                    )}
                  </label>
                </div>
             <div className="mb-4 grid grid-cols-5 gap-20">
                <label
                    htmlFor="username"
                    className="block text-lg font-semibold mb-2 text-white md:text-black"
                >
                    Username
                </label>
                <input
                    disabled
                    id="username"
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleFormChange}
                    className="form-input col-span-3 bg-transparent w-full border-none px-2 py-1.5 rounded-3xl text-white md:text-black text-sm"
                />
            </div>

            {/* Gender Selection */}
            <div className="mb-3 grid grid-cols-5 gap-20">
                <label className="block text-lg font-semibold mb-1 text-white md:text-black">
                     Gender
                </label>
                <div className="flex flex-wrap gap-2 col-span-3 md:gap-2 -mb-1 py-2 px-0 rounded-3xl  ">
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
            </div>

            {/* Email Input */}
            <div className="mb-4 grid grid-cols-5 gap-20">
                <label
                    htmlFor="email"
                    className="block text-lg font-semibold mb-2 text-white md:text-black font-viga"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    className="form-input col-span-3 bg-transparent w-full border-2 text-sm px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black "
                />
            </div>

            {/* Username Input */}
           

            {/* Mobile Number Input */}
            <div className="mb-4 grid grid-cols-5 gap-20">
                <label
                    htmlFor="mobile"
                    className="block text-lg font-semibold mb-2 text-white md:text-black"
                >
                    Mobile No
                </label>
                <input
                    id="mobile"
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleFormChange}
                    className="form-input text-sm col-span-3 bg-transparent w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black "
                />
            </div>

            {/* DOB Input */}
            <div className="mb-4 grid grid-cols-5 gap-20">
                <label
                    htmlFor="dob"
                    className="block text-lg font-semibold mb-2 text-white md:text-black"
                >
                    DOB
                </label>
                <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleFormChange}
                    placeholder="dd/mm/yyyy"
                    className="form-input bg-transparent col-span-3 text-sm w-full border-2 px-2 border-gray-300 py-1.5 rounded-3xl text-white md:text-black "
                />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
                <div className="flex-1 mb-4 md:mb-0 grid grid-cols-5 gap-20">
                    <label
                        htmlFor="selectedIntro"
                        className="block text-lg font-semibold mb-1 text-white md:text-black"
                    >
                        My Introduction
                    </label>
                    <textarea
                        id="selectedIntro"
                        name="selectedIntro"
                        placeholder="Let us know something about you"
                        value={formData.selectedIntro}
                        onChange={handleFormChange}
                        className="w-full px-4 py-2 col-span-3 rounded-lg border border-white md:border-black bg-transparent text-white md:text-black"
                    />
                </div>
            </div>

            {/* Form Buttons */}
            <div className="flex justify-center mt-6">
               
                <button
                    type="submit"
                    className="bg-yellow-500 font-semibold py-2 px-6 mt-8 rounded-full hover:bg-yellow-600 text-white md:text-black md:hover:text-black"
                >
                    Next
                </button>
            </div>
        </form>
    )
}

export default Form1