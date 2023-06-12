import { useSearchParams } from 'react-router-dom'
import {useContext, useEffect, useState} from 'react';
import { usersRef, db} from '../fb.js';
import { doc, setDoc, collection} from "firebase/firestore"; 
import { Desktop, Mobile } from '../utils/MediaQuery';
import DesktopChatScreen from '../components/Desktop/DesktopChatScreen.js';
import MobileChatScreen from '../components/Mobile/MobileChatScreen.js'
import { EventSourcePolyfill } from 'event-source-polyfill';
import {AuthContext} from "../components/context/AuthContext";
import { FileContext } from '../utils/FileContext.js';

const EventSource = EventSourcePolyfill;

function getQueryString(selectedFiles) {
    if (selectedFiles.length == 0) {
        return ''
    } else {
        return selectedFiles.map((str) => `&selected_context=${str}`).join('');
    }
}

export default function SearchResult() {
    const { selectedFiles } = useContext(FileContext)
    
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q');
    const [responseMessages, setResponseMessages] = useState([]);
    const [sources, setSources] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        setResponseMessages([])
        const eventSource = new EventSource(`http://localhost:8000/chat?q=${q}${getQueryString(selectedFiles)}`, {
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

    useEffect(() => {
        setSources(
            Array.from(
                responseMessages.flatMap(
                    mes => mes.documents
                ).reduce(
                    (map, doc) => map.set(doc.metadata.url, doc.metadata), new Map()
                ).values()
            )
        )
    }, [responseMessages])

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
            <DesktopChatScreen responseMessages={responseMessages} sources={sources} />
        </Desktop>

        <Mobile>
            <MobileChatScreen responseMessages={responseMessages} sources={sources} />
        </Mobile>

       
        </>
    )
}