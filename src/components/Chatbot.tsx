import React, { useState } from 'react';
import { FaRobot, FaComments } from 'react-icons/fa';

const Chatbot: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleChatbotClick = () => {
    console.log('Chatbot clicked');
    window.open('/chatbot', '_blank');
  };

  return (
    <div
      className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 cursor-pointer z-50"
      onClick={handleChatbotClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          bg-gradient-to-r from-pink-500 to-blue-500
          rounded-full p-3 sm:p-4 shadow-lg
          transition-all duration-500 ease-in-out
          ${isHovered ? 'scale-110 shadow-2xl rotate-6' : ''}
          hover:from-pink-600 hover:to-blue-600
          hover:ring-4 hover:ring-pink-300/50
          hover:ring-offset-2 hover:ring-offset-white/20
          group relative
          animate-float
        `}
      >
        <div className="relative">
          <FaRobot 
            className={`
              text-white text-2xl sm:text-3xl
              transition-all duration-300
              transform group-hover:scale-110
              group-hover:rotate-12
              ${isHovered ? 'opacity-0' : 'opacity-100'}
            `} 
          />
          <FaComments 
            className={`
              absolute inset-0
              text-white text-2xl sm:text-3xl
              transition-all duration-300
              transform group-hover:scale-110
              ${isHovered ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}
            `}
          />
          
        </div>
      </div>
    </div>
  );
};

export default Chatbot;