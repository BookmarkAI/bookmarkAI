import { Stack, Box, Typography } from '@mui/material';
import { folders } from '../../services-mock/fake_dataset';
import FolderIcon from '@mui/icons-material/Folder';
import Button from '@mui/material/Button'
import { styled } from '@mui/system';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import BookmarkIcon from '@mui/icons-material/Bookmark';


function DesktopFolder(props){
    const { title } = props;
    const [ clicked, setClicked ] =  useState(false);


const getButtonStyles = () => {
    if (!clicked) {
      return {
        borderColor: '#dddddd', 
        textTransform: "none",
        display: 'flex',
        justifyContent: 'space-between', 
        p: 1.2, width: '100%', display: 'flex', justifyContent: 'space-between', textTransform: "none", color: "#959CA6",
        '&:hover': {
            backgroundColor: '#E5F1FE',
            borderColor: 'transparent',
            boxShadow: 'none',
        },
      };
    } else {
      return {
        backgroundColor: '#E5F1FE',
        borderColor: 'transparent',
        boxShadow: 'none',
        color: "#959CA6",
        color: "#3D9DFF",
        p: 1.2, width: '100%', display: 'flex', justifyContent: 'space-between', textTransform: "none", 
        '&:hover': {
          backgroundColor: "#dddddd",
         
        },
      };
    }
  };

    return(
        <>
       
        <Box sx={{borderRadius: 3, display:"flex", flexDirection: "row", justifyContent: 'space-between', alignItems: 'flex-end'}}>
            <Button variant={clicked ? "contained" : "text"} onClick={()=>setClicked(!clicked)} sx={getButtonStyles()}>   
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    {props.children}
                    <Typography variant="h7" sx={{ml: 1, fontWeight: clicked? 500: 350, color: clicked? "#3D9DFF": "#333333"}}>
                        {title}
                    </Typography>
                </Box>
            
            <Box>
                <Typography sx={{fontSize: 14}}>
                    5
                </Typography>
            </Box>
           
            </Button>   
        </Box>
        

        </>
    )
}

export default function DesktopFolderList() {
    return (
        <>
        {/* Folder List */}
      
                <Stack spacing={0}>
                    <DesktopFolder title={"All Bookmarks"}>
                        <BookmarkIcon sx={{fontSize: 17}}/>
                    </DesktopFolder>
                   
                    {folders.map((doc, i) => (              
                         <DesktopFolder {...doc}>
                            <FolderIcon  sx={{ fontSize: 17 }}/>
                         </DesktopFolder>
                    ))}

                    <Button sx={{textTransform: "none", display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
                        <AddIcon sx={{fontSize:"16px", mr: 0.5}}/>
                        <Typography variant="h7" >
                        Create New Folder 
                    </Typography>
                    </Button>
                </Stack>
        </>
    )
}