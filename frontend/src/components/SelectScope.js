import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack, Box, Chip, IconButton, Grid, DialogTitle } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { FileContext } from '../utils/FileContext';
import { MobileBookMarkList } from './BookMarkList';
import { getAllBookmarks, getAllFolders } from '../services/service';
import ScopingBookmarkCard from './ScopingBookmarkCard';
import { Desktop } from '../utils/MediaQuery'
import ReactGA from "react-ga4";


export default function SelectScope({ handleClose }) {
  const [ allBookmarks, setAllBookmarks ] = useState([]);
  const [allFolders, setAllFolders] = useState([]);
  const { selectedFiles, updateSelectedFiles, removeSelectedFiles, resetSelectedFiles, chatEnabled } = useContext(FileContext);
  const [ selectedFolder, setSelectedFolder ] = useState(null);

  function fetchFolderList() {
      getAllFolders().then((response) => setAllFolders(response))
  }



  useEffect(() => {
      getAllBookmarks().then((response) => setAllBookmarks(response));
      fetchFolderList();
  }, []);

  function handleClickFolder(folder) {
    if (selectedFolder === folder) {
        setSelectedFolder(null)
        ReactGA.event({
            category: 'Bookmark',
            action: 'Select Context',
            label: 'Deselect Popup'
        })
    } else {
        setSelectedFolder(folder)
        ReactGA.event({
            category: 'Bookmark',
            action: 'Select Context',
            label: 'Select Popup'
        })
    }
  }

  function selectAll() {
    filteredBookmarks.forEach((bookmark) => updateSelectedFiles(bookmark.id))
  }

  function deselectAll() {
    filteredBookmarks.forEach((bookmark) => removeSelectedFiles(bookmark.id))
  }

  const filteredBookmarks = selectedFolder ? allBookmarks.filter((bookmark) => bookmark.folder === selectedFolder) : allBookmarks


  return (
    <div>
      
       
            
            <Desktop>
        
            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography sx={{ ml: 1, mb: 1}}>
                Select Bookmarks
                </Typography>
                <Button sx={{textTransform: 'none'}} onClick={handleClose}>
                <Typography sx={{fontWeight: 500}}>
                    Done
                </Typography>
                </Button>
            </Box>
          
            </Desktop>
            
                
            <Stack direction="row" spacing={0} sx={{flexWrap: "wrap"}} >  
                <Box sx={{mt: 0.4, mb: 0.4, ml: 0.5}}>
                        <Chip onClick={()=>handleClickFolder(null)} color={selectedFolder == null ? 'primary': 'default'}  label={'all'}>
                            All 
                        </Chip>
                </Box>
                {allFolders.map((tag) => (
                    <Box sx={{mt: 0.4, mb: 0.4, ml: 0.5}}>
                        <Chip onClick={()=>handleClickFolder(tag)} color={selectedFolder == tag ? 'primary': 'default'}  label={tag}>
                            {tag}
                        </Chip>
                    </Box>
                ))}
            </Stack>

            <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Button onClick={deselectAll} sx={{textTransform: 'none'}}>
                    Deselect all
                </Button>
                <Button sx={{textTransform: 'none'}} onClick={selectAll}>
                    Select All
                </Button>
            </Box>


            <Grid
                container
                spacing={0}
                justify="center"
            >

            {filteredBookmarks.map((doc, i) => (
                <Grid item xs={12}>
                     <Box sx={{display: "flex", flexDirection: "column", borderBottom: 0.2, borderColor: "#d3d3d3" }}>
                    <ScopingBookmarkCard {...doc}/>
                    </Box>
                    
                </Grid>
            ))}
        </Grid>

    
   
      
    </div>
  );
}