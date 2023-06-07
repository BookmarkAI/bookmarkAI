import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import TuneIcon from '@mui/icons-material/Tune';
import { IconButton, Stack } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const drawerBleeding = 56;

const sampleTags = ["Kyuhee", "Bookmark AI", "Technology", "AI", "Startups", "San Francisco", "GenerativeAI", "Productivity"]

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
  const [open, setOpen] = React.useState(false);

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
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: 'visible',
          },
        }}
      />
        <IconButton onClick={toggleDrawer(true)}> 
            <TuneIcon/>
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
          <Puller />
          <Typography sx={{ p: 2, color: 'text.secondary' }}>Filter By Tag</Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
            {/* Filter Menu */}
          <Box sx={{maxWidth: '100%', mt: 2}}>
            <Stack direction="row" spacing={0} sx={{flexWrap: "wrap"}} >
                {/* Tags */}
                {sampleTags.map((tag) => (
                    <Box sx={{m:0.5}}>
                        <Button sx={{textTransform: "none", borderRadius: 20 }} variant="outlined">
                            {tag}
                        </Button>
                    </Box>
                ))}
                {/* Add Button */}
                <Box sx={{m:0.5}}>
                    <Button sx={{textTransform: "none", borderRadius: 20 }} variant="outlined">
                        <AddIcon/>
                    </Button>
                </Box>
            </Stack>
         </Box>

        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}