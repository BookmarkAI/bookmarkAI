
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
import Link from '@mui/material/Link';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import IconButton from "@mui/material/IconButton";
import ThumbUpIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownIcon from '@mui/icons-material/ThumbDownOutlined';
import ReactMarkdown from 'react-markdown'
import {CopyToClipboard} from "react-copy-to-clipboard";
import CheckIcon from '@mui/icons-material/Check';
import { ConversationContext } from "../utils/ConversationContext";
import { getConversation } from "../services/service";
import { Desktop, Mobile } from '../utils/MediaQuery.js';

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
    const [copied, setCopied] = useState(false)
    const [thumb, setThumb] = useState(null)
    const { message, type, viewer, source, setViewer, mobile} = props;
    const fontSize = mobile ? 15 : 13

    const condensedList = source ? source.reduce((accumulator, currentObj) => {
        const foundObj = accumulator.find(
          (obj) => obj.url === currentObj.url && obj.title === currentObj.title
        );
        if (!foundObj) {
          const { url, title } = currentObj;
          accumulator.push({ url, title });
        }
        return accumulator;
      }, []) : source

    function handleCopy() {
        setCopied(true)
        
        // Set a timeout to revert the button icon after 10 seconds
        setTimeout(() => {
            // Change the button icon back to the original icon
            setCopied(false)
        }, 3000); // 10 seconds in milliseconds
    }
    
    return(
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: "#DEDEDF", backgroundColor: type == 'query' ? '#F7F7F8' : 'white', pt: 0.5, pb: 0.5}}>
        <Box sx={{width: viewer ? '90%' : {xs: 500, md: 600, lg: 650}, display: 'flex', flexDirection: 'column', pl: mobile ? 2 : 0, pr: mobile ? 2 : 0}}>
            <Typography sx={{fontSize: fontSize}}>
                <ReactMarkdown>
                {message}
                {/* </MuiMarkdown> */}
                </ReactMarkdown>
            </Typography>
            {source && <Stack spacing={.5} sx={{mt: 1, mb: 1}}>
                {source.length > 0 && <Typography sx={{fontSize: fontSize, fontWeight: 500}}> Source Bookmarks 🔎</Typography>}
                {condensedList.map((doc, i) => <Box sx={{pl: 0.5}}> 
                    <Typography sx={{fontSize: fontSize}}> ✓   <Link onClick={()=>setViewer(doc.url)} sx={{fontSize: 13, mr: 0.8}} underline="hover" color="inherit">{doc.title}</Link><Link onClick={()=>window.open(doc.url)} sx={{fontSize: 13}}>(Visit link)  </Link> </Typography> 
                    </Box>
                )}
            </Stack>}
            
            {type == 'answer' && 
            <Box sx={{width: '100%', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', pb: 1}}>
            <CopyToClipboard text={message}>
                <IconButton onClick={()=>handleCopy()} sx={{p: 0.8, borderRadius: 1, p: 0.5, m: 0.1}}>
                    {copied ? <CheckIcon sx={{fontSize: 15, color: '#AFAFBF'}}/> : <ContentPasteIcon sx={{fontSize: 15, color: '#AFAFBF'}}/>}
                </IconButton>
            </CopyToClipboard>
            {thumb != "down" && <IconButton onClick={()=>setThumb("up")} sx={{p: 0.8, borderRadius: 1, p: 0.5, m: 0.1}}>
                 <ThumbUpIcon sx={{fontSize: 15, color: thumb == "up" ? '#414250' : '#AFAFBF'}}/>
            </IconButton>}
            {thumb != "up" && <IconButton onClick={()=>setThumb("down")} sx={{p: 0.8, borderRadius: 1, p: 0.5, m: 0.1}}>
                <ThumbDownIcon sx={{fontSize: 15, color: thumb == "down" ? '#414250' : '#AFAFBF'}}/>
            </IconButton>}
            </Box>}
            
        </Box>
        </Box>
    )   
}

export default function ChatBox(props){
    const { currentConversation, setCurrentConversation } = useContext(ConversationContext);
    const { viewer, setViewer, mobile } = props;
    const [ responseMessages, setResponseMessages ] = useState([])
    const { selectedFiles } = useContext(FileContext)
    const [ chatMessages, setChatMessages ] = useState([])
    const { user } = useContext(AuthContext);
    const scrollRef = useRef(null);
    const fontSize = mobile ? 15 : 13


    async function getChatHistory(conversation_id) {
        const messages=[]
        if(user != null) {
            const response = await fetch(`${BASE_URL}/chat-history?conversation_id=${conversation_id}` , {
                method: 'GET',
                headers: {
                    'X-UID': user.uid,
                }
    
            })

            const data = await response.json();

            data.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                const m = {
                    message: doc.message.data.content,
                    source: doc.used_context,
                    type: doc.message.type == "human" ? "query" : "answer"
                  };
            
                    messages.push(m);
            
              });
        } 
        
        return messages
    }


    useEffect(()=>{
        console.log(currentConversation)
        if (currentConversation) {
            getChatHistory(currentConversation).then((chatMessages)=>
                setChatMessages(chatMessages)
            )
        } else {
            startNewConversation()
        }
    }, [currentConversation])

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behaviour: "smooth" });
          }
      }, [chatMessages]);

    const appendToLastMessage = (textToAppend) => {
        setChatMessages((prevMessages) => {
            const lastMessageIndex = prevMessages.length - 1;
            return prevMessages.map((message, index) => {
            if (index === lastMessageIndex) {
                return { ...message, message: message.message + textToAppend};
            }
            return message;
            });
        });
    };

    const appendSource = (documents) => {

        setChatMessages((prevMessages) => {
            const lastMessageIndex = prevMessages.length - 1;
            return prevMessages.map((message, index) => {
            if (index === lastMessageIndex) {
                return { ...message, message: message.message, source: documents, type: 'answer'};
            }
            return message;
            });
        });
    };


    async function startNewConversation() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'X-UID': user.uid },
        };
        const response = await fetch(`${BASE_URL}/conversation`, requestOptions);
        const data = await response.json();
        setCurrentConversation(data)
        return data
    }

    const askChatGPT = async (currentChat) => {
        const eventSource = new EventSource(`${BASE_URL}/chat?q=${currentChat}${getQueryString(selectedFiles)}&conversation_id=${currentConversation}`, {
            headers: {
                'X-UID': user.uid
            }
        });

        eventSource.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            if (msg.done) {
                appendSource(msg.documents)
                eventSource.close();
            } else {
                // setResponseMessages((messages) => [...messages, msg]);
                appendToLastMessage(msg.chat_response)
            }
        };

        // Cleanup on component unmount
        return () => {
            eventSource.close();
        }
    };


    return(
        <>
        <Box sx={{width: '100%', height: '85vh', overflow: 'auto', pt: mobile ? 1: 3}}> 
        <Desktop><DrawerHeader/></Desktop>

        <Box sx={{width: '100%', display: 'flex', justifyContent: 'center', borderBottom: 1, borderColor: "#DEDEDF", backgroundColor: 'white'}}>
            <Box sx={{width: viewer ? '90%' : {xs: 500, md: 600, lg: 650}, display: 'flex', flexDirection: 'column', pt: 1, pb: 2.5, pl: mobile ? 2 : 0, pr: mobile ? 2 : 0}}>
                <Typography sx={{fontSize: fontSize}}>
                    👋 Welcome to <b> Supermark</b>, your knowledge assistant that helps you understand documents faster.
                    <br/><br/>
                </Typography>
                <Stack spacing={1}>
                    <Typography sx={{fontSize: fontSize}}><b>How to use it?</b></Typography>
                    <Typography sx={{fontSize: fontSize}}> 📌 Select bookmarks that you want to chat with. 👈</Typography>
                    <Typography sx={{fontSize: fontSize}}> 📚 By default, you will be chatting with <b>all</b> of your bookmarks</Typography>
                    <Typography sx={{fontSize: fontSize}}> 📝 Ask a question, and get an answer!</Typography>
                    <Typography sx={{fontSize: fontSize}}> ❤️️ If something's not working, leave a message at <b>415-499-2006</b>. We are eager to help 🤗</Typography>
                </Stack>
            </Box>
        </Box>
        
        {chatMessages.map((msg)=>
            <ChatMessage  {...msg} viewer={viewer} setViewer={setViewer} mobile={mobile}/>
        )}
        {chatMessages.length > 0 && <Box sx={{height: mobile ? 70: 10, width: 100}} ref={scrollRef}/>}
        </Box>

        <Mobile>
        <Box sx={{position: 'fixed', width: '100%', bottom: 0, display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: 'white'}}>
            <Box sx={{flexGrow: 1, pl: 1.5, pr: 1.5, pt: 0.5}} fullWidth>
            <ChatBar height={25} askChatGPT={askChatGPT} setChatMessages={setChatMessages} mobile={true}/>
            </Box>
            <Box sx={{display: 'flex', justifyContent: 'center', p: 1}}>
                <Typography sx={{fontSize: 13, color: '#666877'}}>
                    {selectedFiles.length == 0 ? 
                        "☝️ Open drawer to select documents"
                    :
                        `Ask questions about ${selectedFiles.length} document(s)`
                    }
                </Typography>
            </Box>
        </Box>
        </Mobile>

        <Desktop>
             <Box sx={{flexGrow: 1, position: 'fixed', bottom: 40, width: {sm: viewer ? 200: 500, md: viewer ? 300 : 700, lg: viewer ? 400 : 700} }} fullWidth>
            <ChatBar askChatGPT={askChatGPT} setChatMessages={setChatMessages}/>
             </Box> 
        </Desktop>
        </>
    )
}