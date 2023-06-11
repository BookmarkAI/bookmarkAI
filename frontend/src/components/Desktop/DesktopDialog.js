import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import { blue } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import { auth, usersRef} from '../../fb.js';
import { doc, updateDoc, arrayUnion } from "firebase/firestore"; 
import { useState } from 'react';
import { AuthContext } from '../context/AuthContext.js';


const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;
  const [newFolderName, setNewFolderName] = useState('');
  const { user } = React.useContext(AuthContext)


  const handleClose = async () => {
    onClose(selectedValue);
    if (user && newFolderName !== '') {
      const user = auth.currentUser;
      const userRef = doc(usersRef, user.uid);
      await updateDoc(userRef, {
        folders: arrayUnion(newFolderName)
      });
      setNewFolderName('');
    }
  };

 const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleInputChange = (event) => {
    setNewFolderName(event.target.value);
  };


  return (
    <div>
      <Dialog onClose={handleClose} open={open}>
      <DialogTitle>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
              <Stack>
                  New Folder
                  <Typography>Organize bookmarks using folders</Typography>
              </Stack>
              
              <CloseIcon onClick={handleClose} sx={{pl: 1}}/>
          </Box>
      </DialogTitle>
        <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
          <TextField value = {newFolderName} onChange={handleInputChange} label="Folder Name" variant="outlined"/>
          <Button onClick={handleClose} sx={{textTransform: 'none', mt: 2,  p: 1.2, borderRadius: 4, background: 'linear-gradient(to right, #cd5b95, #9846ca)'}} variant="contained">
              Create Folder
          </Button>
        </Box>
      </Dialog>
    </div>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} sx={{textTransform: "none", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
            <AddIcon sx={{fontSize:"16px", mr: 0.5}}/>
            <Typography variant="h7" >
                Create New Folder 
            </Typography>
      </Button>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </>
  );
}