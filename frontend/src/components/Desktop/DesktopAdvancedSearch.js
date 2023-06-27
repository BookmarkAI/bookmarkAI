import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import SelectScope from '../SelectScope';
import ReactGA from "react-ga4";


export default function DesktopAdvancedSearch() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    ReactGA.event({
        category: 'Bookmark',
        action: 'Select Context',
        label: 'Open Popup'
    })
  };
  
  const handleClose = () => {
    setAnchorEl(null);
    ReactGA.event({
        category: 'Bookmark',
        action: 'Select Context',
        label: 'Close Popup'
    })
  };



  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button variant="contained" onClick={handleClick} sx={{minHeight:'46px', color: "white", background: 'linear-gradient(to right, #cd5b95, #9846ca)', pl: 2, textTransform: "none"}}>
        Select Context     
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{width: '400px', height: '600px', overflow:'auto', p: 2}}>
          <SelectScope handleClose={handleClose}/>
        </Box>
      </Popover>
      
    </div>
  );
}