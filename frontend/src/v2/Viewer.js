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

// var perf =require('./test.html');
function getUrl(url) {
    if (url.startsWith('https://firebasestorage.googleapis.com/')){
      return url
    } else {
      return `http://localhost:3000/api/viewer?url=${url}`
    }
  }

export default function Viewer({url, setViewer, type}) {
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

    return (
        <Box component="main" sx={{ flexGrow: 1,  height: '100vh', borderRight: 1}}>
        <DrawerHeader />
        <Box sx={{width: '100%', height: 30, p: 1.5, mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}> <LanguageOutlinedIcon fontSize="small" sx={{mr:1, color: '#414250'}}/> <Typography sx={{fontSize: 12}}> {displayUrl(url)} </Typography> </Box>
          <Stack direction="row" spacing={1}>
            <LaunchIcon onClick={()=>{window.open(url)}} fontSize="small" sx={{color: '#414250'}}/>
            <CloseOutlinedIcon onClick={()=>setViewer(null)} fontSize="small" sx={{color: '#414250'}}/>
          </Stack>
        </Box>
         {!iframeLoaded && <LinearProgress/>}
        <iframe position="relative" zIndex={1000} width="100%" height='88.5%' src={getUrl(url)} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Box>
    )
}