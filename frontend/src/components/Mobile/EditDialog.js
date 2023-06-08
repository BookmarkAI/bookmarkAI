import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import * as React from 'react';
import SelectTags from './SelectTags';
import { IconButton, AppBar, Toolbar, Typography, Button, Grid, FormControl, Select, MenuItem, InputLabel, Stack } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CloseIcon from '@mui/icons-material/Close';

export default function EditDialog({title, url}){
    const [ open, setOpen ] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = (value) => {
        setOpen(false);
    };

    return (
        <div>
        <Dialog open={open} onClose={handleClose}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="black"
                    onClick={handleClose}
                    aria-label="close"
                    >
                    <CloseIcon />
                    </IconButton>
                    <Typography sx={{ ml: 2, flex: 1, color: "black"}} variant="h8" component="div">
                        Edit Bookmark
                    </Typography>
                    <Button autoFocus onClick={handleClose}>
                        save
                    </Button>
                </Toolbar>
    
            
            <Grid sx={{m:3}}>  
                <Typography gutterBottom variant="h6" component="div"  style={{ lineHeight: "25px" , fontWeight: 540}}>
                    {title}
                </Typography>
                <Typography gutterBottom variant="subtitle" component="div"  style={{ fontSize: 12, color: "#808080"}}>
                    {url}
                </Typography>  

                <Stack spacing={1} sx={{mt:4}}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Folder</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Folder"
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>        
                    <SelectTags />
                </Stack>
                
            </Grid>
            
        </Dialog>
        <IconButton onClick={()=>setOpen(true)}>  
            <ModeEditIcon  sx={{color: "#808080"}}/>
        </IconButton>
        </div>
    )
}