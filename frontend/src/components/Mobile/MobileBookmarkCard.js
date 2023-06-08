import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { IconButton, Box, CardActionArea, CardActions, Collapse, InputLabel } from '@mui/material';
import placeholder from '../../assets/placeholder.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import icon from '../../assets/favicon.ico';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Checkbox from '@mui/material/Checkbox';
import { useState } from 'react';
import { Book } from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditDialog from './EditDialog';




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
  const { title, description, image, url, select } = props;
  const navigate = useNavigate();

  return (
    // <Card onClick={()=>window.location.replace(url)} sx={{ maxWidth: 600, borderRadius: 5, border:1}} elevation={0}>
    //     <Box sx={{backgroundColor: "#d3d3d3", display: "flexa"}}>

      
    //     <img
    //       src={"https://www.mckinsey.com/favicon.ico"}
    //     />
    //     </Box>
    //     <CardContent>
    //       <Typography gutterBottom variant="h6" component="div">
    //         {title ? title : "Title"}
    //       </Typography>

    //       <Button size="small" color="primary">
    //         {url ? displayUrl(url) : ""}
    //       </Button>
 
    //     </CardContent>
      
    // </Card>
    <Box sx={{display: "flex", flexDirection: "column", borderBottom: 0.2, borderColor: "#d3d3d3", backgroundColor: "white"}}>
      <Box sx={{ display: "flex", justifyContent: 'space-between', maxWidth: 600 }}>
      
        <Box onClick={()=>window.location.replace(url)} sx={{ display: "flex"}}>
          <Box sx={{ minWidth: 50, display: "flex", alignItems: "center", justifyContent: "end"}}>
            <img
              src={getIcon(url)}
              onError={addDefaultSrc}
              style={{
                height: 30
            }}
            />
          </Box>

          <CardContent>
            <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
            {url ? displayUrl(url) : ""}
            </Typography>

            <Typography gutterBottom variant="subtitle" component="div"  style={{ lineHeight: "18px" , fontSize: 14, fontWeight: 420}}>
              {title ? title : "Title"}
            </Typography>

            

            <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
            {"Unsorted"} &nbsp; {"June 6 5:45 pm"} 
            </Typography>
            
            {/* <Box>
              <Chip size={"small"} label={"generative ai"}></Chip>  <Chip size={"small"}  label={"startup"}></Chip> 
            </Box> */}

    
          </CardContent>
        </Box>
        

        <Box sx={{ mt:3 }}>
          { select ? 
          <Checkbox></Checkbox> 
          :
          <EditDialog title={title} url={url}/>
          }
        </Box>
        
      </Box>
  </Box>
 
    
  );
}
