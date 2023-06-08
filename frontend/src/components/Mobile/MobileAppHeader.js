import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import  { MobileSearchBar } from '../SearchBar';
import ScrollHeader from './ScrollHeader';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';




export default function MobileAppHeader(props) {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  function onClickHandler() {
    navigate('/')
  }

  return (
    <>
    
      <ScrollHeader>
        <ArrowBackIcon/>
      </ScrollHeader>
      <Box sx={{display: "flex", justifyContent: "center"}}>
        <MobileSearchBar/>
      </Box>
   
    </>
  );
}
