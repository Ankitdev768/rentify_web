import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import Logo from '../../assets/rentify_logo.png'; // Add your logo path here

const Footer = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 -top-48 -right-48 bg-blue-500/5 rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-purple-500/5 rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* About Section */}
          <motion.div 
            {...fadeInUp}
            transition={{ duration: 0.6 }}
            className="col-span-2"
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="inline-block mb-6"
            >
              <img 
                src={Logo} 
                alt="coZyo Logo" 
                className="h-20 w-auto filter brightness-0 invert" // Inverts logo color to white
              />
            </motion.div>
           
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted partner for smart, affordable living. Making relocation stress-free for students and professionals across India.
            </p>
            <div className="flex space-x-6">
              {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ y: -4, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <Icon className="text-2xl" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-xl font-semibold mb-6 text-blue-400">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { text: 'coZyo', path: '/#' },
                { text: 'Mess Owners', path: '/mess-owner' },
                { text: 'Room Owners', path: '/room-owner' },
                { text: 'Contact', path: '/contact-page' }
              ].map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <a
                    href="#"
                    onClick={() => window.open(link.path, '_blank')}
                    className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2 group"
                  >
                    <span className="h-px w-4 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    <span>{link.text}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            {...fadeInUp}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="text-xl font-semibold mb-6 text-blue-400">Contact Us</h4>
            <ul className="space-y-4">
              {[
                { icon: FaEnvelope, text: 'support@cozyo.com' },
                { icon: FaPhone, text: '+91 XXXXX XXXXX' },
                { icon: FaMapMarkerAlt, text: 'Patna, Bihar' }
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-3 text-gray-400 group"
                  whileHover={{ x: 6 }}
                >
                  <item.icon className="text-blue-400 group-hover:text-blue-300 transition-colors" />
                  <span className="group-hover:text-white transition-colors">{item.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} coZyo. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;