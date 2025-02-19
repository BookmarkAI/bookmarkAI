import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TuneIcon from '@mui/icons-material/Tune';
import { IconButton, Stack, Chip, Grid } from '@mui/material';
import { MobileBookMarkList } from '../BookMarkList';
import { getAllBookmarks, getAllFolders } from '../../services/service';
import { useState, useEffect, useContext } from 'react';
import { FileContext } from '../../utils/FileContext'
import SelectScope from '../SelectScope';


const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const Root = styled('div')(({ theme }) => ({
  height: '100%',
  backgroundColor: "white",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === 'light' ? grey[300] : grey[900],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
}));

export default function SwipeableEdgeDrawer(props: Props) {
  const { window } = props;
  const [ open, setOpen ] = React.useState(false);
  const { selectedFiles } = useContext(FileContext)


  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(90% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
        
        <IconButton sx={{p:0.5}} onClick={()=>setOpen(!open)}> 
          <TuneIcon sx={{fontSize: '21px'}}/>
        </IconButton>

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: 'visible',
            right: 0,
            left: 0
          }}
        >
          <Puller onClick={()=>console.log('test')}/>
          <Grid xs={12} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            {selectedFiles.length < 1 ? <Typography sx={{ p: 2, color: 'text.secondary' }}>Select Bookmarks</Typography> :
       
              <Typography sx={{ p: 2, color: 'text.secondary' }}>
                  {selectedFiles.length} bookmarks selected
              
                    </Typography>     
           }
            {open && <Button onClick={()=>setOpen(false)}>Done</Button>}
          </Grid>
          
        </StyledBox>
        <StyledBox
          sx={{
            px: 1,
            pb: 2,
            pt: 1,
        
            height: '100%',
            overflow: 'auto',
          }}
        >
           <SelectScope/>
            
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}