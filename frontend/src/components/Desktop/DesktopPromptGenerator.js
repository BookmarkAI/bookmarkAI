import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Stack, Box, Chip } from '@mui/material';
import { useContext } from 'react';
import { FileContext } from '../../utils/FileContext';
import BoltIcon from '@mui/icons-material/Bolt';

export default function DesktopPromptGenerator() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { selectedFiles, resetSelectedFiles, chatEnabled } = useContext(FileContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <Typography variant={"body3"} sx={{fontSize: '14px'}}> Length </Typography>
        
        <Stack direction="row" spacing={0} sx={{flexWrap: "wrap", mt: 0.5, mb: 0.5}} >  
                {['1 sentence', '3 lines', '1 paragraph', '5 paragraph essay'].map((tag) => (
                    <Box sx={{mt: 0.4, mb: 0.4, mr: 0.5}}>
                        <Chip label={tag}>
                            {tag}
                        </Chip>
                    </Box>
                ))}
          </Stack>

          <Typography variant={"body3"} sx={{fontSize: '14px'}}> Format </Typography>
          <Stack direction="row" spacing={0} sx={{flexWrap: "wrap", mt: 0.5, mb: 0.5}} >  
                {['blogpost', 'presentation outline','research paper', 'email', 'summary', 'copy', 'sales outreach'].map((tag) => (
                    <Box sx={{mt: 0.4, mb: 0.4, mr: 0.5}}>
                        <Chip label={tag}>
                            {tag}
                        </Chip>
                    </Box>
                ))}
          </Stack>

          <Typography variant={"body3"} sx={{fontSize: '14px'}}> Roles </Typography>
          <Stack direction="row" spacing={0} sx={{flexWrap: "wrap", mt: 0.5, mb: 0.5}} >  
                {['content creator', 'business analyst','writing assistant'].map((tag) => (
                    <Box sx={{mt: 0.4, mb: 0.4, mr: 0.5}}>
                        <Chip label={tag}>
                            {tag}
                        </Chip>
                    </Box>
                ))}
          </Stack>

          <Box sx={{display: 'flex', justifyContent: 'center', alginItems: 'center', mt: 1}}>

          <Button variant="contained" onClick={handleClose} sx={{width: '100%', color: "white", background: '#404752', textTransform: "none", borderRadius: 1, '&:hover': {background: '#404752', border: 1, borderColor: '#aaaaaa'}}}>
            <BoltIcon/>
            Generate Prompt
          </Button>
          </Box>
          </Box>
      </Popover>
      
    </div>
  );
}