import { useSearchParams } from 'react-router-dom'
import {useContext, useEffect, useState} from 'react';
import { usersRef, db} from '../fb.js';
import { doc, setDoc, collection} from "firebase/firestore"; 
import { Desktop, Mobile } from '../utils/MediaQuery';
import DesktopChatScreen from '../components/Desktop/DesktopChatScreen.js';
import MobileChatScreen from '../components/Mobile/MobileChatScreen.js'
import { EventSourcePolyfill } from 'event-source-polyfill';
import {AuthContext} from "../components/context/AuthContext";

const EventSource = EventSourcePolyfill;

export default function SearchResult() {
    
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q');
    const [responseMessages, setResponseMessages] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setResponseMessages([])
        const eventSource = new EventSource(`http://localhost:8000/chat?q=${q}`, {
            headers: {
                'X-UID': user.uid
            }
        });
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

   async function keyPress(e){
        if(e.key === 'Enter'){
            e.preventDefault();
            setResponseMessages([])
            if (user.uid != null) {
                const queryRef = doc(collection(db, "users", user.uid, "queries"));
                await setDoc(queryRef, {
                    query: inputValue, 
                    time: new Date()
                }); 
            }
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
            <DesktopChatScreen urls={[...new Set(responseMessages.flatMap(mes => mes.documents.map(doc => doc.metadata.url)))]} responseMessages={responseMessages}  />
        </Desktop>

        <Mobile>
            <MobileChatScreen urls={[...new Set(responseMessages.flatMap(mes => mes.documents.map(doc => doc.metadata.url)))]} responseMessages={responseMessages} />
        </Mobile>

       
        </>
    )
}