    /*global chrome*/
import React, {createContext, useEffect, useState} from 'react';
import {useCookies} from "react-cookie";
import {auth} from "../../fb";
import ReactGA from "react-ga4";
import Hotjar from '@hotjar/browser';



// Define the context
export const AuthContext = createContext();

// Define the provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [onboarded, setOnboarded] = useState(false);
  const [cookies, setCookie] = useCookies(["user", "onboarding"]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      // if cookie is named userCookie clear it
      document.cookie.split(";").forEach((c) => {
        if (c.indexOf("userCookie") === 0){
          document.cookie = c
            .replace(/^ +/, "")
            .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");}
      });

      setUser(user);
      setOnboarded(cookies.onboardingCookie.onboarded);
      setCookie("userCookie", user ?
        JSON.stringify({ url: window.location.hostname,displayName: user.displayName, uid: user.uid })
        : JSON.stringify({ url: window.location.hostname, displayName: null, uid: null }),
          {
            domain: window.location.hostname,
            sameSite: "none",
            secure: true,
          }
      );

      // we can basically authenticate the extension by setting a cookie here
      // and accessing it in the extension
      // we can store a hashed version of the user's firebase uid in cookies, which the extension can access
      // and send in its requests to the backend

      // there is a security vulnerability here, where someone can access the cookie
      // and send a request to the backend
      setIsLoading(false);


    })
  })

  useEffect(() => {
      if (user) {
          ReactGA.set({ userId: user.uid })
          Hotjar.identify(user.uid, { name: user.displayName, email: user.email })
      }
  }, [user])


  function setOnboardingStatus(status) {
    setOnboarded(status);
    setCookie("onboardingCookie", JSON.stringify({ displayName: user.displayName, uid: user.uid, onboarded: status }));
  }

  if (isLoading) {
    // Render loading indicator or any other desired UI element while isLoading is true
    return <div/>;
  }


  return (
    <AuthContext.Provider
      value={{
        user: user,
        onboarded: onboarded,
        setOnboardingStatus: setOnboardingStatus,
        setUser: setUser,
        cookies: cookies,
        setCookie: setCookie,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
