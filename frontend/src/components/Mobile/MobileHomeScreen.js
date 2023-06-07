import { Box, Grid, Button } from '@mui/material';
import logo from '../../assets/bookmark_logo.png';
import { useNavigate } from 'react-router-dom';
import  { MobileSearchBar } from '../SearchBar';
import HomeHeader from '../HomeHeader';

export default function MobileHomeScreen(props) {
    const navigate = useNavigate();
    return(
        <>
        <HomeHeader/>
        <Grid container>
            <Grid item xs={12} sx={{pt: 10}}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p:2}}>
                <img 
                    src={logo} 
                    alt="Bookmark Logo"
                    style={{
                        height: 60,
                        marginBottom: 20,
                        ml: 10,
                        mr: 10
                    }}
                />
                <MobileSearchBar/>
                <Button onClick={() => navigate('/browse')} size="large" sx={{m:2, borderRadius: 1, backgroundColor: "#A1C0F1", textTransform: "none"}} variant="contained">Browse</Button>
                    
                </Box>
            </Grid>
        </Grid>
        </>
    )
}