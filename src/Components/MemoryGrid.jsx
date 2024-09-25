import React, { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import monthsData from "../constants/monthsPath.json";

const MemoryGrid = ({ selectedMonth, onBack }) => {
  const { images, videos } = monthsData[selectedMonth] || { images: [], videos: [] };
  const [mixedMemories, setMixedMemories] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    // Mix images and videos randomly
    const mixed = [
      ...images.map(img => ({ type: 'image', src: img })),
      ...videos.map(vid => ({ type: 'video', src: vid })),
    ];
    setMixedMemories(mixed.sort(() => Math.random() - 0.5));
  }, [images, videos, selectedMonth]);

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 2,
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="bg-[#f8f4e3] rounded-lg p-6 w-full max-w-7xl shadow-[0_0_20px_rgba(255,105,180,0.8),0_0_40px_rgba(255,182,193,0.6)]">
        <h2 className="text-5xl text-gray-800 font-semibold text-center mb-6">
          {selectedMonth}
        </h2>
        <button
          onClick={onBack}
          className="mb-4 bg-[#f8f4e3] text-gray-800 py-2 px-4 rounded shadow transition duration-300 hover:bg-[#e0d9c1]"
        >
          Back to Months
        </button>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex p-3"
          columnClassName="my-masonry-grid_column"
        >
          {mixedMemories.map((memory, index) => (
            <div
              key={index}
              className={`bg-[#f8f4e3] p-2 rounded-lg overflow-hidden group relative transition-transform duration-300 shadow-lg ${
                hoveredIndex === index ? 'scale-110 brightness-110 shadow-[0_0_20px_rgba(255,105,180,0.8),0_0_40px_rgba(255,182,193,0.6)]' : 'shadow-none'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {memory.type === 'image' ? (
                <img
                  src={memory.src}
                  alt={`Memory ${selectedMonth} ${index}`}
                  className="w-full h-auto rounded-lg object-cover"
                />
              ) : (
                <video
                  className="w-full h-auto rounded-lg object-cover"
                  autoPlay
                  loop
                  muted={hoveredIndex !== index} // Unmute only the hovered video
                >
                  <source src={memory.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default MemoryGrid;
