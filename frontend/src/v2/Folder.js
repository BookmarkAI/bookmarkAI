import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BpCheckbox from './CheckBox';
import Bookmark from './Bookmark';
import { FileContext } from '../utils/FileContext';
import { useContext } from 'react';
import Stack from '@mui/material/Stack';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.7rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  height: 20,
  minHeight: 20,
  marginLeft: -5,
  marginRight: -5,
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, 0)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
  marginTop: -5,
  marginBottom: -10,
  marginLeft: -8,
  marginRight: -8
//   borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function Folder(props) {
  const { folder, bookmarks, setViewer, mobile } = props
  const [expanded, setExpanded] = React.useState(false);
  const { selectedFiles, updateSelectedFiles, removeSelectedFiles } = useContext(FileContext)

  const handleChange = (event) => {
    event.stopPropagation();
    if(event.target.checked) {
      bookmarks.map((bookmark)=>updateSelectedFiles(bookmark.id))
    } else {
      bookmarks.map((bookmark)=>removeSelectedFiles(bookmark.id))
    }
  };

  return(
    <Accordion expanded={expanded} onChange={()=>setExpanded(!expanded)}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%'}}>
            <Typography sx={{fontSize: mobile ? 15 :  11}}>{folder}</Typography>
          </Box>
          { expanded && bookmarks.length > 0 ? 
            <BpCheckbox onClick={(event)=>event.stopPropagation()} handleChange={handleChange} checked={bookmarks.every(bookmark => selectedFiles.includes(bookmark.id))}/> : 
            <Typography sx={{fontSize: mobile ? 15 :  11, mr: 1}}>{bookmarks.length}</Typography>}   
        </AccordionSummary>
        
        <AccordionDetails>
            <Stack spacing={1.5}>
            {bookmarks.map((bookmark)=> 
                 <Bookmark {...bookmark} setViewer={setViewer} border={1} handleChange={
                    (event) => {
                      event.stopPropagation();
                      if(event.target.checked) {
                          updateSelectedFiles(bookmark.id)
                      } else {
                          removeSelectedFiles(bookmark.id)
                      }
                  }
                 }
                 checked={selectedFiles.includes(bookmark.id)}
                 mobile={mobile}
                 />
             )
            }
            </Stack>
        </AccordionDetails>
      </Accordion>
  )
}
