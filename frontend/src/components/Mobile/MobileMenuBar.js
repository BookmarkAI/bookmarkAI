import { Toolbar, Box, Stack, Button, IconButton, SvgIcon, Icon, Typography } from "@mui/material"
import TuneIcon from '@mui/icons-material/Tune';
import FilterDrawer from "./FilterDrawer";
import * as React from 'react';




export default function MobileMenuBar(props) {
    const { select, setSelect, open, setOpen, onClickText, textClicked} = props;

    const toggleSelect= (newOpen: boolean) => () => {
        setSelect(newOpen);
      };

    const toggleOpen= (newOpen: boolean) => () => {
        setOpen(newOpen);
    };


    return(
        <>
       
            <Toolbar position="sticky" sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{maxWidth: '100%'}}>
                    <Stack direction="row" spacing={0.5} overflow="scroll" >
                        <Button onClick={onClickText} sx={{textTransform: "none", borderRadius: 20}} variant={textClicked ? "contained" : "outlined"}>
                            Links
                        </Button>
                        <Button onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{textTransform: "none", borderRadius: 20}} variant="outlined">
                            Images &nbsp; <Typography variant="h7">💎</Typography>
                        </Button>
                        <Button onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{textTransform: "none", borderRadius: 20}} variant="outlined">
                            Videos &nbsp; <Typography variant="h7">💎</Typography>
                        </Button>
                    </Stack>
                </Box>
                
                <Box>
                <IconButton onClick={toggleOpen(!open)}> 
                    <TuneIcon/>
                </IconButton>
                </Box>
            </Toolbar>
        </>
    )

}
