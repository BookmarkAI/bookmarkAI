import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from './pages/HomeScreen';
import BrowseScreen from './pages/BrowseScreen';
import Layout from './pages/Layout';
import BrowseImages from './pages/BrowseImages';
import SearchResult from './pages/SearchResult';
import { Desktop, Mobile } from './utils/MediaQuery';
import MobileFoldersScreen from './components/Mobile/MobileFoldersScreen';
import MobileFolderView from "./components/Mobile/MobileFolderView";
import React from 'react';
import { FileProvider } from './utils/FileContext';
import SignIn from './components/SignIn';
import SignInPage from './pages/SignInPage';
import SourceList from './components/SourceList';
import Login from './components/SignIn';
import { useEffect, useState } from 'react';
import { auth } from './fb';



function App() {

  // this sets up the user state, its declared at the app level so we can pass it to all of the children components
  const [user, setUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])
  console.log(user);

  return (
    <FileProvider>
      <BrowserRouter>
        <Desktop>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route element={<Layout />}>
              <Route path="/signin" element={<SignInPage user={user} />} />
              <Route path="/browse" element={<BrowseScreen />} />
              <Route path="/images" element={<BrowseImages />} />
              <Route path="/search" element={<SearchResult />} />
            </Route>
          </Routes>
        </Desktop>

        <Mobile>
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route element={<Layout />}>
              <Route path="/browse" element={<BrowseScreen />} />
              <Route path="/images" element={<BrowseImages />} />
              <Route path="/search" element={<SearchResult />} />
              <Route path="/folders" element={<MobileFoldersScreen />} />
              <Route path="/folder/:id" element={<MobileFolderView />} />
            </Route>
          </Routes>
        </Mobile>
      </BrowserRouter>
    </FileProvider>
  );
}

export default App;