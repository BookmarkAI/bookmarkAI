import Toolbar from '@mui/material/Toolbar';
import { Outlet } from "react-router-dom"
import DesktopAppHeader from "../components/Desktop/DesktopAppHeader"
import MobileAppHeader from "../components/Mobile/MobileAppHeader"
import { Desktop, Mobile, Tablet, Default } from '../responsive/MediaQuery';

export default function() {
    return(
        <>
            <Desktop>
                <DesktopAppHeader/>
            </Desktop>

            <Mobile>
                <MobileAppHeader/>
            </Mobile>
            
            <Outlet/>
        </>
    )
}