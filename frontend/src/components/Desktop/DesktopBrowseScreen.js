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
import { getAllBookmarks, getAllConversations } from '../../services/service'
import AddBookmarksToFolder from '../AddBookmarksToFolder';
import { DesktopSearchBar } from '../SearchBar';

export default function DesktopBrowseScreen(props) {
    const { selectedFiles, resetSelectedFiles, removeSelectedFiles, updateSelectedFiles} = useContext(FileContext);
    const { selectedFolder } = useContext(FolderContext);
    const { selectedType } = useContext(TypeContext);

    const [ allBookmarks, setAllBookmarks ] = useState([]);



    function fetchBookmarks() {
        console.log("test")
        getAllBookmarks().then((response) => setAllBookmarks(response));
    }

    function selectAll() {
        filteredBookmarks.forEach(file => {
            updateSelectedFiles(file.id);
        });
    }

    function deselectAll() {
        filteredBookmarks.forEach(file => {
           removeSelectedFiles(file.id);
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
            <Grid container >
                <Grid item xs={1.8} sx={{ borderRight: 1, height: 'calc(100vh - 50px)', borderColor: '#EFF1F4'}} >
                    <Box sx={{ maxHeight: 'calc(100vh - 110px)', overflow: "auto"}}>
                        <Box> 
                            <Box sx={{ pb:1,  display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                                <Typography sx={{ pt: 1.5, pl: 1.5, pr: 1.5, pb: 0.5, fontSize: 13, fontWeight: 500}}>Folders</Typography>
                            </Box>
                            <DesktopFolderList/>  
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={10.2} sx={{height: 'calc(100vh - 50px)'}}>
                    <Box sx={{width: '100%', borderBottom: 1, borderColor: '#EFF1F4', pt: 1.5, pb: 1.5, pl: 4}}>
                        <DesktopSearchBar width={650}/>
                    </Box>
                    <Box sx={{ maxHeight: 'calc(100vh - 110px)', overflow: "auto", pt: 2, ml: 4}}>
                        <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: "flex-start", alignItems: "center", pr: 7, ml: 0.5}}>
                            <Typography variant="h6" sx={{fontWeight: 550}}> 
                             { selectedFolder ? selectedFolder : "All Bookmarks" }
                            </Typography>
                                    
                            {selectedFolder && <AddBookmarksToFolder folder={selectedFolder} fetchBookmarks={fetchBookmarks}/>}
                        </Box>
                        
                        <Box>
                            <BrowseTab/>
                        </Box>
                    
                        <Box sx={{mt: 1}}>
                            <DesktopBookMarkList bookmarks={filteredBookmarks} fetchBookmarks={fetchBookmarks} setAllBookmarks={setAllBookmarks}/>           
                        </Box>
                    </Box>
                </Grid>
            </Grid>
       
     
        </>
    )
}