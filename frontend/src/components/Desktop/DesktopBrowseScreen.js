import { Box, Grid, Toolbar, Typography, Button } from '@mui/material';
import { useState } from 'react';
import { DesktopBookMarkList } from '../../components/BookMarkList';
import { BrowseTab } from '../Tab';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DesktopFolderList from './DesktopFolderList';
import { useContext, useEffect } from 'react';
import { FileContext } from '../../utils/FileContext';
import { FolderContext } from '../../utils/FolderContext';
import { TypeContext } from '../../utils/TypeContext';
import AddIcon from '@mui/icons-material/Add';
import { getAllBookmarks } from '../../services/service'
import AddBookmarksToFolder from '../AddBookmarksToFolder';

export default function DesktopBrowseScreen(props) {
    const [ grid, setGrid ] = useState(true);
    const { selectedFiles, resetSelectedFiles, updateSelectedFiles} = useContext(FileContext);
    const { selectedFolder } = useContext(FolderContext);
    const { selectedType } = useContext(TypeContext);

    const [ allBookmarks, setAllBookmarks ] = useState([]);
    console.log(selectedFiles)

    function fetchBookmarks() {
        getAllBookmarks().then((response) => setAllBookmarks(response));
    }

    function selectAll() {
        filteredBookmarks.forEach(file => {
            updateSelectedFiles(file.id);
        });
    }
    

    useEffect(() => {
        fetchBookmarks();
    }, []);


    const filteredByType = selectedType ? allBookmarks.filter((bookmark) => bookmark.type === selectedType) : allBookmarks;

    const filteredBookmarks = selectedFolder
    ? filteredByType.filter((bookmark) => bookmark.folder === selectedFolder)
    : filteredByType;
    

    return(
        <>
        
            <Grid container spacing={2} sx={{mt: 2}} >
                <Grid item xs={2.5} sx={{ pr: 3}} >
                    <Box sx={{ maxHeight: 'calc(100vh - 110px)', overflow: "auto"}}>
                        <Box sx={{pl:2, pr:2}}> 
                            <Box sx={{ pb: 2,display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Typography variant="h7" sx={{fontWeight: 700, color: "#222222"}}> Folders</Typography>
                                <MoreHorizIcon sx={{color: "#222222"}}/>
                            </Box>
                            <DesktopFolderList/>  
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={9.5}>
                    <Box sx={{ maxHeight: 'calc(100vh - 110px)', overflow: "auto"}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: "center", pr: 7}}>
                            <Typography variant="h5" sx={{fontWeight: 550}}> 
                             { selectedFolder ? selectedFolder : "All Bookmarks" }
                            </Typography>

                            {selectedFolder && <AddBookmarksToFolder folder={selectedFolder} fetchBookmarks={fetchBookmarks}/>}
                        </Box>
                        <Box sx={{mt: 4}}>
                            <BrowseTab/>
                        </Box>
                    
                        <Box sx={{mt: 1}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', pr: 5}}>
                        <Button onClick={()=>resetSelectedFiles()} sx={{color: "#458be9", textTransform: "none", '&:hover': {
                            backgroundColor: 'white',
                            borderColor: 'transparent',
                            boxShadow: 'none',
                        }}}>
                        
                            
                            
                            Deselect {selectedFiles.length} bookmarks
                        
                                    
                        </Button>
                            <Button onClick={selectAll} sx={{color: "#458be9", pl: 2, textTransform: "none", '&:hover': {
                                backgroundColor: 'white',
                                borderColor: 'transparent',
                                boxShadow: 'none',
                            }}}>
                                Select All                    
                            </Button>
                        </Box>
                            <DesktopBookMarkList bookmarks={filteredBookmarks} fetchBookmarks={fetchBookmarks}/>
                    
                           
                        </Box>
                    </Box>
                </Grid>
            </Grid>
       
     
        </>
    )
}