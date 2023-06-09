import { useSearchParams } from 'react-router-dom'
import { Typography, Box, Grid, Paper, InputBase, Stack } from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';
import { useEffect, useState } from 'react';
import { Desktop, Mobile } from '../utils/MediaQuery';
import DesktopChatScreen from '../components/Desktop/DesktopChatScreen';
import MobileChatScreen from '../components/Mobile/MobileChatScreen';


export default function SearchResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q')
    const [responseMessages, setResponseMessages] = useState([])

    useEffect(() => {
        setResponseMessages([])
        const eventSource = new EventSource(`http://localhost:8000/chat?q=${q}`);
        eventSource.onmessage = (event) => {
            const msg = JSON.parse(event.data);
            console.log(msg);
            if (msg.done) {
                console.log('Done!');
                eventSource.close();
            } else {
                setResponseMessages((messages) => [...messages, msg]);
            }
            
            console.log(responseMessages.map(mes => mes.chat_response).join(''))
            console.log(responseMessages.flatMap(mes => mes.documents))
          };

          // Cleanup on component unmount
          return () => {
            eventSource.close();
          };
    }, [searchParams])

    function keyPress(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            setResponseMessages([])
            setSearchParams({q:inputValue});
            setInputValue('')
        }
    }
    const [inputValue, setInputValue] = useState('');
    function handleInputChange(e){
        setInputValue(e.target.value);
    }



    return(
        <>
        <Desktop>
            <DesktopChatScreen/>
        </Desktop>

        <Mobile>
            <MobileChatScreen urls={[...new Set(responseMessages.flatMap(mes => mes.documents.map(doc => doc.metadata.url)))]} responseMessages={responseMessages} />
        </Mobile>

       
        </>
    )
}