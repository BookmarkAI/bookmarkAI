import { MobileBookMarkList } from "../BookMarkList";
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import * as React from 'react';
import MobileTopBar from './MobileTopBar';
import { useState } from "react";
import { Box, Typography, IconButton, Collapse, Button, Toolbar, Stack, Grid } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import CssBaseline from "@mui/material/CssBaseline";
import MobileFolder from './MobileFolder';
import { folders } from '../../services-mock/fake_dataset';
import { MobileSearchBar } from "../SearchBar";
import TuneIcon from '@mui/icons-material/Tune';



export default function MobileFoldersScreen() {
    const [ select, setSelect ] = useState(false);
    const [ open, setOpen ] = React.useState(false);
    const [ selectAll, setSelectAll ] = useState(false);
    

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

            <Box onClick={()=>setSelect(!select)} sx={{mt: 1.5, display: "flex", width: "100%", alignItems: "center", justifyContent:"space-between", background:'linear-gradient(to right, #BB70EE, #87A5ED)'}}>
                <Typography variant="body2" sx={{pl:1, color: "white", fontWeight: 440}}>
                Select folders and ask questions ✍️
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

            {/* Folder List */}
            <Grid xs={12} sx={{display: "flex", flexDirection: "column", m:1 }}>
                <Stack spacing={1}>
                    {folders.map((doc, i) => (              
                         <MobileFolder {...doc} select={select}/>
                    ))}

                </Stack>
            
            </Grid>

        <Toolbar/>

        </>
    )

}

