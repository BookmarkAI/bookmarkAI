import { Box, Grid, Button } from '@mui/material';
import logo from '../../assets/supermark_both.png';
import { useNavigate } from 'react-router-dom';
import { MobileSearchBar } from '../../components/SearchBar';
import HomeHeader from '../../components/HomeHeader';
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import MobileFooter from './MobileFooter';
import MobileHomeHeader from './MobileHomeHeader';
import FilterDrawer from './FilterDrawer';

const theme = createTheme({
    components: {
        MuiCssBaseline: {
            styleOverrides: (themeParam) => ({
                body: {
                    backgroundColor: "#0D0012",
                    overflow: 'hidden',
                    height: '100%'
                  },
                  html: {
                    margin: 0,
                    height: '100%',
                    overflow: 'hidden'
                  }

              }),
        },
      },
});

export default function MobileHomeScreen(props) {
    const navigate = useNavigate();
    return(
        <>
    
        <MobileHomeHeader/>
        <Grid container spacing={3} sx={{border:0, mt: 15}}>

            <Grid item xs={12} sx={{border:0, display: 'flex', justifyContent: 'center'}}>
                <img 
                    src={logo} 
                    alt="Bookmark Logo"
                    style={{
                        width: '60vw'
                    }}
                />
            </Grid>

            <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', ml:1 , mr: 1}}>
                <MobileSearchBar>
                    <FilterDrawer/>
                </MobileSearchBar>
            </Grid>

            <Grid item xs={12} sx={{border:0, display: 'flex', justifyContent: 'center'}}>
                <Button onClick={() => navigate('/browse')} sx={{background: 'linear-gradient(to right, #cd5b95, #9846ca)'}} variant="contained">Browse</Button>
            </Grid> 

        </Grid>

        </>
    )
}