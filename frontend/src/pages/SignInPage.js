import { Box, Grid, Paper, DialogTitle, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import {useContext} from "react";
import {AuthContext} from "../components/context/AuthContext";
import { Navigate } from 'react-router-dom';
import { Desktop, Mobile } from '../utils/MediaQuery';
import img1 from '../assets/login/4.png';
import img2 from '../assets/login/5.png'
import img3 from '../assets/login/3.png'
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

    if (user) {
        return <Navigate to={'/'} />;
    }

    return(
        <>
        
      
        <ThemeProvider theme={theme}>
        <CssBaseline/>
        
        <Desktop>
            
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
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: 5, pb: 3}}>
                    {user ?
                            <DialogTitle>
                                 Hello, {user.displayName}
                                 <Typography sx={{mt:1}}>
                                    Welcome back! Start bookmarking now. 
                                </Typography>
                            </DialogTitle>
                            
                        :
                        <>
                            <DialogTitle>
                                Sign in to Supermark
                                <Typography sx={{mt:1}}>
                                    Sign up with google to start bookmarking for free!
                                </Typography>
                            </DialogTitle>
                        </>
                    }    
                    

                    <Box sx={{width: '100%', display: 'flex', flexGrow: 1, justifyContent: 'center'}}> 
                        {user ? 
                            <SignOut />
                            :
                            <SignIn/>
                        } 
                    </Box>  
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
       
        </Desktop>
        

        <Mobile>
        <Paper sx={{border: 0, backgroundImage: "url(https://ipack.info/wp-content/uploads/2015/11/star-sky-video-background.jpg)"}}>

        

        <Grid container spacing={3} sx={{border:0}}>
             <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', mt:7}}>
                <img 
                    src={img2} 
                    alt="Bookmark Logo"
                    style={{
                        height: '200px',
                        marginBottom: 20
                    }}
                />
            </Grid>
            
            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Box sx={{ width: '90%', display: 'flex', flexDirection: 'column', background: 'white', borderRadius: 5, pb: 3}}>
                    {user ?
                            <DialogTitle>
                                 Hello, {user.displayName}
                                 <Typography sx={{mt:1}}>
                                    Welcome back! Start bookmarking now. 
                                </Typography>
                            </DialogTitle>
                            
                        :
                        <>
                            <DialogTitle>
                                Sign in to Supermark
                                <Typography sx={{mt:1}}>
                                    Sign up with google to start bookmarking for free!
                                </Typography>
                            </DialogTitle>
                        </>
                    }    
                    

                    <Box sx={{width: '100%', display: 'flex', flexGrow: 1, justifyContent: 'center'}}> 
                        {user ? 
                            <SignOut />
                            :
                            <SignIn/>
                        } 
                    </Box>  
                </Box>
            </Grid>

            <Grid item xs={12} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-end', ml: 4, mt: 7}}>
                <img 
                    src={img3} 
                    alt="Bookmark Logo"
                    style={{
                        height: '200px',
                    }}
                />
            </Grid>
         
        </Grid>
        </Paper>
        </Mobile>
        
        </ThemeProvider>
        

        </>
    )
}


