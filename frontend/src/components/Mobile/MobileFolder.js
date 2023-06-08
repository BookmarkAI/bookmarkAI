import { Card, Box, CardMedia, IconButton, Typography, Checkbox } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import folder from '../../assets/folder.png'
import { useNavigate } from 'react-router';

export default function MobileFolder({title, count, select}){
    const navigate = useNavigate();
    return (
        <>
        <Card fullWidth elevation={0} sx={{display: "flex", width: '100%', justifyContent: "space-between", alignItems: "center", p:1, flexDirection: "row", backgroundColor: "#f5f8f9", borderRadius: 3}}>
                    
                    <Box onClick={()=>navigate(`/folder/${title}`)} sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                        <CardMedia sx={{m: 1}}>
                            <img 
                            src={folder} 
                            alt="Bookmark Logo"
                            style={{
                                height: '45px',
                            }}
                        />
                        </CardMedia>
                        <Box sx={{pl: 1.5}}>
                            <Typography variant="subtitle">
                                {title}
                            </Typography>
                            <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 14, color: "#808080"}}>
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
                </Card>
        </>
    )
}