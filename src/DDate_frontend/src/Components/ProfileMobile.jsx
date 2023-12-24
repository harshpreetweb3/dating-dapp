import React from 'react'

const ProfileMobile = () => {
    return (
        <div>
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Your Photos</h3>

                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className={`border-2 rounded-lg p-2 flex justify-center items-center ${index === 0 ? 'border-blue-500' : 'bg-gray-200 border-transparent'}`}>
                            {index === 0 ? (
                                <img
                                    src="path_to_your_image" // Replace with your image path
                                    alt="Profile"
                                    className="rounded-lg object-cover w-full h-full"
                                />
                            ) : (
                                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">

                                    <input type='file' className="hidden" />
                                    <span className="text-gray-500 mt-1">Upload</span>
                                </label>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* responsive form */}
            {/* <div class="p-4 max-w-lg mx-auto bg-white rounded-xl shadow-md">
                <form>
                    <div class="mb-4">
                        <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                        <input type="text" id="gender" name="gender" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" placeholder="Man" />
                    </div>
                    <div class="mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <input type="email" id="email" name="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" placeholder="xyzabc123@gmail.com" />
                    </div>
                    <div class="mb-4">
                        <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
                        <input type="text" id="username" name="username" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" placeholder="XYZ11" />
                    </div>
                    <div class="mb-4">
                        <label for="mobile" class="block text-sm font-medium text-gray-700">Mobile No.</label>
                        <input type="tel" id="mobile" name="mobile" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" placeholder="1234567890" />
                    </div>
                    <div class="mb-4">
                        <label for="dob" class="block text-sm font-medium text-gray-700">DOB</label>
                        <input type="date" id="dob" name="dob" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" />
                    </div>
                    <div class="mb-4">
                        <label for="introduction" class="block text-sm font-medium text-gray-700">My Introduction</label>
                        <textarea id="introduction" name="introduction" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" placeholder="Tell us about yourself..."></textarea>
                    </div>
                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div> */}

            {/* one part ends */}

            <div class="p-4 max-w-lg mx-auto bg-white rounded-xl shadow-md">
                <form>
                    {/* <!-- Gender Field --> */}
                    <div class="flex items-center mb-4">
                        <label for="gender" class="block text-sm font-medium text-gray-700 w-1/3">Gender</label>
                        <input type="text" id="gender" name="gender" class="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" placeholder="Man" />
                    </div>

                    {/* <!-- Email Field --> */}
                    <div class="flex items-center mb-4">
                        <label for="email" class="block text-sm font-medium text-gray-700 w-1/3">Email</label>
                        <input type="email" id="email" name="email" class="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" placeholder="xyzabc123@gmail.com" />
                    </div>

                    {/* <!-- Username Field --> */}
                    <div class="flex items-center mb-4">
                        <label for="username" class="block text-sm font-medium text-gray-700 w-1/3">Username</label>
                        <input type="text" id="username" name="username" class="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" placeholder="XYZ11" />
                    </div>

                    {/* <!-- Mobile Number Field --> */}
                    <div class="flex items-center mb-4">
                        <label for="mobile" class="block text-sm font-medium text-gray-700 w-1/3">Mobile No.</label>
                        <input type="tel" id="mobile" name="mobile" class="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" placeholder="1234567890" />
                    </div>

                    {/* <!-- DOB Field --> */}
                    <div class="flex items-center mb-4">
                        <label for="dob" class="block text-sm font-medium text-gray-700 w-1/3">DOB</label>
                        <input type="date" id="dob" name="dob" class="mt-1 block w-2/3 rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" />
                    </div>

                    {/* <!-- Introduction Field --> */}
                    <div class="mb-4">
                        <label for="introduction" class="block text-sm font-medium text-gray-700">My Introduction</label>
                        <textarea id="introduction" name="introduction" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring focus:border-blue-300" placeholder="Tell us about yourself..."></textarea>
                    </div>


                    <div class="flex justify-end">
                        <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">Submit</button>
                    </div>
                </form>
            </div>

        </div>

    )
}

export default ProfileMobile