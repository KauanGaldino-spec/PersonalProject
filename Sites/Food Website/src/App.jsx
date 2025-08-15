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
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight mb-8 max-w-5xl ml-9">
            DISCOVER THE
            <br />
            WORLD OF
            <br />
            DELICIOUS
            <br />
            CUISINES
          </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed ml-9">
          Welcome to your culinary adventure! Explore vibrant recipes and tips that celebrate the joy of cooking and healthy eating.
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
                <h3 className="text-xl font-bold uppercase mb-3 ml-9">
                  ITALIAN DELIGHTS 
                </h3>
                <p className="text-gray-300 leading-relaxed ml-9">
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

      {/* Features Section 2 */}
      <section className="bg-gray-900 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
          {/* Section Header */}
          <div className="mb-16">
            <p className="text-gray-400 text-lg mb-4">Delicious</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-6 text-white">
              EXPLORE OUR
              <br />
              FEATURES FOR A
              <br />
              HEALTHIER LIFESTYLE
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Discover pratical tips for healthy eating that fit your lifestyle. Our expert advice will help you make nutritious choices every day.
            </p>
          </div>

          {/* Features Grid 2 */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {/* Feature 1 */}
              <div className="text-center">
                  {/* Gift Icon */}
                  <div className="mb-6">
                      <svg className="w-12 h-12 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                    </svg>
                  </div>
                  <h3 className="text-5xl font-bold uppercase mb-4 text-white leading-tight">
                    SAVOR THE
                    <br />
                    FLAVORS OF
                    <br />
                    SEASONAL
                    <br />
                    INGREDIENTS
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Enjoy dishes that celebrate the best of each season.
                  </p>
              </div>
              
              {/* Feature 2 */}
               <div className="text-center">
                  {/* Monitor/Cooking Icon */}
                  <div className="mb-6">
                    <svg className="w-12 h-12 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-5xl font-bold uppercase mb-4 text-white leading-tight">
                    MASTER
                    <br />
                    ESSENTIAL
                    <br />
                    TECHNIQUES
                    <br />
                    WITH EASE
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Learn valuable skills to elevate your culinary creations.
                  </p>
               </div>

               {/* Feature 3 */}
                <div className="text-center">
                  {/* Community/Rings Icon */}
                  <div className="mb-6">
                    <svg className="w-12 h-12 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                    <circle cx="12" cy="12" r="8" strokeWidth={1.5} />
                    </svg>
                  </div>
                  <h3 className="text-5xl font-bold uppercase mb-4 text-white leading-tight">
                    JOIN OUR
                    <br />
                    COMMUNITY OF FOOD ENTHUSIASTS  
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Connect with others who share your passion for food.
                  </p>
                </div>
            </div>

            {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="px-8 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all">
                  Subscribe
                </button>
                <button className="flex items-center text-white hover:text-gray-300 transition-colors">
                  Learn More
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
           </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-900 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-12">
            <p className="text-gray-400 text-sm mb-2 ml-9">Blog</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-white mb-4 ml-9">
              COOKING TIPS &
              <br />
              INSIGHTS
            </h2>
            <p className="text-gray-300 text-lg ml-9">
              Explore our latest cooking tips and food trends.
            </p>
          </div>

          { /* Blog Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
             {/* Card 1 */}
              <div className="bg-gray-800 rounded-lg overflow-hidden ml-9">
                {/* Image Placeholder */}
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                      <div className="w-16 h-12 bg-gray-400 rounded flex items-center justify-center">
                         <svg className="w-8 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                         <path d="M9 21h6l-3-8-3 8zM5.5 13l2.5 8h2l-2.5-8h-2zm13 0h-2l-2.5 8h2l2.5-8z"/>
                        <circle cx="7.5" cy="6.5" r="1.5"/>
                        </svg>
                     </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <p className="text-gray-400 text-sm mb-2">Tips</p>
                    <h3 className="text-xl font-bold uppercase text-white mb-3">
                      MASTERING THE
                      <br />
                      ART OF COOKING
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Discover the essential techniques to elevate your culinary skills.
                    </p>

                    {/* Author Info */}
                     <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">JD</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          <span className="text-white">John Doe</span>
                          <br />
                          11 Jan 2022 • 5 min read
                        </div>
                     </div>
                  </div>
              </div>

              {/* Card 2 */}
                <div className="bg-gray-800 rounded-lg overflow-hidden ml-9">
                  {/* Image Placeholder */}
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                        <div className="w-16 h-12 bg-gray-400 rounded-flex items-center justify-center">
                            <svg className="w-8 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M9 21h6l-3-8-3 8zM5.5 13l2.5 8h2l-2.5-8h-2zm13 0h-2l-2.5   8h2l2.5-8z"/>
                            <circle cx="7.5" cy="6.5" r="1.5"/>
                           </svg>
                        </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                        <p className="text-gray-400 text-sm mb-2">Advice</p>
                        <h3 className="text-xl font-bold uppercase text-white mb-3">
                          HEALTHY EATING
                          <br />
                          MADE EASY
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                          Simple tips for a balanced and nutritious diet.
                        </p>

                    {/* Author Info */}
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-xs font-bold">JS</span>
                        </div>
                        <div className="text-xs text-gray-400">
                          <span className="text-white">Emily Johnson</span>
                          <br />
                          20 Jan 2025 • 5 min read
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-gray-800 rounded-lg overflow-hidden ml-9">
                    {/* Image Placeholder */}
                    <div className="h-64 bg-gray-200 flex items-center justify-center">
                       <div className="w-16 h-12 bg-gray-400 rounded flex items-center justify-center">
                          <svg className="w-8 h-6 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 21h6l-3-8-3 8zM5.5 13l2.5 8h2l-2.5-8h-2zm13 0h-2l-2.5 8h2l2.5-8z"/>
                          <circle cx="7.5" cy="6.5" r="1.5"/>
                          </svg>
                       </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6"> 
                        <p className="text-gray-400 text-sm mb-2">Trends</p>
                        <h3 className="text-xl font-bold uppercase text-white mb-3">
                          TOP FOOD TRENDS
                          <br />
                          OF 2022
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                           Stay ahead with the latest culinary trends and innovations.
                        </p>

                        {/* Author Info */}
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                               <span className="text-white text-xs font-bold">EJ</span>
                            </div>
                            <div className="text-xs text-gray-400">
                              <span className="text-white">Emily Johnson</span>
                              <br />
                              20 Jan 2022 • 6 min read
                            </div>
                        </div>
                    </div>
                </div>
            
                {/* View All Button */}
                </div>
                <div className="flex justify-end">
                  <button className="px-5 py-2 bg-gray-700 text-white rounded-full mt-10">
                      View All
                  </button>
            </div>
         </div>
      </section>

      {/* Seasonal Dishes Section */}
       <section className="bg-gray-900 px-6 py-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-white">
              {/* Main Title */}
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-6">
                DISCOVER THE BEST
                <br />
                TREDING DISHES TO
                <br />
                SAVOR TODAY!
              </h2>

              {/* Description */}
               <p className="text-gray-300 text-lg mb-12 leading-relaxed max-w-lg">
                  Explore our curated selection of seasonal favorites that celebrate fresh ingredients. From vibrant salads to hearty stews, there's something for every palate!
               </p>

             {/* Seasonal Categories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-4xl md:text-5xl font-bold uppercase mb-4 text-white leading-tight">
                      SUM
                      <br />
                      MER
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Refreshing watermelon salad with mind and feta.
                  </p>
                </div>
                 <div>
                    <h3 className="text-4xl md:text-5xl font-bold uppercase mb-4 text-white leading-tight">
                      FALL
                    </h3>
                    <p className="text-gray-300 leading-relaxed">
                      Savory pumpkin soup with a hint spice.
                    </p>
                 </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-lg h-96 bg-gray-200 rounded-2xl flex items-center justify-center">
                  {/* Food Image Placeholder */}
                  <div className="w-20 h-16 bg-gray-400 rounded-lg flex items-center justify-center">
                    <svg className="w-12 h-10 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                </div>
             </div>
          </div>
       </section>









    </div>
  )
}

export default CulinaryWebsite;