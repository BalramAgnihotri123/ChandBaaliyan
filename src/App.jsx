import { useState, useEffect, useRef } from 'react';
import './App.css';

import bgVideo from './assets/bg-photos/bg-video.mp4';
import bgVideoPhone from './assets/bg-photos/bg-video-phone.mp4';
import defaultBgVideo from './assets/bg-photos/default-bg-vid.mp4';
import Navbar from './Components/Navbar';

function App() {
  const [secretCode, setSecretCode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const videoRef = useRef(null); // Reference to the video element

  useEffect(() => {
    const handleResize = () => {
      if (!isUnlocked) {
        videoRef.current.src = defaultBgVideo;
      } else {
        // Change video source based on screen width
        if (window.innerWidth <= 767) {
          videoRef.current.src = bgVideoPhone;
        } else {
          videoRef.current.src = bgVideo;
        }
      }
      videoRef.current.load(); // Reload the video with new source
    };

    // Set initial video source
    handleResize();

    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, [isUnlocked]);

  const handleUnlock = (e) => {
    e.preventDefault();
    const correctCode = import.meta.env.VITE_SECRET_CODE;
    if (secretCode === correctCode) {
      setIsUnlocked(true);
    } else {
      alert('Incorrect code, try again!');
    }
  };

  return (
    <div className="relative h-screen">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        className="video-bg absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        {/* Fallback for browsers that don't support video */}
        Your browser does not support the video tag.
      </video>

      {/* Conditionally render locked or unlocked content */}
      {isUnlocked ? (
        <div className="relative z-10 bg-pink-blur pb-2 bg-center h-full">
          <Navbar showNav={true}/>
          {/* <h1 className="text-4xl text-white">Happy Anniversary!</h1> */}
        </div>
      ) : (
        <div className="locked-screen h-screen flex items-center justify-center bg-offwhite absolute top-0 left-0 w-full z-10">
          <div className="text-center">
            <h1 className="text-3xl mb-4">Enter the Secret Code</h1>
            <form onSubmit={handleUnlock}>
              <input
                type="password"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg"
                placeholder="Secret Code"
              />
              <button
                type="submit"
                className="ml-2 p-2 bg-pink-500 text-white rounded-lg"
              >
                Unlock
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;