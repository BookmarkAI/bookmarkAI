import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homescreen from './pages/Homescreen';
import BrowseScreen from './pages/BrowseScreen';
import Layout from './pages/Layout';
import BrowseImages from './pages/BrowseImages';
import SearchResult from './pages/SearchResult';
import SignIn from './components/SignIn';
import SignInPage from './pages/SignInPage';
import SourceList from './components/SourceList';
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
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homescreen user={user} />} />
          <Route element={<Layout />}>
            <Route path="/signin" element={<SignInPage user={user} />} />
            <Route path="/browse" element={<BrowseScreen user={user} />} />
            <Route path="/images" element={<BrowseImages user={user} />} />
            <Route path="/search" element={<SearchResult user={user} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;