import React, { useState } from 'react';
import { ChevronDown, Settings, MessageCircle, Users, Share2 } from 'lucide-react';

export default function ValorantLanding() {
  const [agentsOpen, setAgentsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header/Navigation */}
      <header className="bg-gray-900 border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-6 py-4 ml-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl font-semibold text-white italic">
              Logo
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Home</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">About Us</a>
              <a href="#" className="text-white hover:text-gray-300 transition-colors">Highlights</a>
              <div className="relative">
                <button 
                  onClick={() => setAgentsOpen(!agentsOpen)}
                  className="flex items-center space-x-1 text-white hover:text-gray-300 transition-colors"
                >
                  <span>Agents</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <button className="px-5 py-2 border border-gray-600 hover:border-gray-400 text-white hover:text-gray-300 rounded-full transition-colors">
                Join
              </button>
              <button className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full font-medium transition-colors">
                Explore
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Feature Cards Section */}
      <section className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Gear Setup */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Gear Setup</h3>
                <p className="text-gray-400 text-sm">Join the ultimate Valorant experience today!</p>
              </div>
            </div>

            {/* Contact Us */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Contact Us</h3>
                <p className="text-gray-400 text-sm">Connect with our community and grow together.</p>
              </div>
            </div>

            {/* Join Discord */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Join Discord</h3>
                <p className="text-gray-400 text-sm">Stay updated with our latest streams and news.</p>
              </div>
            </div>

            {/* Follow Us */}
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 mt-1">
                <Share2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-medium text-sm mb-1">Follow Us</h3>
                <p className="text-gray-400 text-sm">Engage with us on social media platforms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Bar */}
      <section className="bg-gray-900 py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-white text-sm">
            Ready to elevate your game?{' '}
            <a href="#" className="text-white underline hover:text-gray-300">Contact Us</a>
          </p>
        </div>
      </section>

      {/* Main Hero Section */}
      <main className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div>
                <h1 className="text-6xl lg:text-7xl font-black leading-tight tracking-tight">
                  <div className="text-white">MASTER</div>
                  <div className="text-white">THE GAME.</div>
                  <div className="text-white">OWN</div>
                  <div className="text-white">EVERY</div>
                  <div className="text-white">ANGLE.</div>
                </h1>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                Precision, teamwork, and raw aim – welcome to the next level of competitive FPS. 
                Join us as we redefine what it means to compete in Valorant.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-full transition-colors">
                  Watch
                </button>
                <button className="px-8 py-3 border border-gray-600 hover:border-gray-500 text-white font-medium rounded-full transition-colors">
                  Join
                </button>
              </div>
            </div>

            {/* Right Content - Image Placeholder */}
            <div className="relative">
              <div className="bg-gray-600 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gray-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Our Journey Section */}
      <section className="bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Logo/Icon */}
              <div className="flex space-x-1">
                <div className="w-8 h-8 border-4 border-white rounded-full"></div>
                <div className="w-8 h-8 border-4 border-white rounded-full -ml-4"></div>
              </div>

              <div>
                <h2 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white">
                  <div>OUR JOURNEY</div>
                  <div>IN</div>
                  <div>COMPETITIVE</div>
                  <div>GAMING</div>
                </h2>
              </div>
              
              <p className="text-gray-300 text-lg leading-relaxed max-w-lg">
                From humble beginnings to elite competition, our team thrives on precision and teamwork. We are dedicated to mastering every angle of the game and pushing the boundaries of what's possible in Valorant.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center space-x-4">
                <button className="px-8 py-3 border border-gray-500 hover:border-gray-400 text-white font-medium rounded-full transition-colors">
                  Learn More
                </button>
                <button className="flex items-center space-x-2 text-white hover:text-gray-300 font-medium transition-colors">
                  <span>Join</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Content - Image Placeholder */}
            <div className="relative">
              <div className="bg-gray-300 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-16 bg-gray-400 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-10 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full mx-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Performance Metrics Section */}
      <section className="bg-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-16">
            <p className="text-gray-400 text-sm mb-4">Stats</p>
            <h2 className="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-8">
              <div>KEY PERFORMANCE</div>
              <div>METRICS FOR</div>
              <div>EVERY PLAYER</div>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-2xl">
              Discover your competitive edge with essential stats. Track your win rate, kill-death ratio, and total hours played to elevate your game.
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid md:grid-cols-3 gap-12 mb-16">
            {/* Win Rate Card */}
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-4">
                  WIN RATE: YOUR PATH TO VICTORY
                </h3>
                <p className="text-gray-400 text-base">
                  Measure your success and improve your strategies.
                </p>
              </div>
            </div>

            {/* Kill-Death Ratio Card */}
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-4">
                  KILL-DEATH RATIO: ASSESS YOUR PERFORMANCE
                </h3>
                <p className="text-gray-400 text-base">
                  A crucial metric for understanding your impact.
                </p>
              </div>
            </div>

            {/* Total Hours Card */}
            <div className="space-y-6">
              <div className="w-12 h-12 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-4">
                  TOTAL HOURS: COMMITMENT TO EXCELLENCE
                </h3>
                <p className="text-gray-400 text-base">
                  Track your dedication and time invested in gameplay.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button className="px-8 py-3 border border-gray-500 hover:border-gray-400 text-white font-medium rounded-full transition-colors">
              Learn More
            </button>
            <button className="flex items-center space-x-2 text-white hover:text-gray-300 font-medium transition-colors">
              <span>Join</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Right Content - Image Placeholder */}
      <div className="relative">
        <div className="bg-gray-300 ">

        </div>

      </div>








    </div>
  );
}