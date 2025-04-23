import { useNavigate } from 'react-router-dom';
import { HomeIcon, UtensilsIcon, Users2Icon, StarIcon, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Join = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.8]);



  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity }}
      className="min-h-screen relative bg-gradient-to-br from-white via-gray-50 to-white py-32 overflow-hidden"
    >
      {/* Subtle background patterns */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[800px] h-[800px] bg-gradient-to-r from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -top-96 -left-96 animate-blob" />
        <div className="absolute w-[600px] h-[600px] bg-gradient-to-r from-orange-100/40 to-rose-100/40 rounded-full blur-3xl top-1/2 -right-96 animate-blob animation-delay-2000" />
        <div className="absolute w-[500px] h-[500px] bg-gradient-to-r from-green-100/40 to-teal-100/40 rounded-full blur-3xl -bottom-96 left-1/4 animate-blob animation-delay-4000" />
      </div>

      <motion.div 
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block"
          >
            <span className="px-4 py-2 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold mb-8 inline-block">
              Join Our Network
            </span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-7xl font-black text-gray-900 tracking-tight"
          >
            Partner With Us
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-600 mt-6 max-w-2xl mx-auto"
          >
            Expand your reach by joining our platform as a Room or Mess Owner
          </motion.p>

         
        </div>

        {/* Cards Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-10 mt-10">
          {/* Mess Owner Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="group relative w-96"
          >
            <div className="relative bg-white rounded-3xl p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]">
              <div className="relative flex justify-between items-start">
                <div className="p-4 bg-orange-50 rounded-2xl">
                  <UtensilsIcon className="text-orange-600 w-10 h-10" />
                </div>
                <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-4 py-1 rounded-full">
                  Popular Choice
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Mess Owner</h3>
              <p className="text-gray-600 mb-8">List your mess and reach thousands of hungry tenants nearby.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Reach local customers</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Simple menu management</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('/mess-owner', '_blank')}
                className="mt-8 w-full bg-orange-600 text-white py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-orange-700 transition-colors duration-300"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {/* Room Owner Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="group relative w-96"
          >
            <div className="relative bg-white rounded-3xl p-8 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)]">
              <div className="relative flex justify-between items-start">
                <div className="p-4 bg-green-50 rounded-2xl">
                  <HomeIcon className="text-green-600 w-10 h-10" />
                </div>
                <span className="text-sm font-semibold text-green-600 bg-green-50 px-4 py-1 rounded-full">
                  High Demand
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-4">Room Owner</h3>
              <p className="text-gray-600 mb-8">Post your rooms and connect with verified tenants instantly.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Verified tenants only</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-600">Easy property listing</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => window.open('/room-owner', '_blank')}
                className="mt-8 w-full bg-green-600 text-white py-4 px-6 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors duration-300"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Join;