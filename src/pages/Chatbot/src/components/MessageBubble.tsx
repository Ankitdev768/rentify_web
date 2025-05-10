import React from 'react';
import { Message } from '../types/chat';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const formattedTime = message.timestamp.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className={`flex ${isBot ? 'items-start' : 'items-start justify-end'} group`}>
      {isBot && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 mr-2 flex-shrink-0 ring-4 ring-white/50">
          <Bot size={18} />
        </div>
      )}
      <div className="max-w-[80%]">
        <div
          className={`rounded-2xl px-4 py-2.5 ${
            isBot
              ? 'bg-white/80 backdrop-blur-sm border border-slate-200/60 text-slate-700 rounded-tl-none shadow-sm hover:shadow-md'
              : 'bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-500/25'
          } transition-all duration-300 hover:scale-[1.02]`}
        >
          {message.content}
        </div>
        <div className={`text-xs text-slate-400 mt-1 ${isBot ? 'text-left' : 'text-right'} opacity-0 group-hover:opacity-100 transition-opacity duration-200`}>
          {formattedTime}
        </div>
      </div>
      {!isBot && (
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-white shadow-md ml-2 flex-shrink-0 ring-4 ring-white/50">
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;