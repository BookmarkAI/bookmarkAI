import { MobileBookMarkList } from "../BookMarkList";
import * as React from 'react';
import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Collapse, Button, Toolbar, Grid } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CssBaseline from "@mui/material/CssBaseline";
import folder from '../../assets/folder/5.png'
import { useParams } from 'react-router-dom';
import { MobileSearchBar } from "../SearchBar";
import TuneIcon from '@mui/icons-material/Tune';
import { getAllBookmarks } from "../../services/service";
import ScrollHeader from './ScrollHeader';
import AddBookmarksToFolder from '../AddBookmarksToFolder';
import { FileContext } from "../../utils/FileContext";
import { useContext } from "react";



export default function MobileFolderView() {
    const [ select, setSelect ] = useState(false);
    const [ allBookmarks, setAllBookmarks ] = useState([]); 
    const { resetSelectedFiles, selectedFiles, updateSelectedFiles } = useContext(FileContext);
    const { id } = useParams();
    const selectedFolder = id;

    function fetchBookmarks(){
        getAllBookmarks().then((response) => setAllBookmarks(response));
    }

    function selectAll(){ 
        filteredBookmarks.forEach((bookmark) => updateSelectedFiles(bookmark.id))
    }

    useEffect(() => {
       fetchBookmarks();
    }, []);

    const filteredBookmarks = selectedFolder
    ? allBookmarks.filter((bookmark) => bookmark.folder === selectedFolder)
    : allBookmarks;

    

    return(
        <>
        
        <CssBaseline/>
            <ScrollHeader>
                <AddBookmarksToFolder folder={selectedFolder} fetchBookmarks={fetchBookmarks}/>
            </ScrollHeader>
        
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
                {selectedFiles.length < 1 ? "Select bookmarks and ask a question ✍️" : `${selectedFiles.length} bookmarks selected ✍️`}
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
                <Button onClick={()=>resetSelectedFiles()} sx={{textTransform:"none"}}>
                        Deselect all {selectedFiles.length} bookmarks
                </Button>

                <Button onClick={selectAll} sx={{textTransform: "none"}}>
                   Select all
                </Button>
                </Box>
            </Collapse>

            <Box position="sticky" overflow="auto" height="65vh">
                <MobileBookMarkList select={select} bookmarks={filteredBookmarks} fetchBookmarks={fetchBookmarks}/>
            </Box>

        
        <Toolbar/>
      
       

        </>
    )

}

