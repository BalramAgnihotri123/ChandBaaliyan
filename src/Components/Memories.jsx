import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import monthsData from "../constants/monthsPath.json";
import MemoryGrid from './MemoryGrid';


const VideoLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="loader" style={{
      width: '60px',
      height: '60px',
      border: '6px solid rgba(244, 182, 198, 0.7)', // Off-white base
      borderTop: '6px solid pink', // Pink color on top
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}>
      <span className="lovey-dovey-text" style={{ color: 'pink', marginTop: '8px' }}></span>
    </div>

    {/* CSS for spinning animation */}
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);


const settings = {
  dots: true,
  infinite: true,
  speed: 600,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
};

const Memories = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [hoveredMonth, setHoveredMonth] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(true);
  
  const months = [
    "October 2023", "November 2023", "December 2023",
    "January 2024", "February 2024", "March 2024",
    "April 2024", "May 2024", "June 2024",
    "July 2024", "August 2024", "September 2024"
  ];

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };
  
  const handleBack = () => {
    setSelectedMonth(null);
  };

  return (
    <div className="h-screen overflow-y-scroll p-4 pb-20">
      {!selectedMonth ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {months.reverse().map((month, index) => {
            const images = monthsData[month]?.images || [];
            const videos = monthsData[month]?.videos || [];
            const randomVideo = videos.length > 0 ? videos[Math.floor(Math.random() * videos.length)] : null;

            return (
              <section
                className="text-pink-700 body-font cursor-pointer relative"
                key={index}
                onClick={() => handleMonthClick(month)}
                onMouseEnter={() => setHoveredMonth(month)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                <div className="flex justify-center">
                <div 
                  className="border-2 border-[#d4a373] w-full max-h-64 min-h-48 rounded-lg transform transition duration-500 hover:scale-110 flex items-center justify-center"
                  style={{ 
                    backgroundColor: 'rgba(255, 228, 225, 0.9)', // Very light pink with hints of off-white
                    boxShadow: '0 0 20px rgba(255, 105, 180, 0.8), 0 0 40px rgba(255, 182, 193, 0.6)' // Enhanced pink glow effect
                  }}
                >
                    {/* Month name with torn paper aesthetic and repositioned */}
                    <div className="absolute top-2 left-2 transform -rotate-12 z-10">
                      <div className="bg-[#f4e8d9] p-2 rounded-lg border-2 border-[#d4a373] shadow-lg" style={{ 
                        background: 'linear-gradient(145deg, #f4e8d9, #e3c5b7)',
                        boxShadow: '6px 6px 12px rgba(209, 177, 162, 0.7), -6px -6px 12px #ffffff', // Glow effect
                        transform: 'rotate(-12deg)', 
                      }}>
                        <span className="text-pink-700 font-bold text-xl">
                          {month}
                        </span>
                      </div>
                    </div>

                    {hoveredMonth === month && randomVideo ? (
                      <div
                        className="w-full h-full flex items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: 'rgba(244, 232, 217, 0.5)', 
                          padding: '10px',
                          boxSizing: 'border-box',
                        }}
                      >
                        {loadingVideo && <VideoLoader />}
                        <video
                          src={randomVideo}
                          className={`max-w-full max-h-full rounded-lg ${loadingVideo ? 'hidden' : ''}`} 
                          style={{ objectFit: 'contain' }}
                          autoPlay
                          loop
                          muted
                          onCanPlay={() => setLoadingVideo(false)} 
                          onLoadStart={() => setLoadingVideo(true)} 
                          onWaiting={() => setLoadingVideo(true)} 
                          onPlaying={() => setLoadingVideo(false)} 
                        />
                      </div>
                    ) : (
                      <Slider {...settings} className="w-full h-64">
                        {images.map((image, imgIndex) => (
                          <div key={imgIndex} className="flex justify-center items-center h-60 overflow-hidden">
                            <div className="flex items-center justify-center h-60 rounded-2xl">
                              <img
                                src={image}
                                alt={`memory-${month}-${imgIndex}`}
                                className="rounded-2xl object-contain w-full h-60"
                                style={{
                                  marginTop: '1rem',
                                  backgroundPosition: "left top",
                                  backgroundRepeat: "repeat"
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </Slider>
                    )}
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <MemoryGrid selectedMonth={selectedMonth} onBack={handleBack} /> 
      )}
    </div>
  );
};

export default Memories;
