import React from 'react';
import { FaRobot } from 'react-icons/fa';

const Chatbot: React.FC = () => {
  const handleChatbotClick = () => {
    console.log('Chatbot clicked');
    window.open('/chatbot', '_blank');
  };

  return (
    <div
      className="fixed bottom-8 right-8 cursor-pointer"
      onClick={handleChatbotClick}
    >
      <div className="bg-primary hover:bg-primary/90 rounded-full p-4 shadow-lg transition-transform hover:scale-110">
        <FaRobot className="text-white text-3xl" />
      </div>
    </div>
  );
};

export default Chatbot;