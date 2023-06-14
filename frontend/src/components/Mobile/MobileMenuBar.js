import { Toolbar, Stack, Button } from "@mui/material"
import * as React from 'react';
import { useContext } from 'react';
import { TypeContext } from "../../utils/TypeContext";


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
    const { handleTypeSelect, selectedType } = useContext(TypeContext);

    function handleSelect(newType) {
        if (selectedType === newType) {
            handleTypeSelect(null)
        } else {
            handleTypeSelect(newType)
        }
    }

    return(
        <>
       
            <Toolbar position="sticky" sx={{display: 'flex', justifyContent: 'space-between', maxWidth: '100vw', overflow: 'auto'}}>
            
                    <Stack direction="row" spacing={0.5} overflow="scroll" >
                        <TypeButton isClicked={selectedType ==='url'} type={'url'} handleSelect={handleSelect}>Links</TypeButton>
                        <TypeButton isClicked={selectedType === 'pdf'} type={'pdf'} handleSelect={handleSelect}>PDF</TypeButton>
                    </Stack>                
            </Toolbar>
        </>
    )

}
