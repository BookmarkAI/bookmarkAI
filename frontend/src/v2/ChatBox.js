
import ChatBar from "./ChatBar";
import Box from '@mui/material/Box';
import { useState } from "react";
import { Typography } from "@mui/material";
import { FileContext } from "../utils/FileContext";
import { AuthContext } from "../components/context/AuthContext";
import { useContext } from "react";
import MuiMarkdown from "mui-markdown";
import { EventSourcePolyfill } from 'event-source-polyfill';
import { DrawerHeader } from './DrawerHeader'
import { useRef, useEffect } from "react";
import Stack from '@mui/material/Stack';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";
const EventSource = EventSourcePolyfill;

function getQueryString(selectedFiles) {
    if (selectedFiles.length === 0) {
        return ''
    } else {
        return selectedFiles.map((str) => `&selected_context=${str}`).join('');
    }
}

function ChatMessage(props){
    const { message, type, viewer } = props;
    
    return(
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: "#DEDEDF", backgroundColor: type == 'query' ? '#F7F7F8' : 'white'}}>
        <Box sx={{width: viewer ? '90%' : {xs: 500, md: 600, lg: 650}, display: 'flex', pt: 1, pb: 1}}>
            <Typography sx={{fontSize: 13}}>
                <MuiMarkdown overrides={{fontSize: 13}}>
                {message}
                </MuiMarkdown>
            </Typography>
        </Box>
        </Box>
    )   
}

export default function ChatBox(props){
    const { viewer } = props;
    const [ responseMessages, setResponseMessages ] = useState([])
    const { selectedFiles } = useContext(FileContext)
    const [ chatMessages, setChatMessages ] = useState([])
    const { user } = useContext(AuthContext);
    console.log(user.uid)
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            console.log('hello')
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
          }
      }, [chatMessages]);

    const appendToLastMessage = (textToAppend) => {
        setChatMessages((prevMessages) => {
            const lastMessageIndex = prevMessages.length - 1;
            return prevMessages.map((message, index) => {
            if (index === lastMessageIndex) {
                return { ...message, message: message.message + textToAppend };
            }
            return message;
            });
        });
    };

    const askChatGPT = async (currentChat) => {
        console.log("Debug")

        const eventSource = new EventSource(`${BASE_URL}/chat?q=${currentChat}${getQueryString(selectedFiles)}`, {
            headers: {
                'X-UID': user.uid
            }
        });

        eventSource.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            console.log(msg)
            if (msg.done) {
                eventSource.close();
            } else {
                // setResponseMessages((messages) => [...messages, msg]);
                appendToLastMessage(msg.chat_response)
                console.log(msg)
            }
        };

        // Cleanup on component unmount
        return () => {
            eventSource.close();
        }
    };


    return(
        <>
        <Box sx={{width: '100%', height: '85vh', overflow: 'auto', pt: 3}}> 
        <DrawerHeader/>

        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: "#DEDEDF", backgroundColor: 'white'}}>
            <Box sx={{width: viewer ? '90%' : {xs: 500, md: 600, lg: 650}, display: 'flex', flexDirection: 'column', pt: 1, pb: 3}}>
                <Typography sx={{fontSize: 13}}>
                    Welcome to <b> Supermark</b>, your knowledge assistant that helps you understand bookmarks.
                    <br/><br/>
                </Typography>
                <Stack spacing={1}>
                    <Typography sx={{fontSize: 13}}><b>How to use it?</b></Typography>
                    <Typography sx={{fontSize: 13}}> 📌 Select bookmarks that you want to chat with. 👈</Typography>
                    <Typography sx={{fontSize: 13}}> 📚 By default, you will be chatting with <b>all</b> of your bookmarks</Typography>
                    <Typography sx={{fontSize: 13}}> 📝 Ask a question, and get an answer!</Typography>
                </Stack>
            </Box>
        </Box>
        
        {chatMessages.map((msg)=>
            <ChatMessage  {...msg} viewer={viewer}/>
        )}
        <Box sx={{height: 10, width: 100}} ref={scrollRef}/>
        </Box>

        <Box sx={{flexGrow: 1, position: 'fixed', bottom: 40, width: viewer ? 550 : 700 }} fullWidth>
        <ChatBar askChatGPT={askChatGPT} setChatMessages={setChatMessages}/>
        </Box>
        </>
    )
}