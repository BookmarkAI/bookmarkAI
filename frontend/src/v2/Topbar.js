import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const appbarHeight = 45;

export default function Topbar() {
    return(
        <AppBar elevation={0} sx={{minHeight: appbarHeight, height: appbarHeight, backgroundColor: '#181818'}} position="fixed">
            <Box sx={{mt: 1.5, ml: 2, display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-end'}}>
                <Button sx={{textTransform: 'none', width: 150, fontSize: 12, borderRadius: 0, height: 25}} variant="outlined">
                    New Chat
                </Button>
            </Box>
        </AppBar>
    )

}
