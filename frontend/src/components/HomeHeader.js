import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';


function ResponsiveAppBar() {

  return (
    <AppBar position="static" elevation="0">
        <Toolbar sx={{backgroundColor: "white", justifyContent: 'flex-end'}}>
            <IconButton>
            <Avatar/>
            </IconButton>
        </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;