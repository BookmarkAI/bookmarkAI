import * as React from 'react';
import Typography from '@mui/material/Typography';
import {  Box, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import icon from '../assets/favicon.ico';
import { getAllBookmarks } from '../services/service';
import { useState, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CancelIcon from '@mui/icons-material/Close';
import { updateBookmarkFolder } from '../services/service';


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

function BookmarkCard(props) {
  const { title, id, url, timestamp, folder, setSelected, selected} = props;
  const clicked = selected.includes(id)
 
  function handleClick(event) {
    event.stopPropagation();
    if (clicked) {
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

  return (
  <>
      <Box onClick={handleClick} sx={{ borderBottom: 1, borderColor: '#dddddd', display: "flex", justifyContent: 'space-between', background: clicked ? '#dddddd' : "white", }}>
      
        {/* Code to navigate to the link */}
        <Box sx={{ display: "flex"}}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", ml: 1, mr: 1}}>
            <img
              src={getIcon(url)}
              alt={""}
              onError={addDefaultSrc}
              style={{
                height: 25
            }}
            />
          </Box>

          <Box sx={{ pt: 1, pb: 1}} >
            <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
            {url ? displayUrl(url) : ""}
            </Typography>

            <Typography gutterBottom variant="subtitle" component="div"  style={{ lineHeight: "18px" , fontSize: 14, fontWeight: 420}}>
              {title ? title : "Title"}
            </Typography>
            
            <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
            {folder} &nbsp; {formatDateTime(new Date(timestamp*1000))} 
            </Typography>
          </Box>
        </Box>
      </Box>
 </>
 
    
  );
}

export default function SelectBookmarkCard({folder, fetchBookmarks}) {
    const [ allBookmarks, setAllBookmarks ] = useState([])
    const [open, setOpen] = useState(false);
    const [ selected, setSelected ] = useState([])

    const handleClickOpen = (event) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleClose = async () => {
      const updatePromises = selected.map((file) => {
        return updateBookmarkFolder(file, folder);
      });
    
      await Promise.all(updatePromises);
      setSelected([])
      setOpen(false);
      fetchBookmarks();
    };

   
    useEffect(() => {
        getAllBookmarks().then((response) => setAllBookmarks(response));
    }, []);

    return (
        <>
        <AddIcon sx={{color: "#959CA6"}} onClick={handleClickOpen}/>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    Select Bookmarks to add
                    <CancelIcon onClick={handleClose}/>
                </Box>
            </DialogTitle>
            
            <DialogContent sx={{overflowY: 'auto', maxHeight: 400,}}>
            {allBookmarks.map((doc, i) => (
                <BookmarkCard key={doc.id} {...doc} setSelected={setSelected} selected={selected}/>
            ))}
            </DialogContent>
            <DialogActions sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2}}>
            <Button fullWidth onClick={handleClose} sx={{textTransform: 'none',borderRadius: 3,p:1,ml:2,mr:2, background: 'linear-gradient(to right, #cd5b95, #9846ca)'}} variant="contained">
                Add {selected.length} bookmarks
            </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}