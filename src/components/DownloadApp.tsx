import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { QrCode } from 'lucide-react';

const DownloadApp = () => {
  const scrollY = useMotionValue(0);
  const textTranslateY = useTransform(scrollY, [0, 500], [0, -50]);
  const mockupTranslateY = useTransform(scrollY, [0, 500], [0, 50]);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4 sm:p-8 md:p-10 rounded-3xl lg:h-[450px] gap-8 lg:gap-0">
          {/* Content */}
          <motion.div
            style={{ y: textTranslateY }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white text-center sm:text-center md:text-left lg:text-left w-full lg:w-1/2"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Get the App Now
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8">
              Find rooms on the go!
            </p>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-4 items-center justify-center sm:justify-start mb-6 w-full">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play Logo"
                  className="w-36 sm:w-32"
                />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store Logo"
                  className="w-36 sm:w-32"
                />
              </motion.a>
            </div>

            {/* QR Code */}
            <div className="flex flex-row flex-wrap items-center justify-center sm:justify-start gap-4 sm:gap-6 w-full">

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-20 sm:w-24 h-20 sm:h-24 bg-white p-4 rounded-lg shadow-lg relative group"
              >
                <QrCode className="w-full h-full text-gray-900" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
              </motion.div>
              <div className="text-center sm:text-left">
                <p className="font-semibold mb-1">Scan to Download</p>
                <p className="text-sm text-white/80">
                  Point your camera at the QR code to download the app
                </p>
              </div>
            </div>
          </motion.div>

          {/* Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative w-full flex justify-center lg:justify-end lg:w-1/2"
          >
            <div className="relative w-[180px] sm:w-[200px] md:w-[240px] h-[360px] sm:h-[420px] md:h-[500px] bg-black rounded-[2rem] sm:rounded-[3rem] border-[8px] sm:border-[12px] border-black overflow-hidden shadow-2xl">
              <img
                src="https://github.com/TheSensors/thesensorsimage/blob/main/Room%20Booking%20App.png?raw=true"
                alt="App interface mockup"
                className="w-full h-full object-cover z-10"
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100px] h-[30px] bg-black rounded-b-[18px] z-20" />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[100px] h-1 bg-white/80 rounded-full z-20" />
            </div>

            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[240px] md:w-[280px] h-[500px] md:h-[580px] bg-gradient-to-tr from-white/20 to-transparent rounded-[3rem] blur-xl -z-10"
              style={{ rotateX, rotateY }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
