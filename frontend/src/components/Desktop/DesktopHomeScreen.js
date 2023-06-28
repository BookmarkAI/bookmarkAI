import { Box, Grid, Button } from '@mui/material';
import logo from '../../assets/supermark_both.png';
import { useNavigate } from 'react-router-dom';
import { DesktopSearchBar } from '../../components/SearchBar';
import HomeHeader from '../../components/HomeHeader';
import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthContext } from '../context/AuthContext';
import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import OnboardingModal from '../modal/OnboardingModal';

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
    const authContext = useContext(AuthContext);
    const { onboarded, setOnboardingStatus } = authContext;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        // Check if onboarded is false and set modal visibility accordingly
        if (!onboarded) {
          setModalIsOpen(true);
        }
      }, [onboarded]);

    const handleOnboarded = () => {
        setOnboardingStatus(true);
        setModalIsOpen(false);
    }

    return(
        <>
        
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <OnboardingModal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                onClose={handleOnboarded}
            />
        <Box sx={{width: '100vw', height: '100vh', overflow: 'hidden'}}>
        <div style={{ overflow: 'hidden' }}>
        
            <div class='space'></div><div class='space'></div>
        <HomeHeader/>
        <Grid container spacing={3} sx={{border:0}}>
            <Grid item xs={12} sx={{border:0}}>
            <Box sx={{flexGrow:1, display: 'flex', justifyContent: 'center', textAlign: 'center'}}>
                <Box sx={{mt: 20}}>
                <img 
                    src={logo} 
                    alt="Bookmark Logo"
                    style={{
                        height: '100px',
                        marginBottom: 20
                    }}
                />
                <DesktopSearchBar height={45} width={600}/>
                <Button onClick={() => navigate('/browse')} size="large" sx={{m:3, background: 'linear-gradient(to right, #cd5b95, #9846ca)', textTransform: 'none'}} variant="contained">Browse Bookmarks</Button>
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