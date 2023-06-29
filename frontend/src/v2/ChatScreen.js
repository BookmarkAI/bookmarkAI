import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Sidebar from './Sidebar';
import Button from '@mui/material/Button';
import Topbar from './Topbar';
import logo from '../assets/supermark_logo.png'
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid'
import Viewer from './Viewer'
import Folder from './Folder'
import ChatBar from './ChatBar'
import ChatBox from './ChatBox'
import Avatar from '@mui/material/Avatar';
import UserMenu from '../components/UserMenu';
import { useNavigate } from 'react-router';

const drawerWidth = 240;
const appbarHeight = 50;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  minHeight: appbarHeight - 10

}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function ChatScreen() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [viewer, setViewer] = React.useState(null);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar elevation={0} sx={{minHeight: appbarHeight, height: appbarHeight, backgroundColor: '#181818'}} position="fixed">
        <Box sx={{mt: 0.5, ml: 2, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <Box sx={{display: 'flex', flexDirection: 'row'}}>
            <Box onClick={()=>navigate('/browse')} sx={{display: 'flex', alignItems: 'center'}}>
              <img 
                  src={logo} 
                  alt="Bookmark Logo"
                  style={{
                      width: 18
                  }}
              />
            </Box>
            <Box sx={{ml: 1, width: 250, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Button sx={{ width: 200, fontSize: 12, color: 'white', borderRadius: 0, background: 'linear-gradient(to right, #cd5b95, #9846ca)', height: 25}} variant="contained">
                   <AddIcon sx={{mr: 1}} fontSize="100"/> New Chat
                </Button>
            </Box> 
            </Box>  
              <UserMenu>
                <Avatar sx={{ width: 25, height: 25, mr: 2 }}/>
              </UserMenu>      
        </Box>
      </AppBar>
      <Sidebar setViewer={setViewer}/>
      <Grid container>
      <Grid item xs={6}>
        {viewer && <Viewer url={viewer} setViewer={setViewer}/>}
      </Grid>
      <Grid container xs={viewer ? 6 : 12} direction="column" alignItems="center">
        <ChatBox viewer={viewer} setViewer={setViewer}/>
      </Grid>
      </Grid>
    </Box>
  );
}