import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";

const CreateAccount5 = () => {

  const navigate = useNavigate();

  const [selectedintrests, setSelectedintrests] = useState('');
  const [selectedpreferAge, setSelectedpreferAge] = useState('');
  const [selectedIntro, setSelectedIntro] = useState('');


  const backpageHandler = () => {
    navigate('/CreateAccount4');
  };

  const nextPageHandler = () => {
    navigate('/');
  };

  const handleintrestsSelect = (value) => {
    setSelectedintrests(value);
  };

  const handlepreferAgeSelect = (value) => {
    setSelectedpreferAge(value);
  };

  const handleIntroSelect = (value) => {
    setSelectedIntro(value);
  };


  return (
    <div className="flex w-full h-screen md:flex-row">
    {/* Image container for larger screens */}
    <div className="w-full md:w-1/2 h-full absolute md:relative bg-cover bg-center z-0" style={{ backgroundImage: `url(${createAccountImage})` }}>
     
    <div className="hidden md:flex md:flex-col md:justify-center md:text-center md:items-center md:absolute md:inset-0 px-8 py-12">
  <div className="w-full max-w-xl mx-auto text-left">
    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Create Your</h1>
    <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">account here</h2>
    <p className="text-white text-bold md:text-2xl">Welcome ..</p>
    <p className="text-white font-light md:text-xl">Complete Your Profile Here.</p>
    <p className="text-white font-extralight md:text-lg">Tell us about yourself and let us help you finding the perfect match</p>
    <p className='italic text-yellow-700 md:text-lg'>Good Luck!</p>
  </div>
</div>
     
      {/* Image Overlay for smaller screens */}
      <div className="w-full h-full bg-black opacity-50 md:opacity-0"></div>
    </div>

    {/* Form container */}
    <div className="w-full md:w-1/2 flex flex-col items-center justify-start px-4 md:px-12 z-10 overflow-y-auto">
      <div className="w-full max-w-md my-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white md:text-black text-center">Allow us to know you</h2>
        <div className="border-t-2 border-dotted md:border-black border-white w-full mt-4 mb-4"></div>

        <form className="w-full max-w-lg rounded-lg p-6 shadow-md md:bg-transparent md:shadow-none" onSubmit={e => e.preventDefault()}>
       
            {/* intrests Selection */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">Your intrests in</legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 px-2 rounded-3xl">
                {['Men', 'Women', 'All'].map((intrests) => (
                  <button
                    key={intrests}
                    type="button"
                    onClick={() => handleintrestsSelect(intrests)}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      selectedintrests === intrests
                        ? 'bg-yellow-500 text-black'
                        : 'bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black'
                    }`}
                  >
                    {intrests}
                  </button>
                ))}
              </div>
            </fieldset>


            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">Preffered age</legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
                {['18-20', '20-25', '25-30','above 30'].map((preferAge) => (
                  <button
                    key={preferAge}
                    type="button"
                    onClick={() => handlepreferAgeSelect(preferAge)}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      selectedpreferAge === preferAge
                        ? 'bg-yellow-500 text-black'
                        : 'bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black'
                    }`}
                  >
                    {preferAge}
                  </button>
                ))}
              </div>
            </fieldset>

           
    <div className="flex flex-col md:flex-row md:space-x-4 mb-6">
      <div className="flex-1 mb-4 md:mb-0">
        <label htmlFor="text" className="block text-lg font-semibold mb-1 text-white md:text-black">Introduce yourself</label>
        <textarea 
          type="text" 
          id="text" 
          name="intro"
          value={selectedIntro}
          onChange={(e) => handleIntroSelect(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-white md:border-black bg-transparent text-white md:text-black "
        />
      </div>
      </div>


         

            {/* Form Buttons */}
            <div className="flex justify-between mt-6">
              <button type="button" className="bg-transparent text-white md:text-black font-semibold py-2 px-4 rounded hover:bg-gray-400 border border-white md:border-black" onClick={backpageHandler}>Back</button>
              <button type="button" className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600" onClick={nextPageHandler}>Save and Start</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount5;
