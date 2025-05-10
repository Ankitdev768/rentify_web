import React from 'react';
import ChatContainer from './components/ChatContainer';
import { KnowledgeProvider } from './context/KnowledgeContext';
import { Building2 } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-purple-50 flex items-center justify-center p-4 sm:p-6">
      <KnowledgeProvider>
        <div className="w-full max-w-4xl">
          <header className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Building2 className="w-8 h-8 text-blue-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                co<span className="text-blue-500">Z</span>yo
              </h1>
            </div>
            <p className="text-slate-600 text-lg">Your trusted partner for smart, affordable living</p>
          </header>
          <ChatContainer />
        </div>
      </KnowledgeProvider>
    </div>
  );
}

export default App;