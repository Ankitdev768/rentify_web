import React, { createContext, useContext, ReactNode } from 'react';
import { knowledgeBase } from '../data/knowledgeBase';

interface KnowledgeContextType {
  getResponse: (query: string) => string;
}

const KnowledgeContext = createContext<KnowledgeContextType | undefined>(undefined);

export const useKnowledge = (): KnowledgeContextType => {
  const context = useContext(KnowledgeContext);
  if (!context) {
    throw new Error('useKnowledge must be used within a KnowledgeProvider');
  }
  return context;
};

interface KnowledgeProviderProps {
  children: ReactNode;
}

export const KnowledgeProvider: React.FC<KnowledgeProviderProps> = ({ children }) => {
  const getResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase();
    
    // Simple keyword matching logic
    for (const entry of knowledgeBase) {
      for (const keyword of entry.keywords) {
        if (lowerQuery.includes(keyword.toLowerCase())) {
          return entry.response;
        }
      }
    }
    
    // Fallback response if no keywords match
    return "I don't have specific information about that, but I'd be happy to help with something else.";
  };

  const value = {
    getResponse,
  };

  return (
    <KnowledgeContext.Provider value={value}>
      {children}
    </KnowledgeContext.Provider>
  );
};