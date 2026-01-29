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
                <div className="absolute top-full mt-2 bg-gray-800 rounded shadow-lg py-2 min-w-[160px] z-10">
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

      {/* Features Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-20 px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">
              Essence
            </p>
            <h2 className="text-white font-black text-5xl md:text-6xl mb-6 tracking-tight">
              THREE THREADS WOVEN<br />THROUGH SILKSONG
            </h2>
            <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
              The kingdom of Pharloom holds secrets written in silk and sung in silence. Three 
              forces shape this world—the princess who carries her burden, the land that 
              breathes with ancient pain, and the song that binds all things together.
            </p>
          </div>

          {/* Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Column 1 - Hornet's Ascension */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <svg 
                  className="w-16 h-16 text-white" 
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path         
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" 
                  />
                </svg>
              </div>
              <h3 className="text-white font-black text-2xl mb-4 tracking-tight">
                HORNET'S<br />ASCENSION
              </h3>
              <p className="text-gray-400 leading-relaxed">
                A warrior bound by duty, ascending through darkness toward an uncertain crown.
              </p>
            </div>

            {/* Column 2 - Pharloom Awaits */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <svg 
                  className="w-16 h-16 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" 
                  />
                </svg>
              </div>
              <h3 className="text-white font-black text-2xl mb-4 tracking-tight">
                PHARLOOM AWAITS
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Vertical kingdoms rise from shadow, each region holding beauty and terror in equal measure.
              </p>
            </div>

            {/* Column 3 - Silk and Song Entwined */}
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <svg 
                  className="w-16 h-16 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
                  />
                </svg>
              </div>
              <h3 className="text-white font-black text-2xl mb-4 tracking-tight">
                SILK AND SONG<br />ENTWINED
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Two forces transform the world—one woven by hands, one carried on the wind.
              </p>
            </div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-4 justify-center">
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full border border-gray-600 transition-colors font-semibold">
              Discover
            </button>
            <button className="bg-transparent hover:bg-gray-800 text-white px-6 py-3 rounded-full border border-gray-600 transition-colors font-semibold flex items-center gap-2">
              Arrow
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}