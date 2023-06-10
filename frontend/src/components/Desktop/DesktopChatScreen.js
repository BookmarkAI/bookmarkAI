import { useSearchParams } from 'react-router-dom'
import { Typography, Box, Grid, Paper, InputBase, Stack } from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';
import { useEffect, useState } from 'react';
import DesktopChatList from './DesktopChatList'
import { SearchTab } from '../Tab';
import { DesktopBookMarkList } from '../BookMarkList';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


export default function DesktopChatScreen({responseMessages}) {
    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q')

    const [inputValue, setInputValue] = useState('');
    function handleInputChange(e){
        setInputValue(e.target.value);
    }



    return(
        <>

            <Grid container spacing={2} sx={{mt: 2}} >
                <Grid item xs={2.5} sx={{  pr: 3}} >
                   <Box sx={{ maxHeight: 'calc(100vh - 150px)',pl: 2, overflow: "auto"}}>
                        <Box> 
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Typography variant="h7" sx={{fontWeight: 700, color: "#222222", pl: 1, pb: 1}}> Search History</Typography>
                            </Box>
                            <DesktopChatList/>
                            
                        </Box>
                    </Box>
               
                    
                </Grid>
                <Grid item xs={9.5}>
                    <SearchTab/>
                    <Box sx={{ maxHeight: 'calc(100vh - 150px)', overflow: "auto"}}>
                    
                    
                    
                        {/* Chat Messages */}
                        
                            
                                
                        <Box sx={{display: "flex", flexDirection: "column", pb: 2, mt: 6, mb: 3, mr: 8, borderBottom: 1, borderColor: '#bbbbbb'}}>
                
                                <Typography variant="body1" fontSize='20px' sx={{mr:1}}>
                                    💬 &nbsp;
                                    <MuiMarkdown>
                                     {responseMessages.map(mes => mes.chat_response).join('')}
                                    </MuiMarkdown>
                                </Typography>  
                                <Box sx={{display: "flex", justifyContent: "flex-end", pr: 2}}>
                                    <ContentCopyIcon sx={{fontSize:"20px", m: 1}}/> 
                                    <ThumbUpOffAltIcon sx={{fontSize:"20px", m: 1}}/>
                                    <ThumbDownOffAltIcon sx={{fontSize:"20px", m: 1}}/>
                                </Box>
                                
                         
                        </Box>

                        
                        <Typography variant="h6" sx={{fontWeight: 500}}gutterBottom>
                            Source Bookmarks
                        </Typography>
                        <DesktopBookMarkList grid={true}/>

                    </Box>
                </Grid>
                {/* <Grid item xs={3.5}>
                    <Box sx={{ maxHeight: 'calc(100vh - 110px)', overflow: "auto"}}>
                        <Typography variant="h6" sx={{fontWeight: 500}}gutterBottom>
                            Source Bookmarks
                        </Typography>
                    </Box>
                </Grid> */}
        
            </Grid>
       


       
        </>
    )
}