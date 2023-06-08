import { Toolbar, Box, Stack, Button, IconButton, SvgIcon, Icon, Typography } from "@mui/material"
import TuneIcon from '@mui/icons-material/Tune';
import FilterDrawer from "./FilterDrawer";
import * as React from 'react';
import { styled } from '@mui/system';

const MenuButton = styled(Button)({
    borderRadius: 20, 
    borderColor: '#dddddd', 
    color: '#767676',
    textTransform: "none",
    '&:hover': {
        backgroundColor: '#E5F1FE',
        borderColor: 'transparent',
        boxShadow: 'none',
        color: "#458BE9"
      },
});




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
       
            <Toolbar position="sticky" sx={{display: 'flex', justifyContent: 'space-between', maxWidth: '100vw', overflow: 'auto'}}>
            
                    <Stack direction="row" spacing={0.5} overflow="scroll" >
                        {/* <MenuButton size="small" onClick={onClickText} sx={{textTransform: "none"}} variant={textClicked ? "contained" : "outlined"}> */}
                        <MenuButton size="small" onClick={onClickText} sx={{textTransform: "none"}} variant="outlined">
                            Links
                        </MenuButton>
                        <MenuButton size="small" sx={{textTransform: "none"}} variant="outlined">
                            PDF
                        </MenuButton>
                        <MenuButton size="small" onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{ minWidth: 100}} variant="outlined">
                            Image &nbsp; <Typography variant="h7">💎</Typography>
                        </MenuButton>
                        <MenuButton size="small" onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{minWidth: 90}} variant="outlined">
                            Video &nbsp; <Typography variant="h7">💎</Typography>
                        </MenuButton> 
                        
                    </Stack>

                    {/* <Box>
                        <IconButton onClick={toggleSelect(!select)}> 
                            <TuneIcon/>
                        </IconButton>
                    </Box>
                 */}
                
            </Toolbar>
        </>
    )

}
