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

      {/* Features Section */}

      <section className="bg-gray-900 px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            {/* Main Title */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-6 ml-8"> 
              EXPLORE A WORLD
              <br />
              OF FLAVORS:
              <br />
              DISCOVER GLOBAL
              <br />
              RECIPES
            </h2>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-12 leading-relaxed max-w-md ml-8">
              Dive into a culinary adventure with our diverse selection of cuisines. From spicy street food to elegant fine dining, there's something to tantalize every palate.
            </p>


            {/* Cuisine Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold uppercase mb-3 ml-8">
                  ITALIAN DELIGHTS 
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Savor the rich flavors of Italy with our authentic pasta and pizza recipes.
                </p>
              </div>
              <div>
               <h3 className="text-xl font-bold uppercase mb-3 mr-5">
                 ASIAN FUSION
               </h3>
               <p className="text-gray-300 leading mr-5">
                 Experience the harmony of flavors in our innovative Asian-inspired dishes.
               </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
              {/* Mountain Icon */}
                  <svg className="w-10 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 21h6l-3-8-3 8zM5.5 13l2.5 8h2l-2.5-8h-2zm13 0h-2l-2.5 8h2l2.5-8z"/>
                  <circle cx="7.5" cy="6.5" r="1.5"/>
                </svg>
            </div>
          </div>
        </div>
      </section>










    </div>
  )
}

export default CulinaryWebsite;