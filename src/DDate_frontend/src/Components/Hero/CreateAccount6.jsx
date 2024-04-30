import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";
import { DDate_backend } from "../../../../declarations/DDate_backend/index";
import { Principal } from "@dfinity/principal";
import CompressImage from "../ImageCompressFolder/CompressImage";
import { useMediaQuery } from "react-responsive";



const CreateAccount6 = () => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const isMobileView = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    selectedintrests: "",
    selectedpreferAge: "",
    selectedLocation: "",
    selectedPrefferedLocation: "",
    selectedIntro: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [compressedImage, setCompressedImage] = useState([]);

  const [imageError, setImageError] = useState(false);
  const [isButtonDisable, setIsButtonDisable] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);

    };

    window.addEventListener("resize", handleResize);

    // Load data from local storage
    const savedData = localStorage.getItem("form5");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (name === "selectedpreferAge") {
      let minAge, maxAge;

      if (value === "above 30") {
        // Set default values for "above 30" option
        minAge = 30;
        maxAge = 60;
      } else {
        [minAge, maxAge] = value.split("-").map(Number);
      }

      setFormData((prevData) => ({
        ...prevData,
        min_age: minAge,
        max_age: maxAge,
        selectedpreferAge: value,
      }));
    } else if (
      name === "selectedLocation" ||
      name === "selectedPrefferedLocation"
    ) {
      const lowercaseLocation = value.toLowerCase();
      setFormData((prevData) => ({
        ...prevData,
        [name]: lowercaseLocation,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleImageChange = async (e, index) => {
    setIsButtonDisable(true);
    const file = e.target.files[0];
    if (file) {
      try {
        const compressedFile = await CompressImage(file);

        const reader = new FileReader();
        reader.onload = (event) => {
          const updatedImages = [...imageFiles];
          updatedImages[index] = event.target.result;
          setImageFiles(updatedImages);
          setIsButtonDisable(false); // Set isButtonDisable to false here
        };
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error during image processing:", error);
      }
    }
  };
  const nextPageHandler = () => {
    navigate("/Swipe");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsButtonDisable(!isButtonDisable);

    if (imageFiles.length === 0) {
      setImageError(true);
      return;
    }
    localStorage.setItem("form6", JSON.stringify(formData));
    console.log(formData);

    const formKeys = ["form1", "form2", "form3", "form4", "form5", "form6"];
    const userData = {};
    const principalString = localStorage.getItem("id");
    console.log(principalString);

    // Convert the principal string to a Principal object
    const principal = convertStringToPrincipal(principalString);

    if (principal) {
      formKeys.forEach((key) => {
        userData[key] = localStorage.getItem(key);
      });

      const result = {};

      for (const key in userData) {
        if (userData.hasOwnProperty(key)) {
          const formData = JSON.parse(userData[key]);
          Object.assign(result, formData);
        }
      }

      const objectSendToBackendFormat = {
        id: principal,
        gender: result.usergender,
        email: result.email,
        name: result.username,
        mobile_number: result.mobile,
        dob: result.dob,
        gender_pronouns: result.genderPronouns,
        religion: result.selectedReligion,
        height: result.selectedHeight,
        zodiac: result.selectedZodiac,
        diet: result.selectedFooding,
        occupation: result.selectedWhatYouDo,
        looking_for: result.selectedlookingFor,
        smoking: result.selectedsmoking,
        drinking: result.selecteddrink,
        hobbies: result.selectedhobbies,
        sports: result.selectedsports,
        art_and_culture: result.selectedArt,
        pets: result.selectedPets,
        general_habits: result.selectedHabbits,
        outdoor_activities: result.selectedActivities,
        travel: result.selectedTravel,
        movies: result.selectedMovies,
        interests_in: result.selectedintrests,
        age: result.age,
        location: result.selectedLocation,
        min_preferred_age: result.min_age,
        max_preferred_age: result.max_age,
        preferred_gender: result.selectedintrests,
        preferred_location: result.selectedPrefferedLocation,
        introduction: result.selectedIntro,
        images: imageFiles,
      };

      localStorage.setItem("myImage", objectSendToBackendFormat.images[0]);

      console.log(
        "image in local storage",
        objectSendToBackendFormat.images[0]
      );

      console.log("objectSendToBackendFormat", objectSendToBackendFormat);

      try {
        await DDate_backend.add_user_profile(objectSendToBackendFormat);
        console.log(imageFiles);
        navigate("/Swipe");
      } catch (error) {
        console.error("Error sending data to the backend:", error);
      }
    } else {
      console.error("Error converting principal string to Principal object.");
    }
  };

  function convertStringToPrincipal(principalString) {
    try {
      const principal = Principal.fromText(principalString);
      console.log("Converted Principal: ", principal.toText());
      return principal;
    } catch (error) {
      console.error("Error converting string to Principal: ", error);
      return null;
    }
  }
  const backHandler = () => {
    navigate("/CreateAccount5");

  }
  return (
    <div className="flex w-full h-screen md:flex-row font-num">
      <div
        className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${createAccountImage})` }}
      >
        <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
          <div className="w-full max-w-xl mx-auto text-left">
            <h1 className="text-4xl font-viga md:text-5xl font-bold text-white mb-4 mx-auto">
              Create Your
            </h1>
            <h2 className="text-4xl font-viga md:text-5xl font-bold text-white mb-2">
              account here
            </h2>
            <p className="text-white font-[600] font-viga md:text-2xl">Welcome ..</p>
            <p className="text-white font-[600] font-viga md:text-xl">
              Complete Your Profile Here.
            </p>
            <p className="text-white font-[600] font-viga md:text-lg">
              Tell us about yourself and let us help you finding the perfect
              match
            </p>
            <p className="text-[#FFC107] font-[600] mt-[15px]md:text-lg">Good Luck!</p>
          </div>
        </div>

        {/* Image Overlay for smaller screens */}
        <div className="w-full h-full bg-black opacity-50 md:opacity-0"></div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-start px-[2%] z-10 overflow-y-auto">
        <div className="w-full max-w-md my-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center ">
            <div className="flex items-center">
              <svg className="flex-shrink-0 ml-5 cursor-pointer" onClick={backHandler} width="20" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.28501 0.285909L0.285013 5.28591C0.193973 5.38101 0.122608 5.49316 0.0750132 5.61591C-0.0250048 5.85937 -0.0250048 6.13245 0.0750133 6.37591C0.122608 6.49866 0.193973 6.6108 0.285013 6.70591L5.28501 11.7059C5.37825 11.7991 5.48894 11.8731 5.61076 11.9236C5.73259 11.974 5.86315 12 5.99501 12C6.26132 12 6.51671 11.8942 6.70501 11.7059C6.89332 11.5176 6.9991 11.2622 6.9991 10.9959C6.9991 10.7296 6.89332 10.4742 6.70501 10.2859L3.40501 6.99591L10.995 6.99591C11.2602 6.99591 11.5146 6.89055 11.7021 6.70301C11.8897 6.51548 11.995 6.26112 11.995 5.99591C11.995 5.73069 11.8897 5.47634 11.7021 5.2888C11.5146 5.10126 11.2602 4.99591 10.995 4.99591L3.40501 4.99591L6.70501 1.70591C6.79874 1.61294 6.87314 1.50234 6.9239 1.38049C6.97467 1.25863 7.00081 1.12792 7.00081 0.995908C7.00081 0.863897 6.97467 0.733191 6.9239 0.611332C6.87314 0.489472 6.79874 0.378873 6.70501 0.285909C6.61205 0.192181 6.50145 0.117785 6.37959 0.0670163C6.25773 0.0162475 6.12703 -0.00988987 5.99501 -0.00988986C5.863 -0.00988986 5.7323 0.0162475 5.61044 0.0670164C5.48858 0.117785 5.37798 0.192181 5.28501 0.285909Z" fill="black" id="svg-path" />
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
          <div className="w-full mt-4 mb-4">
            <div className="border-t-2 md:border-black border-white mx-auto md:mx-6"></div>
          </div>

          <form
            className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none"
            onSubmit={handleSubmit}
          >
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black ">
                Add Photos{" "}
                <span className="text-gray-400 text-xs ml-4">
                  (Add maximum 5 photos)
                </span>
              </legend>
              {/* <div className="flex justify-center gap-2">
                  {Array.from({ length: 1 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 mx-2 max-w-[calc(33%-1rem)]"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index,"profile")}
                        id={`file-input-${index}`}
                        style={{ display: "none" }}
                      />
                      {imageFiles[index] ? (
                        <img
                          src={imageFiles[index]}
                          alt={`Image ${index}`}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div
                          className="custom-input h-36 w-36 flex justify-center items-center border border-dashed border-gray-400 lg:bg-gray-200 md:bg-gray-200 bg-transparent rounded cursor-pointer"
                          onClick={() =>
                            document
                              .getElementById(`file-input-${index}`)
                              .click()
                          }
                        >
                          <span className="text-2xl text-gray-600">+</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div> */}
              {imageError && (
                <p className="text-red-500 text-sm">
                  Please Select at Least One Image
                </p>
              )}
            </fieldset>

            {/* Image Input */}
            <div className="flex flex-col w-full justify-center items-center">
              <fieldset className="mb-2 w-full">
                <div>
                  {/* First row with only one input field */}
                  {/* <div className="flex justify-center mt-4 mr-14 ">
                    <div className="w-full">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 0)}
                        id="file-input-0"
                        className="mr-14"
                        style={{ display: "none" }}
                      />
                      {imageFiles[0] ? (
                        <img
                          src={imageFiles[0]}
                          alt="Image 0"
                          className="h-48 w-48 object-fit rounded"
                        />
                      ) : (
                        <div
                          className="custom-input h-48 w-40 flex justify-center items-center border  border-gray-400 lg:bg-gray-200 md:bg-gray-200 bg-transparent rounded-2xl cursor-pointer"
                          onClick={() =>
                            document.getElementById("file-input-0").click()
                          }
                        >
                          <div className="flex items-center justify-center w-10 h-10md:bg-white bg-transparent border-2 border-gray-600 rounded-full">
                            <span className="text-2xl text-gray-600">+</span>
                          </div>{" "}
                        </div>
                      )}
                    </div>
                  </div> */}

                  <div className="flex justify-center items-center w-full mt-4">
                    <div className="w-40 max-w-xs mx-auto">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 0)}
                        id="file-input-0"
                        className="hidden"
                      />
                      {imageFiles[0] ? (
                        <img
                          src={imageFiles[0]}
                          alt="Image 0"
                          className="w-full h-auto object-cover rounded-lg"
                        />
                      ) : (
                        <div
                          className="h-48 w-full flex justify-center items-center border border-gray-400 lg:bg-gray-200 md:bg-gray-200 bg-transparent rounded-2xl cursor-pointer"
                          onClick={() =>
                            document.getElementById("file-input-0").click()
                          }
                        >
                          <div className="flex items-center justify-center w-10 h-10 md:bg-white bg-transparent border-2 border-gray-600 rounded-full">
                            <span className="text-2xl text-gray-600">+</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <legend className="block text-md font-semibold text-gray-300  mt-[1rem]">
                    Optional
                  </legend>

                  <div className="mt-2 w-full grid grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex justify-center items-center"
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, index + 1)}
                          id={`file-input-${index + 1}`}
                          className="hidden"
                        />
                        {imageFiles[index + 1] ? (
                          <img
                            src={imageFiles[index + 1]}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <label
                            htmlFor={`file-input-${index + 1}`}
                            className="h-36 w-full cursor-pointer flex justify-center items-center border border-gray-400 md:bg-gray-200 bg-transparent rounded-2xl hover:bg-gray-300"
                          >
                            <div className="flex items-center justify-center w-10 h-10 md:bg-white bg-transparent border-2 border-gray-600 rounded-full">
                              <span className="text-2xl text-gray-600">+</span>
                            </div>
                          </label>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="mt-[2.5rem] w-full grid grid-cols-3 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div
                        key={index}
                        className={`flex justify-center items-center ${index > 0 ? "hidden" : ""
                          }`}
                      >
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageChange(e, 4)}
                          id="file-input-4"
                          className="hidden"
                        />
                        {imageFiles[4] ? (
                          <img
                            src={imageFiles[4]}
                            alt="Image 4"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <label
                            htmlFor={`file-input-4`}
                            className="h-36 w-full cursor-pointer flex justify-center items-center border border-gray-400 md:bg-gray-200 bg-transparent rounded-2xl hover:bg-gray-300"
                          >
                            <div className="flex items-center justify-center w-10 h-10 md:bg-white bg-transparent border-2 border-gray-600 rounded-full">
                              <span className="text-2xl text-gray-600">+</span>
                            </div>
                          </label>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* <div className="flex justify-center items-center w-full mt-[3rem]">
                  <div className="w-40 max-w-xs mx-auto">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 4)}
                        id="file-input-4"
                        style={{ display: "none" }}
                      />
                      {imageFiles[4] ? (
                        <img
                          src={imageFiles[4]}
                          alt="Image 4"
                          className="w-full h-auto object-cover rounded-lg" 
                        />
                      ) : (
                        <div
                        className="h-48 w-full flex justify-center items-center border border-gray-400 lg:bg-gray-200 md:bg-gray-200 bg-transparent rounded-2xl cursor-pointer"
                        onClick={() =>
                            document.getElementById("file-input-4").click()
                          }
                        >
                          <div className="flex items-center justify-center w-10 h-10 md:bg-white bg-transparent border-2 border-gray-600 rounded-full">
                            <span className="text-2xl text-gray-600">+</span>
                          </div>{" "}
                        </div>
                      )}
                    </div>
                  </div> */}
                  {/* </div>
              </fieldset>
            </div> */}

                  {/* <div className="flex justify-center items-center w-full mt-[3rem]">
                  <div className="w-40 max-w-xs mx-auto">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, 4)}
                        id="file-input-4"
                        style={{ display: "none" }}
                      />
                      {imageFiles[4] ? (
                        <img
                          src={imageFiles[4]}
                          alt="Image 4"
                          className="w-full h-auto object-cover rounded-lg" 
                        />
                      ) : (
                        <div
                        className="h-48 w-full flex justify-center items-center border border-gray-400 lg:bg-gray-200 md:bg-gray-200 bg-transparent rounded-2xl cursor-pointer"
                        onClick={() =>
                            document.getElementById("file-input-4").click()
                          }
                        >
                          <div className="flex items-center justify-center w-10 h-10 md:bg-white bg-transparent border-2 border-gray-600 rounded-full">
                            <span className="text-2xl text-gray-600">+</span>
                          </div>{" "}
                        </div>
                      )}
                    </div>
                  </div> */}
                </div>
              </fieldset>
            </div>
            {/* <div className="flex flex-row w-full">
              <fieldset className=" w-full">
                <div className="flex justify-start gap-2">
                  {Array.from({ length: 1 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex-1 mx-2 max-w-[calc(33%-1rem)]"
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(e, index)}
                        id={`file-input-${index}`}
                        style={{ display: "none" }}
                      />
                      {imageFiles[index] ? (
                        <img
                          src={imageFiles[index]}
                          alt={`Image ${index}`}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <div
                          className="custom-input h-28 w-24 flex justify-center items-center border border-dashed border-gray-400 lg:bg-gray-200 md:bg-gray-200 bg-transparent rounded cursor-pointer"
                          onClick={() =>
                            document
                              .getElementById(`file-input-${index}`)
                              .click()
                          }
                        >
                          <span className="text-2xl text-gray-600">+</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
               
              </fieldset>
            </div> */}

            <div className="flex justify-end w-full flex-wrap mt-6 gap-2">
              {/* <button
                type="submit"
                className={`font-semibold py-2 px-2 ${isDesktop ? "text-black" : "text-yellow-500"
                  }`}
                onClick={nextPageHandler}
              >
                skip
              </button> */}

              <button
  type="submit"
  disabled={isButtonDisable}
  className={`font-semibold py-4 px-6 rounded-full md:text-[15px] md:w-auto w-full text-xs flex justify-center ${
    isButtonDisable
      ? "bg-gray-400 text-black cursor-not-allowed "
      : "bg-yellow-500 hover:bg-yellow-600"
  }`}
  style={{
    color: isMobileView ? "white" : "black",
  }}
>
  {isButtonDisable ? "loading..." : "Save and start swiping"}
</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount6;
