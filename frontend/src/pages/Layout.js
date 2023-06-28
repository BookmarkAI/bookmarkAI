import  {Toolbar, AppBar, Avatar} from '@mui/material';
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
import DesktopAdvancedSearch from '../components/Desktop/DesktopAdvancedSearch';
import UserMenu from '../components/UserMenu';
import { styled, useTheme } from '@mui/material/styles';


const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    minHeight: appbarHeight
  
  }));

const appbarHeight = 50;

export default function() {
    const navigate = useNavigate();
    return(
        <>
            <Desktop>
                
                <AppBar elevation={0} sx={{minHeight: appbarHeight, height: appbarHeight, backgroundColor: '#181818'}} position="fixed">
                    <Box sx={{mt: 0.5, ml: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                        <Box onClick={()=>navigate('/browse')} sx={{display: 'flex', alignItems: 'center'}}>
                        <img 
                            src={logo} 
                            alt="Bookmark Logo"
                            style={{
                                width: 18
                            }}
                        />
                        </Box>
                        <Box sx={{ml: 1, width: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Button onClick={()=>navigate('/v2')} sx={{ width: 200, fontSize: 12, color: 'white', borderRadius: 0, background: 'linear-gradient(to right, #cd5b95, #9846ca)', height: 25}} variant="contained">
                            <AddIcon sx={{mr: 1}} fontSize="100"/> New Chat
                            </Button>
                        </Box> 
                        </Box>  
                        <UserMenu>
                            <Avatar sx={{ width: 25, height: 25, mr: 2 }}/>
                        </UserMenu>      
                    </Box>
                </AppBar>
                <Header/>
                <DesktopAppHeader/>
                
            </Desktop>

            <Mobile>
                <MobileFooter/>
            </Mobile>
            
            <Outlet/>
        </>
    )
}