import { Toolbar, Box, Stack, Button, IconButton, SvgIcon, Icon, Typography } from "@mui/material"
import TuneIcon from '@mui/icons-material/Tune';
import FilterDrawer from "./FilterDrawer";
import * as React from 'react';
import { styled } from '@mui/system';
import { useContext } from 'react';
import { TypeContext } from "../../utils/TypeContext";

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

function TypeButton(props) {
    const { isClicked, handleSelect, type } = props;
    return (
       
        <Button style={{
            borderRadius: 20,
            border: '1px solid',
            borderColor: isClicked ? '#E5F1FE': '#dddddd', 
            backgroundColor: isClicked ?  '#E5F1FE' : 'transparent',
            color: isClicked ? '#458BE9' : '#767676',
            textTransform: 'none',
        }} onClick={()=>handleSelect(type)} variant="outlined">
            {props.children}
        </Button>
       
    )
}


export default function MobileMenuBar(props) {
    const { select, setSelect, setOpen } = props;
    const { handleTypeSelect, selectedType } = useContext(TypeContext);

    const toggleSelect= (newOpen: boolean) => () => {
        setSelect(newOpen);
      };

    const toggleOpen= (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    function handleSelect(newType) {
        if (selectedType == newType) {
            handleTypeSelect(null)
        } else {
            handleTypeSelect(newType)
        }
    }

    return(
        <>
       
            <Toolbar position="sticky" sx={{display: 'flex', justifyContent: 'space-between', maxWidth: '100vw', overflow: 'auto'}}>
            
                    <Stack direction="row" spacing={0.5} overflow="scroll" >
                        <TypeButton isClicked={selectedType == 'url'} type={'url'} handleSelect={handleSelect}>Links</TypeButton>
                        <TypeButton isClicked={selectedType == 'pdf'} type={'pdf'} handleSelect={handleSelect}>PDF</TypeButton>

                        {/* <MenuButton size="small" onClick={()=>handleSelect('url')} sx={{textTransform: "none"}} variant="outlined">
                            Links
                        </MenuButton> */}
                        {/* <MenuButton size="small" onClick={()=>handleSelect('pdf')} sx={{textTransform: "none"}} variant="outlined">
                            PDF
                        </MenuButton> */}
                        <MenuButton size="small" onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{ minWidth: 100}} variant="outlined">
                            Image &nbsp; <Typography variant="h7">💎</Typography>
                        </MenuButton>
                        <MenuButton size="small" onClick={()=>window.location.replace("https://www.supermark.ai/pricing")} sx={{minWidth: 90}} variant="outlined">
                            Video &nbsp; <Typography variant="h7">💎</Typography>
                        </MenuButton> 
                        
                    </Stack>                
            </Toolbar>
        </>
    )

}
