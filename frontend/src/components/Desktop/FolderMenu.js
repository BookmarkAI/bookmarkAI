import * as React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function FolderMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu= Boolean(anchorEl);

    const handleClick = (event) => {
      event.stopPropagation();
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <div>
        <IconButton onClick={handleClick}>  
            <MoreVertIcon/>
        </IconButton>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem sx={{color: "red"}} onClick={handleClose}> Delete </MenuItem>
        </Menu>
      </div>
    );
}