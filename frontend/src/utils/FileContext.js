import React, { createContext, useState } from 'react';

// Saves search option: enable/disable chat, and which files to generate content from
// Create the FileContext
const FileContext = createContext();

// Create the FileProvider component
const FileProvider = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [chatEnabled, setChatEnabled] = useState(true);

  // Function to update the selected files
//   const updateSelectedFiles = (files) => {
//     setSelectedFiles(files);
//   };

  const updateSelectedFiles = (newFile) => {
    setSelectedFiles((prevSelectedFiles) => [
      ...prevSelectedFiles,
      newFile
    ]);
  };


  const removeSelectedFiles = (file) => {
    setSelectedFiles((prevSelectedFiles) =>
      prevSelectedFiles.filter((selectedFile) => selectedFile !== file)
    );
  };

  const resetSelectedFiles = () => {
    setSelectedFiles([])
  }

  const enableChat = (newChat) =>{
    setChatEnabled(newChat)
  }
  // Context value
  const contextValue = {
    selectedFiles,
    updateSelectedFiles,
    removeSelectedFiles,
    resetSelectedFiles,
    chatEnabled,
    enableChat,
  };

  return (
    <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
  );
};

export { FileContext, FileProvider };