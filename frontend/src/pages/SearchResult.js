import { useSearchParams } from 'react-router-dom'
import {useContext, useEffect, useState} from 'react';
import { Desktop, Mobile } from '../utils/MediaQuery';
import DesktopChatScreen from '../components/Desktop/DesktopChatScreen.js';
import MobileChatScreen from '../components/Mobile/MobileChatScreen.js'
import { EventSourcePolyfill } from 'event-source-polyfill';
import {AuthContext} from "../components/context/AuthContext";
import { FileContext } from '../utils/FileContext.js';
import ReactGA from "react-ga4";

const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

const EventSource = EventSourcePolyfill;

function getQueryString(selectedFiles) {
    if (selectedFiles.length === 0) {
        return ''
    } else {
        return selectedFiles.map((str) => `&selected_context=${str}`).join('');
    }
}

export default function SearchResult() {
    const { selectedFiles } = useContext(FileContext)
    
    const [searchParams] = useSearchParams();
    const q = searchParams.get('q');
    const [responseMessages, setResponseMessages] = useState([]);
    const [sources, setSources] = useState([]);
    const [ searchResult, setSearchResult ] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
      
        const fetchData = async () => {
            try {
              const response = await fetch(`${BASE_URL}/search` , {
                method: 'POST',
                body: JSON.stringify({ query: q, limit_chunks: 20, certainty: 0.95, alpha: 0.2 }),
                headers: {
                    'X-UID': user.uid,
                    'Content-Type': 'application/json'
                }
              });
              if (response.ok) {
                const data = await response.json();
                return data
 
              } else {
                throw new Error('Request failed');
              }
            } catch (error) {
              // Handle any errors
            }
          };

        if(q) {
      
          fetchData().then(data => { 
            const updatedData = data.map(bookmark => {
              const type = bookmark.url.endsWith(".pdf") ? "pdf" : "url";
              return { ...bookmark, type };
            });
            setSearchResult(updatedData);
          });
        } else {
          setSearchResult([]);
        }

    }, [searchParams])

    useEffect(() => {
        setResponseMessages([])

        if (q) {
            const eventSource = new EventSource(`${BASE_URL}/chat?q=${q}${getQueryString(selectedFiles)}`, {
                headers: {
                    'X-UID': user.uid
                }
            });
            eventSource.onmessage = (event) => {
                const msg = JSON.parse(event.data);
                if (msg.done) {
                    eventSource.close();
                } else {
                    setResponseMessages((messages) => [...messages, msg]);
                }
              };

          // Cleanup on component unmount
          return () => {
            eventSource.close();
          }
        }
    }, [searchParams])

    useEffect(() => {
        setSources(
            Array.from(
                responseMessages.flatMap(
                    mes => mes.documents
                ).reduce(
                    (map, doc) => map.set(doc.url, doc), new Map()
                ).values()
            )
        )
    }, [responseMessages])

    useEffect(() => {
        if (q) {
            ReactGA.event({
                category: 'Chat',
                action: 'Prompt',
                label: q
            })
        }
    }, [])


    return(
        <>
        <Desktop>
            <DesktopChatScreen responseMessages={responseMessages} sources={sources} searchResult={searchResult} />
        </Desktop>

        <Mobile>
            <MobileChatScreen responseMessages={responseMessages} sources={sources} searchResult={searchResult} />
        </Mobile>

       
        </>
    )
}