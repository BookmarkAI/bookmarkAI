import React, { createContext, useState } from 'react';

// Create the FileContext
const FileContext = createContext();

// Create the FileProvider component
const FileProvider = ({ children }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);

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
  // Context value
  const contextValue = {
    selectedFiles,
    updateSelectedFiles,
    removeSelectedFiles,
    resetSelectedFiles
  };

  return (
    <FileContext.Provider value={contextValue}>{children}</FileContext.Provider>
  );
};

export { FileContext, FileProvider };