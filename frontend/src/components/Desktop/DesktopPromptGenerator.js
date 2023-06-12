import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack, Box, Chip } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { FileContext } from '../../utils/FileContext';
import BoltIcon from '@mui/icons-material/Bolt';
import InputBase from '@mui/material/TextField';
import { Create } from '@mui/icons-material';




function CreatePrompt(selectedChips) {
  let role = selectedChips['role'] ? `You are an experienced ${selectedChips['role']}. ` : ""
  let tone = selectedChips['tone'] ? `Your tone is ${selectedChips['tone']}. `: ""
  let format = selectedChips['format'] ? `Please write a ${selectedChips['format']}. `: ""
  let length = selectedChips['length'] ? `I want its length to be ${selectedChips['length']}. `: ""
  return role + tone + format + length
}

function ChipList({ chipName, options, onChipSelect, selectedChips }) {

  const handleChipClick = (chipValue) => {
    onChipSelect(chipName, chipValue); // Pass the chip name and selected chip value to the callback function
  };


  return (
    
      <Stack direction="row" spacing={0} sx={{flexWrap: "wrap", mt: 0.5, mb: 0.5}} >  
            {options.map((option) => (
                <Box sx={{mt: 0.4, mb: 0.4, mr: 0.5}}>
                    <Chip key={option} label={option} color={selectedChips[chipName] == option ? 'primary': 'default'} onClick={() => handleChipClick(option)}>
                        {option}
                    </Chip>
                </Box>
            ))}
      </Stack>

    
  );
}



export default function DesktopPromptGenerator({query, setQuery}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { selectedFiles, resetSelectedFiles, chatEnabled } = useContext(FileContext);
  const [ value, setValue ] = React.useState(query);

  const [selectedChips, setSelectedChips] = useState({
    length: null,
    format: null,
    role: null,
    tone: null,
  });


  useEffect(() => {
    setValue(query)
  }, [query]);

  const handleChipSelect = (chipName, chipValue) => {
    setSelectedChips((prevSelectedChips) => ({
      ...prevSelectedChips,
      [chipName]: chipValue,
    }));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedChips({
      length: null,
      format: null,
      role: null,
      tone: null,
    })
  };

  const handleGeneratePrompt = () => {
    setQuery(value);
    handleClose();
  }

  function changeValue(e){
    setValue(e.target.value);    
  }

  function reset() {
    setSelectedChips({
      length: null,
      format: null,
      role: null,
      tone: null,
    });
    setValue('');
    setQuery('');
  }

  useEffect(() => {
    setValue(query + CreatePrompt(selectedChips))
  }, [selectedChips]); 


  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button variant="contained" disabled={chatEnabled ? false : true} onClick={handleClick} sx={{minHeight:'46px', color: "white", background: 'linear-gradient(to right, #cd5b95, #9846ca)', pl: 2, textTransform: "none"}}>
        Advanced Search       
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{width: '400px', p: 2}}>
        
        
        <Typography variant={"body3"} sx={{fontSize: '14px'}}> Roles </Typography>
        <ChipList chipName="role" options={['content creator', 'business analyst','writing assistant']} onChipSelect={handleChipSelect} selectedChips={selectedChips} />
        <Typography variant={"body3"} sx={{fontSize: '14px'}}> Tone </Typography>
        <ChipList chipName="tone" options={['as if you are talking to 5 years old', 'friendly', 'persuasive', 'informative', 'professional']} onChipSelect={handleChipSelect} selectedChips={selectedChips} />
        <Typography variant={"body3"} sx={{fontSize: '14px'}}> Format </Typography>
        <ChipList chipName="format" options={['blogpost', 'presentation outline','research paper', 'email', 'summary', 'copy', 'sales outreach']} onChipSelect={handleChipSelect} selectedChips={selectedChips} />
        <Typography variant={"body3"} sx={{fontSize: '14px'}}> Length </Typography>
        <ChipList chipName="length" options={['1 sentence', '3 lines', '1 paragraph', '3 paragraphs']} onChipSelect={handleChipSelect} selectedChips={selectedChips} />
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant={"body3"} sx={{fontSize: '14px'}}> Customize </Typography>
          <Button onClick={()=> {reset()}} sx={{textTransform: 'none'}}>
            Clear
          </Button>
        </Box>



      <InputBase
       fullWidth
       multiline
        sx={{flex: 1, fontSize: '10px' }}
        inputProps={{ 'aria-label': 'search google maps' }}
        value={value}
        onChange={changeValue}
      />  
      {/* 
        <div>
        <h4>Selected Chips:</h4>
        
      </div> */}
        <Box sx={{display: 'flex', justifyContent: 'center', alginItems: 'center', mt: 1.3}}>

          <Button variant="contained" onClick={handleGeneratePrompt} sx={{width: '100%', color: "white", background: '#404752', textTransform: "none", borderRadius: 1, '&:hover': {background: '#404752', border: 1, borderColor: '#aaaaaa'}}}>
            <BoltIcon/>
            Generate Prompt
          </Button>
          </Box>
          </Box>
      </Popover>
      
    </div>
  );
}