import React from 'react';
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
    <div className="group relative overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="aspect-w-3 aspect-h-4">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-64 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="p-6 bg-white">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{name}</h3>
        <p className="text-blue-600 font-medium mb-3">{role}</p>
        <p className="text-gray-600 mb-4">{bio}</p>
        
        <div className="flex space-x-4">
          <a
            href={social.linkedin}
            className="text-gray-400 hover:text-blue-600 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="text-xl" />
          </a>
          <a
            href={social.twitter}
            className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="text-xl" />
          </a>
          <a
            href={social.github}
            className="text-gray-400 hover:text-gray-800 transition-colors duration-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub className="text-xl" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;