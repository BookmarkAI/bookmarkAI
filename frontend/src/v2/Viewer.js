import { DrawerHeader } from "./DrawerHeader";
import Box from '@mui/material/Box';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Typography } from "@mui/material";
import { displayUrl } from "./utils";
import LaunchIcon from '@mui/icons-material/Launch';
import Stack from '@mui/material/Stack'

// var perf =require('./test.html');

export default function Viewer({url, setViewer}) {
    return (
        <Box component="main" sx={{ flexGrow: 1, width: '50vw', height: '100vh'}}>
        <DrawerHeader />
        <Box sx={{width: '100%', height: 30, p: 1, mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end'}}> <LanguageOutlinedIcon fontSize="small" sx={{mr:1}}/> <Typography sx={{fontSize: 12}}> {displayUrl(url)} </Typography> </Box>
          <Stack direction="row" spacing={1}>
            <LaunchIcon onClick={()=>{window.open(url)}} fontSize="small"/>
            <CloseOutlinedIcon onClick={()=>setViewer(null)} fontSize="small"/>
          </Stack>
        </Box>
        <iframe width="100%" height='88%' src={`http://localhost:3000/api/viewer?url=${url}`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
      </Box>
    )
}