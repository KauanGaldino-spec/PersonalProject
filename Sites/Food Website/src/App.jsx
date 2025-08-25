import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';

const CulinaryWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    terms: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: '',
      terms: false
    });
    alert('Thank you for your message! We\'ll get back to you soon.');
  };

  return (
    <div className="min-h-screen bg-gray-600 text-white">
      {/* Navigation Header */}
      <nav className="flex items-center justify-between px-6 py-4 bg-gray-800 sticky top-0 z-50">
        {/* Logo */}
        <div className="text-white text-2xl font-bold italic">
          CulinaryWorld
        </div>

        {/* Desktop Navigation Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#home" className="text-white hover:text-gray-300 transition-colors">
            Home Page
          </a>
          <a href="#recipes" className="text-white hover:text-gray-300 transition-colors">
            Recipes Page
          </a>
          <a href="#tips" className="text-white hover:text-gray-300 transition-colors">
            Healthy Tips
          </a> 
          <div className="relative group">
            <button className="flex items-center text-white hover:text-gray-300 transition-colors">
              More Info
              <ChevronDown className="ml-1 h-4 w-4" />
            </button>
            {/* Dropdown menu can be added here */}
          </div>
          <button className="px-4 py-2 bg-transparent border border-white rounded-full hover:bg-white hover:text-gray-800 transition-all">
            Join
          </button>
          <button className="px-4 py-2 bg-white text-gray-800 rounded-full hover:bg-gray-200 transition-all">
            Explore
          </button>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-gray-800 md:hidden">
            <div className="flex flex-col space-y-4 px-6 py-4">
              <a href="#home" className="text-white hover:text-gray-300">Home Page</a>
              <a href="#recipes" className="text-white hover:text-gray-300">Recipes Page</a>
              <a href="#tips" className="text-white hover:text-gray-300">Healthy Tips</a>
              <a href="#more" className="text-white hover:text-gray-300">More Info</a>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-transparent border border-white rounded-full text-white">Join</button>
                <button className="px-4 py-2 bg-white text-gray-800 rounded-full">Explore</button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <main id="home" className="flex flex-col items-center justify-center text-center px-6 py-20 min-h-[calc(100vh-80px)]">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold uppercase leading-tight mb-8 max-w-5xl">
          DISCOVER THE
          <br />
          WORLD OF
          <br />
          DELICIOUS
          <br />
          CUISINES
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-12 leading-relaxed">
          Welcome to your culinary adventure! Explore vibrant recipes and tips that celebrate the joy of cooking and healthy eating.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button className="px-8 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-all">
            Get Started
          </button>
          <button className="px-8 py-3 bg-transparent border border-white text-white rounded-full hover:bg-white hover:text-gray-800 transition-all">
            Subscribe
          </button>
        </div>
      </main>

      {/* Global Recipes Section */}
      <section id="recipes" className="bg-gray-900 px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-6"> 
              EXPLORE A WORLD
              <br />
              OF FLAVORS:
              <br />
              DISCOVER GLOBAL
              <br />
              RECIPES
            </h2>

            <p className="text-gray-300 text-lg mb-12 leading-relaxed max-w-md">
              Dive into a culinary adventure with our diverse selection of cuisines. From spicy street food to elegant fine dining, there's something to tantalize every palate.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold uppercase mb-3">
                  ITALIAN DELIGHTS 
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Savor the rich flavors of Italy with our authentic pasta and pizza recipes.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold uppercase mb-3">
                  ASIAN FUSION
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Experience the harmony of flavors in our innovative Asian-inspired dishes.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg h-96 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
                alt="Delicious pasta dish with fresh ingredients"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="tips" className="bg-gray-900 px-6 py-16">
        <div className="max-w-6xl mx-auto text-center">
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
              Discover practical tips for healthy eating that fit your lifestyle. Our expert advice will help you make nutritious choices every day.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Feature 1 */}
            <div className="text-center group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold uppercase mb-4 text-white leading-tight">
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
            <div className="text-center group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold uppercase mb-4 text-white leading-tight">
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
            <div className="text-center group">
              <div className="mb-6 transform group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" strokeWidth={1.5} />
                  <circle cx="12" cy="12" r="8" strokeWidth={1.5} />
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold uppercase mb-4 text-white leading-tight">
                JOIN OUR
                <br />
                COMMUNITY OF
                <br />
                FOOD ENTHUSIASTS  
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Connect with others who share your passion for food.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all">
              Subscribe
            </button>
            <button className="flex items-center text-white hover:text-gray-300 transition-colors group">
              Learn More
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-gray-900 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-gray-400 text-sm mb-2">Blog</p>
            <h2 className="text-4xl md:text-5xl font-bold uppercase text-white mb-4">
              COOKING TIPS &
              <br />
              INSIGHTS
            </h2>
            <p className="text-gray-300 text-lg">
              Explore our latest cooking tips and food trends.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Blog Card 1 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Chef cooking in professional kitchen"
                  className="w-full h-full object-cover"
                />
              </div>

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

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">JD</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-white">John Doe</span>
                    <br />
                    11 Jan 2025 • 5 min read
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Card 2 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2084&q=80"
                  alt="Fresh healthy salad with colorful vegetables"
                  className="w-full h-full object-cover"
                />
              </div>

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

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">EJ</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-white">Emily Johnson</span>
                    <br />
                    20 Jan 2025 • 4 min read
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Card 3 */}
            <div className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300">
              <div className="h-64 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1981&q=80"
                  alt="Gourmet pizza with fresh toppings"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6"> 
                <p className="text-gray-400 text-sm mb-2">Trends</p>
                <h3 className="text-xl font-bold uppercase text-white mb-3">
                  TOP FOOD TRENDS
                  <br />
                  OF 2025
                </h3>
                <p className="text-gray-300 text-sm mb-4">
                  Stay ahead with the latest culinary trends and innovations.
                </p>

                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-xs font-bold">SL</span>
                  </div>
                  <div className="text-xs text-gray-400">
                    <span className="text-white">Sarah Lee</span>
                    <br />
                    15 Jan 2025 • 6 min read
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <button className="px-6 py-3 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-all">
              View All Articles
            </button>
          </div>
        </div>
      </section>

      {/* Seasonal Dishes Section */}
      <section className="bg-gray-900 px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-6">
              DISCOVER THE BEST
              <br />
              SEASONAL AND
              <br />
              TRENDING DISHES TO
              <br />
              SAVOR TODAY!
            </h2>

            <p className="text-gray-300 text-lg mb-12 leading-relaxed max-w-lg">
              Explore our curated selection of seasonal favorites that celebrate fresh ingredients. From vibrant salads to hearty stews, there's something for every palate!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="group hover:transform hover:scale-105 transition-all">
                <h3 className="text-4xl md:text-5xl font-bold uppercase mb-4 text-white leading-tight group-hover:text-yellow-300 transition-colors">
                  SUM
                  <br />
                  MER
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Refreshing watermelon salad with mint and feta.
                </p>
              </div>
              <div className="group hover:transform hover:scale-105 transition-all">
                <h3 className="text-4xl md:text-5xl font-bold uppercase mb-4 text-white leading-tight group-hover:text-orange-300 transition-colors">
                  FALL
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Savory pumpkin soup with a hint of spice.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg h-96 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80"
                alt="Seasonal autumn vegetables and pumpkin soup"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Join Community Section */}
      <section className="bg-gray-700 px-6 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-6">
              JOIN OUR CULINARY
              <br />
              COMMUNITY!
            </h2>

            <p className="text-gray-300 text-lg mb-12 leading-relaxed max-w-lg">
              Subscribe now for exclusive recipes, cooking tips, and the latest updates delivered to your inbox!
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <button className="px-8 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-all">
                Subscribe
              </button>
              <button className="px-8 py-3 bg-gray-600 text-white rounded-full hover:bg-gray-500 transition-all">
                Learn More
              </button>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg h-80 rounded-2xl overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Happy chefs working together in kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="bg-gray-800 px-6 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-400 text-lg mb-4">Subscribe</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white mb-6 leading-tight">
            GET IN TOUCH
          </h2>
          <p className="text-gray-300 text-lg mb-12">
            Join our community for delicious updates!
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="text-left">
              <label htmlFor="name" className="block text-white text-sm mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-gray-400 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="text-left">
              <label htmlFor="email" className="block text-white text-sm mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-gray-400 focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="text-left">
              <label htmlFor="message" className="block text-white text-sm mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                placeholder="Share your thoughts..."
                className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-gray-400 focus:outline-none transition-colors placeholder-gray-400"
                required
              ></textarea>
            </div>

            <div className="flex items-center text-left">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                checked={formData.terms}
                onChange={handleInputChange}
                className="w-4 h-4 bg-gray-700 border border-gray-600 rounded focus:outline-none mr-3"
                required
              />
              <label htmlFor="terms" className="text-gray-300 text-sm">
                I agree to the Terms and Privacy Policy
              </label>
            </div>

            <button
              type="submit"
              className="px-8 py-3 bg-white text-gray-800 rounded-full font-medium hover:bg-gray-200 transition-all disabled:opacity-50"
              disabled={!formData.terms}
            >
              Submit Message
            </button>
          </form>
        </div>
      </section>

      {/* Customer Testimonials Section */}
      <section className="bg-gray-800 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase text-white mb-6 leading-tight">
              CUSTOMER
              <br />
              TESTIMONIALS
            </h2>
            <p className="text-gray-300 text-lg">
              These recipes transformed my cooking experience!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="text-white">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>

              <h3 className="text-xl font-bold uppercase mb-6 leading-tight">
                "I NEVER KNEW HEALTHY
                <br />
                COULD TASTE THIS GOOD"
              </h3>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1494790108755-2616c2d8dfde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80"
                    alt="Emily Johnson profile photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">Emily Johnson</p>
                  <p className="text-gray-400 text-sm">Chef, Blogger</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <svg className="w-6 h-6 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
                <span className="text-white font-medium">Verified Review</span>
              </div>
            </div>

            {/* Testimonial 2 */}                    
            <div className="text-white">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>

              <h3 className="text-xl font-bold uppercase mb-6 leading-tight">
                "THE TIPS ARE PRACTICAL
                <br />
                AND EASY TO FOLLOW"
              </h3>

              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Michael Smith profile photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">Michael Smith</p>
                  <p className="text-gray-400 text-sm">Food Enthusiast</p>
                </div>
              </div>

              <div className="flex items-center">
                <svg className="w-6 h-6 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
                <span className="text-white font-medium">Verified Review</span>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="text-white">
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                  </svg>
                ))}
              </div>

              <h3 className="text-xl font-bold uppercase mb-6 leading-tight">
                "I LOVE THE VARIETY OF
                <br />
                CUISINES OFFERED!"
              </h3>
              
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Sarah Lee profile photo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-white font-medium">Sarah Lee</p>
                  <p className="text-gray-400 text-sm">Nutritionist, Author</p>
                </div>
              </div>

              <div className="flex items-center">
                <svg className="w-6 h-6 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/>
                </svg>
                <span className="text-white font-medium">Verified Review</span>
              </div>
            </div>       
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 px-6 py-16 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <div className="text-white text-2xl font-bold italic mb-4">
                CulinaryWorld
              </div>
              <p className="text-gray-400 text-sm">
                Your culinary journey starts here with delicious recipes and healthy tips.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Our Blog</a></li>
                <li><a href="#recipes" className="text-gray-400 hover:text-white transition-colors">Recipes</a></li>
                <li><a href="#tips" className="text-gray-400 hover:text-white transition-colors">Healthy Tips</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h3 className="text-white font-bold mb-4">Follow Us</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Instagram</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pinterest</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">YouTube</a></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cooking Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Meal Plans</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Seasonal Recipes</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Food Trends</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Nutrition Facts</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-white font-bold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Feedback</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 CulinaryWorld. All rights reserved.
            </div>

            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Pinterest">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.097.118.112.222.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.758-1.378l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>        
    </div>
  )
}

export default CulinaryWebsite;