import * as React from 'react';
import { useState, useEffect } from "react";
import { Box, Typography, IconButton, Collapse, Button, Toolbar, Stack, Grid, MenuItem, Menu } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CssBaseline from "@mui/material/CssBaseline";
import MobileFolder from './MobileFolder';
import { MobileSearchBar } from "../SearchBar";
import TuneIcon from '@mui/icons-material/Tune';
import { getAllFolders } from '../../services/service';
import ScrollHeader from './ScrollHeader';
import DesktopAddFolderDialog from '../Desktop/DesktopAddFolderDialog';

function FolderMenu({fetchFolderList}) {
    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
      fetchFolderList();
    };
  
    return (
      <div>
        <IconButton
          aria-controls="menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
        >
          <MoreHorizIcon />
        </IconButton>
         <Menu
          id="menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}>
          <MenuItem><DesktopAddFolderDialog fetchFolderList={handleMenuClose}/></MenuItem>
        </Menu>} 
      </div>
    );
  };



export default function MobileFoldersScreen() {
    const [ select, setSelect ] = useState(false);
    const [ selectAll, setSelectAll ] = useState(false);

    const [allFolders, setAllFolders] = useState([]);

    function fetchFolderList() {
        getAllFolders().then((response) => setAllFolders(response))
    }
    

    useEffect(() => {
        fetchFolderList();
    }, []);

    

    return(
        <>
    
        <ScrollHeader>
            <FolderMenu fetchFolderList={fetchFolderList}/>
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
                   Done
                </Button>
                </Box>
            </Collapse>


            <Grid xs={12} sx={{display: "flex", flexDirection: "column", m:1}}>
                <Stack spacing={1}>
                    {allFolders.map((folder, i) => (              
                         <MobileFolder folder={folder} select={select}/>
                    ))}

                </Stack>
            </Grid> 

        <Toolbar/>

        </>
    )

}

