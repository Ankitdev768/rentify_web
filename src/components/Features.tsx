import React from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

// Import your Lottie files
import verifiedAnim from '../animations/verified.json';
import walletAnim from '../animations/wallet.json';
import trustedAnim from '../animations/trusted.json';

const features = [
  {
    animation: verifiedAnim,
    title: 'Verified Listings Only',
    description: 'Every property is thoroughly verified by our team for your peace of mind',
    color: 'from-green-400 via-emerald-500 to-green-600'
  },
  {
    animation: walletAnim,
    title: 'Budget-Friendly Options',
    description: 'Find accommodations that perfectly match your budget and preferences',
    color: 'from-blue-400 via-indigo-500 to-purple-600'
  },
  {
    animation: trustedAnim,
    title: 'Trusted by Many',
    description: 'Join thousands of satisfied users who found their perfect home through us',
    color: 'from-pink-400 via-purple-500 to-red-500'
  },
];

const Features = () => {
  return (
    <ParallaxProvider>
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative py-28 px-6 bg-gray-100 overflow-hidden"
      >
       

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <h2 className="text-5xl font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Your Comfort, Our Priority
            </h2>
            <p className="text-gray-600 text-lg mt-4">
              Experience hassle-free room hunting with our premium features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <Parallax key={feature.title} speed={index % 2 === 0 ? -10 : 10}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.1,
                    rotateX: 10,
                    rotateY: -10,
                    boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.2)',
                  }}
                  transition={{ duration: 0.5, type: 'spring' }}
                  viewport={{ once: true }}
                  className="relative p-8 rounded-3xl backdrop-blur-xl bg-white/80 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Animated Lottie Icon */}
                  <div className="relative w-20 h-20 mb-6 mx-auto">
                    <div className={`w-full h-full bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-md`}>
                      <Lottie animationData={feature.animation} loop={true} />
                    </div>
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-30 rounded-xl blur-md group-hover:blur-lg transition-all`} />
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-800 mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed text-center">
                    {feature.description}
                  </p>

                  {/* Magnetic Glow Border */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none border-2 border-transparent group-hover:border-white/20 transition-all duration-300" />
                </motion.div>
              </Parallax>
            ))}
          </div>
        </div>
      </motion.section>
    </ParallaxProvider>
  );
};

export default Features;
