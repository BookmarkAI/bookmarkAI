import { Box, Grid, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubjectList from '../../components/SubjectList';
import { useState } from 'react';
import { DesktopBookMarkList } from '../../components/BookMarkList';
import { DesktopTab } from '../Tab';

export default function DesktopBrowseScreen(props) {
    const navigate = useNavigate();
    const [ genAI, setGenAI ] = useState(false);
    const [ lance, setLancedb ] = useState(false);
    return(
        <>
        
        <Toolbar/>
            <Grid container spacing={2}>
                <Grid item xs={3} sx={{border:1}}/>
                <Grid item xs={9} sx={{border: 1}}>
                    <Typography variant="h4" sx={{fontWeight: 500}}> All Bookmarks</Typography>
                    <Box sx={{mt: 4}}>

                    
                        <DesktopTab/>
                    </Box>
                
                    <DesktopBookMarkList genAI = { genAI } lance = {lance} />
                </Grid>
            </Grid>
       
     
        </>
    )
}