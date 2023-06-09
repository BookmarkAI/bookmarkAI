import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/supermark_both.png';
import Box from '@mui/material/Box';
import  { DesktopSearchBar } from '../SearchBar';





export default function DesktopAppHeader() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);

  function onClickHandler() {
    navigate('/')
  }

  return (
    <AppBar position="sticky" elevation="0" sx={{ backgroundColor: "transparent"}}>
        <Toolbar sx={{backgroundColor: "rgba(255,255,255,0.8)", pt: 2, pb: 2, justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', pt: 1, alignItems: 'center'}}>
                <Box onClick={onClickHandler} sx={{mr:3}}>
                    <img 
                        src={logo} 
                        alt="Split.it Logo" 
                        style={{
                            width: 220

                        }}
                    />
                </Box>
                <DesktopSearchBar height={40} width={786} refresh={refresh}/>
            </Box>
            
            <IconButton>
                <Avatar sx={{ width: 40, height: 40 }}/>
            </IconButton>

        </Toolbar>
    
    </AppBar>
  );
}
