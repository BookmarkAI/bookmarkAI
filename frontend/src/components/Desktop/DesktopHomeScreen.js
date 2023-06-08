import { Box, Grid, Button } from '@mui/material';
import logo from '../../assets/supermark_both.png';
import { useNavigate } from 'react-router-dom';
import { DesktopSearchBar } from '../../components/SearchBar';
import HomeHeader from '../../components/HomeHeader';
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

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

export default function DesktopHomeScreen(props) {
    const navigate = useNavigate();
    return(
        <>
        
        <ThemeProvider theme={theme}>
            <CssBaseline/>
        <Box sx={{width: '100vw', height: '100vh', overflow: 'hidden'}}>
        <div style={{ overflow: 'hidden' }}>
        
            <div class='space'></div><div class='space'></div>
        <HomeHeader/>
        <Grid container spacing={3} sx={{border:0}}>
            <Grid item xs={12} sx={{border:0}}>
            <Box sx={{flexGrow:1, display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                <Box sx={{mt: 30}}>
                <img 
                    src={logo} 
                    alt="Bookmark Logo"
                    style={{
                        height: '100px',
                        marginBottom: 20
                    }}
                />
                <DesktopSearchBar/>
                <Button onClick={() => navigate('/browse')} size="large" sx={{m:3, background: 'linear-gradient(to right, #cd5b95, #9846ca)'}} variant="contained">Or Browse It</Button>
                </Box>
            </Box>
            </Grid>
        </Grid>
        </div>
        </Box>
        </ThemeProvider>

        </>
    )
}