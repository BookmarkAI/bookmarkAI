import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SubjectList from '../../components/SubjectList';
import { useState } from 'react';
import { DesktopBookMarkList } from '../../components/BookMarkList';

export default function DesktopBrowseScreen(props) {
    const navigate = useNavigate();
    const [ genAI, setGenAI ] = useState(false);
    const [ lance, setLancedb ] = useState(false);
    return(
        <>
        
        <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            <Grid item xs={2}/>
            <Grid item xs={10}>
                <DesktopBookMarkList genAI = { genAI } lance = {lance} />
            </Grid>
        </Grid>
        </Box>
        </>
    )
}