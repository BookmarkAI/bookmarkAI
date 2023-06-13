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

export default function MobileChatScreen({ responseMessages, sources }) {
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
            <Card item xs={12} sx={{width:'100%',display: "flex", ml: 2, mr: 2}}>
                

                <Stack spacing={1} p={2}>
                    <Box sx={{display: "flex", justifyContent: "space-between"}}>
                        <Typography variant="h6"> 
                            {q}
                        </Typography>
                        <CopyToClipboard text={responseMessages.map(mes => mes.chat_response).join('')}>
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
            <Grid item xs={12} ref={downRef}> 
            <Typography variant="h6" sx={{pl: 3, pr: 3, pt: 3}}>
                Source Bookmarks 📚
            </Typography>
            
                <MobileBookMarkList bookmarks={sources}/>
            </Grid>
            
            
        </Grid>
        
        </>
    )
}