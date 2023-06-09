import { useSearchParams } from 'react-router-dom'
import { Typography, Box, Grid, Paper, InputBase, Stack } from '@mui/material';
import { MuiMarkdown } from 'mui-markdown';
import { useEffect, useState } from 'react';
import DesktopChatList from './DesktopChatList'
import DesktopTab from '../Tab';
import { DesktopBookMarkList } from '../BookMarkList';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';


const responseMessages = [{chat_response: "Y Combinator is a renowned startup accelerator and venture capital firm that has played a significant role in shaping the startup landscape. Founded in 2005, Y Combinator provides early-stage funding, mentorship, and a supportive community to startups from various industries. They offer a highly competitive program where selected startups receive seed funding, access to a network of successful entrepreneurs and investors, and guidance from experienced mentors. Y Combinator's rigorous three-month program culminates in a Demo Day, where startups pitch their ideas to a room full of potential investors. Over the years, Y Combinator has nurtured and propelled numerous successful companies, such as Airbnb, Dropbox, Stripe, and Reddit, among many others. Their impact on the startup ecosystem has been substantial, making Y Combinator a revered institution for aspiring entrepreneurs seeking to turn their ideas into thriving businesses."}]

export default function DesktopChatScreen() {
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
                   <Box sx={{ maxHeight: 'calc(100vh - 110px)',pl: 2, overflow: "auto"}}>
                        <Box> 
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Typography variant="h7" sx={{fontWeight: 700, color: "#222222", pl: 1, pb: 1}}> Search History</Typography>
                            </Box>
                            <DesktopChatList/>
                            
                        </Box>
                    </Box>
               
                    
                </Grid>
                <Grid item xs={9.5}>
                    <DesktopTab/>
                    <Box sx={{ maxHeight: 'calc(100vh - 110px)', overflow: "auto"}}>
                    
                    
                    
                        {/* Chat Messages */}
                        
                            
                                
                        <Box sx={{display: "flex", flexDirection: "column", pb: 2, mt: 2, mb: 3, mr: 8, borderBottom: 1, borderColor: '#bbbbbb'}}>
                
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