import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { QRCodeCanvas } from "qrcode.react";
import appMockup from '../assets/app-mockup.png';

const DownloadApp = () => {
  // Separate cursor trackers
  const mouseX_qr = useMotionValue(0);
  const mouseY_qr = useMotionValue(0);
  const mouseX_phone = useMotionValue(0);
  const mouseY_phone = useMotionValue(0);

  // Magnet strengths
  const strength_qr = 40;
  const strength_phone = 60;

  // Transforms for QR
  const qrMagnetX = useTransform(mouseX_qr, (val) => (val - window.innerWidth / 2) / strength_qr);
  const qrMagnetY = useTransform(mouseY_qr, (val) => (val - window.innerHeight / 2) / strength_qr);

  // Transforms for Phone
  const phoneMagnetX = useTransform(mouseX_phone, (val) => (val - window.innerWidth / 2) / strength_phone);
  const phoneMagnetY = useTransform(mouseY_phone, (val) => (val - window.innerHeight / 2) / strength_phone);

  // Add scroll animation values
  const { scrollYProgress } = useScroll();
  const contentX = useTransform(scrollYProgress, [0.5, 1.8], [0, -100]);
  const mockupX = useTransform(scrollYProgress, [0.5, 1.8], [0, 100]);

  // Add window width check
  const [isDesktop, setIsDesktop] = React.useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsDesktop(window.innerWidth >= 1024); // 1024px is the 'lg' breakpoint in Tailwind
    };
    
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  return (
    <section className="py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-10 rounded-3xl min-h-[500px]">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            style={{ x: isDesktop ? contentX : 0 }}
            className="text-white text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get the App Now</h2>
            <p className="text-xl text-white/90 mb-8">Find rooms on the go!</p>

            <div className="flex flex-row gap-4 mb-8 justify-center lg:justify-start">
              <motion.a
                href="https://pornhub.com/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-32"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play Logo"
                  className="w-full"
                />
              </motion.a>
              <motion.a
                href="https://pornhub.com/"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-32"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="App Store Logo"
                  className="w-full"
                />
              </motion.a>
            </div>

            {/* QR Code Magnetic */}
            <motion.div
              className="flex items-center gap-6 justify-center lg:justify-start"
              onMouseMove={(e) => {
                mouseX_qr.set(e.clientX);
                mouseY_qr.set(e.clientY);
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-xl shadow-lg relative group flex items-center justify-center"
                style={{
                  x: qrMagnetX,
                  y: qrMagnetY,
                }}
              >
                <div className="bg-white p-2 rounded-lg shadow-md overflow-hidden">
                  <QRCodeCanvas
                    value="https://github.com/Ankitdev768/APP/releases/download/v1.0.0/rentify.apk"
                    size={80}
                    fgColor="#000000"
                    marginSize={0}
                  />
                </div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
              </motion.div>
              <div>
                <p className="font-semibold mb-1">Scan to Download</p>
                <p className="text-sm text-white/80">Point your camera at the QR code to download the app</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Phone Magnetic */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mt-10 lg:mt-0"
            style={{
              y: phoneMagnetY,
              x: isDesktop ? mockupX : 0
            }}
            onMouseMove={(e) => {
              mouseX_phone.set(e.clientX);
              mouseY_phone.set(e.clientY);
            }}
          >
            <motion.div
              className="relative mx-auto w-[280px] h-[550px] bg-black rounded-[3rem] border-[14px] border-black overflow-hidden shadow-2xl"
              style={{
                x: phoneMagnetX,
                y: phoneMagnetY,
              }}
            >
              <img
                src={appMockup}
                alt="App interface mockup"
                className="w-full h-full object-cover z-10"
              />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-black rounded-b-[18px] z-20" />
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-[120px] h-1 bg-white/80 rounded-full z-20" />
            </motion.div>

            {/* Blur Glow */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[280px] h-[580px] bg-gradient-to-tr from-white/20 to-transparent rounded-[3rem] blur-xl -z-10"
              style={{ x: phoneMagnetX, y: phoneMagnetY }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;
