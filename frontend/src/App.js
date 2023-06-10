import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from './pages/HomeScreen';
import BrowseScreen from './pages/BrowseScreen';
import Layout from './pages/Layout';
import BrowseImages from './pages/BrowseImages';
import SearchResult from './pages/SearchResult';
import { Desktop, Mobile } from './utils/MediaQuery.js';
import {DesktopChatScreen} from './components/Desktop/DesktopChatScreen'
import MobileFoldersScreen from './components/Mobile/MobileFoldersScreen';
import MobileFolderView from "./components/Mobile/MobileFolderView";
import React from 'react';
import { FileProvider } from './utils/FileContext';
import { FolderProvider } from './utils/FolderContext';
import SignInPage from './pages/SignInPage';
import {AuthProvider} from "./components/context/AuthContext";



function App() {

  return (
    <AuthProvider>
      <FileProvider>
      <FolderProvider>
        <BrowserRouter>
          <Desktop>
            <Routes>
              <Route path="/" element={<HomeScreen/>} />
              <Route element={<Layout/>}>
                <Route path="/signin" element={<SignInPage />}/>
                <Route path="/browse" element={<BrowseScreen/>}/>
                <Route path="/images" element={<BrowseImages/>}/>
                <Route path="/search" element={<SearchResult/>}/>
              </Route>
            </Routes>
          </Desktop>

          <Mobile>
            <Routes>
              <Route path="/" element={<HomeScreen/>} />
              <Route element={<Layout/>}>
                <Route path="/signin" element={<SignInPage />}/>
                <Route path="/browse" element={<BrowseScreen/>}/>
                <Route path="/images" element={<BrowseImages/>}/>
                <Route path="/search" element={<SearchResult/>}/>
                <Route path="/folders" element={<MobileFoldersScreen/>}/>
                <Route path="/folder/:id" element={<MobileFolderView/>} />
              </Route>
            </Routes>
          </Mobile>
        </BrowserRouter>
      </FolderProvider>
    </FileProvider>
    </AuthProvider>
  );
}

export default App;