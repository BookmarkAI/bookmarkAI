import { Card, Box, CardMedia, IconButton, Typography, Checkbox } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import folder from '../../assets/folder/5.png'
import { useNavigate } from 'react-router';

export default function MobileFolder({title, count, select}){
    const navigate = useNavigate();
    return (
        <>

    <Box sx={{display: "flex", flexDirection: "row", borderBottom: 0.2, justifyContent: "space-between", borderColor: "#d3d3d3" }}>

                    
        <Box onClick={()=>navigate(`/folder/${title}`)} sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <CardMedia sx={{m: 1}}>
                <img 
                src={folder} 
                style={{
                    height: '40px',
                }}
            />
            </CardMedia>
            <Box sx={{pl: 1}}>
                <Typography gutterBottom variant="subtitle" component="div"  style={{ lineHeight: "18px" , fontSize: 14, fontWeight: 420}}>
                    {title}
                </Typography>
                <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
                {count} bookmarks
                </Typography>
            </Box>
        </Box>

        <Box>
            { select ? 
                <Checkbox/>:
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            }
        </Box>
    </Box>
        </>
    )
}