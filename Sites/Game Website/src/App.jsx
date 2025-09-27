import { useState } from 'react';
import { Menu, ChevronDown, X } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Main Navbar */}
        <nav className='bg-black text-white shadow-lg'>
          <div className="px-4 py-3">
             <div className="flex items-center justify-between">
                {/* Logo */}
                 <div className="flex items-center">
                   <h1 className="text-xl font-bold italic">Logo</h1> {/* Update After */}
                 </div>

                {/* Desktop Navigation - Hidden on Mobile */}
                  <div className="hidden lg:flex items-center space-x-6">
                     <a href="#" className="text-gray-300 hover:text-white py-2 px-3 rounded transition-colors">
                        About
                     </a>
                     <a href="#" className="text-gray-300 hover:text-white py-2 px-3 rounded transition-colors">
                        Powers
                     </a>
                     <a href="#" className="text-gray-300 hover:text-white py-2 px-3 rounded transition-colors">
                        Gameplay
                     </a>
                     <button className='text-gray-300 hover:text-white py-2 px-3 rounded transition-colors flex items-center space-x-1 r'>
                       <span>Community</span>
                       <ChevronDown className="w-4 h-4" />
                     </button>
                  </div>

                  {/* Right Side */}
                   <div className="flex items-center space-x-3">
                      {/* Play Button */}
                      <button 
                       onMouseDown={() => setIsPressed(true)}
                       onMouseUp={() => setIsPressed(false)}
                       onMouseLeave={() => setIspressed(false)}
                       className={`
                         relative px-16 py-6 text-white text-4xl font-medium rounded-full transition-all duration-200 ease-out transform hover:scale-105 active:scale-95
                         ${isPressed ? 'translate-y-1' : 'hover:-translate-y-1'}
                         
                        `}
                        style={{
                          background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000000 100%',
                          boxShadow: isPressed
                          ? `
                            inset 0 4px 8px rgba(0,0,0,0.6),
                            inset 0 2px 10px rgba(0,0,0,0.5),
                            0 2px 8px rgba(0,0,0,0.6)
                           `

                           : `
                              u
                           
                           
                           `
                        }}
                      
                      >
                        Play
                      </button>

                  {/* Mobile Menu Button */}
                   <button
                   onClick={() => setIsMenuOpen(!isMenuOpen)}
                   className="lg:hidden p-2 rounded-md hover:bg-gray-800 transition-colors"
                   aria-label="Menu"
                   >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" /> }
                   </button>
                 </div>
             </div>
          </div>

          {/* Mobile Menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="space-y-1">
                 <a href="#"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    >
                      About
                </a>
                <a href="#"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    >
                     Powers
                </a>
               <a href="#"
                    className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                    >
                    Gameplay
                </a>
                <button 
                className="flex items-center justify-between w-full px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-md transition-colors text-left"
                >
                  <span>Community</span>
                  <ChevronDown className="w-4 h-4" />
                </button>              
              </div>
            </div>
        </nav>
    </>
  );
}