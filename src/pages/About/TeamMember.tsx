import React from 'react';
import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, bio, social }) => {
  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl bg-white/80 backdrop-blur-lg shadow-lg 
                 border border-gray-100/50 transition-all duration-300 hover:shadow-xl"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
      
      {/* Image Container */}
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"/>
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute bottom-4 left-4 z-20">
          <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
          <p className="text-blue-100">{role}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-gray-600 leading-relaxed mb-6">{bio}</p>
        
        {/* Social Links */}
        <div className="flex space-x-4">
          {Object.entries(social).map(([platform, link], index) => (
            <motion.a
              key={platform}
              href={link}
              whileHover={{ y: -4 }}
              className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
            >
              {platform === 'linkedin' && <FaLinkedin className="w-5 h-5" />}
              {platform === 'twitter' && <FaTwitter className="w-5 h-5" />}
              {platform === 'github' && <FaGithub className="w-5 h-5" />}
            </motion.a>
          ))}
        </div>
      </div>

      {/* Hover effect line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"/>
    </motion.div>
  );
};

export default TeamMember;