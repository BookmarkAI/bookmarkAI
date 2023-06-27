import  {Toolbar, AppBar } from '@mui/material';
import { Outlet } from "react-router-dom"
import DesktopAppHeader from "../components/Desktop/DesktopAppHeader"
import { Desktop, Mobile, Tablet, Default } from '../utils/MediaQuery';
import MobileFooter from '../components/Mobile/MobileFooter';
import ScrollHeader from '../components/Mobile/ScrollHeader';
import logo from '../assets/supermark_logo.png'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { DesktopSearchBar } from '../components/SearchBar';
import { useNavigate } from 'react-router-dom';
const appbarHeight = 50;

export default function() {
    const navigate = useNavigate();
    return(
        <>
            <Desktop>
                {/* <DesktopAppHeader/> */}
                <AppBar elevation={0} sx={{minHeight: appbarHeight, height: appbarHeight, backgroundColor: '#181818'}} position="fixed">
                    <Box sx={{mt: 1.5, ml: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                        <img 
                            src={logo} 
                            alt="Bookmark Logo"
                            style={{
                                width: 18
                            }}
                        />
                        <Box sx={{ml: 1, width: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button onClick={()=>navigate('/v2')} sx={{ width: 200, fontSize: 12, color: 'white', borderRadius: 0, background: 'linear-gradient(to right, #cd5b95, #9846ca)', height: 25}} variant="contained">
                            <AddIcon sx={{mr: 1}} fontSize="100"/> New Chat
                            </Button>
                        </Box>    
                       
                    </Box>
                </AppBar>
            </Desktop>

            <Mobile>
                <MobileFooter/>
            </Mobile>
            
            <Outlet/>
        </>
    )
}