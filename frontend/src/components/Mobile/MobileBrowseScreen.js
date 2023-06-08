import { MobileBookMarkList } from "../BookMarkList";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import MobileTopBar from './MobileTopBar';
import { useState } from "react";
import { Box, Typography, IconButton, Collapse, Toolbar, Grid, Button } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CssBaseline from "@mui/material/CssBaseline";
import { MobileSearchBar } from "../SearchBar";
import TuneIcon from '@mui/icons-material/Tune';



export default function MobileBrowseScreen() {
    const [ select, setSelect ] = useState(false);
    const [ open, setOpen ] = React.useState(false);
    const [ selectAll, setSelectAll ] = useState(false);
    

    return(
        <>
        <CssBaseline/>
        <Grid xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <MobileSearchBar>
                <Box>
                    <IconButton onClick={()=>setSelect(!select)}> 
                        <TuneIcon/>
                    </IconButton>
                </Box>
            </MobileSearchBar>
        </Grid>

        <MobileTopBar select={select} setSelect={setSelect} open={open} setOpen={setOpen}/>

            {/* <Box onClick={()=>setSelect(!select)} sx={{display: "flex", width: "100%", alignItems: "center", justifyContent:"space-between", background:'linear-gradient(to right, #BB70EE, #87A5ED)'}}>
                <Typography variant="body2" sx={{pl:1, color: "white", fontWeight: 440}}>
                Select bookmarks to get answers from ✍️
                </Typography>
                <IconButton onClick={()=>setSelect(!select)}>
                    {!select?
                    <ArrowDropDownIcon/>
                    :
                    <ArrowDropUpIcon/>
                    }      
                </IconButton>
            
            </Box> */}

        
            <Collapse in={select} >
                <Box onClick={()=>setSelect(!select)} sx={{pt:1, pb: 1, display: "flex", width: "100%", alignItems: "center", justifyContent:"start", background:'linear-gradient(to right, #BB70EE, #87A5ED)'}}>
                    <Typography variant="body2" sx={{pl:1, color: "white", fontWeight: 440}}>
                    Select bookmarks and ask a question! ✍️
                    </Typography>
                
                </Box>
                <Box sx={{display: "flex", justifyContent: "space-between", ml: 2, mr: 2}}>
                    <Button onClick={()=>setSelectAll(!selectAll)} sx={{textTransform:"none"}}>
                        { selectAll ? "Deselect All" : "Select All"}
                    </Button>

                    <Button onClick={()=>{setSelect(!select); setSelectAll(false)}} sx={{textTransform: "none"}}>
                       Done
                    </Button>
                </Box>
            </Collapse>

        <MobileBookMarkList select={select}/>
        <Toolbar/>

        </>
    )

}

