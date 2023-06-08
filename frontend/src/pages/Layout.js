import  {Toolbar, AppBar } from '@mui/material';
import { Outlet } from "react-router-dom"
import DesktopAppHeader from "../components/Desktop/DesktopAppHeader"
import MobileAppHeader from "../components/Mobile/MobileAppHeader"
import { Desktop, Mobile, Tablet, Default } from '../responsive/MediaQuery';
import MobileFooter from '../components/Mobile/MobileFooter';

export default function() {
    return(
        <>
            <Desktop>
                <DesktopAppHeader/>
            </Desktop>

            <Mobile>
                <MobileAppHeader/>
                <MobileFooter/>
            </Mobile>
            
            <Outlet/>
        </>
    )
}