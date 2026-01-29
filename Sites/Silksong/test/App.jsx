import React, { useState } from 'react';

export default function PharloomHero() {
  const [exploreOpen, setExploreOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-600">
      {/* Navigation */}
      <nav className="bg-gray-900 bg-opacity-90 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="text-white text-2xl font-light italic">Logo</div>
          
          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <a href="#about" className="text-white hover:text-gray-300 transition-colors">
              About Silksong
            </a>
            <a href="#world" className="text-white hover:text-gray-300 transition-colors">
              World of Pharloom
            </a>
            <a href="#gallery" className="text-white hover:text-gray-300 transition-colors">
              Gallery
            </a>
            <div className="relative">
              <button 
                onClick={() => setExploreOpen(!exploreOpen)}
                className="text-white hover:text-gray-300 transition-colors flex items-center gap-1"
              >
                Explore
                <svg 
                  className={`w-4 h-4 transition-transform ${exploreOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {exploreOpen && (
                <div className="absolute top-full mt-2 bg-gray-800 rounded shadow-lg py-2 min-w-[160px]">
                  <a href="#lore" className="block px-4 py-2 text-white hover:bg-gray-700">Lore</a>
                  <a href="#characters" className="block px-4 py-2 text-white hover:bg-gray-700">Characters</a>
                  <a href="#music" className="block px-4 py-2 text-white hover:bg-gray-700">Music</a>
                </div>
              )}
            </div>
          </div>
          
          {/* Contact Button */}
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition-colors">
            Contact
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-[calc(100vh-72px)] px-8">
        <div className="text-center max-w-4xl">
          {/* Main Heading */}
          <h1 className="text-white font-bold mb-6">
            <div className="text-6xl md:text-7xl lg:text-8xl mb-2">
              BOUND BY SILK.
            </div>
            <div className="text-6xl md:text-7xl lg:text-8xl">
              GUIDED BY SONG.
            </div>
          </h1>
          
          {/* Subheading */}
          <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Enter the kingdom of Pharloom. A world of quiet beauty and ancient sorrow 
            awaits those who dare to listen.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex gap-4 justify-center">
            <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded font-medium transition-colors">
              Explore
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded font-medium transition-colors">
              Learn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}