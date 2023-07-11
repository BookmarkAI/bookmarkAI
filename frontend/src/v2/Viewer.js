import { DrawerHeader } from "./DrawerHeader";
import Box from '@mui/material/Box';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Typography } from "@mui/material";
import { displayUrl } from "./utils";
import LaunchIcon from '@mui/icons-material/Launch';
import Stack from '@mui/material/Stack'
import LinearProgress from "@mui/material/LinearProgress";
import { useState } from "react";
import { useEffect } from "react";
import parse, { domToReact, htmlToDOM } from 'html-react-parser';

// var perf =require('./test.html');
function getUrl(url) {
    if (url.startsWith('https://firebasestorage.googleapis.com/')){
      return url
    } else {
      return `http://localhost:3000/api/viewer?url=${url}`
    }
  }

export default function Viewer({viewer, setViewer }) {
  const { content, url, type } = viewer;
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const handleIframeLoad = () => {
    setTimeout(() => {
      // Change the button icon back to the original icon
      setIframeLoaded(true);
  }, 2000); // 10 seconds in milliseconds
    
  };

  useEffect(() => {
    setIframeLoaded(false);
    handleIframeLoad()
  }, [url]);

  const options = {
    replace: ({ name, attribs, children }) => {
      if (!attribs) {
        return;
      }

      // if (name === 'img' && attribs.height && parseInt(attribs.height) < 150) {
      //   return null;  // Exclude this image from the output
      // }

      // if (attribs.class === 'code') {
      //   return <pre>{domToReact(children, options)}</pre>;
      // }
    },
  };

  const html = content && type == 'url' ? parse(content, options) : null;
  console.log(content)

    return (
        <Box component="main" sx={{ flexGrow: 1,  height: '100vh', borderRight: 1}}>
        <DrawerHeader />
        <Box sx={{width: '100%', height: 30, p: 1.5, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white'}}>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}> <LanguageOutlinedIcon fontSize="small" sx={{mr:1, color: '#414250'}}/> <Typography sx={{fontSize: 12}}> {displayUrl(url)} </Typography> </Box>
          <Stack direction="row" spacing={1}>
            <LaunchIcon onClick={()=>{window.open(url)}} fontSize="small" sx={{color: '#414250'}}/>
            <CloseOutlinedIcon onClick={()=>setViewer(null)} fontSize="small" sx={{color: '#414250'}}/>
          </Stack>
        </Box>
        
         {/* {!iframeLoaded && <LinearProgress/>} */}
        {html ? 
        <>
      <Box
        sx={{ 
          display: 'flex',
          flexDirection: 'column',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          '& h1, & h2, & h3, & h4, & h5, & h6': {
            marginTop: 2,
            marginBottom: 1,
          },
          '& p': {
            marginBottom: 1,
          },
          '& a': {
            color: 'primary.main',
          },
          '& div, & p': {
            width: '100%',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            fontSize: 15,
          },
          '& span': {
            width: '100%',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            fontSize: 'inherit'
          },
          '& code': {
            fontSize: 'inherit'
          },
          '& pre': {
            width: '100%',
            fontSize: 12,
            whiteSpace: 'pre-wrap',
            borderRadius: '5px',
            p: 1,
            backgroundColor: '#F7F7F7'
          },
          '& img': {
            maxWidth: '100%',
            height: 'auto',
          },
          pl: 3, pr: 3, pt: 1, width: '100%', height: '87%', overflow: 'auto' }}>

          <Typography variant="h5" sx={{fontWeight: 500}} gutterBottom>
            {viewer.title}
          </Typography>

          {html}
        </Box>
        
        
        </> : 
        <iframe position="relative" zIndex={1000} width="100%" height='88.5%' src={content ? content : getUrl(url)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>}
      </Box>
    )
}