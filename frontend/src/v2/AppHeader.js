import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import logo from '../assets/supermark_logo.png'
import AddIcon from '@mui/icons-material/Add';
import Avatar from '@mui/material/Avatar';
import UserMenu from '../components/UserMenu';
import AppBar from '@mui/material/AppBar';
import { useNavigate } from 'react-router';
import { ConversationContext } from '../utils/ConversationContext';
import { useContext } from 'react';
import { AuthContext } from '../components/context/AuthContext';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const appbarHeight = 50;

export default function AppHeader(){
    const navigate = useNavigate();
    const { currentConversation, setCurrentConversation } = useContext(ConversationContext)
    const { user } = useContext(AuthContext);
    
    async function handleNewChat() {  
        const requestOptions = {
            method: 'PUT',
            headers: { 'X-UID': user.uid },
        };
        const response = await fetch(`${BASE_URL}/conversation`, requestOptions);
        const data = await response.json();
        setCurrentConversation(data)
        navigate('/v2')
    }

    return(
        <AppBar elevation={0} sx={{minHeight: appbarHeight, height: appbarHeight, backgroundColor: '#181818', zIndex: 50000}} position="fixed">
        <Box sx={{mt: 0.5, ml: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Box onClick={()=>navigate('/browse')} sx={{display: 'flex', alignItems: 'center'}}>
              <img 
                  src={logo} 
                  alt="Bookmark Logo"
                  style={{
                      width: 18
                  }}
              />
            </Box>
            <Box sx={{ml: 1, width: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button onClick={()=>handleNewChat()} sx={{ width: 200, fontSize: 12, color: 'white', borderRadius: 0, background: 'linear-gradient(to right, #cd5b95, #9846ca)', height: 25}} variant="contained">
                   <AddIcon sx={{mr: 1}} fontSize="100"/> New Chat
                </Button>
            </Box> 
            </Box>  
              <UserMenu>
                <Avatar sx={{ width: 25, height: 25, mr: 2 }}/>
              </UserMenu>      
        </Box>
      </AppBar>
    )
}