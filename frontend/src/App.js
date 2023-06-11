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
import { AuthProvider } from "./components/context/AuthContext";
import ProtectedRoute from './utils/ProtectedRoute';



function App() {

  return (
    <AuthProvider>
      <FileProvider>
      <FolderProvider>
        <BrowserRouter>
          <Desktop>
            <Routes>
              <Route path="/" element={<ProtectedRoute><HomeScreen/></ProtectedRoute>} />
              <Route path="/login" element={<SignInPage/>}/>
              <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
                <Route path="/browse" element={<ProtectedRoute><BrowseScreen/></ProtectedRoute>}/>
                <Route path="/search" element={<ProtectedRoute><SearchResult/></ProtectedRoute>}/>
              </Route>
            </Routes>
          </Desktop>

          <Mobile>
            <Routes>
              <Route path="/" element={<ProtectedRoute><HomeScreen/></ProtectedRoute>} />
              <Route path="/login" element={<SignInPage />}/>
              <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
                <Route path="/browse" element={<ProtectedRoute><BrowseScreen/></ProtectedRoute>}/>
                <Route path="/search" element={<ProtectedRoute><SearchResult/></ProtectedRoute>}/>
                <Route path="/folders" element={<ProtectedRoute><MobileFoldersScreen/></ProtectedRoute>}/>
                <Route path="/folder/:id" element={<ProtectedRoute><MobileFolderView/></ProtectedRoute>} />
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