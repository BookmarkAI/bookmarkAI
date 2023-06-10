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
import SignIn from './components/SignIn';
import SignInPage from './pages/SignInPage';
import Login from './components/SignIn';
import { useEffect, useState } from 'react';
import { auth } from './fb';
import { useCookies } from 'react-cookie';



function App() {

  // this sets up the user state, its declared at the app level so we can pass it to all of the children components
  const [user, setUser] = useState(null);
  const [cookies, setCookie] = useCookies(["user"]);
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      // clear all cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      setUser(user);
      setCookie("userCookie", user ?
        JSON.stringify({ url: "http://localhost:3000/",displayName: user.displayName, uid: user.uid })
        : JSON.stringify({ url: "http://localhost:3000/", displayName: null, uid: null }));

      // we can basically authenticate the extension by setting a cookie here
      // and accessing it in the extension
      // we can store a hashed version of the user's firebase uid in cookies, which the extension can access
      // and send in its requests to the backend

      // there is a security vulnerability here, where someone can access the cookie 
      // and send a request to the backend



    })
  }, [])
  console.log(user);

  return (
    <FileProvider>
      <FolderProvider>
        <BrowserRouter>
          <Desktop>
            <Routes>
              <Route path="/" element={<HomeScreen/>} />
              <Route element={<Layout/>}>
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
  );
}

export default App;