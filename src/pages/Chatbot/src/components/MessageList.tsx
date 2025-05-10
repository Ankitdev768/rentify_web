import React from 'react';
import MessageBubble from './MessageBubble';
import { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
  isDarkMode: boolean;
  fontSize: 'sm' | 'base' | 'lg';
}

const MessageList: React.FC<MessageListProps> = ({ messages, isDarkMode, fontSize }) => {
  const fontSizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="space-y-4">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}
        >
          <div
            className={`${
              message.sender === 'user'
                ? isDarkMode
                  ? 'bg-blue-600/90 text-white'
                  : 'bg-blue-500 text-white'
                : isDarkMode
                ? 'bg-slate-700/70 text-slate-300'
                : 'bg-slate-100/70 text-slate-700'
            } rounded-2xl ${
              message.sender === 'user' ? 'rounded-tr-none' : 'rounded-tl-none'
            } px-5 py-3 max-w-[80%] backdrop-blur-sm shadow-lg ${
              isDarkMode ? 'shadow-slate-900/20' : 'shadow-slate-200/50'
            } ${fontSizeClasses[fontSize]}`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;