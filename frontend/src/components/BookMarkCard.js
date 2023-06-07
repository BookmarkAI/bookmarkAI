import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, Box, CardActionArea, CardActions } from '@mui/material';
import placeholder from '../assets/placeholder.png';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import icon from '../assets/favicon.ico';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function BookMarkCard(props) {
  const { title, description, image, url} = props;
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

    <Box onClick={()=>window.location.replace(url)} sx={{ display: "flex", justifyContent: 'space-between', maxWidth: 600, borderBottom: 0.2, borderColor: "#d3d3d3" }}>
      <Box sx={{ display: "flex"}}>
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
        </CardContent>
      </Box>

      <Box sx={{ mt:3 }}>
        <MoreVertIcon sx={{color: "#808080"}}/>
      </Box>
    </Box>
  );
}

