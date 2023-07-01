import Drawer from '@mui/material/Drawer';
import { navData } from './navData'
import { ListItem, ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { FolderShared, InterpreterMode } from '@mui/icons-material';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography';
import Folder from './Folder'
import { getAllFolders, getAllBookmarks, getAllConversations } from '../services/service';
import { useEffect } from 'react';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import Bookmark from './Bookmark';
import Button from '@mui/material/Button';
import SearchBar from './SearchBar';
import Search from './Search';
import ChatHistory from './ChatHistory';
import { ConversationContext } from '../utils/ConversationContext';



const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    minHeight: 50
  }));

export default function Sidebar(props){
    const [open, setOpen] = useState("folder")
    const [allFolders, setAllFolders] = useState([]);
    const [allBookmarks, setAllBookmarks] = useState([]);
    const { selectedFiles, resetSelectedFiles } = useContext(FileContext)
    const { currentConversation } = useContext(ConversationContext)

    const [chatHistory, setChatHistory] = useState([]); 

    function fetchChatHistory() {
        getAllConversations().then((response) => setChatHistory(response));
    }


    useEffect(() => {
        fetchChatHistory();
    },[currentConversation])

    function fetchFolderList() {
        getAllFolders().then((response) => setAllFolders(response));
    }

    function fetchBookmarks() {
        getAllBookmarks().then((response) => setAllBookmarks(response));
    }

    function handleSelect(newItem) {
        if (open == newItem) {
            setOpen(null)
        }else {
            setOpen(newItem)
        }
    }

    useEffect(() => {
        fetchBookmarks();
        fetchFolderList();
    }, []);

    const filteredBookmarks = selectedFiles.map(id => {
        return allBookmarks.find(bookmark => bookmark.id === id);
      });

    return(
        <>
        <Drawer
        sx={{
          width: open ? 300 : 45,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 300 : 45,
            boxSizing: 'border-box',
            backgroundColor: 'white',
            borderRight: open ? 1 : 0,
            borderColor: '#858585',
            display: 'flex',
            flexDirection: 'row'
          },
        }}
        variant="permanent"
        anchor="left"> 
     
      
        <Box sx={{width: 45, border: 1, borderColor: '#2A2A2A', height: '100%'}}>
            <DrawerHeader/>

            {navData.map((item) =>(

                <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                onClick={()=>handleSelect(item.link)}
                sx={{
                    minHeight: 48,
                    justifyContent:'center',
                    px: 2.5,
                }}
                >
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                    color: '#858585',
                    }}
                >
                    {item.icon}
                </ListItemIcon>
                </ListItemButton>
                </ListItem>

                )
            )}
        </Box>
  
        {open  && <Box sx={{height: '100%', width: 255, maxWidth: 255, flexDirection: 'row'}}>
            <DrawerHeader/>
            {open == "folder" && <Typography sx={{ pt: 1.5, pl: 1.5, pr: 1.5, pb: 0.5, fontSize: 13, fontWeight: 500}}> All Bookmarks </Typography>}
            {open == "history" && <Typography sx={{ pt: 1.5, pl: 1.5, pr: 1.5, pb: 0.5, fontSize: 13, fontWeight: 500}}> Previous Chat </Typography>}

            {open == "folder" && 
                <Box sx={{height: '58%', overflow: "auto", width: '100%', overflowX: 'hidden'}}>
                    {allFolders.map((folder)=> <Folder folder={folder} bookmarks={allBookmarks.filter((bookmark)=>bookmark.folder==folder)} {...props}/>)}  
                </Box>
            }

            {open == "search" &&
                <Search/>
            }

            {open == "history" &&
                <ChatHistory chatHistory={chatHistory}/>
            }

        
            {(open == "folder" || open == "search") && 
            <Box mt={3} position="absolute" bottom="0px" sx={{height: '30%', width: 255, maxWidth: 255, p:1.5, borderTop: 1, borderColor: 'black', overflow: 'auto', backgroundColor: 'white'}}>
                <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Typography sx={{fontSize: 13, fontWeight: 500, mb: 0.8}}> Selected Context </Typography>
                    <Button onClick={()=>resetSelectedFiles()} sx={{fontSize: 9, fontWeight: 400, mb: 0.8, border:1, pt: 0.1, pb: 0.1, color: '#181818'}}> CLEAR </Button>
                </Box>
                
                {selectedFiles.length > 0 && filteredBookmarks.map((bookmark)=> 
                    <Bookmark {...bookmark} oneline/>
                )}
            </Box>}
        </Box>}

     
    
     
        </Drawer>
        
        </>
    )
}