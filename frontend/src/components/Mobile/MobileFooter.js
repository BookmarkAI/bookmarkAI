import { AppBar, Toolbar, IconButton, Box, Collapse, Menu, MenuItem } from "@mui/material";
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
import { useState } from "react";
import { signOut } from "../../fb";



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
    
    const [anchorEl, setAnchorEl] = useState(null);
      
    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
      
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
   
      
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
                    <IconButton
                     aria-controls="menu"
                     aria-haspopup="true"
                     onClick={handleMenuClick}>
                        <SettingsIcon/>
                        
                    </IconButton>
                    <Menu
                        id="menu"
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        >
                            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                            <MenuItem onClick={signOut} >Logout</MenuItem>
                        
                    </Menu>
                </Box>
           
            </Toolbar>

        </AppBar>
    </>
    )
}
