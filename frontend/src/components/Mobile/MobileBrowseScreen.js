import { MobileBookMarkList } from "../BookMarkList";
import * as React from 'react';
import MobileTopBar from './MobileTopBar';
import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Collapse, Toolbar, Grid, Button } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CssBaseline from "@mui/material/CssBaseline";
import { MobileSearchBar } from "../SearchBar";
import TuneIcon from '@mui/icons-material/Tune';
import { getAllBookmarks } from "../../services/service";
import ScrollHeader from './ScrollHeader';
import { TypeContext } from "../../utils/TypeContext";
import { useContext } from "react";
import { FileContext } from "../../utils/FileContext";



export default function MobileBrowseScreen() {
    const [ select, setSelect ] = useState(false);
    const [ open, setOpen ] = React.useState(false);
    const [ selectAll, setSelectAll ] = useState(false);
    const [ allBookmarks, setAllBookmarks ] = useState([]);
    const { selectedType } = useContext(TypeContext);
    const { selectedFiles, resetSelectedFiles } = useContext(FileContext);

    function fetchBookmarks() {
        getAllBookmarks().then((response) => setAllBookmarks(response));
    }
    

    useEffect(() => {
        fetchBookmarks();
    }, []);    

    const filteredBookmarks = selectedType ? allBookmarks.filter((bookmark) => bookmark.type === selectedType) : allBookmarks;

    return(
        <>
        <CssBaseline/>
        <ScrollHeader/>
        <Grid xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <MobileSearchBar placeholder={`Chat with ${selectedFiles.length < 1 ? "all" : selectedFiles.length} bookmarks`}>
                
                    <IconButton sx={{p:0.5}} onClick={()=>setSelect(!select)}> 
                        <TuneIcon sx={{fontSize: '21px'}}/>
                    </IconButton>
              
            </MobileSearchBar>
        </Grid>

        <MobileTopBar select={select} setSelect={setSelect} open={open} setOpen={setOpen}/>

           <Box onClick={()=>setSelect(!select)} sx={{display: "flex", width: "100%", alignItems: "center", justifyContent:"space-between", background:'linear-gradient(to right, #BB70EE, #87A5ED)'}}>
                <Typography variant="body2" sx={{pl:1, color: "white", fontWeight: 440}}>
                {selectedFiles.length} bookmarks selected ✍️
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

                    <Button onClick={()=>{setSelect(!select); setSelectAll(false)}} sx={{textTransform: "none"}}>
                       Done
                    </Button>
                </Box>
            </Collapse>

        <MobileBookMarkList select={select} bookmarks={filteredBookmarks} fetchBookmarks={fetchBookmarks}/>
        <Toolbar/>

        </>
    )

}

