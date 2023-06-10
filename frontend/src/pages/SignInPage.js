import { Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SignIn from '../components/SignIn';
import SignOut from '../components/SignOut';
import {useContext} from "react";
import {AuthContext} from "../components/context/AuthContext";


// This sign in page displays the SignOut and SignIn components. These components will remotely change the User state regardless
// of weather props are passed, but you need to pass props to access the user state's value.


export default function Homescreen() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    return (
        <>
            {/* <HomeHeader/> */}
            <Grid container spacing={3} sx={{ border: 0 }}>
                <Grid item xs={12} sx={{ border: 0 }}>
                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                        <Box sx={{ mt: 30 }}>
                            {user ?
                                <div>
                                    Hello, {user.displayName}
                                    <SignOut />
                                </div>
                                :
                                <div>
                                    Please sign in: 
                                    <SignIn />
                                </div>
                            }

                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}