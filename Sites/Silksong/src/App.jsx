import React, { useState } from 'react';
import { ChevronDown, Crown, Square, Sparkles, ChevronRight, Star, User, Image, Mail, Phone, MapPin } from 'lucide-react';

export default function GamingHeroSection() {
  const [email, setEmail] = useState('');

  return (
    <div>
      {/* Hero Section */}
      <div className="min-h-screen bg-green-950" style={{ backgroundColor: '#1a2e1a' }}>
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
            <button className="flex items-center text-white text-base hover:opacity-70 transition-opacity">
              More Games
              <ChevronDown className="ml-2 w-4 h-4"/>
            </button>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-5">
            <button className="text-white text-base hover:opacity-70 transition-opacity">
              Login
            </button>
            <button className="bg-white text-green-950 px-6 py-3 rounded-full text-base font-semibold hover:opacity-90 transition-opacity">
              Sign Up
            </button>
          </div>
        </nav>  

        {/* Hero Content */}
        <div className="flex items-center px-12 py-16 gap-20 min-h-[70vh]">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl">
            <h1 className="text-6xl font-black leading-tight mb-8 text-white uppercase tracking-tight">
              DISCOVER YOUR NEXT <br />
              FAVORITE GAME TODAY!
            </h1>

            <p className="text-lg leading-relaxed mb-10 text-white opacity-90 max-w-lg">
              Explore our extensive collection of both digital and physical video games. Don't miss out on the latest promotions and exclusive offers!
            </p>

            <div className="flex gap-5">
              <button className="bg-white text-green-950 px-8 py-4 rounded-full text-base font-semibold hover:opacity-90 transition-opacity">
                Learn More
              </button>
            </div>
          </div>

          {/* Right Image Placeholder */}
          <div className="flex-1 max-w-2xl">
            <div className="bg-gray-300 rounded-3xl aspect-square flex items-center justify-center">
              <div className="bg-gray-400 rounded-2xl w-32 h-24 flex items-center justify-center">
                <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Three Threads Section */}
      <div className="min-h-screen bg-neutral-900 text-white px-12 py-20">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-sm uppercase tracking-wider mb-6 text-neutral-400">
            Essence
          </p>
          <h1 className="text-5xl md:text-6xl font-bold mb-8 max-w-5xl mx-auto leading-tight">
            THREE THREADS WOVEN THROUGH SILKSONG
          </h1>
          <p className="text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed">
            The kingdom of Pharloom holds secrets written in silk and sung in silence. Three
            forces shape this world the princess who carries her burden, the land that
            breathes with ancient pain, and the song that binds all things together.
          </p>
        </div>

        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto mb-16">
          {/* Column 1 */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Crown className="w-12 h-12" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold mb-4 uppercase">
              HORNET'S<br />ASCENSION
            </h2>
            <p className="text-neutral-300 leading-relaxed">
              A warrior bound by duty, ascending through darkness toward an uncertain crown.
            </p>
          </div>

          {/* Column 2 */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Square className="w-12 h-12" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold mb-4 uppercase">
              PHARLOOM AWAITS
            </h2>
            <p className="text-neutral-300 leading-relaxed">
              Vertical kingdoms rise from shadow, each region holding beauty and terror in equal measure.
            </p>
          </div>

          {/* Column 3 */}
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Sparkles className="w-12 h-12" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-bold mb-4 uppercase">
              SILK AND SONG<br />ENTWINED
            </h2>
            <p className="text-neutral-300 leading-relaxed">
              Two forces transform the world—one woven by hands, one carried on the wind.
            </p>
          </div>
        </div>

        {/* Bottom Buttons */}
        <div className="flex justify-center items-center gap-4">
          <button className="border border-white px-8 py-3 rounded hover:bg-white hover:text-neutral-900 transition-colors">
            Discover
          </button>
          <button className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            Arrow
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

     {/* Testimonial Section */}
      <div className="bg-neutral-900 text-white px-12 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Stars */}
          <div className="flex justify-center gap-2 mb-8">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 text-yellow-400" />
            ))}
          </div>

          {/* Quote */}
           <blockquote className="text-2xl font-semibold leading-relaxed max-w-3xl mx-auto">
             "WE WAIT IN THE QUIET PLACES, WATCHING THE THREADS GATHER. SILKSONG CALLS TO US ACROSS THE VOID, AND WE ANSWER WITH OUR HEARTS."
           </blockquote>

           {/* Author Info */}
            <div className="flex items-center justify-center gap-8 mt-8">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                 <div className="w-14 h-14 bg-neutral-700 rounded-full flex items-center justify-center">
                    <User className="w-7 h-7 text-neutral-400" />
                 </div>

                  {/* Name and Title */}
                   <div className="text-left">
                      <p className="font-semibold text-lg">A devoted fan</p>
                      <p className="text-neutral-400">Hollow Knight community</p>
                   </div>
                </div>

              {/* Divider */}
               <div className="w-px h-12 bg-neutral-700"></div>

              {/* Webflow Logo */}
               <div className="text-left">
                  <span className="text-white font-bold text-xl">Webflow</span>
               </div>
            </div>
          </div>
       </div>

      {/* Descend Into Pharloom Section */}
      {/* Top Section - Dark Background */}
      <div className="bg-neutral-900 text-white px-12 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 uppercase">
          DESCEND INTO PHARLOOM
        </h1>
        <p className="text-lg text-neutral-300 mb-8 max-w-3xl mx-auto">
          Explore the regions, meet the threats, and understand the song that echoes through the kingdom.
        </p>
        
        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded transition-colors">
            Enter
          </button>
          <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-8 py-3 rounded transition-colors">
            Lore
          </button>
        </div>
      </div>

      {/* Bottom Section - Light Background with Image Placeholder */}
      <div className="bg-neutral-200 px-12 py-32">
        <div className="max-w-4xl mx-auto">
          <div className="bg-neutral-300 rounded-2xl aspect-video flex items-center justify-center">
            <div className="bg-neutral-400 rounded-xl p-8">
              <Image className="w-24 h-24 text-neutral-500" strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </div>

      {/* Stay Bound to the Song - Newsletter Section */}
      <div className="bg-neutral-900 text-white px-12 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold uppercase mb-5 leading-tight">
            STAY BOUND TO THE SONG
          </h2>
          <p className="text-lg text-neutral-300 mb-8 leading-relaxed">
            Receive whispers of new fan art, lore discoveries, and site updates in your silence.
          </p>

          {/* Email Input Row */}
          <div className="flex items-end justify-center gap-4 mb-3">
            <div className="flex flex-col text-left">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent border-b border-neutral-500 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors py-2 w-72 text-base"
              />
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md text-base font-medium transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>

          {/* Disclaimer */}
          <p className="text-neutral-500 text-sm">
            By subscribing, you agree to receive updates from this fan project.
          </p>
        </div>
      </div>

      {/* Large Image Placeholder Below Newsletter */}
      <div className="bg-neutral-200 px-12 py-40">
        <div className="max-w-2xl mx-auto flex items-center justify-center">
          <div className="bg-neutral-300 rounded-2xl p-16 flex items-center justify-center">
            <Image className="w-32 h-32 text-neutral-400" strokeWidth={1} />
          </div>
        </div>
      </div>

      {/* Share Your Voice Section */}
      <div className="bg-neutral-900 text-white px-12 py-20">
        {/* Top: Two Column Layout */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* Left Column */}
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-white mb-3">
              Reach out
            </p>
            <h2 className="text-5xl font-black uppercase leading-tight mb-6">
              SHARE YOUR VOICE
            </h2>
            <p className="text-neutral-300 text-base leading-relaxed max-w-md">
              This is an unofficial fan project celebrating Hollow Knight: Silksong. Send
              your tributes, questions, or thoughts to the community below. For official
              Team Cherry news, visit their channels.
            </p>
          </div>

          {/* Right Column - Contact Links */}
          <div className="flex flex-col justify-center gap-8">
            {/* Discord */}
            <div className="flex items-start gap-4">
              <Mail className="w-5 h-5 mt-1 text-white flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-bold uppercase text-white text-base mb-1">DISCORD</p>
                <a href="#" className="text-neutral-300 underline underline-offset-2 hover:text-white transition-colors text-sm">
                  ValorCraft Academy server
                </a>
              </div>
            </div>

            {/* Twitter */}
            <div className="flex items-start gap-4">
              <Phone className="w-5 h-5 mt-1 text-white flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-bold uppercase text-white text-base mb-1">TWITTER</p>
                <a href="#" className="text-neutral-300 underline underline-offset-2 hover:text-white transition-colors text-sm">
                  @TeamCherry official
                </a>
              </div>
            </div>

            {/* Web */}
            <div className="flex items-start gap-4">
              <MapPin className="w-5 h-5 mt-1 text-white flex-shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-bold uppercase text-white text-base mb-1">WEB</p>
                <p className="text-neutral-300 text-sm">Team Cherry official website</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Large Image Placeholder */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-neutral-200 rounded-2xl aspect-video flex items-center justify-center">
            <div className="bg-neutral-300 rounded-xl p-10">
              <Image className="w-24 h-24 text-neutral-400" strokeWidth={1} />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-neutral-900 text-white px-12 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Top Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            {/* Left: Logo + Newsletter */}
            <div className="md:col-span-1">
              <div className="text-2xl font-bold italic mb-6 text-white" style={{ fontFamily: 'cursive' }}>
                Logo
              </div>
              <p className="text-neutral-300 text-sm mb-6 leading-relaxed">
                Receive updates on the world of Pharloom.
              </p>
              <div className="mb-2">
                <div className="flex items-end gap-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="bg-transparent border-b border-neutral-500 text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors py-2 flex-1 text-sm"
                  />
                  <button className="bg-white text-neutral-900 px-5 py-2 rounded text-sm font-semibold hover:opacity-90 transition-opacity whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
              <p className="text-neutral-500 text-xs mt-3">
                By subscribing you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>

            {/* Spacer */}
            <div className="hidden md:block" />

            {/* Explore */}
            <div>
              <h4 className="font-semibold text-white text-base mb-6">Explore</h4>
              <ul className="space-y-4">
                {['About Silksong', 'World of Pharloom', 'Gallery', 'Lore', 'Connect'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-neutral-300 text-sm hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white text-base mb-6">Contact</h4>
              <ul className="space-y-4 mb-10">
                {['Community', 'Credits', 'Disclaimer', 'Follow', 'Twitter'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-neutral-300 text-sm hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>

              <h4 className="font-semibold text-white text-base mb-6">Discord</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Tumblr', icon: '⬡' },
                  { label: 'Reddit', icon: '◎' },
                  { label: 'YouTube', icon: '✕' },
                  { label: 'LinkedIn', icon: 'in' },
                  { label: 'Youtube', icon: '▶' },
                ].map((item) => (
                  <li key={item.label}>
                    <a href="#" className="flex items-center gap-2 text-neutral-300 text-sm hover:text-white transition-colors">
                      <span className="w-5 h-5 bg-white rounded-full flex items-center justify-center text-neutral-900 text-xs font-bold flex-shrink-0">
                        {item.icon === '▶' ? '▶' : item.icon === 'in' ? 'in' : item.icon === '✕' ? '✕' : item.icon === '◎' ? '◎' : '●'}
                      </span>
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-neutral-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-neutral-400 text-sm">
              © 2025 ValorCraft Academy. Unofficial fan project.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-neutral-300 text-sm underline underline-offset-2 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-neutral-300 text-sm underline underline-offset-2 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-neutral-300 text-sm underline underline-offset-2 hover:text-white transition-colors">Cookies Settings</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}