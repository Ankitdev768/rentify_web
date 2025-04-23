import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroBg from '../assets/herobg.jpeg';
import logo from '../assets/rentify_logo.png';

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
        {/* Rentify Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-2"
        >
          <img
            src={logo}
            alt="coZyo"
            className="w-auto h-32 md:h-40" // Increased height
          />

        </motion.div>


        {/* Subheading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="text-3xl md:text-5xl text-white font-bold mb-4 leading-snug"
        >
          Find Your Perfect <span className="text-indigo-400">Stay</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="text-base md:text-lg text-white/80 mb-10 max-w-xl mx-auto"
        >
          Discover comfortable rooms, flats, and PGs that feel just like home.
        </motion.p>

        {/* Store Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          {/* Store Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            {/* Play Store */}
            <a
              href="#"
              className="group relative overflow-hidden px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-indigo-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-indigo-500/30 flex items-center justify-center"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Play Store"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              {/* Glow effect */}
              <span className="absolute inset-0 bg-indigo-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-sm" />
            </a>

            {/* App Store */}
            <a
              href="#"
              className="group relative overflow-hidden px-5 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-purple-400 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-purple-500/30 flex items-center justify-center"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="App Store"
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
              />
              {/* Glow effect */}
              <span className="absolute inset-0 bg-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl blur-sm" />
            </a>
          </div>

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

export default Hero;
