import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Sparkles, 
  Mic, 
  Moon, 
  Sun, 
  Settings, 
  Share2, 
  Download, 
  RefreshCw, 
  X,
  Volume2,
  VolumeX
} from 'lucide-react';
import MessageList from './MessageList';
import SuggestionChip from './SuggestionChip';
import { useKnowledge } from '../context/KnowledgeContext';
import { Message } from '../types/chat';

interface ChatSettings {
  fontSize: 'sm' | 'base' | 'lg';
  soundEnabled: boolean;
  autoScroll: boolean;
}

const ChatContainer: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi there! I'm coZyo's assistant. How can I help you find your perfect home-away-from-home today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isClearChatOpen, setIsClearChatOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>({
    fontSize: 'base',
    soundEnabled: true,
    autoScroll: true,
  });
  
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { getResponse } = useKnowledge();

  const suggestions = [
    "Tell me about coZyo",
    "What services do you offer?",
    "How does booking work?",
    "Contact support",
  ];

  useEffect(() => {
    if (settings.autoScroll) {
      scrollToBottom();
    }
  }, [messages, settings.autoScroll]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSettingsOpen) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === 'Escape' && isSettingsOpen) {
        setIsSettingsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isSettingsOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const playSound = (type: 'send' | 'receive') => {
    if (!settings.soundEnabled) return;
    
    const audio = new Audio(
      type === 'send' 
        ? '/sounds/message-sent.mp3' 
        : '/sounds/message-received.mp3'
    );
    audio.volume = 0.5;
    audio.play().catch(() => {});
  };

  const handleSend = () => {
    if (input.trim() === '') return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    playSound('send');

    setTimeout(() => {
      const botResponse = getResponse(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
      playSound('receive');
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      inputRef.current?.focus();
    };

    recognition.start();
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const clearChat = () => {
    setIsClearChatOpen(true);
  };

  const exportChat = () => {
    const chatHistory = messages
      .map((m) => `${m.sender}: ${m.content}`)
      .join('\n');
    
    const blob = new Blob([chatHistory], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chat-history-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // First, let's create a utility object for font size classes
  const fontSizeClasses = {
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg'
  };

  return (
    <>
      <div
        className={`${
          isDarkMode 
            ? 'bg-gradient-to-b from-slate-900 via-slate-900/98 to-slate-800/95 text-white' 
            : 'bg-white/95 text-slate-900'
        } backdrop-blur-2xl fixed inset-0 flex flex-col transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <div
          className={`p-4 md:p-6 border-b ${
            isDarkMode 
              ? 'border-slate-700/30 bg-slate-800/40 shadow-lg shadow-slate-900/20' 
              : 'border-slate-200/50 bg-white/50'
          } backdrop-blur-md flex items-center justify-between transition-colors duration-300`}
        >
          <div className="flex items-center gap-2 md:gap-3">
            <div className="relative">
              <div
                className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full ${
                  isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                } animate-pulse shadow-lg shadow-emerald-500/20`}
              >
                <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500/40" />
              </div>
            </div>
            <h2
              className={`text-lg md:text-xl font-semibold bg-gradient-to-r ${
                isDarkMode
                  ? 'from-slate-100 via-slate-200 to-slate-300'
                  : 'from-slate-700 via-slate-800 to-slate-900'
              } bg-clip-text text-transparent transition-all duration-300`}
            >
              Chat Assistant
            </h2>
          </div>
          <div className="flex items-center gap-1 md:gap-3">
            <button
              onClick={() => setSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
              className={`p-2 md:p-2.5 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
            >
              {settings.soundEnabled ? (
                <Volume2 className={`w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
              ) : (
                <VolumeX className={`w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
              )}
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`p-2 md:p-2.5 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
            >
              <Settings className={`w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2 md:p-2.5 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              )}
            </button>
            <div className="h-5 w-px bg-slate-200/20" />
            <button
              onClick={exportChat}
              className={`p-2 md:p-2.5 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
            >
              <Download className={`w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
            <button
              onClick={clearChat}
              className={`p-2 md:p-2.5 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
            >
              <RefreshCw className={`w-4 h-4 md:w-5 md:h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div
          className={`flex-1 overflow-y-auto px-4 md:px-6 py-4 md:py-6 ${
            isDarkMode
              ? 'bg-gradient-to-b from-slate-900/50 via-slate-800/30 to-slate-900/40 text-slate-100'
              : 'bg-gradient-to-b from-slate-50/30 to-white/20'
          } transition-colors duration-300 ${fontSizeClasses[settings.fontSize]}`}
        >
          <MessageList messages={messages} isDarkMode={isDarkMode} fontSize={settings.fontSize} />
          {isTyping && (
            <div className="flex items-start mt-4">
              <div
                className={`${
                  isDarkMode ? 'bg-slate-700/70 text-slate-300' : 'bg-slate-100/70 text-slate-700'
                } rounded-2xl rounded-tl-none px-5 py-3 max-w-[80%] backdrop-blur-sm shadow-lg ${
                  isDarkMode ? 'shadow-slate-900/20' : 'shadow-slate-200/50'
                }`}
              >
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        isDarkMode ? 'bg-slate-500' : 'bg-slate-400'
                      } animate-bounce`}
                      style={{ animationDelay: `${i * 200}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div
          className={`p-4 md:p-6 ${
            isDarkMode 
              ? 'bg-slate-800/40 border-t border-slate-700/30 shadow-lg shadow-slate-900/10' 
              : 'bg-white/50 border-t border-slate-200/50'
          } backdrop-blur-md transition-colors duration-300`}
        >
          <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
            {suggestions.map((suggestion) => (
              <SuggestionChip
                key={suggestion}
                text={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type your message..."
              className={`flex-1 py-2.5 md:py-3.5 px-4 md:px-5 rounded-xl md:rounded-2xl border ${
                fontSizeClasses[settings.fontSize]
              } ${
                isDarkMode
                  ? 'border-slate-600/50 bg-slate-700/40 text-white placeholder-slate-400 focus:bg-slate-700/60'
                  : 'border-slate-200 bg-white/50 text-slate-900 placeholder-slate-400'
              } focus:outline-none focus:ring-2 ${
                isDarkMode ? 'focus:ring-blue-500/40' : 'focus:ring-blue-500/30'
              } focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
                isFocused ? 'scale-[1.02]' : ''
              }`}
            />
            <button
              onClick={startListening}
              className={`rounded-xl p-2.5 md:p-3 ${
                isListening
                  ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30'
                  : isDarkMode
                  ? 'bg-blue-600/90 text-white hover:bg-blue-500/90'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
              } transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-sm`}
            >
              <Mic className="w-4 h-4 md:w-5 md:h-5" />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`rounded-xl p-2.5 md:p-3 ${
                input.trim()
                  ? isDarkMode
                    ? 'bg-blue-600 text-white'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : isDarkMode
                  ? 'bg-slate-700/50 text-slate-500'
                  : 'bg-slate-100 text-slate-400'
              } transition-all duration-300 hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:hover:shadow-none backdrop-blur-sm`}
            >
              <Send className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div
            className={`${
              isDarkMode 
                ? 'bg-slate-800/95 text-white border border-slate-700/50' 
                : 'bg-white text-slate-900'
            } rounded-2xl p-6 w-full max-w-md transform transition-all duration-300 scale-100`}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Chat Settings</h3>
                <button
                  onClick={() => setIsSettingsOpen(false)}
                  className={`p-2 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                    isDarkMode ? 'hover:bg-slate-700/70' : 'hover:bg-slate-100'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Font Size Setting */}
              <div className="space-y-3">
                <label className={`text-sm font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Font Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['sm', 'base', 'lg'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => setSettings(s => ({ ...s, fontSize: size }))}
                      className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                        settings.fontSize === size
                          ? isDarkMode
                            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                          : isDarkMode
                          ? 'bg-slate-700/50 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {size === 'sm' ? 'Small' : size === 'base' ? 'Medium' : 'Large'}
                    </button>
                  ))}
                </div>
                <div className={`mt-2 p-4 rounded-xl ${
                  isDarkMode ? 'bg-slate-700/30' : 'bg-slate-100/70'
                }`}>
                  <p className={`${fontSizeClasses[settings.fontSize]} transition-all duration-200`}>
                    Preview text size
                  </p>
                </div>
              </div>

              {/* Other Settings */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Sound Effects
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Play sounds when sending/receiving messages
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      settings.soundEnabled
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-500 text-white'
                        : isDarkMode
                        ? 'bg-slate-700/50 text-slate-400'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {settings.soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                      Auto-scroll
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                      Automatically scroll to latest messages
                    </p>
                  </div>
                  <button
                    onClick={() => setSettings(s => ({ ...s, autoScroll: !s.autoScroll }))}
                    className={`p-2 rounded-xl transition-all duration-200 ${
                      settings.autoScroll
                        ? isDarkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-500 text-white'
                        : isDarkMode
                        ? 'bg-slate-700/50 text-slate-400'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <Sparkles className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Clear Chat Confirmation Modal */}
      {isClearChatOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[70] p-4">
          <div
            className={`${
              isDarkMode 
                ? 'bg-slate-800/95 text-white border border-slate-700/50 shadow-xl shadow-slate-900/50' 
                : 'bg-white text-slate-900 shadow-xl shadow-slate-200/50'
            } rounded-2xl p-4 md:p-6 w-full max-w-sm transform transition-all duration-300 scale-100`}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`p-3 rounded-full ${isDarkMode ? 'bg-red-500/10' : 'bg-red-50'}`}>
                <RefreshCw className={`w-6 h-6 ${isDarkMode ? 'text-red-400' : 'text-red-500'}`} />
              </div>
              <h3 className="text-lg font-semibold">Clear Chat History</h3>
              <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Are you sure you want to clear all chat messages? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setIsClearChatOpen(false)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isDarkMode 
                      ? 'hover:bg-slate-700/70 active:bg-slate-700/50' 
                      : 'hover:bg-slate-100 active:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setMessages([messages[0]]);
                    setIsClearChatOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-red-500 text-white hover:bg-red-600 active:bg-red-700 transition-all duration-200"
                >
                  Clear Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatContainer;