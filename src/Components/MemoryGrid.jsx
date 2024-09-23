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
    500: 1,
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl text-white mb-4">{selectedMonth}</h2>
      <button
        onClick={onBack}
        className="mb-4 bg-pink-600 text-white py-2 px-4 rounded"
      >
        Back to Months
      </button>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex"
        columnClassName="my-masonry-grid_column"
      >
        {mixedMemories.map((memory, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-lg group relative"
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
            {memory.type === 'video' && (
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>
            )}
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default MemoryGrid;
