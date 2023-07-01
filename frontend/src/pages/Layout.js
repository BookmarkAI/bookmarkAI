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
import AppHeader from '../v2/AppHeader';


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
                
                <AppHeader/>
                <Header/>
                
            </Desktop>

            <Mobile>
                <MobileFooter/>
            </Mobile>
            
            <Outlet/>
        </>
    )
}