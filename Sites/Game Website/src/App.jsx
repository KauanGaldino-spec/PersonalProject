import { useState } from 'react';
import { Menu, ChevronDown, X } from 'lucide-react';

// Add Google Fonts
const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Righteous&display=swap');
`;

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      {/* Add font styles */}
      <style>{fontStyles}</style>
      
      {/* Navigation Section */}
      <nav className="bg-black text-white shadow-lg">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold" style={{ fontFamily: 'Righteous, sans-serif' }}>
                MARVEL RIVALS
              </h1>
            </div>

            {/* Desktop Navigation - Hidden on Mobile */}
            <div className="hidden lg:flex items-center space-x-6" style={{ fontFamily: 'Righteous, sans-serif' }}>
              <a href="#" className="text-gray-300 hover:text-white py-2 px-3 rounded transition-colors text-lg">
                About
              </a>
              <a href="#" className="text-gray-300 hover:text-white py-2 px-3 rounded transition-colors text-lg">
                Powers
              </a>
              <a href="#" className="text-gray-300 hover:text-white py-2 px-3 rounded transition-colors text-lg">
                Gameplay
              </a>
              <button className="text-gray-300 hover:text-white py-2 px-3 transition-colors flex items-center space-x-1 text-lg">
                <span>Community</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {/* Play Button - Modern Black Style */}
              <button
                onMouseDown={() => setIsPressed(true)}
                onMouseUp={() => setIsPressed(false)}
                onMouseLeave={() => setIsPressed(false)}
                className={`
                  relative px-8 py-3 text-white text-lg font-medium rounded-full transition-all duration-200 ease-out transform hover:scale-105 active:scale-95 ${isPressed ? 'translate-y-1' : 'hover:-translate-y-1'}
                `}
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%)',
                  boxShadow: isPressed
                    ? `
                      inset 0 4px 8px rgba(0,0,0,0.6),
                      inset 0 2px 10px rgba(0,0,0,0.5),
                      0 2px 8px rgba(0,0,0,0.6)
                    `
                    : `
                      inset 0 4px 8px rgba(0,0,0,0.4),
                      inset 0 1px 0 rgba(255,255,255,0.05),
                      inset 0 -1px 0 rgba(0,0,0,0.4),
                      0 8px 20px rgba(0,0,0,0.5),
                      0 4px 10px rgba(0,0,0,0.4)
                    `,
                  border: '1px solid rgba(255, 255, 255, 0.05)'
                }}
              >
                {/* Inner glow effect */}
                <div
                  className="absolute inset-0 rounded-full opacity-50 pointer-events-none"
                  style={{
                    background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.03) 0%, transparent 70%)'
                  }}
                ></div>

                {/* Text with subtle glow */}
                <span
                  className="relative z-10"
                  style={{
                    textShadow: '0 1px 2px rgba(0,0,0,0.8), 0 0 10px rgba(255,255,255,0.05)',
                    fontFamily: 'Righteous, sans-serif',
                    letterSpacing: '1px'
                  }}
                >
                  Play
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-900 transition-colors"
                aria-label="Menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className='space-y-1 py-3' style={{ fontFamily: 'Righteous, sans-serif' }}>
              <a
                href="#"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Powers
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Gameplay
              </a>
              <button
                className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-900 rounded-md transition-colors text-left"
              >
                <span>Community</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}