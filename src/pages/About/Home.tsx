import React from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
import { BiSolidQuoteAltLeft, BiSolidQuoteAltRight } from 'react-icons/bi';
import { BsFillRocketTakeoffFill, BsGlobeAmericas, BsCheckCircleFill } from 'react-icons/bs';
import { AiFillHeart } from 'react-icons/ai';
import { RiHomeHeartFill } from 'react-icons/ri';
import TeamMember from './TeamMember';
import Footer from './Footer';

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Shivang Joshi",
      role: "Founder & CEO",
      image: "https://artistsimages.b-cdn.net/johnny-sins/johnny-sins-1.jpg?width=3840&quality=100&format=webp&flop=false",
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
      image: "https://m.media-amazon.com/images/S/pv-target-images/427e83662db9cbb05e222047b5101f683e2e43258a9f556642b2905b26175fee._SX300_.jpg",
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
      image: "https://yt3.googleusercontent.com/3917VLKuuqSE96pZerL61k0tzsfxxCFAJGAdYLernLu88C_jexaQ7-uf5Yl1G4Cgolo9FY9R5w=s900-c-k-c0x00ffffff-no-rj",
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
        {/* Hero Section */}
        <div className="text-center mb-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-purple-100/50 animate-gradient"></div>
          <div className="relative z-10 py-16">
            <h1 className="text-7xl font-bold text-gray-800 mb-8 animate-fade-in">
              About <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-blue-400">coZyo</span>
            </h1>
            <div className="max-w-4xl mx-auto px-6">
              <p className="text-xl text-gray-700 leading-relaxed mb-6 animate-fade-up">
                At coZyo, we understand that moving away from home — whether for studies, work, or new opportunities — is both exciting and challenging. The search for a safe, affordable, and comfortable place to stay in a new city can feel overwhelming, with endless options, uncertain quality, and hidden costs.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                We're more than just an app — we're your companion in the relocation journey, dedicated to helping students, fresh graduates, and professionals find their perfect home-away-from-home with ease, trust, and transparency.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-24">
          <div className="backdrop-blur-lg bg-white/80 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-float">
            <div className="flex items-center mb-4">
              <BsFillRocketTakeoffFill className="text-4xl text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              To empower every student and working professional to settle confidently in a new city by providing an easy-to-use, affordable, and trustworthy platform for booking rooms and mess services — all verified, all transparent, and all accessible right from your phone.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              We believe that when you move for a brighter future, your living arrangements should support your dreams, not stand in the way.
            </p>
          </div>

          <div className="backdrop-blur-lg bg-white/80 p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 animate-float">
            <div className="flex items-center mb-4">
              <BsGlobeAmericas className="text-4xl text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We envision a world where relocation is stress-free — where no student or jobseeker has to worry about overpriced brokers, unverified rentals, or last-minute accommodation problems.
            </p>
            <p className="text-gray-600 leading-relaxed mt-4">
              We aim to become India's most loved platform for room and mess bookings, making the process so smooth and reliable that finding your next home becomes as easy as booking a movie ticket.
            </p>
          </div>
        </div>

        {/* What We Stand For Section */}
        <div className="mb-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-transparent"></div>
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">
            What We <span className="relative">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Stand For</span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} 
                   className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BsCheckCircleFill className="text-2xl text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Story Section */}
        <div className="mb-24">
          <div className="bg-gradient-to-br from-white to-blue-50 p-12 rounded-3xl shadow-xl">
            <div className="flex items-center mb-6">
              <RiHomeHeartFill className="text-4xl text-blue-600 mr-4" />
              <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
            </div>
            <div className="text-gray-600 space-y-4">
              <p>
                coZyo was born from a simple realization: Moving to a new place shouldn't feel like a gamble.
              </p>
              <p>
                As students and professionals ourselves, we faced the same challenges — searching endlessly for a room, worrying about quality, negotiating with strangers, and often paying more than we should.
              </p>
              <p>
                So, we decided to create a platform that we wished existed — one that gives every person the confidence to relocate without fear, and the tools to find a place that feels like home.
              </p>
              <p>
                Today, coZyo is proud to serve thousands of users across India, helping them start new chapters in their lives with comfort, confidence, and care.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-24">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Meet Our <span className="text-blue-600">Team</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>

        {/* Founder's Message Section */}
        <div className="mb-24">
          <div className="max-w-6xl mx-auto overflow-hidden">
            <div className="relative p-12 md:p-20 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-3xl shadow-2xl">
              <FaQuoteLeft className="absolute top-8 left-8 text-blue-400/20 text-7xl" />
              <FaQuoteRight className="absolute bottom-8 right-8 text-blue-400/20 text-7xl" />
              
              <div className="relative z-10">
                <h2 className="text-4xl font-bold text-white mb-12 flex items-center">
                  <span className="mr-4">💬</span> Founder's Message
                </h2>
                
                <div className="text-blue-50 space-y-8 leading-relaxed text-lg max-w-5xl mx-auto">
                  <p>
                    When I founded coZyo, it wasn't just about building another booking app — it was about solving a problem I deeply understood.
                  </p>
                  
                  <p>
                  As someone who moved across cities for study and work, I knew the stress and uncertainty of finding safe, affordable housing — from endless searches and false promises to hidden costs and the fear of unsafe spaces — challenges no one chasing their dreams should face.
                  </p>
                  
                  <p className="font-medium">
                    I believed there had to be a better way.
                  </p>
                  
                  <p>
                    That's why coZyo was born:
                    To create a platform where students, jobseekers, and professionals can confidently explore and book safe, affordable, and verified accommodations — without middlemen, without stress, and without stepping out of their homes.
                  </p>

                  <p>
                    Thank you for trusting coZyo to be a part of your journey. Together, let's make relocation a little less stressful — and a lot more joyful.
                  </p>
                  
                  <div className="mt-8 border-t border-blue-400/30 pt-6">
                    <p className="text-blue-100">With gratitude,</p>
                    <p className="font-bold text-white mt-2">Shivang Joshi</p>
                    <p className="text-blue-200">Founder & CEO, coZyo</p>
                    <p className="text-blue-200 mt-1 text-sm">
                      {new Date().toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;