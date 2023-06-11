import * as React from 'react';
import Typography from '@mui/material/Typography';
import { IconButton, Box, CardActionArea, CardActions, Collapse, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import icon from '../../assets/favicon.ico';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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

function BasicSelect() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default function MobileBookmarkCard(props) {
  const { title, id, url, timestamp, folder } = props;
  const { selectedFiles, updateSelectedFiles, removeSelectedFiles } = useContext(FileContext);
  const clicked = selectedFiles.includes(id);
  function handleClick() {
    if (!clicked) {
      console.log(selectedFiles)
       console.log(id);
        updateSelectedFiles(id);
    } else {
        removeSelectedFiles(id);
    }
  }


  const navigate = useNavigate();


  return (
  <>
      <Box sx={{ display: "flex", justifyContent: 'space-between', maxWidth: 600, background: clicked ? '#dddddd' : "white", }}>
      
        {/* Code to navigate to the link */}
        <Box onClick={handleClick} sx={{ display: "flex"}}>
          <Box sx={{ minWidth: 50, display: "flex", alignItems: "center", justifyContent: "center", ml: 1, mr: 1}}>
            <img
              src={getIcon(url)}
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
