import { MobileBookMarkList } from "../BookMarkList";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import MobileTopBar from './MobileTopBar';
import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Collapse, Button, Toolbar, Grid } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CssBaseline from "@mui/material/CssBaseline";
import folder from '../../assets/folder/5.png'
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material";
import { MobileSearchBar } from "../SearchBar";
import TuneIcon from '@mui/icons-material/Tune';
import { getAllBookmarks } from "../../services/service";

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
    const [ allBookmarks, setAllBookmarks ] = useState([]); 
    const { id } = useParams();
    const selectedFolder = id;

    useEffect(() => {
        getAllBookmarks().then((response) => setAllBookmarks(response));
    }, []);

    const filteredBookmarks = selectedFolder
    ? allBookmarks.filter((bookmark) => bookmark.folder === selectedFolder)
    : allBookmarks;

    

    return(
        <>
        
        <CssBaseline/>
        
            <Grid xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <MobileSearchBar placeholder={"Ask about 12 bookmarks"}>
                    <Box>
                        <IconButton onClick={()=>setSelect(!select)}> 
                            <TuneIcon/>
                        </IconButton>
                    </Box>
                </MobileSearchBar>
            </Grid>

            <Box sx={{pl:4, pt: 2.5}}>
                <img 
                    src={folder} 
                    alt="Bookmark Logo"
                    style={{
                        height: '40px',
                    }}/>

                <Box sx={{display: "flex", flexDirection: "row",justifyContent: "flex-start", alignItems: "flex-end", mb: 1}}>
                <Typography variant="h6" sx={{ fontWeight: 450}}>
                    {selectedFolder}
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
                <MobileBookMarkList select={select} bookmarks={filteredBookmarks}/>
            </Box>

        
        <Toolbar/>
      
       

        </>
    )

}

