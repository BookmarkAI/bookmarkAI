import { MobileBookMarkList } from "../BookMarkList";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import MobileTopBar from './MobileTopBar';
import { useState } from "react";
import { Box, Typography, IconButton, Collapse, Button, Toolbar, Grid } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CssBaseline from "@mui/material/CssBaseline";
import folder from '../../assets/folder/5.png'
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
                body: {
                    margin: 0,
                    overflow: 'hidden',
                    height: '100%'
                  },
                  html: {
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden'
                  }

              }),
        },
      },
});



export default function MobileFolderView() {
    const [ select, setSelect ] = useState(false);
    const [ open, setOpen ] = React.useState(false);
    const [ selectAll, setSelectAll ] = useState(false);
    const { id } = useParams();
    

    return(
        <>
        
        <CssBaseline/>
        
            <Box sx={{pl:4, pt: 2.5}}>
                <img 
                    src={folder} 
                    alt="Bookmark Logo"
                    style={{
                        height: '40px',
                    }}/>

                <Box sx={{display: "flex", flexDirection: "row",justifyContent: "flex-start", alignItems: "flex-end", mb: 1}}>
                <Typography variant="h6" sx={{ fontWeight: 450}}>
                    {id}
                </Typography>
                <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 14, color: "#808080"}}>
                 &nbsp; 10 bookmarks
                </Typography>
                </Box>
            </Box>

            
        
            

            <Box onClick={()=>setSelect(!select)} sx={{display: "flex", width: "100%", alignItems: "center", justifyContent:"space-between", background:'linear-gradient(to right, #BB70EE, #87A5ED)'}}>
                <Typography variant="body2" sx={{pl:1, color: "white", fontWeight: 440}}>
                Select bookmarks and ask a question ✍️
                </Typography>
                <IconButton onClick={()=>setSelect(!select)}>
                    {!select?
                    <ArrowDropDownIcon/>
                    :
                    <ArrowDropUpIcon/>
                    }      
                </IconButton>
            
            </Box>


                
        
            <Collapse in={select} >
                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                <Button onClick={()=>setSelectAll(!selectAll)} sx={{textTransform:"none"}}>
                    { selectAll ? "Deselect All" : "Select All"}
                </Button>

                <Button onClick={()=>{setSelect(!select); setSelectAll(false)}} sx={{textTransform: "none"}}>
                    Cancel
                </Button>
                </Box>
            </Collapse>

            <Box position="sticky" overflow="auto" height="65vh">
                <MobileBookMarkList select={select}/>
            </Box>

        
        <Toolbar/>
      
       

        </>
    )

}

