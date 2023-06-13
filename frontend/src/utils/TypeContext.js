import React, { createContext, useState } from 'react';

// Create the context
export const TypeContext = createContext();

// Create a provider component
export const TypeProvider = ({ children }) => {
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  return (
    <TypeContext.Provider value={{ selectedType, handleTypeSelect }}>
      {children}
    </TypeContext.Provider>
  );
};