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
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([messages[0]]);
    }
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

  return (
    <>
      <div
        className={`${
          isDarkMode ? 'bg-slate-900/95 text-white' : 'bg-white/95 text-slate-900'
        } backdrop-blur-2xl rounded-3xl shadow-2xl border ${
          isDarkMode ? 'border-slate-700/50' : 'border-slate-200/50'
        } overflow-hidden flex flex-col h-[600px] transition-all duration-300 ease-in-out`}
      >
        {/* Header */}
        <div
          className={`p-6 border-b ${
            isDarkMode ? 'border-slate-700/50 bg-slate-800/50' : 'border-slate-200/50 bg-white/50'
          } backdrop-blur-md flex items-center justify-between transition-colors duration-300`}
        >
          <div className="flex items-center gap-3">
            <div className="relative">
              <div
                className={`w-3 h-3 rounded-full ${
                  isDarkMode ? 'bg-emerald-400' : 'bg-emerald-500'
                } animate-pulse shadow-lg shadow-emerald-500/20`}
              >
                <div className="absolute inset-0 rounded-full animate-ping bg-emerald-500/40" />
              </div>
            </div>
            <h2
              className={`text-xl font-semibold bg-gradient-to-r ${
                isDarkMode
                  ? 'from-slate-100 via-slate-200 to-slate-300'
                  : 'from-slate-700 via-slate-800 to-slate-900'
              } bg-clip-text text-transparent transition-all duration-300`}
            >
              Chat Assistant
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
              className={`p-2.5 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
            >
              {settings.soundEnabled ? (
                <Volume2 className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
              ) : (
                <VolumeX className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
              )}
            </button>
            <button
              onClick={() => setIsSettingsOpen(true)}
              className={`p-2.5 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
            >
              <Settings className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-blue-600" />
              )}
            </button>
            <div className="h-5 w-px bg-slate-200/20" />
            <button
              onClick={exportChat}
              className={`p-2.5 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
            >
              <Download className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
            <button
              onClick={clearChat}
              className={`p-2.5 rounded-xl hover:scale-110 active:scale-95 transition-all duration-200 ${
                isDarkMode ? 'bg-slate-700/50' : 'bg-slate-100'
              }`}
            >
              <RefreshCw className={`w-5 h-5 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div
          className={`flex-1 overflow-y-auto px-6 py-6 ${
            isDarkMode
              ? 'bg-gradient-to-b from-slate-800/50 to-slate-900/50'
              : 'bg-gradient-to-b from-slate-50/30 to-white/20'
          } transition-colors duration-300 ${settings.fontSize}`}
        >
          <MessageList messages={messages} isDarkMode={isDarkMode} />
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
          className={`p-6 ${
            isDarkMode ? 'bg-slate-800/50 border-t border-slate-700/50' : 'bg-white/50 border-t border-slate-200/50'
          } backdrop-blur-md transition-colors duration-300`}
        >
          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((suggestion) => (
              <SuggestionChip
                key={suggestion}
                text={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                isDarkMode={isDarkMode}
              />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Type your message... (Press '/' to focus)"
              className={`flex-1 py-3.5 px-5 rounded-2xl border ${
                isDarkMode
                  ? 'border-slate-600 bg-slate-700/50 text-white placeholder-slate-400'
                  : 'border-slate-200 bg-white/50 text-slate-900 placeholder-slate-400'
              } focus:outline-none focus:ring-2 ${
                isDarkMode ? 'focus:ring-blue-500/30' : 'focus:ring-blue-500/30'
              } focus:border-transparent transition-all duration-300 backdrop-blur-sm ${
                isFocused ? 'scale-[1.02]' : ''
              }`}
            />
            <button
              onClick={startListening}
              className={`rounded-xl p-3 ${
                isListening
                  ? 'bg-red-500/90 text-white shadow-lg shadow-red-500/30'
                  : isDarkMode
                  ? 'bg-blue-600 text-white hover:shadow-lg hover:shadow-blue-600/25 active:scale-95'
                  : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/25 active:scale-95'
              } transition-all duration-300 hover:scale-105 backdrop-blur-sm`}
            >
              <Mic className="w-5 h-5" />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className={`rounded-xl p-3 ${
                input.trim()
                  ? isDarkMode
                    ? 'bg-blue-600 text-white hover:shadow-lg hover:shadow-blue-600/25 active:scale-95'
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:shadow-blue-500/25 active:scale-95'
                  : isDarkMode
                  ? 'bg-slate-700/50 text-slate-500'
                  : 'bg-slate-100 text-slate-400'
              } transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:hover:shadow-none backdrop-blur-sm`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50">
          <div
            className={`${
              isDarkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'
            } rounded-2xl p-6 shadow-xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100`}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Chat Settings</h3>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="p-2 hover:bg-slate-100/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Font Size</span>
                <select
                  value={settings.fontSize}
                  onChange={(e) => setSettings({ ...settings, fontSize: e.target.value as ChatSettings['fontSize'] })}
                  className={`rounded-lg p-2 ${
                    isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
                  }`}
                >
                  <option value="sm">Small</option>
                  <option value="base">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>
              <div className="flex items-center justify-between">
                <span>Sound Effects</span>
                <button
                  onClick={() => setSettings(s => ({ ...s, soundEnabled: !s.soundEnabled }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.soundEnabled
                      ? 'bg-blue-500'
                      : isDarkMode
                      ? 'bg-slate-600'
                      : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-transform ${
                      settings.soundEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span>Auto-scroll to Bottom</span>
                <button
                  onClick={() => setSettings(s => ({ ...s, autoScroll: !s.autoScroll }))}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.autoScroll
                      ? 'bg-blue-500'
                      : isDarkMode
                      ? 'bg-slate-600'
                      : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition-transform ${
                      settings.autoScroll ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
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