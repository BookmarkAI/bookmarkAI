import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HomeScreen from './pages/HomeScreen';
import BrowseScreen from './pages/BrowseScreen';
import Layout from './pages/Layout';
import SearchResult from './pages/SearchResult';
import { Desktop, Mobile } from './utils/MediaQuery.js';
import {DesktopChatScreen} from './components/Desktop/DesktopChatScreen'
import MobileFoldersScreen from './components/Mobile/MobileFoldersScreen';
import MobileFolderView from "./components/Mobile/MobileFolderView";
import React from 'react';
import { FileProvider } from './utils/FileContext';
import { FolderProvider } from './utils/FolderContext';
import SignInPage from './pages/SignInPage';
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from './utils/ProtectedRoute';
import { TypeProvider } from './utils/TypeContext';
import ChatScreen from './v2/ChatScreen';
import { ConversationProvider } from './utils/ConversationContext';
import MobileChatScreen from './v2/mobile/MobileChatScreen';


function App() {

  return (
    <AuthProvider>
      <FileProvider>
        <TypeProvider>
        {/* Folder provider is only relevant to desktop application */}
        <FolderProvider>
          <ConversationProvider>
          <BrowserRouter>
            <Desktop>
              <Routes>
                {/*<Route path="/" element={<ProtectedRoute><HomeScreen/></ProtectedRoute>} />*/}
                <Route path="/" element={<Navigate to="/browse" />} />
                <Route path="/login" element={<SignInPage/>}/>
                <Route path="/chat" element={<ProtectedRoute><ChatScreen/></ProtectedRoute>}/>
                <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
                  <Route path="/browse" element={<ProtectedRoute><BrowseScreen/></ProtectedRoute>}/>
                  <Route path="/search" element={<ProtectedRoute><SearchResult/></ProtectedRoute>}/>
                  <Route path="/search/:id" element={<ProtectedRoute><SearchResult/></ProtectedRoute>}/>
                </Route>
              </Routes>
            </Desktop>

            <Mobile>
              {/* <Routes>
              <Route path="/login" element={<SignInPage/>}/>
              <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
                <Route path="/" element={<ProtectedRoute><BrowseScreen/></ProtectedRoute>}/>
              </Route>
              </Routes> */}
              <Routes>
                <Route path="/login" element={<SignInPage />}/>
                <Route path="/" element={<ProtectedRoute><MobileChatScreen/></ProtectedRoute>} />
                <Route path="/browse" element={<Navigate to="/"/>}/>
                <Route path="/search" element={<Navigate to="/"/>}/>
                <Route path="/search" element={<Navigate to="/"/>}/>  
              </Routes>
            </Mobile>
          </BrowserRouter>
          </ConversationProvider>
        </FolderProvider>
      </TypeProvider>
    </FileProvider>
    </AuthProvider>
  );
}

export default App;