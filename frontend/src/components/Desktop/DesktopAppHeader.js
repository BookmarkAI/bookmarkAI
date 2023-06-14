import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/Button';
import Button from '@mui/material/Button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/supermark_both.png';
import Box from '@mui/material/Box';
import  { DesktopSearchBar } from '../SearchBar';
import { useContext } from 'react';
import { FileContext } from '../../utils/FileContext';
import UserMenu from '../UserMenu';
import DesktopPromptGenerator from './DesktopPromptGenerator';




export default function DesktopAppHeader() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const { selectedFiles, resetSelectedFiles, chatEnabled } = useContext(FileContext);

  function onClickHandler() {
    navigate('/browse')
  }

  

  return (
    
    <AppBar position="sticky" elevation="0" sx={{ backgroundColor: "transparent"}}>
        <Toolbar sx={{backgroundColor: "rgba(255,255,255,0.8)", justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', pt: 1, alignItems: 'center'}}>
                    <Box onClick={onClickHandler} sx={{mr:3}}>
                        <img 
                            src={logo} 
                            alt="Supermark Logo" 
                            style={{
                                width: 200

                            }}
                        />
                    </Box>
                
                    <DesktopSearchBar height={32} width={650} refresh={refresh} advanced={true}/>                
            </Box>
            
            <UserMenu>
                <Avatar sx={{ width: 40, height: 40 }}/>
            </UserMenu>

        </Toolbar>
    
    </AppBar>
  );
}
