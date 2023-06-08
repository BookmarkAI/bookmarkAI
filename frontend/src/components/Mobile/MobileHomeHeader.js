import * as React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import Box from '@mui/material/Box';
import  { MobileSearchBar } from '../SearchBar';
import ScrollHeader from './ScrollHeader';
import { AppBar, Toolbar, IconButton, Avatar, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../../assets/supermark_both.png';
import MobileFolder from "./MobileFolder";
import MenuIcon from '@mui/icons-material/Menu';


export default function MobileAppHeader(props) {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  function onClickHandler() {
    navigate('/')
  }
  

  return (
    <>

    <AppBar elevation={0} sx={{backgroundColor: "rgba(255,255,255,0.8)"}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton onClick={()=>navigate('/')}>
                  <MenuIcon/>
                </IconButton>
                <IconButton>
                    <Avatar sx={{width: 30, height: 30}}/>
                </IconButton>
            </Toolbar>
        </AppBar>
    
  
    </>
  );
}
