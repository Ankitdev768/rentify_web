import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight } from 'lucide-react';

// Import images
import delhiImg from '../assets/room1.jpeg';
import mumbaiImg from '../assets/room2.jpeg';
import patnaImg from '../assets/room3.jpeg';
import kolkataImg from '../assets/room4.jpeg';
import bangaloreImg from '../assets/room5.jpeg';
import hyderabadImg from '../assets/room6.jpeg';

const cities = [
  {
    name: 'Delhi',
    image: delhiImg,
  },
  {
    name: 'Mumbai',
    image: mumbaiImg,
  },
  {
    name: 'Patna',
    image: patnaImg,
  },
  {
    name: 'Kolkata',
    image: kolkataImg,
  },
  {
    name: 'Bangalore',
    image: bangaloreImg,
  },
  {
    name: 'Hyderabad',
    image: hyderabadImg,
  },
];

const ScrollCityShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Animation controls
  const textControls = useAnimation();
  const imageControls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      textControls.start({ opacity: 1, x: 0 });
      imageControls.start({ opacity: 1, x: 0 });
    } else {
      textControls.start({ opacity: 0, x: -50 });
      imageControls.start({ opacity: 0, x: 50 });
    }
  }, [inView, textControls, imageControls]);

  // Auto-slide logic
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % cities.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <section
      ref={ref}
      className="h-screen relative bg-gradient-to-b from-white to-gray-100"
    >
      <div className="h-screen flex flex-col md:flex-row items-center justify-between gap-10 px-8 md:px-16 z-10">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={textControls}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full md:w-1/2 space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
            🌆 Popular Rooms in India
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-md">
            Discover your next home in these thriving urban centers. Enjoy the slideshow.
          </p>
        </motion.div>

        {/* Right Card */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={imageControls}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full md:w-1/2 h-[500px] relative rounded-3xl overflow-hidden shadow-2xl backdrop-blur-md"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={cities[activeIndex].name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0"
            >
              <img
                src={cities[activeIndex].image}
                alt={cities[activeIndex].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-6 text-white flex justify-between items-end">
                <div>
                  <h2 className="text-3xl font-bold drop-shadow-lg">
                    {cities[activeIndex].name}
                  </h2>
                  <p className="text-sm text-gray-200 mt-1">
                    Explore available rentals
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/20 backdrop-blur-md text-white border border-white/30 px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-white/30"
                >
                  View on App <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollCityShowcase;
