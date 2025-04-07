import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import Lottie from 'lottie-react';

import singleRoomAnim from '../animations/single-room.json';
import flatAnim from '../animations/flat.json';
import hostelAnim from '../animations/hostel.json';
import sharedRoomAnim from '../animations/shared-room.json';
import messAnim from '../animations/mess.json';

const categories = [
  {
    name: 'Single Room',
    lottie: singleRoomAnim,
    description: 'Perfect for solo living',
    color: 'from-green-400 via-emerald-500 to-green-600'
  },
  {
    name: 'Flat/Apartment',
    lottie: flatAnim,
    description: 'Full home experience',
    color: 'from-blue-400 via-indigo-500 to-purple-600'
  },
  {
    name: 'PG/Hostel',
    lottie: hostelAnim,
    description: 'Student friendly options',
    color: 'from-pink-400 via-purple-500 to-red-500'
  },
  {
    name: 'Shared Room',
    lottie: sharedRoomAnim,
    description: 'Share with roommates',
    color: 'from-yellow-400 via-orange-500 to-red-600'
  },
  {
    name: 'Mess',
    lottie: messAnim,
    description: 'Budget-friendly meals.',
    color: 'from-indigo-400 via-purple-500 to-pink-600'
  },
];

const Categories = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xCard = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1.05]);

  return (
    <section className="relative py-20 px-4 sm:py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      
      <div className="max-w-7xl mx-auto" ref={containerRef}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Find the Right Type of Stay
          </h2>
          <p className="text-gray-600 text-lg">
            Browse through our curated selection of accommodations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 relative z-10">
          {categories.map((category, index) => {
            const cardRef = useRef(null);
            const x = useMotionValue(0);
            const y = useMotionValue(0);

            const handleMouseMove = (e) => {
              const rect = cardRef.current.getBoundingClientRect();
              const mouseX = e.clientX - rect.left;
              const mouseY = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;

              const deltaX = (mouseX - centerX) * 0.2;
              const deltaY = (mouseY - centerY) * 0.2;

              x.set(deltaX);
              y.set(deltaY);
            };

            const handleMouseLeave = () => {
              x.set(0);
              y.set(0);
            };

            return (
              <Tilt
                key={category.name}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#ffffff"
                glarePosition="all"
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                scale={1.03}
                transitionSpeed={400}
                className="w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, type: 'spring', stiffness: 120 }}
                  className="group relative isolate"
                  style={{ x: xCard, rotateY: rotate, scale }}
                >
                  <motion.div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className="relative overflow-hidden rounded-2xl bg-white/50 backdrop-blur-xl border border-white/20 p-8 shadow-lg transition-all duration-300 group-hover:shadow-2xl"
                    style={{ x, y }}
                  >
                    <div className="mb-6 relative flex justify-center">
                      <div className={`w-24 h-24 flex items-center justify-center bg-gradient-to-br ${category.color} rounded-xl shadow-md`}>
                        <Lottie
                          animationData={category.lottie}
                          loop={true}
                          style={{ width: '100%', height: '100%' }}
                        />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-center text-sm">
                      {category.description}
                    </p>
                  </motion.div>
                </motion.div>
              </Tilt>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
