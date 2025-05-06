import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi';
import { BsFillRocketTakeoffFill, BsGlobeAmericas, BsCheckCircleFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { RiHomeHeartFill } from 'react-icons/ri';
import TeamMember from './TeamMember';
import Footer from './Footer';
import PawanPic from '../../assets/Pawan.jpg';
import DhanrajPic from '../../assets/Dhanraj.jpg';
import AnkitPic from '../../assets/Ankit.jpg';
import { motion } from 'framer-motion';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Shivang Joshi",
      role: "Founder & CEO",
      image: PawanPic,
      bio: "Passionate about making relocation stress-free for students and professionals.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Dhanraj Singh",
      role: "Co-Founder & CTO",
      image: DhanrajPic,
      bio: "Technology enthusiast driving innovation in digital solutions.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    },
    {
      name: "Ankit Kumar",
      role: "Co-Founder & COO",
      image: AnkitPic,
      bio: "Operations expert ensuring smooth user experiences.",
      social: {
        linkedin: "#",
        twitter: "#",
        github: "#"
      }
    }
  ];

  const values = [
    {
      title: "Trust & Transparency",
      description: "We handpick and verify every listing, ensuring you know exactly what you're booking. No surprises, no scams."
    },
    {
      title: "Affordability & Fairness",
      description: "We negotiate the best deals so you get high-quality options at rates that suit a student or young professional's budget."
    },
    {
      title: "Simplicity & Convenience",
      description: "From browsing and virtual tours to secure online payments, we make sure every step is easy, intuitive, and fast."
    },
    {
      title: "Support & Care",
      description: "We're not just a booking app; we're a team that cares. Our support team is always here to help you with any questions or issues."
    },
    {
      title: "Innovation & Growth",
      description: "We constantly improve, adding new features and services to make coZyo even more helpful — because we grow with our users."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-20">
        {/* Enhanced Hero Section */}
        <div className="text-center mb-20 relative overflow-hidden rounded-3xl bg-white/80 backdrop-blur-lg shadow-xl">
          {/* Animated background gradients */}
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 -top-48 -left-48 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute w-96 h-96 -top-48 -right-48 bg-purple-200/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute w-96 h-96 -bottom-48 left-48 bg-pink-200/50 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Content with enhanced animations */}
          <div className="relative z-10 py-24 px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <h1 className="text-7xl font-bold text-gray-800 mb-4">
                About{" "}
                <span className="relative">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400">
                    coZyo
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left scale-x-100"></span>
                </span>
              </h1>
              {/* <div className="flex justify-center space-x-2 text-blue-600">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                >
                  🏠
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
                >
                  🔑
                </motion.div>
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 1.5, delay: 4, repeat: Infinity, repeatType: "reverse" }}
                >
                  ✨
                </motion.div>
              </div> */}
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-gray-700 leading-relaxed mb-6 backdrop-blur-sm bg-white/50 p-6 rounded-xl shadow-lg"
              >
                At coZyo, we understand that moving away from home — whether for studies, work, or new opportunities — is both exciting and challenging. The search for a safe, affordable, and comfortable place to stay in a new city can feel overwhelming, with endless options, uncertain quality, and hidden costs.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl text-gray-700 leading-relaxed backdrop-blur-sm bg-white/50 p-6 rounded-xl shadow-lg"
              >
                We're more than just an app — we're your companion in the relocation journey, dedicated to helping students, fresh graduates, and professionals find their perfect home-away-from-home with ease, trust, and transparency.
              </motion.p>
            </div>

            {/* Decorative elements */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-blue-600"
              />
              <motion.div
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-purple-600"
              />
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12"
          >
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative overflow-hidden"
            >
              <div className="backdrop-blur-lg bg-white/80 p-10 rounded-3xl shadow-xl 
                              transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]
                              border border-blue-100/50">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-100/20 
                                rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"/>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-100 rounded-full blur-md transform group-hover:scale-125 transition-transform"/>
                      <BsFillRocketTakeoffFill className="text-5xl text-blue-600 mr-4 relative z-10 
                                                         transform group-hover:rotate-12 transition-transform duration-300"/>
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent 
                                  bg-gradient-to-r from-blue-600 to-blue-800">
                      Our Mission
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      To empower every student and working professional to settle confidently in a new city by providing 
                      an easy-to-use, affordable, and trustworthy platform for booking rooms and mess services — all verified, 
                      all transparent, and all accessible right from your phone.
                    </p>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      We believe that when you move for a brighter future, your living arrangements should support your dreams, 
                      not stand in the way.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="group relative overflow-hidden"
            >
              <div className="backdrop-blur-lg bg-white/80 p-10 rounded-3xl shadow-xl 
                              transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]
                              border border-purple-100/50">
                {/* Decorative background elements */}
                <div className="absolute inset-0 bg-gradient-to-bl from-purple-50/50 to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-100/20 
                                rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"/>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-purple-100 rounded-full blur-md transform group-hover:scale-125 transition-transform"/>
                      <BsGlobeAmericas className="text-5xl text-purple-600 mr-4 relative z-10 
                                            transform group-hover:rotate-180 transition-transform duration-[2000ms]"/>
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent 
                                  bg-gradient-to-r from-purple-600 to-purple-800">
                      Our Vision
                    </h2>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                      We envision a world where relocation is stress-free — where no student or jobseeker has to worry 
                      about overpriced brokers, unverified rentals, or last-minute accommodation problems.
                    </p>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      We aim to become India's most loved platform for room and mess bookings, making the process so smooth 
                      and reliable that finding your next home becomes as easy as booking a movie ticket.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* What We Stand For Section */}
        <div className="mb-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 -top-48 -right-48 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">
              What We{" "}
              <span className="group inline-block relative">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Stand For
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></span>
              </span>
            </h2>
          </motion.div>

          {/* Values Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="group bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-lg 
                            hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]
                            border border-gray-100 relative overflow-hidden">
                  {/* Decorative gradient background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start space-x-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-blue-100 rounded-lg blur-md transform group-hover:scale-125 transition-transform"></div>
                        <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg relative">
                          <motion.div
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                          >
                            <BsCheckCircleFill className="text-2xl text-white" />
                          </motion.div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold bg-clip-text text-transparent 
                                   bg-gradient-to-r from-blue-600 to-purple-600 mb-3">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 
                                   transition-colors duration-300">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom decorative line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r 
                               from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 
                               transition-transform duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative overflow-hidden"
          >
            <div className="backdrop-blur-lg bg-white/90 p-12 rounded-3xl shadow-xl border border-blue-100/50
                            transition-all duration-500 hover:shadow-2xl group">
              {/* Decorative background elements */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
              <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-blue-100/20 
                              rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"/>
              <div className="absolute -left-32 -top-32 w-96 h-96 bg-purple-100/20 
                              rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"/>
              
              <div className="relative z-10">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex items-center mb-8"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-full blur-lg transform group-hover:scale-150 transition-transform"/>
                    <RiHomeHeartFill className="text-5xl text-blue-600 mr-4 relative z-10 transform 
                                          group-hover:scale-110 group-hover:text-blue-700 transition-all duration-300"/>
                  </div>
                  <h2 className="text-4xl font-bold bg-clip-text text-transparent 
                                 bg-gradient-to-r from-blue-600 to-purple-600">
                    Our Story
                  </h2>
                </motion.div>

                <div className="space-y-6">
                  {["coZyo was born from a simple realization: Moving to a new place shouldn't feel like a gamble.",
                    "As students and professionals ourselves, we faced the same challenges — searching endlessly for a room, worrying about quality, negotiating with strangers, and often paying more than we should.",
                    "So, we decided to create a platform that we wished existed — one that gives every person the confidence to relocate without fear, and the tools to find a place that feels like home.",
                    "Today, coZyo is proud to serve thousands of users across India, helping them start new chapters in their lives with comfort, confidence, and care."
                  ].map((text, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-gray-600 leading-relaxed text-lg relative"
                    >
                      <span className="relative z-10">{text}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-purple-50/10 to-blue-50/0 
                                      opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"/>
                    </motion.p>
                  ))}
                </div>

                {/* Decorative elements */}
                <motion.div 
                  className="absolute bottom-4 right-4 flex space-x-1"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-2 h-2 rounded-full bg-blue-400/30"/>
                  <div className="w-2 h-2 rounded-full bg-purple-400/30"/>
                  <div className="w-2 h-2 rounded-full bg-blue-400/30"/>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Team Section */}
        <div className="mb-24 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute w-96 h-96 -top-48 -right-48 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute w-96 h-96 -bottom-48 -left-48 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          </div>

          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative z-10 text-center mb-16"
          >
            <h2 className="text-5xl font-bold mb-4">
              Meet Our{" "}
              <span className="relative inline-block">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                  Team
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></span>
              </span>
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-600 text-lg max-w-2xl mx-auto"
            >
              The passionate individuals behind coZyo working to transform your relocation experience
            </motion.p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <TeamMember {...member} />
              </motion.div>
            ))}
          </div>

          {/* Decorative Elements */}
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-2 h-2 rounded-full bg-blue-400/30"/>
            <div className="w-2 h-2 rounded-full bg-purple-400/30"/>
            <div className="w-2 h-2 rounded-full bg-blue-400/30"/>
          </motion.div>
        </div>

        {/* Founder's Message Section */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto overflow-hidden"
          >
            <div className="relative p-12 md:p-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 
                            rounded-3xl shadow-2xl group hover:shadow-blue-500/25 transition-all duration-500">
              {/* Animated background patterns */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] 
                              bg-[size:40px_40px] opacity-20"/>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 
                              opacity-0 group-hover:opacity-100 transition-opacity duration-700"/>
              
              {/* Animated quote icons */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 0.2, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <FaQuoteLeft className="absolute top-8 left-8 text-blue-400/20 text-7xl transform 
                                       group-hover:scale-125 transition-transform duration-500" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 0.2, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <FaQuoteRight className="absolute bottom-8 right-8 text-blue-400/20 text-7xl transform 
                                        group-hover:scale-125 transition-transform duration-500" />
              </motion.div>

              {/* Content */}
              <div className="relative z-10">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-4xl font-bold text-white mb-12 flex items-center"
                >
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mr-4 text-5xl"
                  >
                    💬
                  </motion.span>
                  Founder's Message
                </motion.h2>

                <div className="text-blue-50 space-y-8 leading-relaxed text-lg max-w-5xl mx-auto">
                  {[
                    "When I founded coZyo, it wasn't just about building another booking app — it was about solving a problem I deeply understood.",
                    "As someone who moved across cities for study and work, I knew the stress and uncertainty of finding safe, affordable housing — from endless searches and false promises to hidden costs and the fear of unsafe spaces — challenges no one chasing their dreams should face.",
                    "I believed there had to be a better way.",
                    "That's why coZyo was born: To create a platform where students, jobseekers, and professionals can confidently explore and book safe, affordable, and verified accommodations — without middlemen, without stress, and without stepping out of their homes.",
                    "Thank you for trusting coZyo to be a part of your journey. Together, let's make relocation a little less stressful — and a lot more joyful."
                  ].map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`${index === 2 ? 'font-medium text-white' : ''} 
                                 backdrop-blur-sm bg-white/5 p-4 rounded-lg
                                 hover:bg-white/10 transition-colors duration-300`}
                    >
                      {paragraph}
                    </motion.p>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 border-t border-blue-400/30 pt-8"
                  >
                    <p className="text-blue-100">With gratitude,</p>
                    <div className="mt-4 flex items-center">
                      <div className="mr-4">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 
                                   flex items-center justify-center text-2xl font-bold text-white"
                        >
                          SJ
                        </motion.div>
                      </div>
                      <div>
                        <p className="font-bold text-white text-xl">Shivang Joshi</p>
                        <p className="text-blue-200">Founder & CEO, coZyo</p>
                        <p className="text-blue-200/80 text-sm mt-1">
                          {new Date().toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;