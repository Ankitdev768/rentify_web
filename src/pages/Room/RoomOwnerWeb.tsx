import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroBg from '../../assets/heroBg.jpeg';
import logo from '../../assets/rentify_logo.png';
import WhyPartner from './WhyPartner';
import FAQPage from './FAQPage';

const Hero = () => {
  const { scrollY } = useScroll();

  // Parallax movement for different layers
  const backgroundY = useTransform(scrollY, [0, 500], [0, 200]);
  const contentY = useTransform(scrollY, [0, 300], [0, -100]);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center scale-125 brightness-90"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <img
            src={logo}
            alt="RoomOwner"
            className="w-auto h-32 md:h-40"
          />
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-5xl text-white font-bold mb-4 leading-snug"
        >
          Maximize Your Room's Potential<br />
          <span className="text-2xl md:text-4xl text-gray-200">
            Join thousands of successful room owners
          </span>
        </motion.h1>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex gap-8 md:gap-16 mb-8 text-white"
        >
          <div>
            <p className="text-3xl font-bold">5000+</p>
            <p className="text-sm">Active Listings</p>
          </div>
          <div>
            <p className="text-3xl font-bold">98%</p>
            <p className="text-sm">Occupancy Rate</p>
          </div>
          <div>
            <p className="text-3xl font-bold">24/7</p>
            <p className="text-sm">Support</p>
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col md:flex-row gap-4 mt-8"
        >
          {/* List Room Button */}
          <button
            onClick={() => window.open('/list-property', '_blank')}
            className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-white text-gray-900 hover:bg-blue-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center font-semibold text-lg"
          >
            List Your Property
          </button>

          {/* Owner Dashboard Button */}
          <button
            onClick={() => window.open('/owner-dashboard', '_blank')}
            className="group relative overflow-hidden px-8 py-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-blue-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center text-white font-semibold text-lg"
          >
            Owner Dashboard
            <span className="absolute inset-0 bg-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-sm" />
          </button>
        </motion.div>

       

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute bottom-10"
        >
          <ChevronDown className="text-white/70 w-8 h-8" />
        </motion.div>
      </motion.div>
    </div>
    
  );
};

const RoomOwnerWeb = () => {
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Why Partner Section */}
      <WhyPartner />
      <FAQPage/>
    </div>
  );
};

export default RoomOwnerWeb;