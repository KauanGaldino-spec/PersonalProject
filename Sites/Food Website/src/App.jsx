import React from 'react';
import { ChevronDown } from 'lucide-react';

const CulinaryWebsite = () => {
  return (
    <div className="min-h-screen bg-gray-600 text-white">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-800">
        {/* Logo */}
          <div className="text-white text-2xl font-bold italic">
            Logo
          </div>

          {/* Navigation Menu */}
          <div className="flex items-center space-x-5">
              <a href="#" className="text-white hover:text-gray-300 transition-color">
                Home Page
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-color">
                Recipes Page
              </a>
              <a href="#" className="text-white hover:text-gray-300 transition-color">
                Healthy Tips
              </a> 
              <div className="relative group">
                <button className="flex items-center text-white hover:text-gray-300 transitions-colors">
                  More Info
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </div>
              <button className="px-4 py-2 bg-transparent border border-white rounded-full hover:bg-white hover:text-gray-800 transition-all">
                Join
              </button>
              <button className="px-4 py-2 bg-white text-gray-800 rounded-full  hover:bg-gray-200 transition-all">
                Explore
              </button>
          </div>
      </nav>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center text-center px-6 py-20 min-h-[calc(100vh-80px)]">
          {/* Hero Title */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight mb-8 max-w-5xl">
            DISCOVER THE
            <br />
            WORLD OF
            <br />
            DELICIOUS
            <br />
            CUISINES
          </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
          Welcome to your culinary adventure! Explore vibrant recipes and tips that celeberate the joy of cooking and healthy eating.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-4">
          <button className="px-8 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all">
            Get Started
          </button>
          <button className="px-8 py-3 bg-transparent border border-white text-white rounded-full hover:bg-white hover:text-gray-800 transition-all">
            Subscribe
          </button>
        </div>
      </main>
    </div>
  )
}

export default CulinaryWebsite;