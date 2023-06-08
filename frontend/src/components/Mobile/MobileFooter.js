import { AppBar, Toolbar, IconButton, Box, Collapse } from "@mui/material";
import HomeIcon from '@mui/icons-material/HomeOutlined';
import FolderIcon from '@mui/icons-material/FolderOutlined';
import BookmarkIcon from '@mui/icons-material/BookmarkBorderOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router";
import { Fade, useScrollTrigger } from "@mui/material";
import { MobileSearchBar } from "../SearchBar";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';



const ScrollToFade02 = props => {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: props.threshold,
      target: props.window ? window() : undefined
    });
  
    return (
      <Fade appear={true} direction="down" in={trigger}>
        {props.children}
      </Fade>
    );
  };


export default function MobileFooter() {
    const navigate = useNavigate();
    return (
        <>
        <AppBar position="fixed" color="primary" sx={{ background: "transparent", top: 'auto', bottom: 0 }}>
            <Toolbar sx={{background: "#f5f8f9", display: "flex", justifyContent: "flex-start", pb: 0.5}}>
          

                <Box sx={{width: '65vw',display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

                
                    <IconButton onClick={()=>navigate("/")} >
                        <HomeIcon />
                    </IconButton>
                    
                    <IconButton onClick={()=>navigate("/browse")}>
                        <BookmarkIcon/>
                    </IconButton>

                    <IconButton onClick={()=>navigate("/folders")}>
                        <FolderIcon/>
                    </IconButton>
                    <IconButton>
                        <SettingsIcon/>
                    </IconButton>
                </Box>
           
            </Toolbar>

            
            
            

        </AppBar>
        {/* <Box sx={{ position: 'fixed', bottom: 16, right: 20,  zIndex: 2000 }}>
            <Fab position="fixed" background='linear-gradient(to right, #cd5b95, #9846ca)' sx={{background: 'linear-gradient(to right, #cd5b95, #9846ca)'}} aria-label="add">
                <ChatBubbleOutlineIcon sx={{color: "white"}} />
            </Fab>
        </Box> */}

    {/* <ScrollToFade02>
        <Box sx={{ position: 'fixed', bottom: 60, left: 16, zIndex: 2000, width: '80%' }}>
            <MobileSearchBar/>
        </Box>
    </ScrollToFade02> */}
    </>
    )
}
