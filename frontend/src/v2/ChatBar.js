
import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect  } from 'react';
import { TextField } from '@mui/material';
import { auth, db} from '../fb.js';


export default function ChatBar(props) {
    const [ currentChat, setCurrentChat ] = useState('')
    const {setChatMessages, askChatGPT, height } = props;

    function changeCurrentChat(e){
        setCurrentChat(e.target.value);    
    }
    
    async function keyPress(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            setChatMessages((messages) => [...messages, {message: currentChat, type: "query"}]);
            setCurrentChat('')

            setChatMessages((messages) => [...messages, {message: '💬 &nbsp;', type: "ongoing", source: []}])
            askChatGPT(currentChat);
            // add current message to list of chatMessages
        }
    }

    return(
    
    <Paper
      component="form"
      sx={{minHeight: height ? height : 40, height: height ? height : 20, display: 'flex', border:1, borderRadius: 2,  borderColor: "#dddddd",  pl: 2, pr: 2, pt: 1, pb: 1}}
      elevation={3}
    >
      <InputBase
        value={currentChat}
        onChange={changeCurrentChat}
        onKeyDown={keyPress}
        sx={{flex: 1, fontSize: 13}}
        placeholder={'Send a Message'}
        inputProps={{ 'aria-label': 'search google maps' }}
        noWrap
        multiline
      />
      
    </Paper>  
    
    )

}