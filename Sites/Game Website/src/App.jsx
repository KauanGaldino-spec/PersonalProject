import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function GamingHeroSection() {
  return (
    <div className="min-h-screen bg-green-950" style="{{ backgroundcolor: '#1a2e1a' }}">
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-12 py-5">
        {/* Logo */}
        <div className="text-2xl font-bold italic text-white">
          Logo
        </div>
        {/* Center Navigation */}
        <div className="hidden md:flex items-center space-x-10">
          <a href="#" className="text-white text-base hover:opacity-70 transition-opacity">Home Pages</a>
          <a href="#" className="text-white text-base hover:opacity-70 transition-opacity">Games Store</a>
          <a href="#" className="text-white text-base hover:opacity-70 transition-opacity">My account</a>
          <div className="flex items-center text-white text-base hover:opacity-70 transition-opacity">
            More Games
            <ChevronDown className="ml-2 w-4 h-4"/>
          </div>
        </div>

        {/* Right Navigation */}
        <div className="flex items-center space-x-5">
          <button className="text-white text-base hover:opacity-70 transition">
            Login
          </button>
          <button className="bg-white text-green-950 px-6 py-3 rounded-full text-base font-semibold">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex items-center px-12 py-16 gap-20 min-h[70vh]">
        {/* Left Content */}
        <div className="flex-1 max-w-2xl">
          <h1 className="text-6xl font-black leading-tight mb-8 text-whit uppercase tracking-tight">
            DISCOVER YOUR NEXT <br />
            FAVORITE GAME TODAY!
          </h1>

          <p className="text-lg leading-relaxed mb-10 text-white opacity-90 max-w-lg">
            Explore our extensive collection of both digital and physical video games. Don't miss out on the latest promotions and exclusive offers!
          </p>

          <div className="flex gap-5">
            <button className="bg-white text-green-950 px-8 py-4 rounded-full text-base font-semibold hover:bg-white hover:text-green-950 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image Placeholder */}
        <div className="flex-1 max-w-2xl">
          <div className="bg-gray-300 rounded-3xl aspect-square flex items-center justify-center">
            <div className="bg-gray-400 rounded-2xl w-32 h-24 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-500 rounded-full mb-2">
              <div className="w-12 h-3 bg-gray-500 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}