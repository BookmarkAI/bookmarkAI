import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import UserMenu from './UserMenu';

function ResponsiveAppBar() {

  return (
    <AppBar sx={{backgroundColor: "transparent"}} position="static" elevation="0">
        <Toolbar sx={{backgroundColor: "transparent", justifyContent: 'flex-end'}}>
            <UserMenu>
            <Avatar sx={{ width: 40, height: 40 }}/>
            </UserMenu>
        </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;