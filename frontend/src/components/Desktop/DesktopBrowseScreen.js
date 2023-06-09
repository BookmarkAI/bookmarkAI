import { Box, Grid, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubjectList from '../../components/SubjectList';
import { useState } from 'react';
import { DesktopBookMarkList } from '../../components/BookMarkList';
import DesktopTab from '../Tab';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DesktopFolderList from './DesktopFolderList';
import MobileBookmarkCard from '../Mobile/MobileBookmarkCard';
import { MobileBookMarkList } from '../../components/BookMarkList';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useContext } from 'react';
import { FileContext } from '../../utils/FileContext';

export default function DesktopBrowseScreen(props) {
    const [ grid, setGrid ] = useState(true);
    const { selectedFiles, resetSelectedFiles } = useContext(FileContext);

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
                            <Typography variant="h5" sx={{fontWeight: 550}}> All Bookmarks</Typography>
                            {/* {grid ?
                            <GridViewIcon onClick={()=>setGrid(!grid)} sx={{opacity: 0.7}}/>
                            :
                            <ViewListIcon onClick={()=>setGrid(!grid)} sx={{opacity: 0.7}}/>
                            }   */}
                        </Box>
                        <Box sx={{mt: 4}}>
                            <DesktopTab/>
                        </Box>
                    
                        <Box sx={{mt: 1}}>
                        <Box sx={{display: 'flex', justifyContent: 'space-between', pr: 5}}>
                        <Button sx={{color: "#458be9", pl: 2, textTransform: "none", '&:hover': {
                            backgroundColor: 'white',
                            borderColor: 'transparent',
                            boxShadow: 'none',
                        }}}>
                        
                            
                            
                            {selectedFiles.length} bookmarks selected
                        
                                    
                        </Button>
                            <Button sx={{color: "#458be9", pl: 2, textTransform: "none", '&:hover': {
                                backgroundColor: 'white',
                                borderColor: 'transparent',
                                boxShadow: 'none',
                            }}}>
                                Select All                    
                            </Button>
                        </Box>
                            <DesktopBookMarkList grid={grid}/>
                    
                           
                        </Box>
                    </Box>
                </Grid>
            </Grid>
       
     
        </>
    )
}