import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import { IconButton, Box, Typography, Button, Grid, FormControl, Select, InputLabel, Stack, Menu, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getAllFolders, updateBookmarkFolder, deleteBookmarks } from '../services/service';
import { useState, useEffect } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';


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
  
    const handleClose = async () => {
        console.log(id)
        console.log(selectedValue)
        updateBookmarkFolder(id, selectedValue)
        fetchBookmarks();
        setOpen(false); 
    };

    return (
        <div>
        <Dialog open={open} onClose={handleClose}>
            <Box sx={{minWidth: '300px'}}>

           
            
               
            <DialogTitle>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    Edit Bookmark
                    <CloseIcon onClick={handleClose}/>
                </Box>
            </DialogTitle>
        
    
            
            <Grid sx={{m:3}}>  
                <Typography gutterBottom variant="h6" component="div"  style={{ lineHeight: "25px" , fontWeight: 540}}>
                    {title}
                </Typography>
                <Typography noWrap gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
                    {url}
                </Typography>  

                <Stack spacing={1} sx={{mt:4}}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Folder</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Folder"
                            value={selectedValue} 
                            onChange={handleChange}
                        >
                        
                            {allFolders.map((doc, i) => (              
                                <MenuItem value={doc}>{doc}</MenuItem>
                            ))}
                      
                        </Select>
                    </FormControl>        
                </Stack>

                <Box sx={{p: 0, display: 'flex', flexDirection: 'column'}}>
                <Button onClick={handleClose} sx={{textTransform: 'none', mt: 2,  p: 1.2, borderRadius: 4, background: 'linear-gradient(to right, #cd5b95, #9846ca)'}} variant="contained">
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
          <MenuItem sx={{fontSize: 13}} onClick={()=>{setOpen(true); handleClose()}} fetchBookmarks={fetchBookmarks}>Change Folder</MenuItem>
          <CopyToClipboard text={url}>
            <MenuItem onClick={handleClose} sx={{fontSize: 13}}>Copy Link</MenuItem>
          </CopyToClipboard>
          <MenuItem sx={{fontSize: 13}} onClick={()=>{window.location.replace(url)}}>Visit Link</MenuItem>
          <MenuItem  sx={{color: 'red', fontSize: 13}} onClick={handleDelete}> Delete </MenuItem>
        </Menu>
      </div>
    );
}