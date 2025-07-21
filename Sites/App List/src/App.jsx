import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Mail, Phone, MapPin, Star, ArrowLeft, ArrowRight, Image, Calendar, Award, Facebook, Instagram, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function TaskOrganizerLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      quote: "THIS TO-DO LIST APP HAS TRANSFORMED HOW I MANAGE MY TASKS! IT'S INTUITIVE, SLEEK, AND KEEPS ME ORGANIZED EFFORTLESSLY.",
      name: "Alice Johnson",
      title: "Project Manager, TechCorp"
    },
    {
      quote: "INCREDIBLE PRODUCTIVITY BOOST! THE INTERFACE IS CLEAN AND THE FEATURES ARE EXACTLY WHAT I NEEDED.",
      name: "Mike Chen",
      title: "Software Developer, StartupXYZ"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const FeatureCard = ({ icon: Icon, title, description }) => (
    <div className="group hover:transform hover:scale-105 transition-all duration-300">
      <div className="flex items-center mb-4">
        <Icon className="w-8 h-8 text-yellow-400 mr-4" />
        <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-gray-300 font-medium group-hover:text-gray-200 transition-colors">
        {description}
      </p>
    </div>
  );

  const ContactCard = ({ icon: Icon, title, description, link, linkText }) => (
    <div className="flex items-start space-x-4 group hover:transform hover:translate-x-2 transition-all duration-300">
      <div className="flex-shrink-0 mt-2 p-2 bg-gray-800 rounded-full group-hover:bg-yellow-400 transition-colors">
        <Icon className="w-6 h-6 text-white group-hover:text-black" />
      </div>
      <div>
        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-gray-300 font-medium mb-2">{description}</p>
        <a href={link} className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium underline flex items-center group">
          {linkText}
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Poppins',sans-serif]">
      {/* Enhanced Navigation - FIXED */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gray-900/80'
      }`}>
        <div className="flex items-center justify-between px-6 py-4 md:px-12">
          <div className="text-xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors cursor-pointer">
            TaskFlow
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6 mr-10">
              <a href="#home" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Home</a>
              <a href="#features" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">Features</a>
              <a href="#about" className="text-gray-300 hover:text-yellow-400 transition-colors font-medium">About</a>
              <div className="relative group">
                <button className="text-gray-300 hover:text-yellow-400 transition-colors flex items-center font-medium">
                  More Info
                  <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="#support" className="block px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 first:rounded-t-lg">Support</a>
                  <a href="#docs" className="block px-4 py-2 text-gray-300 hover:text-yellow-400 hover:bg-gray-700 last:rounded-b-lg">Documentation</a>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors font-medium">
                Sign Up
              </button>
              <button className="px-6 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 hover:scale-105 transition-all duration-200">
                Login
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2 hover:bg-gray-800 rounded transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-6 py-4 space-y-4">
              <a href="#home" className="block text-gray-300 hover:text-yellow-400 transition-colors">Home</a>
              <a href="#features" className="block text-gray-300 hover:text-yellow-400 transition-colors">Features</a>
              <a href="#about" className="block text-gray-300 hover:text-yellow-400 transition-colors">About</a>
              <a href="#contact" className="block text-gray-300 hover:text-yellow-400 transition-colors">Contact</a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                <button className="px-4 py-2 text-gray-300 hover:text-yellow-400 transition-colors text-left">Sign Up</button>
                <button className="px-4 py-2 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition-colors">Login</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="px-6 md:px-12 py-20 md:py-32 mt-16">
        <div className="max-w-6xl">
          <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8 tracking-tight uppercase animate-fade-in text-yellow-400">
            ORGANIZE<br />
            YOUR TASKS<br />
            EFFORTLESS<br />
            LY
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg font-medium animate-fade-in animation-delay-200">
            Stay on top of your to-do list with our intuitive and user-friendly app designed for modern productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in animation-delay-400">
            <button className="group px-8 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 transition-all duration-200 transform hover:scale-105 hover:shadow-xl">
              Get Started
              <ArrowRight className="inline w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3 border-2 border-gray-500 text-white hover:bg-gray-800 hover:border-yellow-400 transition-all duration-200 rounded font-medium">
              Learn More
            </button>
          </div>

          {/* Enhanced Hero Image */}
          <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden shadow-2xl group animate-fade-in animation-delay-600">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-20 bg-gray-400 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Image className="w-12 h-10 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Feature Section 1 */}
      <section id="features" className="bg-gray-900 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tight uppercase text-white">
                EFFORTLESSLY<br />
                MANAGE YOUR<br />
                TASKS WITH OUR<br />
                INTUITIVE APP
              </h2>
              
              <p className="text-lg text-gray-300 mb-12 font-medium max-w-lg">
                Stay organized and boost your productivity with our user-friendly interface. Add, complete, and delete tasks seamlessly.
              </p>

              <div className="grid grid-cols-2 gap-8">
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform">100%</div>
                  <p className="text-gray-300 font-medium">
                    Your tasks, organized and simplified for your convenience.
                  </p>
                </div>
                <div className="group">
                  <div className="text-4xl md:text-5xl font-black text-yellow-400 mb-2 group-hover:scale-110 transition-transform">EASY</div>
                  <p className="text-gray-300 font-medium">
                    Start your journey to better task management today.
                  </p>
                </div>
              </div>
            </div>

            <div className="order-first md:order-last animate-fade-in animation-delay-200">
              <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-24 bg-gray-400 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Calendar className="w-16 h-12 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Feature Section 2 */}
      <section className="bg-gray-900 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-8 tracking-tight uppercase text-white">
                POWERFUL<br />
                FEATURES FOR<br />
                MODERN<br />
                PRODUCTIVITY
              </h2>
              
              <p className="text-lg text-gray-300 mb-12 font-medium max-w-lg">
                Experience seamless task management with advanced features designed for both individual users and teams.
              </p>

              <div className="space-y-8">
                <FeatureCard 
                  icon={Calendar}
                  title="TASK MANAGEMENT"
                  description="Easily track your progress and never miss a deadline with smart reminders and priority settings."
                />
                <FeatureCard 
                  icon={Award}
                  title="USER FRIENDLY"
                  description="Designed for seamless navigation on both desktop and mobile devices with intuitive controls."
                />
              </div>
            </div>

            <div className="animate-fade-in animation-delay-200">
              <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-24 bg-gray-400 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Award className="w-16 h-12 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonial Section */}
      <section className="bg-gray-900 px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center relative">
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 md:-translate-x-12 text-white hover:text-yellow-400 transition-all duration-200 hover:scale-110"
          >
            <ArrowLeft className="w-8 h-8" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 md:translate-x-12 text-white hover:text-yellow-400 transition-all duration-200 hover:scale-110"
          >
            <ArrowRight className="w-8 h-8" />
          </button>

          <div className="flex justify-center mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400 fill-current hover:scale-110 transition-transform" />
            ))}
          </div>

          <div className="transition-all duration-500">
            <blockquote className="text-2xl md:text-4xl font-black leading-tight mb-12 tracking-tight uppercase text-white">
              "{testimonials[currentTestimonial].quote}"
            </blockquote>

            <div className="flex items-center justify-center space-x-6 mb-12">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">
                  {testimonials[currentTestimonial].name.charAt(0)}
                </span>
              </div>
              <div className="text-left">
                <div className="text-white font-bold text-lg">{testimonials[currentTestimonial].name}</div>
                <div className="text-gray-300 font-medium">{testimonials[currentTestimonial].title}</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentTestimonial ? 'bg-yellow-400' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="bg-black px-6 md:px-12 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <p className="text-yellow-400 font-medium text-lg mb-4">Connect</p>
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tight uppercase text-white">
              CONTACT US
            </h2>
            <p className="text-xl text-gray-300 mt-6 font-medium">
              We'd love to hear from you and help you get started!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-12 animate-fade-in animation-delay-200">
              <ContactCard 
                icon={Mail}
                title="EMAIL"
                description="Get in touch with our support team"
                link="mailto:hello@taskflow.com"
                linkText="hello@taskflow.com"
              />
              <ContactCard 
                icon={Phone}
                title="PHONE"
                description="Call us anytime for immediate assistance"
                link="tel:+15551234567"
                linkText="+1 (555) 123-4567"
              />
              <ContactCard 
                icon={MapPin}
                title="OFFICE"
                description="123 Innovation Drive, San Francisco, CA 94105"
                link="#"
                linkText="Get Directions"
              />
            </div>

            <div className="animate-fade-in animation-delay-400">
              <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-24 bg-gray-400 rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-16 h-12 text-gray-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-black px-6 md:px-12 py-16 md:py-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-8">
            <div className="md:col-span-1">
              <div className="text-3xl font-bold text-white mb-4 hover:text-yellow-400 transition-colors cursor-pointer">
                TaskFlow
              </div>
            </div>

            {[
              {
                title: "Quick Links",
                links: ["Home Page", "App Features", "About Us", "Contact Us", "Support Center"]
              },
              {
                title: "Follow Us",
                links: ["Facebook Page", "Twitter Feed", "Instagram Profile", "LinkedIn Page", "YouTube Channel"]
              },
              {
                title: "Resources",
                links: ["Documentation", "API Reference", "Community", "Blog", "Help Center"]
              }
            ].map((section, index) => (
              <div key={index} className="md:col-span-1">
                <h3 className="text-white font-bold text-lg mb-6">{section.title}</h3>
                <div className="space-y-4">
                  {section.links.map((link, linkIndex) => (
                    <a key={linkIndex} href="#" className="block text-gray-300 hover:text-yellow-400 transition-colors">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}

            <div className="md:col-span-1">
              <h3 className="text-white font-bold text-lg mb-6">Subscribe</h3>
              <p className="text-gray-300 text-sm mb-6 leading-relaxed">
                Join our newsletter for updates on features and new releases.
              </p>
              <div className="flex flex-col gap-3 mb-4">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="px-4 py-3 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all"
                />
                <button className="px-6 py-3 bg-yellow-400 text-black font-bold rounded hover:bg-yellow-300 hover:scale-105 transition-all duration-200">
                  Subscribe
                </button>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                By subscribing, you agree to our Privacy Policy and consent to updates.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-16 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-6 md:mb-0">
              © 2024 TaskFlow. All rights reserved.
              <div className="inline-block ml-8 space-x-6">
                <a href="#" className="hover:text-yellow-400 transition-colors underline">Privacy Policy</a>
                <a href="#" className="hover:text-yellow-400 transition-colors underline">Terms of Service</a>
                <a href="#" className="hover:text-yellow-400 transition-colors underline">Cookie Settings</a>
              </div>
            </div>

            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Linkedin, Youtube].map((Icon, index) => (
                <a key={index} href="#" className="text-gray-400 hover:text-yellow-400 hover:scale-110 transition-all duration-200">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}