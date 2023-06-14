import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import icon from '../../assets/favicon.ico';
import { useContext } from 'react';
import { FileContext } from '../../utils/FileContext';


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

function addDefaultSrc(ev) {
  ev.target.src = icon
}


export default function MobileBookmarkCard(props) {
  const { title, id, url, timestamp, folder } = props;
  // const { selectedFiles, updateSelectedFiles, removeSelectedFiles } = useContext(FileContext);
  // const clicked = selectedFiles.includes(id);
  // function handleClick() {
  //   if (!clicked) {
  //       updateSelectedFiles(id);
  //   } else {
  //       removeSelectedFiles(id);
  //   }
  // }


  return (
  <>
      <Box sx={{ display: "flex", justifyContent: 'space-between', maxWidth: 600, background: "white", }}>
      
        {/* Code to navigate to the link */}
        <Box sx={{ display: "flex"}}>
          <Box sx={{ minWidth: 50, display: "flex", alignItems: "center", justifyContent: "center", ml: 1, mr: 1}}>
            <img
              src={getIcon(url)}
              alt={"icon"}
              onError={addDefaultSrc}
              style={{
                height: 25
            }}
            />
          </Box>

          <Box sx={{ pt: 1, pb: 1}} >
            <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
            {url ? displayUrl(url) : ""}
            </Typography>

            <Typography gutterBottom variant="subtitle" component="div"  style={{ lineHeight: "18px" , fontSize: 14, fontWeight: 420}}>
              {title ? title : "Title"}
            </Typography>

            

            <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
            {folder} &nbsp; {formatDateTime(new Date(timestamp*1000))} 

            </Typography>
            
            {/* <Box>
              <Chip size={"small"} label={"generative ai"}></Chip>  <Chip size={"small"}  label={"startup"}></Chip> 
            </Box> */}

    
          </Box>
        </Box>
        


        {props.children}
        
      </Box>
 </>
 
    
  );
}
