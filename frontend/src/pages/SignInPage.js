import { Box, Grid, Dialog, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import {useContext} from "react";
import {AuthContext} from "../components/context/AuthContext";
import { Navigate } from 'react-router-dom';
import img1 from '../assets/login/4.png';
import img2 from '../assets/login/5.png'
// This sign in page displays the SignOut and SignIn components. These components will remotely change the User state regardless
// of weather props are passed, but you need to pass props to access the user state's value.
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

export default function SignInPage(props) {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    return(
        <>
        
        <ThemeProvider theme={theme}>
            <CssBaseline/>
        <Box sx={{width: '100vw', height: '100vh', overflow: 'hidden'}}>
        <div style={{ overflow: 'hidden' }}>
        
            <div class='space'></div><div class='space'></div>
        <Grid container spacing={3} sx={{border:0}}>
            <Grid item xs={4} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100vh'}}>
                <img 
                    src={img1} 
                    alt="Bookmark Logo"
                    style={{
                        height: '400px',
                        marginBottom: 20
                    }}
                />
            </Grid>
            <Grid item xs={4} sx={{height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{ width: '100%', height: '30vh', display: 'flex', flexDirection: 'column', background: 'white', alignItems: 'center', borderRadius: 2}}>
                    {user ?
                            <DialogTitle>
                                 Hello, {user.displayName}
                            </DialogTitle>
               
                        :
                        <>
                            <DialogTitle>
                                Sign in to Supermark
                            </DialogTitle>
                        </>
                    }    

                    {user ? 
                        <SignOut />
                        :
                        <SignIn/>
                    }   
                </Box>
            </Grid>
            <Grid item xs={4} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', mt:7, height: '100vh'}}>
                <img 
                    src={img2} 
                    alt="Bookmark Logo"
                    style={{
                        height: '300px',
                        marginBottom: 20
                    }}
                />
            </Grid>
        </Grid>
        </div>
        </Box>
        </ThemeProvider>

        </>
    )
}


