import { getAllConversations } from "../services/service"
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Button from '@mui/material/Button'

function Chat(props) {
    const { question, id} = props;
    return(
        <Button  
            sx={{textTransform: 'none', pl: 1, pr: 1, pb: 0.8, pt: 0.8, width: '100%', borderBottom: 1, borderRadius: 0, borderColor: '#dddddd', display: 'flex', justifyContent: 'flex-start'}}>
            <ChatBubbleOutlineIcon sx={{fontSize: 12, color: '#181818'}}/>
            <Typography noWrap sx={{ml: 0.8, fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', color: 'black'}}>
                {question} 
            </Typography>
        </Button>
    )
}

export default function ChatHistory() {
    const [chatHistory, setChatHistory] = useState([]); 
    const [selected, setSelected] = useState(null);

    function fetchChatHistory() {
        getAllConversations().then((response) => setChatHistory(response));
    }

    useEffect(() => {
        fetchChatHistory();
    },[])

    return(
        <>
        <Box sx={{overflow: 'auto', height: '87%', width: '100%'}}>
        {chatHistory.map((chat) => 
            <Chat {...chat}/>
        )}
        </Box>   
        </>
    )

}