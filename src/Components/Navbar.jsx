import React, { useState } from 'react';
import Memories from './Memories';

const Navbar = ({ showNav }) => {
  const [showMemories, setShowMemories] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeMenuState = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMemoriessClick = () => {
    setShowMemories(!showMemories);
    setIsMenuOpen(false); // Close the menu after clicking
  };

  return (
    <div>
      {showNav && (
      <nav className={`sticky top-0 z-50 flex items-center justify-between bg-[#F8F4E3]/60 py-2 shadow-md lg:py-4 md:m-10 ${isMenuOpen ? 'rounded-t-2xl' : 'rounded-2xl'}`}>
        <div className="flex w-full items-center justify-between px-3">
          {/* Mobile menu button */}
          <button
            className={`lg:hidden block border-0 bg-transparent px-2 text-[#8B4513] hover:text-[#A0522D] focus:outline-none`}
            type="button"
            aria-controls="navbarSupportedContent"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation"
            onClick={changeMenuState}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Desktop menu */}
          <div className="hidden lg:flex flex-grow items-center justify-center" id="navbarSupportedContent">
            <ul className="flex space-x-4">
              <li>
                  <button onClick={handleMemoriessClick} className="text-[#8B4513] hover:text-[#A0522D]">
                  Our little Gallery
                </button>
              </li>
              {/* <li><a className="text-[#8B4513] hover:text-[#A0522D]" href="#">Projects</a></li>
              <li><a className="text-[#8B4513] hover:text-[#A0522D]" href="#">About me</a></li>
              <li><a className="text-[#8B4513] hover:text-[#A0522D]" href="#">Testimonials</a></li>
              <li><a className="text-[#8B4513] hover:text-[#A0522D]" href="#">Contact</a></li> */}
            </ul>
          </div>

          {/* Mobile menu dropdown */}
          <div className={`lg:hidden absolute rounded-b-2xl top-10 right-0 w-full bg-[#F8F4E3]/60 shadow-md overflow-hidden transition-[max-height] duration-300 ease-in-out ${isMenuOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
            <ul className="flex flex-col space-y-2 p-4">
              <li>
                <button onClick={handleMemoriessClick} className="text-[#8B4513] hover:text-[#A0522D]">
                  Our little Gallery
                </button>
              </li>
              {/* <li><a className="text-[#8B4513] hover:text-[#A0522D]" href="#">Projects</a></li>
              <li><a className="text-[#8B4513] hover:text-[#A0522D]" href="#">About me</a></li>
              <li><a className="text-[#8B4513] hover:text-[#A0522D]" href="#">Testimonials</a></li>
              <li><a className="text-[#8B4513] hover:text-[#A0522D]" href="#">Contact</a></li> */}
            </ul>
          </div>
        </div>
      </nav>
      )}
      {showMemories && <Memories />}
    </div>
  );
};

export default Navbar;
