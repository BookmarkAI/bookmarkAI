import { Toolbar, Box, Stack, Button } from "@mui/material"
import MobileMenuBar from "./MobileMenuBar";
import BookMarkList from "../BookMarkList";
import { MobileBookMarkList } from "../BookMarkList";
import { MobileTab } from '../Tab';

export default function MobileBrowseScreen() {
    return(
        <>
        <MobileMenuBar/>
        <MobileBookMarkList />
        </>
    )

}
