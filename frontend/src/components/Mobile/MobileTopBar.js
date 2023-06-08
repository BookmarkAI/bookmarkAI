import { Toolbar, Box, Stack, Button, AppBar, Typography, Checkbox } from "@mui/material"
import MobileMenuBar from "./MobileMenuBar";
import BookMarkList from "../BookMarkList";
import { MobileBookMarkList } from "../BookMarkList";
import { MobileTab } from '../Tab';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import FilterDrawer from './FilterDrawer'
import * as React from 'react';

function ScrollToSlide01(props) {
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: props.threshold,
      target: props.window ? window() : undefined
    });
  
    return (
      <Slide appear={false} direction="down" in={trigger}>
        {props.children}
      </Slide>
    );
  }
  



export default function MobileTopBar(props) {
    

    return(
        <>
        <MobileMenuBar  {...props}/>
        {props.children}
        <ScrollToSlide01>
            <AppBar sx={{backgroundColor: "white"}}>
                <MobileMenuBar {...props}/>
                {props.children}
            </AppBar>
        </ScrollToSlide01>
        </>
    )

}
