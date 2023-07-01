import * as React from 'react';
import Typography from '@mui/material/Typography';
import {  Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Menu, MenuItem } from '@mui/material';
import icon from '../assets/favicon.ico';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import { updateBookmarkFolder } from '../services/service';
import Bookmark from '../v2/Bookmark';
import SortIcon from '@mui/icons-material/Sort';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton';
import { getAllFolders, getAllBookmarks } from '../services/service';
import BpCheckbox from '../v2/CheckBox';
import { useRef } from 'react';

function formatDateTime(dateTime) {
  const formattedDateTime = dateTime.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return formattedDateTime;
}


function displayUrl(url) {
  return url.replace('https://','').split("/")[0]
}

function getIcon(url) {
  return `https://${displayUrl(url)}/favicon.ico`
}

function addDefaultSrc(ev) {
  ev.target.src = icon
}




function FilterMenu({folders, selectedFolders, setSelectedFolders, scrollToView}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => { 
       setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleChange = (folder) => {
      if (selectedFolders.includes(folder)) {
        setSelectedFolders(selectedFolders.filter((f) => f !== folder));   
      } else {
        setSelectedFolders((folders)=>[...folders, folder])
        scrollToView()
      }
    }
  
    return (
      <div>

        <Tooltip title="Filter by folder" placement="left-start">
          <IconButton 
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{borderRadius:0, p: 0.5}}>
            <SortIcon/>
          </IconButton>
        </Tooltip>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        > 
          {folders.map((folder)=>
            <MenuItem sx={{fontSize: 12, pt: 0.5, pb: 0.5, pl: 1.5, pr: 1.5, width: 150}}> 
              <BpCheckbox checked={selectedFolders.includes(folder)} handleChange={()=>handleChange(folder)}/> 
              <Box sx={{ml: 0.5}}> {folder} </Box> 
            </MenuItem>)}
        </Menu>
      </div>
    );
  }

export default function SelectBookmarkCard({folder, fetchBookmarks}) {
    const [ allFolders, setAllFolders ] = useState([])
    const [ allBookmarks, setAllBookmarks ] = useState([])
    const [ selectedFolders, setSelectedFolders] = useState([])
    const [open, setOpen] = useState(false);
    const [ selected, setSelected ] = useState([])

    const handleClickOpen = (event) => {
        console.log('hello')
        setOpen(true);
    };

    function handleChange(id) {
      if (selected.includes(id)) {
          setSelected((prevSelectedFiles) =>
          prevSelectedFiles.filter((selectedFile) => selectedFile !== id)
          );

      } else {
          setSelected((prevSelectedFiles) => [
              ...prevSelectedFiles,
              id
          ]);
      }
    }

    const handleAdd = async () => {
      const updatePromises = selected.map((file) => {
        return updateBookmarkFolder(file, folder);
      });
    
      await Promise.all(updatePromises);
      setSelected([])
      setOpen(false);
      fetchBookmarks();

    };

    const handleClose = () => {
      setSelected([])
      setOpen(false);
    }

    const scrollRef = useRef(null);

    const scrollToView = () =>{
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView({ behaviour: "smooth" });
      }
    }


   
    useEffect(() => {
        getAllBookmarks().then((response) => setAllBookmarks(response));
        getAllFolders().then((response)=> setAllFolders(response));
    }, []);

    const filteredBookmarks = selectedFolders.length > 0 ? allBookmarks.filter((bookmark) => {
      return selectedFolders.includes(bookmark.folder);
    }).sort((a, b) => {
      return selectedFolders.indexOf(a.folder) - selectedFolders.indexOf(b.folder);
    }) : allBookmarks 

    return (
        <>
        <Tooltip title="Add bookmarks to folder" placement="right-start">
          <IconButton sx={{ml: 1, p: 0.5}}>
            <AddIcon sx={{color: '#3E434B'}} onClick={handleClickOpen}/>
          </IconButton>
        </Tooltip>
        <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-container": {
                alignItems: "flex-start",
                justifyContent: 'center',
                mt: 5
              }
            }}>
            <DialogTitle>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography sx={{fontSize: 16}}> <b>Select Bookmarks to add</b></Typography>
                    <CancelIcon sx={{fontSize: 18}} onClick={handleClose}/>
                </Box>
            </DialogTitle>

            <DialogContent sx={{overflowY: 'auto', height: 300, width: 350, pl: 2, pr: 2}}>
            <Stack spacing={0.5}>
              {filteredBookmarks.map((doc, i) => (
                  <Bookmark key={doc.id} {...doc} setSelected={setSelected} selected={selected} checked={selected.includes(doc.id)} handleChange={()=>handleChange(doc.id)}/>
              ))}
              <div ref={scrollRef}></div>
              
            </Stack>
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0, pt: 2, ml:2, mb: 1.5, mr: 2}}>
            <FilterMenu folders={allFolders} selectedFolders={selectedFolders} setSelectedFolders={setSelectedFolders} scrollToView={scrollToView}/>
            
            <Button  onClick={handleAdd} sx={{ textTransform: 'none', fontSize: 12, fontWeight: 440, borderRadius: 1, borderWeight: 200, 
                        color: '#3E434B', borderColor: "#DFE1E4",
                        '&:hover': {
                            backgroundColor: '#F8F9FC',
                            borderColor: '#DFE1E4'
                        }}} variant="outlined">
                    {selected.length == 0 && <AddIcon sx={{fontSize: 12, mr: 0.5}}/>}
                    Add {selected.length > 0 && selected.length} Bookmarks
              </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}