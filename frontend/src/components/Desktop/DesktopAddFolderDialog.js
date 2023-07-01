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
    if (user && newFolderName !== '') {
      const user = auth.currentUser;
      const userRef = doc(usersRef, user.uid);
      await updateDoc(userRef, {
        folders: arrayUnion(newFolderName)
      });
      setNewFolderName('');
    }
    onClose()
  };

 const handleListItemClick = (value) => {
    onClose(value);
  };

  const handleInputChange = (event) => {
    setNewFolderName(event.target.value);
  };


  return (
    <div>
      <Dialog onClose={onClose} open={open}
      sx={{ "& .MuiDialog-container": {
                alignItems: "flex-start",
                mt: 5
              }}}>
      <Box sx={{ width: '350px'}}>
      <DialogTitle>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start'}}>
              <Stack spacing={1}>
              <Typography sx={{fontSize: 17, fontWeight: 500}}>
                 New Folder
              </Typography>
              <Typography sx={{fontSize: 14}}>
                Organize bookmarks with folders
              </Typography>
              </Stack>
              
              <CloseIcon onClick={onClose} sx={{pl: 1, fontSize: 20}}/>
          </Box>
      </DialogTitle>
        <Box sx={{p: 3, display: 'flex', flexDirection: 'column'}}>
          <TextField value = {newFolderName} onChange={handleInputChange} 
            inputProps={{style: {fontSize: 14}}} // font size of input text
            InputLabelProps={{style: {fontSize: 14}}} 
            size="small"
            label="Folder Name" variant="outlined"/>
          <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: 1.5}}>
            <Button onClick={handleClose}  sx={{ ml: 1, width: 100, textTransform: 'none', fontSize: 13, fontWeight: 440, borderRadius: 1, borderWeight: 200, 
                          color: '#3E434B', borderColor: "#DFE1E4",
                          '&:hover': {
                              backgroundColor: '#F8F9FC',
                              borderColor: '#DFE1E4'
                          }}} variant="outlined">
                <AddIcon sx={{fontSize: 12, mr: 0.5}}/>
                Create
            </Button>
          </Box>
        </Box>
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

export default function SimpleDialogDemo(props) {
  const { fetchFolderList } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
    
  };

  const handleClose = (value) => {
    setOpen(false);
    fetchFolderList();
  };

  return (
    <>
      <Button disableRipple onClick={handleClickOpen} 
            sx={{pt: 1.1, pb: 1.1,  width: '100%', textTransform: "none", display: "flex", justifyContent: "center", alignItems: "center",
            '&:hover': {backgroundColor: '#F8F9FC'}}}>
            <AddIcon sx={{fontSize:12, mr: 0.5}}/>
            <Typography sx={{fontSize: 12}} >
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