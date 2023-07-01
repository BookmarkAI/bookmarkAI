import React, { createContext, useState } from 'react';

// Create the context
export const ConversationContext = createContext();

// Create a provider component
export const ConversationProvider = ({ children }) => {
  const [currentConversation, setCurrentConversation] = useState(null);

  return (
    <ConversationContext.Provider value={{ currentConversation, setCurrentConversation }}>
      {children}
    </ConversationContext.Provider>
  );
};