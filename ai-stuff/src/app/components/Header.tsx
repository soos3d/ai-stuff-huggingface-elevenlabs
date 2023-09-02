// Import modules
import React from "react";

// Header Component
const Header: React.FC = () => {
  return (
    <nav className="bg-white text-gray-700 shadow-header py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-lg font-semibold">
          <a href="/">AI Stuff</a>
        </div>

        {/* Standard Navigation Links */}
        <ul className="flex space-x-4">
          <li className="hover:bg-orange-200 rounded">
            <a href="/" className="px-4 py-2 block">
              Home
            </a>
          </li>
          <li className="hover:bg-amber-200 rounded">
            <a href="/image-detection" className="px-4 py-2 block">
              Image Identification
            </a>
          </li>
          <li className="hover:bg-lime-200 rounded">
            <a href="/image-generation" className="px-4 py-2 block">
              Image Generation
            </a>
          </li>
          <li className="hover:bg-cyan-200 rounded">
            <a href="/audio-generation" className="px-4 py-2 block">
              Audio from Text
            </a>
          </li>
        </ul>

        {/* Optional: User Profile / Settings Icon */}
        <div>{/* Insert user profile or settings icon here */}</div>
      </div>
    </nav>
  );
};

export default Header;
