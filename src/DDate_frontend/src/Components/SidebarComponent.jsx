import React from 'react';

const SidebarComponent = () => {
  return (
    <aside className="w-64 bg-brown-600 h-screen text-white" aria-label="Sidebar">
      <div className="py-4 px-3 bg-brown-600 rounded">
        <div className="flex items-center space-x-2 mb-5">
          <img
            className="h-12 w-12 rounded-full"
            src="/path/to/your/profile.jpg" // Replace with your actual profile image path
            alt="Profile avatar"
          />
          <span className="font-bold">DDATE</span>
        </div>
        <ul className="space-y-2">
          <li>
            <a href="#" className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-brown-700">
              <span className="ml-3">My Profile</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-brown-700">
              <span className="ml-3">Notifications</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center p-2 text-base font-normal rounded-lg hover:bg-brown-700">
              <span className="ml-3">Messages</span>
            </a>
          </li>
          <li>
            <span className="flex items-center p-2 text-base font-normal rounded-lg bg-yellow-300 text-brown-600">
              <span className="ml-3">Filter</span>
            </span>
          </li>
          {/* Add other sections with similar structure */}
          {/* ... */}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarComponent;
