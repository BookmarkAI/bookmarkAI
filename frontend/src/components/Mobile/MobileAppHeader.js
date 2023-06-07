import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/bookmark_logo.png';
import Box from '@mui/material/Box';
import  { MobileSearchBar } from '../SearchBar';
import MenuIcon from '@mui/icons-material/Menu';
import SubjectList from '../SubjectList';


export default function MobileAppHeader() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  function onClickHandler() {
    navigate('/')
  }

  return (
    <>
    <AppBar elevation={0} sx={{backgroundColor: "white"}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
            <IconButton>
                <MenuIcon/>
            </IconButton>
            <IconButton>
                <Avatar sx={{width: 30, height: 30}}/>
            </IconButton>
        </Toolbar>
    </AppBar>
    <Toolbar/>
    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <MobileSearchBar/>
    </Box>
    </>
  );
}
