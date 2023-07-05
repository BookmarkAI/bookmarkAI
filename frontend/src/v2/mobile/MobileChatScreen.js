import {AppBar, Box, Button, Avatar, Toolbar, IconButton, Drawer, Typography, Grid, Stack} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router'
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { getAllFolders, getAllBookmarks } from '../../services/service';
import Folder from '../Folder';
import ChatBox from '../ChatBox';
import { AuthContext } from '../../components/context/AuthContext';
import { ConversationContext } from '../../utils/ConversationContext';
import { useContext } from 'react';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export default function MobileChatScreen() {
    const navigate = useNavigate();
    const [allFolders, setAllFolders] = useState([]);
    const [allBookmarks, setAllBookmarks] = useState([]);
    const [viewer, setViewer] = useState(null);
    const [open, setOpen] = useState(false);
    const { currentConversation, setCurrentConversation } = useContext(ConversationContext);
    const { user } = useContext(AuthContext)

    function fetchFolderList() {
      getAllFolders().then((response) => setAllFolders(response));
    }

    function fetchBookmarks() {
        getAllBookmarks().then((response) => setAllBookmarks(response));
    }
    
    useEffect(() => {
        fetchBookmarks();
        fetchFolderList();
    }, []);

    

    async function handleNewChat() {  
      const requestOptions = {
          method: 'PUT',
          headers: { 'X-UID': user.uid },
      };
      const response = await fetch(`${BASE_URL}/conversation`, requestOptions);
      const data = await response.json();
      setCurrentConversation(data)
    }

    return(
      <>
      <AppBar elevation={0} sx={{ backgroundColor: '#181818'}} position="fixed">
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}} variant="dense">
          <IconButton onClick={()=>setOpen(true)}>
            <MenuIcon sx={{color: 'white'}}/>
          </IconButton>
          <IconButton onClick={()=>handleNewChat()}>
            <AddIcon sx={{color: 'white'}}/>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', backgroundColor: '#FEDC00', pb: 1}}>
      <Typography sx={{ pt: 1.5, pl: 1.5, pr: 1.5, pb: 0.5, fontSize: 13, fontWeight: 500}}> Please visit our desktop app ❤️️ to start adding documents </Typography>
      </Box>

  

      <Grid sx={{display: 'flex', justifyContent: 'center'}}>
        <ChatBox mobile={true}/>
      </Grid>
      <Drawer
        anchor='left'
        open={open}
        onClose={()=>setOpen(false)}
      >
        <Box sx={{width: '80vw', p: 1, display: 'flex', flexDirection: 'column'}}>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', pb: 1}}>
          <Typography sx={{ pt: 1.5, pl: 1.5, pr: 1.5, pb: 0.5, fontSize: 15, fontWeight: 500}}> Select Bookmarks </Typography>
          <IconButton onClick={()=>setOpen(false)}>
            <CloseIcon sx={{fontSize: 18}}/>
          </IconButton>
          </Box>

          

          {allBookmarks.length == 0 ? 
          <Box sx={{pl: 2, pr: 2}}>
            <Typography sx={{fontSize: 14}}>
              You don't have any bookmarks yet. Please visit out desktop website to start adding documents. You can either upload PDF files or bookmark documents online using our chrome extension.
            </Typography>
          </Box>
          
          :
          <Stack sx={{overflow: "auto", width: '100%', overflowX: 'hidden'}} spacing={0.5}>
              {allFolders.map((folder)=> <Folder mobile={true} folder={folder} bookmarks={allBookmarks.filter((bookmark)=>bookmark.folder==folder)} setViewer={setViewer}/>)}  
          </Stack>}
        
        </Box>

      </Drawer>
      
      </>
    )
}