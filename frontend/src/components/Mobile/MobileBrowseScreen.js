import { MobileBookMarkList } from "../BookMarkList";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import MobileTopBar from './MobileTopBar';
import { useState } from "react";
import { Box, Typography, IconButton, Collapse, Button, Toolbar } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CssBaseline from "@mui/material/CssBaseline";





export default function MobileBrowseScreen() {
    const [ select, setSelect ] = useState(false);
    const [ open, setOpen ] = React.useState(false);
    const [ selectAll, setSelectAll ] = useState(false);
    

    return(
        <>
        <CssBaseline/>
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
                <Box sx={{display: "flex", justifyContent: "space-between", ml: 2, mr: 2}}>
                    <Button onClick={()=>setSelectAll(!selectAll)} sx={{textTransform:"none"}}>
                        { selectAll ? "Deselect All" : "Select All"}
                    </Button>

                    <Button onClick={()=>{setSelect(!select); setSelectAll(false)}} sx={{textTransform: "none"}}>
                        Cancel
                    </Button>
                </Box>
            </Collapse>

        <MobileBookMarkList select={select}/>
        <Toolbar/>

        </>
    )

}

