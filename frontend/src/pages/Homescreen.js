import { Box, Grid, Paper, Typography,Button } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import logo from '../assets/bookmark_logo.png';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import HomeHeader from '../components/HomeHeader';
import { Desktop, Mobile, Tablet, Default } from '../responsive/MediaQuery';
import DesktopHomeScreen from '../components/Desktop/DesktopHomeScreen';
import MobileHomeScreen from '../components/Mobile/MobileHomeScreen';

export default function HomeScreen(props) {
    const navigate = useNavigate();
    return(
        <>
        <Desktop>
            <DesktopHomeScreen/>
        </Desktop>
        <Mobile>
           <MobileHomeScreen/>
        </Mobile>
        <Tablet>
            <DesktopHomeScreen/>
        </Tablet>
        </>
    )
}