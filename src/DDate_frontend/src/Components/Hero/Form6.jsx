import React, { useEffect, useState } from 'react'
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import CompressImage from "../ImageCompressFolder/CompressImage";
import { Principal } from "@dfinity/principal";
import { DDate_backend } from "../../../../declarations/DDate_backend/index";
const Form6 = ({ AllformData, updateFormData }) => {
    const isMobileView = useMediaQuery({ maxWidth: 767 });
    const navigate = useNavigate();    
    const [imageFiles, setImageFiles] = useState([]);
    const [imageError, setImageError] = useState(false);
    const [isButtonDisable, setIsButtonDisable] = useState(false);   
  
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
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      setIsButtonDisable(!isButtonDisable);
  
      if (imageFiles.length === 0) {
        setImageError(true);
        return;
      }
  
      const principalString = localStorage.getItem("id");
      console.log(principalString);
      const principal = convertStringToPrincipal(principalString);
  
      if (principal) {  
        const objectSendToBackendFormat = {
            id: principal,
            gender: AllformData.usergender,
            email: AllformData.email,
            name: AllformData.username,
            mobile_number: AllformData.mobile,
            dob: AllformData.dob,
            gender_pronouns: AllformData.genderPronouns,
            religion: AllformData.selectedReligion,
            height: AllformData.selectedHeight,
            zodiac: AllformData.selectedZodiac,
            diet: AllformData.selectedFooding,
            occupation: AllformData.selectedWhatYouDo,
            looking_for: AllformData.selectedlookingFor,
            smoking: AllformData.selectedsmoking,
            drinking: AllformData.selecteddrink,
            hobbies: AllformData.selectedhobbies,
            sports: AllformData.selectedsports,
            art_and_culture: AllformData.selectedArt,
            pets: AllformData.selectedPets,
            general_habits: AllformData.selectedHabbits,
            outdoor_activities: AllformData.selectedActivities,
            travel: AllformData.selectedTravel,
            movies: AllformData.selectedMovies,
            interests_in: AllformData.selectedintrests,
            age: AllformData.age,
            location: AllformData.selectedLocation,
            min_preferred_age: AllformData.min_age,
            max_preferred_age: AllformData.max_age,
            preferred_gender: AllformData.selectedintrests,
            preferred_location: AllformData.selectedPrefferedLocation,
            introduction: AllformData.selectedIntro,
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
    return (
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
                {imageError && (
                    <p className="text-red-500 text-sm">
                        Please Select at Least One Image
                    </p>
                )}
            </fieldset>

     
            <div className="flex flex-col w-full justify-center items-center">
                <fieldset className="mb-2 w-full">
                    <div>
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
                    </div>
                </fieldset>
            </div>

            <div className="flex justify-end w-full flex-wrap mt-6 gap-2">


                <button
                    type="submit"
                    disabled={isButtonDisable}
                    className={`font-semibold py-4 px-6 rounded-full md:text-[15px] md:w-auto w-full text-xs flex justify-center ${isButtonDisable
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
    )
}

export default Form6