import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { signOut } from '../fb';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { AuthContext } from './context/AuthContext';

export default function UserMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    if (user) {
        setAnchorEl(event.currentTarget);
    } else {
        navigate('/login')
    }
   
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>

      <IconButton
       aria-controls={open ? 'basic-menu' : undefined}
       aria-haspopup="true"
       aria-expanded={open ? 'true' : undefined}
       onClick={handleClick}
      >
            <Avatar sx={{ width: 40, height: 40 }}/>
     </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={signOut}>Logout</MenuItem>
      </Menu>
    </div>
  );
}