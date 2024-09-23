import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import monthsData from "../constants/monthsPath.json"
import MemoryGrid from './MemoryGrid';

const VideoLoader = () => (
  <div className="flex items-center justify-center h-full">
    <div className="loader" style={{
      width: '60px',
      height: '60px',
      border: '10px solid rgba(244, 182, 198, 0.5)',
      borderTop: '10px solid pink',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }}>
      {/* Optional: You can add heart icons or text here */}
      <span className="lovey-dovey-text">💖 Loading...</span>
    </div>
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
                className="text-pink-700 body-font cursor-pointer"
                key={index}
                onClick={() => handleMonthClick(month)}
                onMouseEnter={() => setHoveredMonth(month)}
                onMouseLeave={() => setHoveredMonth(null)}
              >
                <div className="flex justify-center">
                  <div 
                    className="border-2 border-[#d4a373] w-full max-h-64 min-h-48 rounded-lg transform transition duration-500 hover:scale-110 flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(244, 232, 217, 0.5)' }}
                  >
                    {hoveredMonth === month && randomVideo ? (
                      <div
                        className="w-full h-full flex items-center justify-center rounded-lg"
                        style={{
                          backgroundColor: 'rgba(244, 232, 217, 0.5)', // Off-white/cardboardish with half transparency
                          padding: '10px',
                          boxSizing: 'border-box',
                        }}
                      >
                        {loadingVideo && <VideoLoader />} {/* Show loader when loading */}
                        <video
                          src={randomVideo}
                          className={`max-w-full max-h-full rounded-lg ${loadingVideo ? 'hidden' : ''}`} // Hide video when loading
                          style={{ objectFit: 'contain' }}
                          autoPlay
                          loop
                          muted
                          onLoadStart={() => setLoadingVideo(true)} // Set loading to true when video starts loading
                          onCanPlayThrough={() => setLoadingVideo(false)} // Set loading to false when video is ready
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
