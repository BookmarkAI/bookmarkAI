import {  Box, CardMedia, Typography, Checkbox } from '@mui/material';
import folderImg from '../../assets/folder/5.png'
import { useNavigate } from 'react-router';


export default function MobileFolder({folder, select}){
    const navigate = useNavigate();
    return (
        <>

    <Box onClick={()=>navigate(`/folder/${folder}`)} sx={{display: "flex", flexDirection: "row", borderBottom: 0.2, justifyContent: "space-between", borderColor: "#d3d3d3" }}>

                    
        <Box  sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <CardMedia sx={{m: 1}}>
                <img 
                alt={"folder"}
                src={folderImg} 
                style={{
                    height: '40px',
                }}
            />
            </CardMedia>
            <Box sx={{pl: 1}}>
                <Typography gutterBottom variant="subtitle" component="div"  style={{ lineHeight: "18px" , fontSize: 14, fontWeight: 420}}>
                    {folder}
                </Typography>
            </Box>
        </Box>
    </Box>
        </>
    )
}