import  {Toolbar, AppBar } from '@mui/material';
import { Outlet } from "react-router-dom"
import DesktopAppHeader from "../components/Desktop/DesktopAppHeader"
import { Desktop, Mobile, Tablet, Default } from '../responsive/MediaQuery';
import MobileFooter from '../components/Mobile/MobileFooter';
import ScrollHeader from '../components/Mobile/ScrollHeader';

export default function() {
    return(
        <>
            <Desktop>
                <DesktopAppHeader/>
            </Desktop>

            <Mobile>
                <ScrollHeader/>
                <MobileFooter/>
            </Mobile>
            
            <Outlet/>
        </>
    )
}