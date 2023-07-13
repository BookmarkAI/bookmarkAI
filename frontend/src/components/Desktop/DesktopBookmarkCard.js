import * as React from 'react';
import Typography from '@mui/material/Typography';
import { IconButton, Box, Button, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import icon from '../../assets/internet.png';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import LaunchIcon from '@mui/icons-material/Launch';
import { useState } from 'react';
import { useContext } from 'react';
import { FileContext } from '../../utils/FileContext';
import BookmarkMenu from '../EditDialog';
import ControlledCheckbox from '../ControlledCheckbox';
import pdf from '../../assets/pdf.png'

const colorArray = [
    "linear-gradient(to right, #e66465, #9198e5)",
    "linear-gradient(to left, #ed4264, #ffedbc)",
    "linear-gradient(to left, #ee9ca7, #ffdde1)",
    "linear-gradient(to left, #d9a7c7, #fffcdc)",
    "linear-gradient(to left, #a1ffce, #faffd1)",
    "linear-gradient(to right, #b2fefa, #0ed2f7)",
    "linear-gradient(to left, #83a4d4, #b6fbff)",
    "linear-gradient(to right, #e8cbc0, #636fa4)",
]


function formatDateTime(dateTime) {
  const formattedDateTime = dateTime.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

  return formattedDateTime;
}



function displayUrl(url) {
  return url.replace('https://','').split("/")[0]
}

function getIcon(url) {
  return `https://${displayUrl(url)}/favicon.ico`
}


function DesktopMiniBookmarkCard(props) { 
  const { title, url, i } = props;

  const navigate = useNavigate();

  return (
    <Box sx={{mr: 2, mb: 2,  background: "white", borderRadius: 4}}>
          <Box sx={{ml: 0.5,  mt: 1}}>
            

            <Box sx={{display: "flex", flexDirection: "row",  pt: 1, alignItems: 'center', width: '100%', justifyContent: 'space-between' }}> 
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>    
                
                    
                    <Typography sx={{ color: "gray", ml:1.5, fontSize: "14px"}}>
                        {url ? displayUrl(url) : ""}
                    </Typography> 
                </Box> 
            </Box>

            <Box onClick={()=>{window.open(url, "_blank")}}>
              <Typography sx={{overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                  lineHeight: '21px', fontSize: "17px", fontWeight: "540"}} gutterBottom variant="h6" component="div">
                  {title ? title : "Title"}
              </Typography>
            </Box>
          </Box>
   
    </Box>
  );

}



function DesktopBookmarkCard(props) {
  const { title, url, id, i, timestamp, fetchBookmarks, setAllBookmarks, type} = props;
  const { selectedFiles, updateSelectedFiles, removeSelectedFiles } = useContext(FileContext);

  function handleClick(id) {
    if (selectedFiles.includes(id)) {
      removeSelectedFiles(id)
    } else {
      updateSelectedFiles(id)
    }
  }
  const navigate = useNavigate();

  function addDefaultSrc(ev) {
    ev.target.src = type == 'url' ? icon : pdf
  }
  

  return (
    <Box sx={{height: 80, mr: 1, mb: 1,  background: "white", borderRadius: 2, border: 1, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderColor: "#DFE1E4"}}>
        
          {/* <Box onClick={()=>handleClick(id)} sx={{background: colorArray[i%colorArray.length], minHeight: 150, mb: 2, borderRadius: 4, display: "flex", justifyContent: "flex-end", alignItems: "flex-start"}}>
           <ControlledCheckbox id={id}/>
          </Box> */}
          <Box sx={{display: 'flex', flexDirection: 'row', width: '90%'}}> 
            <Box sx={{p: 1.2}}>  
              <img
                src={getIcon(url)}
                onError={addDefaultSrc}
                style={{
                    height: 35,
                    borderRadius: 5
                }}
              />
            </Box>

            <Box sx={{ml: 0.5,  mt: 1, width: '100%'}} onClick={()=>{window.open(url, "_blank")}}>
                <Typography sx={{overflow: "hidden",
                    width: '90%',
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "2",
                    WebkitBoxOrient: "vertical",
                    lineHeight: '19px', fontSize: 14, fontWeight: "540", wordWrap: "break-word"}} gutterBottom variant="h6" component="div">
                    {title ? title : "Title"}
                </Typography>
                <Typography sx={{ color: "gray", fontSize: 12}}>
                    {url ? displayUrl(url) : ""}
                </Typography> 
            </Box>
          </Box>
          <BookmarkMenu {...props} fetchBookmarks={fetchBookmarks}>
                <MoreVertIcon sx={{fontSize: 20, color: '#DFE1E4'}}/>
          </BookmarkMenu>    
   
    </Box>
  );
}


export { DesktopBookmarkCard, DesktopMiniBookmarkCard } 