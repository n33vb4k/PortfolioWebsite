// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';

const Home = () => {
  // The full text you want to display
  const fullText =
    `
    Hi, I'm Neev Bakshi... 

    `;
  // State to hold the currently displayed text
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    // Create an interval that adds one letter at a time
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + fullText[index]);
      index++;
      if (index === fullText.length-1) {
        clearInterval(interval);
      }
    }, 50); // Adjust speed (in ms) as needed

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl text-indigo-500 font-bold text-centre whitespace-pre-line">
        {displayedText}
      </h1>
    </div>
  );
};

export default Home;