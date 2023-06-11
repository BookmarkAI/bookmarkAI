import { Box, Grid, IconButton, Typography, Stack, Card} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MuiMarkdown } from 'mui-markdown';
import MobileTopBar from './MobileTopBar';
import * as React from 'react';
import { MobileSearchBar } from '../SearchBar';
import { MobileBookMarkList } from "../BookMarkList";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import CopySnackbar from './CopySnackbar';
import CssBaseline from "@mui/material/CssBaseline";
import FilterDrawer from './FilterDrawer';
import ScrollHeader from './ScrollHeader';



const responseMessages = [{chat_response: "Y Combinator is a renowned startup accelerator and venture capital firm that has played a significant role in shaping the startup landscape. Founded in 2005, Y Combinator provides early-stage funding, mentorship, and a supportive community to startups from various industries. They offer a highly competitive program where selected startups receive seed funding, access to a network of successful entrepreneurs and investors, and guidance from experienced mentors. Y Combinator's rigorous three-month program culminates in a Demo Day, where startups pitch their ideas to a room full of potential investors. Over the years, Y Combinator has nurtured and propelled numerous successful companies, such as Airbnb, Dropbox, Stripe, and Reddit, among many others. Their impact on the startup ecosystem has been substantial, making Y Combinator a revered institution for aspiring entrepreneurs seeking to turn their ideas into thriving businesses."}]

export default function MobileChatScreen(props) {
    // const { responseMessages, urls } = props;
    const [ open, setOpen ] = React.useState(false);
    const [ openSnackbar, setOpenSnackbar ] = React.useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const q = searchParams.get('q')
    const downRef = React.useRef(null)
    const [ textClicked, setTextClicked ] = React.useState(false)
    
    useEffect(() => {
        const handleScroll = () => {
          const element = downRef.current;
    
          if (element) {
            const rect = element.getBoundingClientRect();
            const isBelowElement =window.pageYOffset >= rect.top;
    
            setTextClicked(isBelowElement);
          }
        };
    
        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);



    function executeScroll() {
        if (textClicked) {
            window.scrollTo(0, 0)
            setTextClicked(false); 
        } else {
            downRef.current.scrollIntoView();
            setTextClicked(true); 
        }
    }


   
    const navigate = useNavigate();
    return(
        <>
        <ScrollHeader/>
      
        <Grid xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <MobileSearchBar>
                <FilterDrawer/>
            </MobileSearchBar>
        </Grid>
        <CopySnackbar open={openSnackbar} setOpen={setOpenSnackbar}/>
        <MobileTopBar open={open} setOpen={setOpen}/>
        
        {/* <FilterDrawer open={open} setOpen={setOpen}/> */}
        <Grid container>
            <Card item xs={12} sx={{display: "flex", ml: 2, mr: 2}}>
                

                <Stack spacing={1} p={2}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant="h6"> 
                            {q}
                        </Typography>
                        <CopyToClipboard text={responseMessages[0].chat_response}>
                            <IconButton onClick={()=>setOpenSnackbar(true)}>
                                <ContentCopyIcon sx={{m:0.2}}/>
                            </IconButton>
                        </CopyToClipboard>

                    </Box>
                    <Typography variant="body1" fontSize='15px'>
                       💬 &nbsp;
                        <MuiMarkdown>
                         {responseMessages.map(mes => mes.chat_response).join('')}
                        </MuiMarkdown>
                    </Typography> 
                   
                </Stack>  
                
    
            </Card>
            <div ref={downRef}> 
            <Typography variant="h6" sx={{pl: 3, pr: 3, pt: 3}}>
                Source Bookmarks 📚
            </Typography>
            
                <MobileBookMarkList bookmarks={[]}/>
            </div>
            
            
        </Grid>
        
        </>
    )
}