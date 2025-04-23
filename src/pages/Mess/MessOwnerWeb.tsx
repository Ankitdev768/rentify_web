import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronDown, Star, Users, Building } from 'lucide-react';
import heroBg from '../../assets/herobg.jpeg';
import logo from '../../assets/rentify_logo.png';
import WhyPartner from './WhyPartner';
import FAQPage from './FAQPage';
import DownloadPage from './DownloadPage';

const Hero = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Enhanced parallax effects with more dynamic ranges
  const backgroundY = useTransform(scrollY, [0, 1000], [0, 300]);
  const backgroundScale = useTransform(scrollY, [0, 1000], [1.25, 1.5]);
  const backgroundOpacity = useTransform(scrollY, [0, 500], [1, 0.5]);

  // Content parallax effects
  const contentY = useTransform(scrollY, [0, 500], [0, -150]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);

  // Stats parallax effects - each stat moves at different speeds
  const statsY = useTransform(scrollY, [0, 500], [0, -50]);
  const statsOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Individual stat animations with different speeds
  const stat1X = useTransform(scrollY, [0, 500], [0, -50]);
  const stat2X = useTransform(scrollY, [0, 500], [0, 0]);
  const stat3X = useTransform(scrollY, [0, 500], [0, 50]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { icon: Users, value: "1000+", label: "Happy Customers", transform: stat1X },
    { icon: Building, value: "500+", label: "Listed Properties", transform: stat2X },
    { icon: Star, value: "4.8", label: "Average Rating", transform: stat3X },
  ];

  return (
    <div>
      <div className="relative h-screen w-full overflow-hidden">
        {/* Enhanced Parallax Background */}
        <motion.div 
          style={{ 
            y: backgroundY,
            scale: backgroundScale,
            opacity: backgroundOpacity
          }} 
          className="absolute inset-0 z-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center brightness-[0.65] transform-gpu transition-all duration-700"
            style={{
              backgroundImage: `url(${heroBg})`,
            }}
          />
          {/* Enhanced gradient overlay with more subtle parallax effect */}
          <motion.div 
            style={{ opacity: useTransform(scrollY, [0, 500], [0.6, 0.8]) }}
            className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/90" 
          />
          {/* Improved grain effect */}
          <motion.div 
            style={{ opacity: useTransform(scrollY, [0, 500], [0.15, 0.25]) }}
            className="absolute inset-0"
          >
            <div className="h-full w-full grain-effect" />
          </motion.div>
        </motion.div>

        {/* Main Content with Enhanced Parallax */}
        <motion.div
          style={{ 
            y: contentY,
            opacity: contentOpacity
          }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center"
        >
          {/* Logo with enhanced animation */}
          <AnimatePresence>
            {isVisible && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 1,
                  type: "spring",
                  stiffness: 100,
                  damping: 15
                }}
                className="mb-8"
              >
                <img
                  src={logo}
                  alt="coZyo"
                  className="w-auto h-24 md:h-32 lg:h-40 drop-shadow-2xl"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Heading with enhanced parallax */}
          <motion.h1
            style={{ y: useTransform(scrollY, [0, 300], [0, -30]) }}
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
              Partner with coZyo<br />
              and grow your business
            </span>
          </motion.h1>

          {/* Stats with individual parallax effects */}
          <motion.div
            style={{ 
              y: statsY,
              opacity: statsOpacity
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                style={{ x: stat.transform }}
                className="flex flex-col items-center"
              >
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-green-400 mb-2" />
                <span className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</span>
                <span className="text-gray-300 text-sm md:text-base">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button with parallax hover effect */}
          <motion.div
            style={{ y: useTransform(scrollY, [0, 300], [0, -20]) }}
            className="flex flex-col gap-4 md:flex-row md:gap-6 items-center"
          >
            <button
              onClick={() => window.open('/mess-owner-form', '_blank')}
              className="group relative overflow-hidden px-6 py-3 md:px-8 md:py-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-green-500/30"
            >
              <span className="relative z-10 flex items-center justify-center text-white font-semibold text-base md:text-lg">
                Register Your Mess
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="ml-2"
                >
                  →
                </motion.div>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>

            <a href="#learn-more" className="text-gray-300 hover:text-white transition-colors duration-300 underline-offset-4 hover:underline text-sm md:text-base">
              Learn More
            </a>
          </motion.div>
        </motion.div>
      </div>

      <WhyPartner />
      <FAQPage />
      <DownloadPage />
    </div>
  );
};

export default Hero;