import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function GamingHeroSection() {
  return (
     <div className="min-h-screen bg-green-950" style={{ backgroundColor: '#1a2e1a' }}>
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-12 py-5">
        {/* Logo */}
        <div className="text-2xl font-bold italic text-white">
          Logo
        </div>

        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <a href="#" className="text-white text-base hover:opacity-70 transition-opacity">
            Home Page
          </a>
          <a href="#" className="text-white text-base hover:opacity-70 transition-opacity">
            Game Store
          </a>
          <a href="#" className="text-white text-base hover:opacity-70 transition-opacity">
            My Account
          </a>
          <a href="#" className="flex items-center text-white text-base hover:opacity-70 transition-opacity cursor-pointer">
            More Games
            <ChevronDown className="ml-2 w-4 h-4" />
          </a>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-5">
          <button className="text-white text-base hover:opacity-70 transition-opacity">
            Login
          </button>
          <button className="bg-white text-green-950 px-6 py-3 rounded-full text-base font-semibold hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex items-center px-12 py-12 gap-20 min-h-[70vh]">
        {/* Left Side - Text Content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-6xl font-black leading-tight mb-8 text-white uppercase tracking-tight">
            DISCOVER YOUR NEXT <br />
            FAVORITE GAME TODAY!
          </h1>

          <p className="text-lg leading-relaxed mb-10 text-white opacity-90 max-w-lg">
            Explore our extensive collection of both digital and physical video games. Don't miss out on the latest promotions and exclusive offers!
          </p>

          <div className="flex gap-5">
            <button className="bg-white text-green-950 px-8 py-4 rounded-full text-base font-semibold hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full text-base font-semibold hover:transform hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="flex-1 max-w-2xl"> 
          <div className="bg-gray-300 rounded-3xl aspect-square flex items-center justify-center">
            <div className="bg-gray-400 rounded-2xl w-32 h-24 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-12">
          {/* Section Title */}
          <h2 className="text-5xl font-black text-white text-center mb-20 uppercase tracking-tight leading-tight">
            EXPLORE A VAST SELECTION OF GAMES FOR EVERY TYPE OF GAMER
          </h2>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 - Secure Payment*/}
            <div className="text-center">
              {/* Image Placeholder */}
              <div className="bg-gray-300 rounded-3xl aspect-[4/3] mb-8 flex items-center justify-center">
                <div className="bg-gray-400 rounded-2xl w-16 h-12 flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                SECURE PAYMENT OPTIONS
              </h3>
              <p className="text-white opacity-80">
                Fast and secure transactions ensure a worry-free shopping experience.
              </p>
            </div>
            
            {/* Feature 2 - User-Friendly */}
            <div className="text-center">
              <div className="bg-gray-300 rounded-3xl aspect-[4/3] mb-8 flex items-center justify-center">
                <div className="bg-gray-400 rounded-2xl w-16 h-12 flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                SEAMLESS EXPERIENCE
              </h3>
              <p className="text-white opacity-80">
                Find your favorite games quickly with our intuitive interface.
              </p>
            </div>

            {/* Feature 3 - Updates */}
            <div className="text-center">
              <div className="bg-gray-300 rounded-3xl aspect-[4/3] mb-8 flex items-center justify-center">
                <div className="bg-gray-400 rounded-2xl w-16 h-12 flex items-center justify-center">
                  <div className="w-6 h-6 bg-gray-500 rounded-full"></div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                LATEST UPDATES
              </h3>
              <p className="text-white opacity-80">
                Stay informed about new releases and exclusive promotions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}