import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { IconButton, Box, Typography, Button, Grid, FormControl, Select, InputLabel, Stack, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAllFolders, updateBookmarkFolder, deleteBookmarks } from '../services/service';
import { useState, useEffect } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Link from '@mui/material/Link';




function EditDialog({title, url, id, folder, open, setOpen, fetchBookmarks}){
    const [allFolders, setAllFolders] = useState([]);
    const [selectedValue, setSelectedValue] = useState(folder);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    function fetchFolderList() {
        getAllFolders().then((response) => setAllFolders(response))
    }
    

    useEffect(() => {
        fetchFolderList();
    }, []);
  
    const handleClose = () => {
        setOpen(false)
    }
    
    const handleUpdate = async () => {
        updateBookmarkFolder(id, selectedValue)
        fetchBookmarks();
        setOpen(false); 
    };

    return (
        <div>
        <Dialog 
            open={open} onClose={handleClose}
            sx={{ "& .MuiDialog-container": {
                alignItems: "flex-start",
                mt: 5
              }}}>
            <Box sx={{ width: '400px'}}>

            <DialogTitle>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography sx={{fontSize: 17}}>
                     <b>Edit Bookmark</b>
                    </Typography>
                    <CloseIcon sx={{fontSize: 18}} onClick={handleClose}/>
                </Box>
            </DialogTitle>
        
    
            
            <Grid sx={{m:3, mt: 1.5}}>  
                <Typography gutterBottom component="div"  style={{ fontSize: 14, fontWeight: 540}}>
                    {title}
                </Typography>
                <Link onClick={()=>window.open(url)} color= "#808080" component="div"  style={{ fontSize: 12,  wordWrap: "break-word" }}>
                    {url}
                </Link>  

                <Box sx={{mt: 3.5, pb: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Folder</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Folder &nbsp;"
                            value={selectedValue} 
                            onChange={handleChange}
                            sx={{fontSize: 13}}
                        >
                        
                            {allFolders.map((doc, i) => (              
                                <MenuItem sx={{fontSize: 13}} value={doc}>{doc}</MenuItem>
                            ))}
                      
                        </Select>
                    </FormControl> 
                <Button onClick={handleUpdate} sx={{ ml: 1, width: 100, textTransform: 'none', fontSize: 13, fontWeight: 440, borderRadius: 1, borderWeight: 200, 
                        color: '#3E434B', borderColor: "#DFE1E4",
                        '&:hover': {
                            backgroundColor: '#F8F9FC',
                            borderColor: '#DFE1E4'
                        }}} variant="outlined">
                    Save
                </Button>
                </Box>
            </Grid>
            </Box>
            
        </Dialog>
        
        </div>
    )
}

export default function BookmarkMenu(props) {
    const { title, url, id, i, fetchBookmarks, setAllBookmarks } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu= Boolean(anchorEl);
    const [ open, setOpen ] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async () => {
        await deleteBookmarks([id]);
        setAllBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.id !== id));
        setAnchorEl(null);
        
    };
  
  
    return (
      <div>
        <IconButton sx={{mt: 0.5, p: 0.5}} onClick={handleClick}>  
            {props.children}
        </IconButton>
        <EditDialog {...props} open={open} setOpen={setOpen}/>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem sx={{fontSize: 13}} onClick={()=>{setOpen(true); handleClose()}} fetchBookmarks={fetchBookmarks}>Edit</MenuItem>
          <CopyToClipboard text={url}>
            <MenuItem onClick={handleClose} sx={{fontSize: 13}}>Copy Link</MenuItem>
          </CopyToClipboard>
          <MenuItem sx={{fontSize: 13}} onClick={()=>{window.location.replace(url)}}>Visit Link</MenuItem>
          <MenuItem  sx={{color: 'red', fontSize: 13}} onClick={handleDelete}> Delete </MenuItem>
        </Menu>
      </div>
    );
}