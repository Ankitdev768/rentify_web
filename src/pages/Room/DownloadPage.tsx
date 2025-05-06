import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import MockupVideo from '../../assets/app-demo.mp4'; // Make sure to add your mockup image

const DownloadPage = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500); 

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className={`text-center mt-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-7xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            coZyo
          </h1>
          <p className="text-2xl text-purple-100 mb-12 max-w-2xl mx-auto">
            Simplify Room Management for Owners
          </p>

          {/* Mobile App Mockup */}
          <div className="relative max-w-xs mx-auto mb-16">
            <motion.div
              className="relative mx-auto w-[280px] h-[550px] bg-white rounded-[3rem] border-[14px] border-black overflow-hidden shadow-2xl"
            >
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full object-cover z-0"
              >
                <source src={MockupVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[18px] z-20" />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[120px] h-1 bg-white/80 rounded-full z-20" />
            </motion.div>
          </div>

          {/* Download Buttons */}
          <div id="download" className="flex flex-col sm:flex-row justify-center gap-6 mb-20">
            <a href="https://play.google.com/store" target="_blank" rel="noopener noreferrer" 
               className="group relative inline-flex items-center justify-center p-1 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg transition-all duration-300 hover:scale-105">
              <span className="relative px-6 py-3 transition-all flex items-center gap-3 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 505.499 505.499" className="w-7 h-7" fill="currentColor">
                  <path d="M471.497 234.466l-92.082-53.135-75.733 73.207 69.215 66.907 98.6-56.91c5.43-3.133 8.677-8.756 8.677-15.03 0-6.275-3.245-11.898-8.677-15.039zM363.785 172.3l-101.332-58.497L40.375 0l250.828 242.47M44.063 505.499l218.771-120.512 94.435-54.515-66.065-63.869M25.559 9.815l-.236 485.869 249.322-252.798"/>
                </svg>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-xs font-normal">GET IT ON</span>
                  <span className="text-xl font-semibold">Google Play</span>
                </div>
              </span>
            </a>
            <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer"
               className="group relative inline-flex items-center justify-center p-1 overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg transition-all duration-300 hover:scale-105">
              <span className="relative px-6 py-3 transition-all flex items-center gap-3 text-white">
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z"/>
                </svg>
                <div className="flex flex-col items-start leading-none">
                  <span className="text-xs font-normal">Download on the</span>
                  <span className="text-xl font-semibold">App Store</span>
                </div>
              </span>
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div id="features" className="mt-20">
          <h2 className="text-4xl font-bold text-white text-center mb-16 bg-clip-text">
            Manage Your Rooms Seamlessly
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Dashboard",
                description: "Track room occupancy, bookings, and revenue in real-time.",
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                )
              },
              {
                title: "Automated Bookings",
                description: "Simplify booking management with an automated system.",
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                )
              },
              {
                title: "Payment Integration",
                description: "Secure and seamless payment options for your tenants.",
                icon: (
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                )
              }
            ].map((feature, index) => (
              <div key={index} 
                   className="relative group bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative text-purple-300 mb-6 group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">{feature.title}</h3>
                <p className="text-purple-100">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* App Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10K+", label: "Room Owners" },
            { number: "4.9", label: "App Rating" },
            { number: "500K+", label: "Bookings Processed" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{stat.number}</div>
              <div className="text-purple-200">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-32 border-t border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">coZyo</h3>
              <p className="text-purple-200">Enhancing room management through smart technology</p>
            </div>
            <div className="text-right">
              <div className="flex justify-end space-x-6">
                <a href="#" className="text-purple-200 hover:text-white transition-colors">Terms</a>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="text-purple-200 hover:text-white transition-colors">Support</a>
              </div>
              <p className="text-purple-300 mt-4">© 2025 coZyo. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DownloadPage;