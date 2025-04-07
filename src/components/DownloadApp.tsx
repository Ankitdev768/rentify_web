import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { QrCode } from 'lucide-react';

const DownloadApp = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [0, window.innerHeight], [-10, 10]);
  const rotateY = useTransform(mouseX, [0, window.innerWidth], [-10, 10]);

  const handleMouseMove = (event: React.MouseEvent) => {
    mouseX.set(event.clientX);
    mouseY.set(event.clientY);
  };

  return (
    <section className="py-20 px-4 overflow-hidden" onMouseMove={handleMouseMove}>
      <div className="max-w-7xl mx-auto">
        {/* Unified background container */}
        <div className="flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-10 rounded-3xl h-[450px]">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-white text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get the App Now</h2>
            <p className="text-xl text-white/90 mb-8">Find rooms on the go!</p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              <motion.a
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-2"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play Logo"
                  className="w-32"
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
                  className="w-32"
                />
              </motion.a>
            </div>

            {/* QR Code */}
            <div className="flex items-center gap-6 justify-center lg:justify-start">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-24 h-24 bg-white p-4 rounded-lg shadow-lg relative group"
              >
                <QrCode className="w-full h-full text-gray-900" />
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
              </motion.div>
              <div>
                <p className="font-semibold mb-1">Scan to Download</p>
                <p className="text-sm text-white/80">Point your camera at the QR code to download the app</p>
              </div>
            </div>
          </motion.div>

          {/* Phone Mockup with Background */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mt-10 lg:mt-0"
            style={{ rotateX, rotateY }}
          >
            <div className="relative mx-auto w-[280px] h-[550px] bg-black rounded-[3rem] border-[14px] border-black overflow-hidden shadow-2xl">
              {/* Background behind app UI */}
              <img
                src="https://github.com/TheSensors/thesensorsimage/blob/main/Room%20Booking%20App.png?raw=true"
                alt="App interface mockup"
                className="relative w-full h-full object-cover z-10"
              />
              {/* Dynamic Island */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[18px] z-20" />
              {/* Home Indicator */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[120px] h-1 bg-white/80 rounded-full z-20" />
            </div>
            {/* Reflection */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[280px] h-[580px] bg-gradient-to-tr from-white/20 to-transparent rounded-[3rem] blur-xl -z-10"
              style={{ rotateX, rotateY }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
