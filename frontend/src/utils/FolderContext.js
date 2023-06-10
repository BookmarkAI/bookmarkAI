import React, { createContext, useState } from 'react';

// Create the context
export const FolderContext = createContext();

// Create a provider component
export const FolderProvider = ({ children }) => {
  const [selectedFolder, setSelectedFolder] = useState(null);

  const handleFolderSelect = (folder) => {
    setSelectedFolder(folder);
  };

  return (
    <FolderContext.Provider value={{ selectedFolder, handleFolderSelect }}>
      {children}
    </FolderContext.Provider>
  );
};