import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton, Box, Button, InputLabel } from '@mui/material';
import placeholder from '../../assets/placeholder.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import icon from '../../assets/favicon.ico';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LaunchIcon from '@mui/icons-material/Launch';

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
  const navigate = useNavigate();

  return (
    <Box sx={{ml: 1}}>
        <CardContent>
          <Box sx={{background: colorArray[i%colorArray.length], minHeight: 150, mb: 2, borderRadius: 5, display: "flex", justifyContent: "flex-end", alignItems: "flex-start"}}>
            <LaunchIcon onClick={()=>{window.location.replace(url)}} sx={{color: "white", m: 2}}/>
          </Box>

          <Box sx={{ml: 1, mr: 1, mt: 1}}>
            <Typography sx={{overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                lineHeight: '25px'}} gutterBottom variant="h6" component="div">
                {title ? title : "Title"}
            </Typography>

            <Box sx={{display: "flex", flexDirection: "row", alignItems: 'center', width: '100%', justifyContent: 'space-between' }}> 
                <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>    
                    <img
                        src={getIcon(url)}
                        onError={addDefaultSrc}
                        style={{
                            height: 15
                        }}
                        />
                    
                    <Typography sx={{ color: "gray", ml:2}}>
                        {url ? displayUrl(url) : ""}
                    </Typography> 
                </Box> 

           
                <MoreHorizIcon/>
                
            </Box>
          </Box>
 
        </CardContent>
      
    </Box>


//     <Box sx={{display: "flex", flexDirection: "column", borderBottom: 0.2, borderColor: "#d3d3d3" }}>
//       <Box sx={{ display: "flex", justifyContent: 'space-between', maxWidth: 600}}>
      
//         {/* Code to navigate to the link */}
//         <Box onClick={()=>window.location.replace(url)} sx={{ display: "flex"}}>
//           <Box sx={{ minWidth: 50, display: "flex", alignItems: "center", justifyContent: "center", ml: 1, mr: 1}}>
            // <img
            //   src={getIcon(url)}
            //   onError={addDefaultSrc}
            //   style={{
            //     height: 25
            // }}
            // />
//           </Box>

//           <Box sx={{ pt: 1, pb: 1}} >
//             <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
//             {url ? displayUrl(url) : ""}
//             </Typography>

//             <Typography gutterBottom variant="subtitle" component="div"  style={{ lineHeight: "18px" , fontSize: 14, fontWeight: 420}}>
//               {title ? title : "Title"}
//             </Typography>

            

//             <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
//             {"Unsorted"} &nbsp; {"June 6 5:45 pm"} 
//             </Typography>
            
//             {/* <Box>
//               <Chip size={"small"} label={"generative ai"}></Chip>  <Chip size={"small"}  label={"startup"}></Chip> 
//             </Box> */}

    
//           </Box>
//         </Box>
        


//         <Box sx={{ mt:3 }}>
//           { select ? 
//           <Checkbox></Checkbox> 
//           :
//           <EditDialog title={title} url={url}/>
//           }
//         </Box>
        
//       </Box>
//   </Box>
 
    
  );
}
