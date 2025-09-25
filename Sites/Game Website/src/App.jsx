import React from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

export default function CompleteGamingWebsite() {
  return (
    <div className="min-h-screen bg-green-950" style={{ backgroundColor : '#1a2e1a' }}>
      {/* Navigation Bar */}
      <nav className="flex justify-between items-center px-12 py-5">
        {/* Logo */}
        <div className="text-2xl font-bold italic text-white">
          Logo
        </div>

        {/* Center Navigation */}
         <div className="hidden md:flex items-center space-x-10">
          <a href="#" className="text-white text-base hover:opacity-70 transition-opacity">Home Page</a>
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
          <button className="bg-white text-green-950 px-6 py-3 rounded-full text-base font-semibold hover:tranform hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Hero Section */}
       <div className="flex items-center px-12 py-16 gap-20 min-h-[70vh]">
        {/* Left Side - Text Content */}
         <div className="flex-1 max-w-2xl">
            <h1 className="text-6xl font-black leading-tight mb-8 text-white uppercase tracking-tighter">
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
        <div className="flex-1 max-w-2xl hidden md:block"> 
          <div className="bg-gray-300 rounded-3xl aspect-square flex items-center justify-center">
            <div className="bg-gray-400 rounded-2xl w-32 h-24 flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
            </div>
          </div>
        </div>
       </div>

      {/* Fifth Section - Join Gaming Community */}
       <div className="py-32 style={{ backgroundColor: '#1a2e1a' }}>">
          <div className="grid md:grid-cols-2 gap-20 items-center">
             {/* Left Content */}
              <div>
                 <h2 className="text-6xl font-black text-white mb-12 uppercase tracking-tight leading-tight">
                    JOIN OUR GAMING COMMUNITY <br />
                    TODAY
                 </h2>
              </div>

              {/* Right Content */}
              <div>
                 <p className="text-white text-lg leading-relaxed mb-8 opacity-90">
                      Stay updated with the latest game releases and exclusive offers. Subscribe to our newsletter for tailored content just for you!s
                 </p>

              {/* Email Signup Form */}
               <div className="flex gap-4 mb-6">
                  <input 
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 bg-gray-800 border border-gray-700 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  />
                  <button className="bg-white text-green-950 px-8 py-4 rounded-full text-base font-semibold hover:transform hover:-translate-y-1 hover:shadow-lg transition-all duration-300 whitespace-nowrap">
                    Sign up
                  </button>
               </div>




              </div>



          </div>
       </div>




    </div>
  );
}