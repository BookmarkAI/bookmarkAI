import * as React from 'react';
import Typography from '@mui/material/Typography';
import { IconButton, Box, Button, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import icon from '../../assets/favicon.ico';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LaunchIcon from '@mui/icons-material/Launch';
import { useState } from 'react';
import { useContext } from 'react';
import { FileContext } from '../../utils/FileContext';


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


function displayUrl(url) {
  return url.replace('https://','').split("/")[0]
}

function getIcon(url) {
  console.log(`https://${displayUrl(url)}$/favicon.ico`)
  return `https://${displayUrl(url)}/favicon.ico`
}

function addDefaultSrc(ev) {
  ev.target.src = icon
}

export default function DesktopBookmarkCard(props) {
  const { title, url, i } = props;
  const { selectedFiles, updateSelectedFiles, removeSelectedFiles } = useContext(FileContext);

  const clicked = selectedFiles.includes(title)

  function handleClick() {
    if (!clicked) {
        updateSelectedFiles(title);
    } else {
        removeSelectedFiles(title);
    }
    
  }

  const navigate = useNavigate();

  return (
    <Box sx={{mr: 2, mb: 2,  background: clicked ? '#dddddd' : "white", borderRadius: 4}} onClick={handleClick}>
        
          <Box sx={{background: colorArray[i%colorArray.length], filter: clicked ? "brightness(85%)" : "brightness(100%)", minHeight: 150, mb: 2, borderRadius: 4, display: "flex", justifyContent: "flex-end", alignItems: "flex-start"}}>
            <LaunchIcon onClick={()=>{window.open(url, "_blank")}} sx={{color: "white", m: 2}}/>
          </Box>

          <Box sx={{ml: 0.5, mr: 1.5, mt: 1}}>
            <Typography sx={{overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                lineHeight: '21px', fontSize: "17px", fontWeight: "540"}} gutterBottom variant="h6" component="div">
                {title ? title : "Title"}
            </Typography>

            <Box sx={{display: "flex", flexDirection: "row",  pt: 2, alignItems: 'center', width: '100%', justifyContent: 'space-between' }}> 
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>    
                    <img
                        src={getIcon(url)}
                        onError={addDefaultSrc}
                        style={{
                            height: 15
                        }}
                        />
                    
                    <Typography sx={{ color: "gray", ml:1.5, fontSize: "14px"}}>
                        {url ? displayUrl(url) : ""}
                    </Typography> 
                </Box> 

           
                <MoreHorizIcon/>
                
            </Box>
          </Box>
 

      
    </Box>
  );
}
