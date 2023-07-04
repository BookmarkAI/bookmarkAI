import AddIcon from '@mui/icons-material/Add';
import {  Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useState } from 'react';
import CancelIcon from '@mui/icons-material/Close';
import { storage } from "../../fb";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';
import { IconButton, Grid, FormControl, Select, InputLabel, Stack, Menu, MenuItem } from '@mui/material';
import { getAllFolders } from '../../services/service';
import { useEffect } from 'react';
import CircularProgress, {
    CircularProgressProps,
  } from '@mui/material/CircularProgress';


const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export default function UploadFileModal(props) {
    const { fetchBookmarks } = props;
    const [open, setOpen] = useState(false)
    const [file, setFile] = useState("");
    const [folder, setFolder] = useState("");
    // progress
    const [percent, setPercent] = useState(0);
    const { user } = useContext(AuthContext) 
    const [allFolders, setAllFolders] = useState([]);
    const [selectedValue, setSelectedValue] = useState(null);

    const handleFolderChange = (event) => {
        setSelectedValue(event.target.value);
    };

    function fetchFolderList() {
        getAllFolders().then((response) => setAllFolders(response))
    }
    

    useEffect(() => {
        fetchFolderList();
    }, []);
 

    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
        setPercent(1)
        const storageRef = ref(storage, `/files/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            // () => {
            //     // download url
            //     getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            //         console.log(url);
            //     });
            // }
            async () => {
                try {
                  // Retrieve the download URL
                  const url = await getDownloadURL(uploadTask.snapshot.ref);
                  const buffer = await file.arrayBuffer();
                  const bytes = new Uint8Array(buffer);
                  const formattedPDFBytes = Array.from(bytes)
                  const obj = {
                    pdf_bytes: formattedPDFBytes,
                    url: url,
                    title: file.name,
                    timestamp: 1000,
                    folder: folder ? folder : "Unsorted"
                   }

           
                  
                  // Send the POST request to your backend with the download URL
                  await fetch(`${BASE_URL}/storepdf`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-UID':user.uid,
                        },
                        body: JSON.stringify(obj)
            
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Process the response from the POST request
                        console.log("data");
                        console.log(data);
                        handleClose();
                    })
                    .catch(error => {
                        // Handle any errors
                        console.error(error);
                    });
                  console.log(url);
                  console.log('File uploaded and request sent successfully');
                } catch (error) {
                  console.error('Error uploading file:', error);
                }
              }
        );

       
    };

    const handleClose = () => {
        setOpen(false);
        setFile("");
        setPercent(0);
        fetchBookmarks();
      }
    return(
        <>
        <Dialog open={open} onClose={handleClose} sx={{ "& .MuiDialog-container": {
            alignItems: "flex-start",
            justifyContent: 'center',
            mt: 5
          }
        }}>

            <DialogTitle>
                <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography sx={{fontSize: 16}}> <b>Upload a document</b></Typography>
                    <CancelIcon sx={{fontSize: 18}} onClick={handleClose}/>
                </Box>
            </DialogTitle>

            <DialogContent sx={{overflowY: 'auto', height: 200, width: 350, pl: 2, pr: 2}}>
                            
               <Button
                    disableRipple
                    variant="outlined"
                    component="label"
                    sx={{width: '100%', height: 100, textTransform: 'none', fontWeight: 410, color: '#404040', borderColor: '#D5D3D1',backgroundColor: file ? '#F8F9FC' : 'transparent' , borderStyle: 'dashed',
                    '&:hover': {
                        backgroundColor: '#F8F9FC',
                        borderColor: '#DFE1E4',
                        borderStyle: 'dashed'
                    }}}
                    >
                    {file ? 
                    file.name
                    :          
                    "Select a document"
                    } 
                    
                    <input type="file" onChange={handleChange} accept="/image/*" hidden/>
                    
                    
                </Button>
                <Box sx={{mt: 2.5, pb: 1.5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Folder</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Folder &nbsp;"
                            value={selectedValue} 
                            onChange={handleFolderChange}
                            sx={{fontSize: 13}}
                        >
                        
                            {allFolders.map((doc, i) => (              
                                <MenuItem sx={{fontSize: 13}} value={doc}>{doc}</MenuItem>
                            ))}
                      
                        </Select>
                    </FormControl> 
                    
                </Box>
                <Box sx={{width: '100%', display: 'flex', flexDirection: 'row'}}>
                <Button onClick={handleUpload} sx={{  mr: 1, width: '50%', textTransform: 'none', fontSize: 13, fontWeight: 440, borderRadius: 1, borderWeight: 200, 
                        backgroundColor: '#D75FAA',
                        '&:hover': {
                            backgroundColor: '#D75FAA',
                        }}} variant="contained"
                        disabled={file ? false: true}
                >
                    { percent == 0 ? "Upload" :
                    <CircularProgress size="1rem" sx={{color: 'white'}}/>}
                </Button>
                <Button onClick={handleClose} sx={{  width: '50%', textTransform: 'none', fontSize: 13, fontWeight: 440, borderRadius: 1, borderWeight: 200, 
                        color: '#3E434B', borderColor: "#DFE1E4",
                        '&:hover': {
                            backgroundColor: '#F8F9FC',
                            borderColor: '#DFE1E4'
                        }}} variant="outlined">
                    Cancel
                </Button>
                </Box>
            
                {/* <p>{percent} "% done"</p> */}
           
            </DialogContent>
        </Dialog>
        <Button  onClick={()=>setOpen(true)} sx={{ ml: 2, textTransform: 'none', fontSize: 12, fontWeight: 440, borderRadius: 1, borderWeight: 200, 
            color: '#3E434B', borderColor: "#DFE1E4",
            '&:hover': {
                backgroundColor: '#F8F9FC',
                borderColor: '#DFE1E4'
            }}} variant="outlined">
            <AddIcon sx={{fontSize: 12, mr: 0.5}}/> Upload
        </Button>
        </>
    )

}