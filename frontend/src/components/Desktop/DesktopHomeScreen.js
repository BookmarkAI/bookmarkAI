import { Box, Grid, Button } from '@mui/material';
import logo from '../../assets/bookmark_logo.png';
import { useNavigate } from 'react-router-dom';
import { DesktopSearchBar } from '../../components/SearchBar';
import HomeHeader from '../../components/HomeHeader';

export default function DesktopHomeScreen(props) {
    const navigate = useNavigate();
    return(
        <>

        <HomeHeader/>
        <Grid container spacing={3} sx={{border:0}}>
            <Grid item xs={12} sx={{border:0}}>
            <Box sx={{flexGrow:1, display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                <Box sx={{mt: 30}}>
                <img 
                    src={logo} 
                    alt="Bookmark Logo"
                    style={{
                        height: '30%',
                        marginBottom: 20
                    }}
                />
                <DesktopSearchBar/>
                <Button onClick={() => navigate('/browse')} size="large" sx={{m:3, backgroundColor: "#A1C0F1"}} variant="contained">Or Browse It</Button>
                </Box>
            </Box>
            </Grid>
        </Grid>

        </>
    )
}