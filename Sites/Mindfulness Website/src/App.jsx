import { useState } from 'react';
import { ChevronDown, Image } from 'lucide-react';

// Webflow Icon Component
const WebflowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.5 2L17.5 22H14L11.5 8L9 22H5.5L10.5 2H12.5Z"/>
    <path d="M18.5 2L22 12L19 22H16L18.5 8L16 22H13L15.5 2H18.5Z"/>
  </svg>
);

export default function MindfulnessLanding() {
  const [isTestimonialsOpen, setIsTestimonialsOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#2d3a2f' }}>
      {/* Navigation */}
      <nav className="flex items-center justify-between px-12 py-6">
        <div className="text-white text-xl font-bold italic">
          Logo
        </div>
        
        <div className="flex items-center space-x-8">
          <a href="#" className="text-white text-sm">Home</a>
          <a href="#" className="text-white text-sm">Benefits</a>
          <a href="#" className="text-white text-sm">Sessions</a>
          
          <div className="relative">
            <button 
              onClick={() => setIsTestimonialsOpen(!isTestimonialsOpen)}
              className="flex items-center text-white text-sm"
            >
              Testimonials
              <ChevronDown className="ml-1 h-3 w-3" />
            </button>
          </div>
          
          <button className="border border-gray-500 text-white text-sm px-6 py-2 rounded">Learn</button>
          
          <button className="bg-yellow-400 text-black px-6 py-2 rounded text-sm font-semibold ml-2">
            Sign Up
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex items-start px-12 mt-20">
        {/* Left Content */}
        <div className="w-1/2 pr-12">
          <h1 className="text-white font-black leading-none mb-8" style={{ fontSize: '5.5rem', letterSpacing: '-0.02em' }}>
            EMBRACE<br />
            CALMN<br />
            ESS —<br />
            BREATHE,<br />
            RELAX,<br />
            RENEW
          </h1>
          
          <p className="text-gray-300 text-base leading-relaxed mb-10 max-w-md">
            Your journey to mindfulness begins with guided breathing, 
            gentle meditations, and mindful moments. Discover the peace 
            within and transform your daily routine.
          </p>
          
          <div className="flex gap-6">
            <button className="bg-yellow-400 text-black px-6 py-3 text-sm font-bold">
              Begin
            </button>
            <button className="border border-gray-500 text-white px-6 py-3 text-sm font-bold">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Content - Image Placeholder */}
        <div className="w-1/2 flex justify-center">
          <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
            {/* Image placeholder icon */}
            <div className="w-16 h-12 bg-gray-400 rounded flex items-center justify-center">
              <div className="w-8 h-6 bg-gray-500 rounded-sm flex items-center justify-center relative">
                <div className="w-2.5 h-2.5 bg-white rounded-full absolute top-1 left-1"></div>
                <div className="w-5 h-2.5 bg-white absolute bottom-0.5 left-1 clip-triangle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="px-12 py-20 text-center">
        <p className="text-gray-300 text-sm mb-6">Features</p>
        
        <h2 className="text-white font-black text-5xl leading-tight mb-8">
          EXPLORE OUR<br />
          MINDFULNESS<br />
          FEATURES
        </h2>
        
        <p className="text-gray-300 text-lg leading-relaxed mb-16 max-w-3xl mx-auto">
          Discover the tools that enhance your mindfulness journey. Our features are
          designed to support your well-being and promote relaxation.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-3 gap-8 mb-16">
          {/* Card 1 */}
          <div className="text-center">
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center mb-6">
              <div className="w-12 h-10 bg-gray-400 rounded flex items-center justify-center">
                <div className="w-6 h-4 bg-gray-500 rounded-sm flex items-center justify-center relative">
                  <div className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-1"></div>
                  <div className="w-4 h-2 bg-white absolute bottom-0.5 left-1"></div>
                </div>
              </div>
            </div>
            <h3 className="text-white font-black text-2xl leading-tight mb-4">
              MINDFUL<br />
              MEDITATIONS<br />
              DAILY
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Engage in daily guided meditations to<br />
              cultivate peace.
            </p>
          </div>

          {/* Card 2 */}
          <div className="text-center">
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center mb-6">
              <div className="w-12 h-10 bg-gray-400 rounded flex items-center justify-center">
                <div className="w-6 h-4 bg-gray-500 rounded-sm flex items-center justify-center relative">
                  <div className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-1"></div>
                  <div className="w-4 h-2 bg-white absolute bottom-0.5 left-1"></div>
                </div>
              </div>
            </div>
            <h3 className="text-white font-black text-2xl leading-tight mb-4">
              SOUNDSCAPES<br />
              FOR SLEEP &<br />
              FOCUS
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Immerse yourself in soothing soundscapes for<br />
              better focus.
            </p>
          </div>

          {/* Card 3 */}
          <div className="text-center">
            <div className="w-full h-64 bg-gray-300 flex items-center justify-center mb-6">
              <div className="w-12 h-10 bg-gray-400 rounded flex items-center justify-center">
                <div className="w-6 h-4 bg-gray-500 rounded-sm flex items-center justify-center relative">
                  <div className="w-2 h-2 bg-white rounded-full absolute top-0.5 left-1"></div>
                  <div className="w-4 h-2 bg-white absolute bottom-0.5 left-1"></div>
                </div>
              </div>
            </div>
            <h3 className="text-white font-black text-2xl leading-tight mb-4">
              TRACK YOUR<br />
              MOOD &<br />
              PROGRESS
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">
              Monitor your emotional journey and celebrate<br />
              progress.
            </p>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-6">
          <button className="border border-gray-500 text-white px-8 py-3 text-sm font-bold">
            Learn More
          </button>
          <button className="text-white px-8 py-3 text-sm font-bold flex items-center">
            Get Started
            <span className="ml-2">→</span>
          </button>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="px-12 py-20">
        <div className="flex items-center gap-16">
          {/* Left - Video Placeholder */}
          <div className="w-1/2">
            <div className="w-full h-96 bg-gray-500 flex items-center justify-center">
              <div className="w-20 h-16 bg-gray-600 rounded-lg flex items-center justify-center">
                <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1"></div>
              </div>
            </div>
          </div>

          {/* Right - Testimonial Content */}
          <div className="w-1/2">
            {/* 5 Stars */}
            <div className="flex mb-6">
              <span className="text-white text-2xl">★★★★★</span>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-white font-black text-3xl leading-tight mb-8">
              "THIS APP HAS TRANSFORMED MY DAILY ROUTINE, BRINGING PEACE AND MINDFULNESS INTO MY LIFE LIKE NEVER BEFORE."
            </blockquote>

            {/* Author Info and Logo */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-lg">Emily Johnson</p>
                <p className="text-gray-300 text-sm">Wellness Coach, Serenity</p>
              </div>
              <div className="text-white font-bold text-lg flex items-center">
                <WebflowIcon />
                <span className="ml-2">Webflow</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Download Section */}
      <section className="px-12 py-20">
        <div className="flex items-center gap-16">
          {/* Left Content */}
          <div className="w-1/2">
            <h2 className="text-white font-black text-4xl leading-tight mb-8">
              MEDITATE<br />
              ANYTIME,<br />
              ANYWHERE: YOUR<br />
              MINDFULNESS<br />
              JOURNEY AWAITS<br />
              WITH OUR APP
            </h2>
            
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              Download our app to access guided meditations and 
              mindfulness exercises on the go. Experience tranquility and 
              balance in your daily life, anytime and anywhere.
            </p>

            {/* Statistics */}
            <div className="flex gap-16">
              <div>
                <div className="text-white font-black text-6xl mb-2">50%</div>
                <p className="text-gray-300 text-lg">Start your mindful journey today!</p>
              </div>
              <div>
                <div className="text-white font-black text-6xl mb-2">50%</div>
                <p className="text-gray-300 text-lg">Available on App Store and<br />Google Play.</p>
              </div>
            </div>
          </div>

          {/* Right - App Image Placeholder */}
          <div className="w-1/2">
            <div className="w-full h-96 bg-gray-300 flex items-center justify-center">
              <div className="w-20 h-16 bg-gray-400 rounded flex items-center justify-center">
                <div className="w-10 h-8 bg-gray-500 rounded-sm flex items-center justify-center relative">
                  <div className="w-3 h-3 bg-white rounded-full absolute top-1 left-2"></div>
                  <div className="w-6 h-3 bg-white absolute bottom-1 left-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-12 py-12">
        {/* Main Footer Content with Border */}
        <div className="border border-gray-500 bg-gray-900 p-20">
          <div className="grid grid-cols-5 gap-8 ">
            {/* Logo */}
            <div>
              <div className="text-white text-5xl font-bold italic bg-gray-900">Logo</div>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Contact Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 text-sm">Home Page</a></li>
                <li><a href="#" className="text-gray-300 text-sm">Our Services</a></li>
                <li><a href="#" className="text-gray-300 text-sm">User Reviews</a></li>
                <li><a href="#" className="text-gray-300 text-sm">Get App</a></li>
                <li><a href="#" className="text-gray-300 text-sm">Support Center</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 text-sm">Instagram</a></li>
                <li><a href="#" className="text-gray-300 text-sm">YouTube</a></li>
                <li><a href="#" className="text-gray-300 text-sm">Twitter</a></li>
                <li><a href="#" className="text-gray-300 text-sm">LinkedIn</a></li>
                <li><a href="#" className="text-gray-300 text-sm">Facebook</a></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Newsletter</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-300 text-sm">Join Now</a></li>
                <li><a href="#" className="text-gray-300 text-sm">Latest Updates</a></li>
                <li><a href="#" className="text-gray-300 text-sm">Special Offers</a></li>
                <li><a href="#" className="text-gray-300 text-sm">Email Alerts</a></li>
                <li><a href="#" className="text-gray-300 text-sm">Exclusive<br />Content</a></li>
              </ul>
            </div>

            {/* Subscribe */}
            <div>
              <h3 className="text-white font-semibold text-base mb-4">Subscribe</h3>
              <p className="text-gray-300 text-sm mb-4">
                Join our newsletter for the latest mindfulness<br />
                tips and updates.
              </p>
              <div className="flex mb-3">
                <input 
                  type="email" 
                  placeholder="Your Email Here"
                  className="flex-2 bg-transparent border border-gray-600 text-white px-3 py-2 text-sm placeholder-gray-400"
                />
                <button className="bg-transparent border border-gray-600 border-l-0 text-white px-4 py-2 text-sm">
                  Join
                </button>
              </div>
              <p className="text-gray-400 text-xs">
                By subscribing, you agree to our Privacy Policy and consent to receive<br />
                updates.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex items-center justify-between pt-6">
          <div className="flex items-center gap-6">
            <p className="text-gray-300 text-sm">© 2025 SerenityApp. All rights reserved.</p>
            <a href="#" className="text-gray-300 text-sm underline">Privacy Policy</a>
            <a href="#" className="text-gray-300 text-sm underline">Terms of Use</a>
            <a href="#" className="text-gray-300 text-sm underline">Cookie Settings</a>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-3">
            <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
            <div className="w-6 h-6 bg-gray-300 rounded-sm"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}