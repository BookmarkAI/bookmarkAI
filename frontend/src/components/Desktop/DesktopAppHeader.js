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




export default function DesktopAppHeader() {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  const { selectedFiles, resetSelectedFiles } = useContext(FileContext);

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
                        alt="Split.it Logo" 
                        style={{
                            width: 200

                        }}
                    />
                </Box>
                
                    <DesktopSearchBar height={32} width={600} refresh={refresh}/>
                    {selectedFiles.length < 1  ? 
                    <Typography variant="h7" sx={{color: "black", pl:2, color: "#458be9", fontSize: "14px", fontWeight: 500}}> Specify Bookmarks </Typography> :

                    <Button onClick={()=>resetSelectedFiles()} sx={{color: "#458be9", pl: 2, textTransform: "none", '&:hover': {
                        backgroundColor: 'white',
                        borderColor: 'transparent',
                        boxShadow: 'none',
                    }}}>
                    
                        
                        
                        Clear {selectedFiles.length} bookmarks
                    
                                
                    </Button>
                    }
              
                
            </Box>
            
            
            <IconButton>
                <Avatar sx={{ width: 40, height: 40 }}/>
            </IconButton>

        </Toolbar>
    
    </AppBar>
  );
}
