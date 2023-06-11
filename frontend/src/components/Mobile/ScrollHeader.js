import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { IconButton, Avatar, Slide, Collapse, Button, Menu } from '@mui/material';
import { useNavigate } from 'react-router';
import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function ScrollTop(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      target: window ? window() : undefined,
      disableHysteresis: true,
      threshold: 10,
    });
  
    const handleClick = (event) => {
      const anchor = (event.target.ownerDocument || document).querySelector(
        '#back-to-top-anchor',
      );
  
      if (anchor) {
        anchor.scrollIntoView({
          block: 'center',
        });
      }
    };
  
    return (
      // <Fade in={trigger}>
      // onClick={handleClick}
        <Box
          onClick={handleClick}
          role="presentation"
          sx={{ position: 'fixed', bottom: 17, right: 20, zIndex: 2000 }}
        >
          {children}
        </Box>
      // </Fade>
    );
  }
  
  ScrollTop.propTypes = {
    children: PropTypes.element.isRequired,
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
  };
  
 
function ScrollToHide01 (props) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: props.threshold,
        target: props.window ? window() : undefined
    });

    return (
        <Slide appear={true} direction="down" in={!trigger}>
            {props.children}
        </Slide>
    );
};


export default function BackToTop(props) {
  const navigate = useNavigate()
  return (
    <React.Fragment>
        <CssBaseline />
        <ScrollToHide01 threshold={1}>
        <AppBar elevation={0} sx={{backgroundColor: "transparent"}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <IconButton onClick={()=>navigate('/browse')}>
                  <ArrowBackIcon/>
                </IconButton>
                {props.children ? 
                 props.children :
                <IconButton>
                 <MoreHorizIcon />
                </IconButton>
                }
            </Toolbar>
        </AppBar>
        </ScrollToHide01>
        <Toolbar id="back-to-top-anchor">
        </Toolbar>
        <ScrollTop {...props}>
          <Fab position="fixed" background='linear-gradient(to right, #cd5b95, #9846ca)' sx={{background: 'linear-gradient(to right, #cd5b95, #9846ca)'}} aria-label="add"> 
            <KeyboardArrowUpIcon sx={{color: "white"}}/>            
          </Fab>
        </ScrollTop>
      </React.Fragment>
  );
}

