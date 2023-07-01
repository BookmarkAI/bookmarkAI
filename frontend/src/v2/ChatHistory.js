import { getAllConversations } from "../services/service"
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Button from '@mui/material/Button'
import { ConversationContext } from "../utils/ConversationContext"; 
import { useContext } from "react";



function Chat(props) {
    const { title, id, setSelected, selected} = props;
    return(
        <Button  
            disableRipple
            onClick={()=>setSelected(id)}
            sx={{textTransform: 'none', pl: 1, pr: 1, pb: 0.6, pt: 0.6, width: '100%', borderRadius: 1, borderColor: '#DFE1E4', display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
                backgroundColor: selected == id ? '#EFF1F4' : 'white',
                '&:hover':{backgroundColor: '#EFF1F4'
                }
            }}>
            <ChatBubbleOutlineIcon sx={{fontSize: 13, color: '#414250'}}/>
            <Typography noWrap sx={{ml: 0.8, fontSize: 11, overflow: 'hidden', textOverflow: 'ellipsis', color: '#414250'}}>
                {title} 
            </Typography>
        </Button>
    )
}


export default function ChatHistory({chatHistory}) {
    const { currentConversation, setCurrentConversation } = useContext(ConversationContext);

    return(
        <>
        <Box sx={{overflow: 'auto', height: '87%', width: '100%'}}>
            
        {chatHistory.map((chat) => 
        <Box sx={{pl:0.5, pr:0.5}}>
            <Chat {...chat} setSelected={setCurrentConversation} selected={currentConversation}/>
        </Box>
        )}
        </Box>   
        </>
    )

}