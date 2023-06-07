import { Toolbar, Box, Stack, Button, IconButton, SvgIcon, Icon, Typography } from "@mui/material"
import FilterDrawer from "./FilterDrawer";


export default function MobileMenuBar() {
    return(
        <>
       
            <Toolbar position="sticky" sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box sx={{maxWidth: '100%'}}>
                    <Stack direction="row" spacing={0.5} overflow="scroll" >
                        <Button sx={{textTransform: "none", borderRadius: 20}} variant="outlined">
                            Text
                        </Button>
                        <Button onClick={()=>window.location.replace("https://www.gobookmark.it/pricing")} sx={{textTransform: "none", borderRadius: 20}} variant="outlined">
                            Images &nbsp; <Typography variant="h7">💎</Typography>
                        </Button>
                        <Button onClick={()=>window.location.replace("https://www.gobookmark.it/pricing")} sx={{textTransform: "none", borderRadius: 20}} variant="outlined">
                            Videos &nbsp; <Typography variant="h7">💎</Typography>
                        </Button>
                    </Stack>
                </Box>
                
                <Box>
                    <FilterDrawer/>
                </Box>
            </Toolbar>
        </>
    )

}
