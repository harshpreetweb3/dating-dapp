

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import createAccountImage from "../../../assets/Images/CreateAccount/createAccountImage.png";

const CreateAccount4 = () => {
  const navigate = useNavigate();

  const [selectedArt, setSelectedArt] = useState('');
  const [selectedPets, setSelectedPets] = useState('');
  const [selectedHabbits, setSelectedHabbits] = useState('');
  const [selectedActivities, setSelectedActivies] = useState('');
  const [selectedMovies, setSelectedMovies] = useState('');
  const [selectedTravel,setSelectedTravel]=useState('')


  const backpageHandler = () => {
    navigate('/CreateAccount3');
  };

  const nextPageHandler = () => {
    navigate('/CreateAccount5');
  };

  const handleartSelect = (value) => {
    setSelectedArt(value);
  };

  const handlepetsSelect = (value) => {
    setSelectedPets(value);
  };

  const handlehabbitsSelect = (value) => {
    setSelectedHabbits(value);
  };

  const  handleactivitiesSelect= (value) => {
    setSelectedActivies(value);
  };

  const handlemoviesSelect = (value) => {
    setSelectedMovies(value);
  };

  const handletravelSelect=(value)=>{
    setSelectedTravel(value)
  }

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
       
            {/* art Selection */}
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">Art & Culture (select any 2)</legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-4 py-2 px-2 rounded-3xl">
                {['Drawing', 'Visiting Museum', 'Art Gallery','Craft','Decorative','Music concert'].map((art) => (
                  <button
                    key={art}
                    type="button"
                    onClick={() => handleartSelect(art)}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      selectedArt === art
                        ? 'bg-yellow-500 text-black'
                        : 'bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black'
                    }`}
                  >
                    {art}
                  </button>
                ))}
              </div>
            </fieldset>


            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">Pets</legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
                {['Dogs', 'Cats', 'Birds','Others'].map((pets) => (
                  <button
                    key={pets}
                    type="button"
                    onClick={() => handlepetsSelect(pets)}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      selectedPets === pets
                        ? 'bg-yellow-500 text-black'
                        : 'bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black'
                    }`}
                  >
                    {pets}
                  </button>
                ))}
              </div>
            </fieldset>

           
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-2 text-white md:text-black">General Habbits</legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
                {['Early rise', 'lazy', 'Night owl','Activ'].map((habbits) => (
                  <button
                    key={habbits}
                    type="button"
                    onClick={() => handlehabbitsSelect(habbits)}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      selectedHabbits === habbits
                        ? 'bg-yellow-500 text-black'
                        : 'bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black'
                    }`}
                  >
                    {habbits}
                  </button>
                ))}
              </div>
            </fieldset>


            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">Outdoor Activities</legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
                {['Hiking', 'Trekking', 'Fishing', 'Skiing','Hiking','Trekking','Rafting','Biking','Camping','Hunting','Hiking'].map((activities) => (
                  <button
                    key={activities}
                    type="button"
                    onClick={() => handleactivitiesSelect(activities)}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      selectedActivities === activities
                        ? 'bg-yellow-500 text-black'
                        : 'bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black'
                    }`}
                  >
                    {activities}
                  </button>
                ))}
              </div>
            </fieldset>


            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">Movies</legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
                {['Animated', 'Action', 'Comedy', 'Crime','Romantic','Horror','Thriller','Documentary','War','Film noir'].map((movies) => (
                  <button
                    key={movies}
                    type="button"
                    onClick={() => handlemoviesSelect(movies)}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      selectedMovies === movies
                        ? 'bg-yellow-500 text-black'
                        : 'bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black'
                    }`}
                  >
                    {movies}
                  </button>
                ))}
              </div>
            </fieldset>
 
            <fieldset className="mb-2">
              <legend className="block text-lg font-semibold mb-1 text-white md:text-black">Travel</legend>
              <div className="flex flex-wrap gap-2 md:gap-2 mb-2 py-2 px-2 rounded-3xl">
                {['Mountains', 'Beach', 'Adventure', 'Wonderlust','Exploring cuisines'].map((travel) => (
                  <button
                    key={travel}
                    type="button"
                    onClick={() => handletravelSelect(travel)}
                    className={`inline-block px-3 py-2 rounded-full text-sm focus:outline-none transition duration-300 ${
                      selectedTravel === travel
                        ? 'bg-yellow-500 text-black'
                        : 'bg-transparent hover:bg-yellow-500 hover:text-black text-white md:text-black border border-white md:border-black'
                    }`}
                  >
                    {travel}
                  </button>
                ))}
              </div>
            </fieldset>

            


            {/* Form Buttons */}
            <div className="flex justify-between mt-6">
              <button type="button" className="bg-transparent text-white md:text-black font-semibold py-2 px-4 rounded hover:bg-gray-400 border border-white md:border-black" onClick={backpageHandler}>Back</button>
              <button type="button" className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600" onClick={nextPageHandler}>Next</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount4;
