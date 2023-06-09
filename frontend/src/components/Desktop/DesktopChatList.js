import { Stack, Box, Typography } from '@mui/material';
import { chat_history } from '../../services-mock/fake_dataset';
import Button from '@mui/material/Button'
import { styled } from '@mui/system';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';



function DesktopFolder(props){
    const { q } = props;
    const [ clicked, setClicked ] =  useState(false);


    const getButtonStyles = () => {
    if (!clicked) {
      return {
        borderColor: '#dddddd', 
        textTransform: "none",
        display: 'flex',
        justifyContent: 'space-between', 
        p: 1.2, width: '100%', display: 'flex', justifyContent: 'space-between', textTransform: "none", color: "#959CA6",
        '&:hover': {
            backgroundColor: '#E5F1FE',
            borderColor: 'transparent',
            boxShadow: 'none',
        },
      };
    } else {
      return {
        backgroundColor: '#E5F1FE',
        borderColor: 'transparent',
        boxShadow: 'none',
        color: "#959CA6",
        color: "#3D9DFF",
        p: 1.2, width: '100%', display: 'flex', justifyContent: 'space-between', textTransform: "none", 
        '&:hover': {
          backgroundColor: "#dddddd",
         
        },
      };
    }
  };

    return(
        <>
       
        <Box sx={{borderRadius: 3, display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-end', "-webkit-mask-image": "-webkit-gradient(linear, left top, right top, from(rgba(0,0,0,1)), to(rgba(0,0,0,1)))"}}>
            <Button onClick={()=>setClicked(!clicked)} sx={{textTransform: "none", color: "#dddddd", justifyContent: 'flex-start'}}>   
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    {props.children}
                    <Typography noWrap variant="h7" sx={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        ml: 1,
                        fontWeight: 350,
                        color: "#333333",
                        maxWidth: "200px",}}>
                        {q}
                    </Typography>
                </Box>
            </Button>  
        </Box>
        

        </>
    )
}

export default function DesktopChatList() {
    return (
        <>
        {/* Folder List */}
      
                <Stack spacing={0}>
    
                    {chat_history.map((doc, i) => (              
                         <DesktopFolder {...doc}>
                            <ChatBubbleIcon  sx={{ fontSize: 17 }}/>
                         </DesktopFolder>
                    ))}
                </Stack>
        </>
    )
}