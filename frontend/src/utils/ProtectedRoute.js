import React, {useContext, useEffect, useState} from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';
import OnboardingModal from "../components/modal/OnboardingModal";
import { Desktop } from './MediaQuery'

const ProtectedRoute = (props) => {
  const { user, onboarded, setOnboardingStatus } = useContext(AuthContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleOnboarded = () => {
    setModalIsOpen(false);
    setOnboardingStatus(true);
  }
  useEffect(() => {
        console.log("onboarded: ", onboarded);
        console.log("modalIsOpen: ", modalIsOpen);
        // Check if onboarded is false and set modal visibility accordingly
        setModalIsOpen(!onboarded);

      }, [onboarded, modalIsOpen]);

  if (user) {
    return (
        <>
            {props.children}
            <Desktop>
            <OnboardingModal
                open={modalIsOpen}
                onClose={handleOnboarded}
            />
            </Desktop>
        </>
    );
  } 
  
  return <Navigate to="/login" replace />;
  
};


export default ProtectedRoute;