import { useSearchParams } from 'react-router-dom'
import { Typography, Box, Grid, Paper, InputBase, Stack } from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DesktopChatList from './DesktopChatList'
import { SearchTab } from '../Tab';
import { DesktopBookMarkList } from '../BookMarkList';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CopySnackbar from '../Mobile/CopySnackbar';
import { getAllConversations, getConversation } from '../../services/service';


export default function DesktopChatScreen({ responseMessages, sources }) {
    const [ searchParams, setSearchParams ] = useSearchParams();
    const [ openSnackbar, setOpenSnackbar ] = useState(false);
    const [ chatHistory, setChatHistory ] = useState([]);
    const { id } = useParams();

    const [ question, setQuestion ] = useState("")
    const [ answer, setAnswer ] = useState(null)
    

    const q = searchParams.get('q')

    const [inputValue, setInputValue] = useState('');
    function handleInputChange(e){
        setInputValue(e.target.value);
    }

    function fetchChatHistory() {
        getAllConversations().then((response) => setChatHistory(response));
    }

    useEffect(() => {
        fetchChatHistory();
        console.log(id);
        if (id) {
            getConversation(id).then((response) => {
                setQuestion(response.question);
                setAnswer(response.answer);
            })
        } else {
            setQuestion(q);
        }
    }, [id]);

   
    return(
        <>
            <CopySnackbar open={openSnackbar} setOpen={setOpenSnackbar}/>
            <Grid container spacing={2} sx={{mt: 2}} >
                <Grid item xs={2.5} sx={{  pr: 3}} >
                   <Box sx={{ maxHeight: 'calc(100vh - 150px)',pl: 2, overflow: "auto"}}>
                        <Box> 
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Typography variant="h7" sx={{fontWeight: 700, color: "#222222", pl: 1, pb: 1}}> Search History</Typography>
                            </Box>
                            <DesktopChatList chatHistory={chatHistory}/>
                            
                        </Box>
                    </Box>

                </Grid>
                <Grid item xs={9.5}>
                    <SearchTab/>
                    
                    <Box sx={{ maxHeight: 'calc(100vh - 150px)', overflow: "auto"}}>
                        <Box sx={{display: "flex", flexDirection: "column", pb: 2, mt: 3, mb: 3, mr: 8, borderBottom: 1, borderColor: '#bbbbbb'}}>
                                <Typography variant="h6">{question}</Typography>
                                <Typography variant="body1" fontSize='20px' sx={{mr:1, mt: 1}}>
                                    💬 &nbsp;
                                    <MuiMarkdown>
                                     {id ? 
                                        answer
                                        : 
                                        responseMessages.map(mes => mes.chat_response).join('')
                                    }
                                    </MuiMarkdown>
                                </Typography>  
                                <Box sx={{display: "flex", justifyContent: "flex-end", pr: 2}}>
                                    <CopyToClipboard text={id ? responseMessages.map(mes => mes.chat_response).join('') : answer}>
                                        <ContentCopyIcon onClick={()=>setOpenSnackbar(true)} sx={{fontSize:"20px", m: 1}}/> 
                                    </CopyToClipboard>
                                    
                                    <ThumbUpOffAltIcon sx={{fontSize:"20px", m: 1}}/>
                                    <ThumbDownOffAltIcon sx={{fontSize:"20px", m: 1}}/>
                                </Box>
                        </Box>
                        <Typography variant="h6" sx={{fontWeight: 500}}gutterBottom>
                            Source Bookmarks
                        </Typography>
                        <DesktopBookMarkList bookmarks={sources} grid={true}/>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}